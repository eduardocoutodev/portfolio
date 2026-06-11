import { expect, test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

test.describe('Landing Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL before each test
    await page.goto('/');
  });

  test('Should have the appropriate page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Eduardo Couto - Backend Software Engineer/);
  });

  test('Should check content on hero section', async ({ page }) => {
    const careerYears = new Date().getFullYear() - 2022;
    const heroMessage = page.getByTestId('hero-message');

    await expect(heroMessage).toContainText("Hello, I'm Eduardo");
    await expect(heroMessage).toContainText('backend engineer');
    await expect(heroMessage).toContainText(`${careerYears} years`);
    await expect(heroMessage).toContainText('Java and Kotlin');
  });

  test('Should navigate to the Projects section', async ({ page }) => {
    // Click on the Projects link
    await page.goto('/#projects');

    // Verify the Projects section is displayed by checking for a specific element
    const projectsHeading = page.getByTestId('projects-heading');

    await expect(projectsHeading).toBeTruthy();
    await expect(projectsHeading).toContainText('My projects');
    await expect(projectsHeading).toBeVisible();
  });

  test('Should download the resume', async ({ page, browser }) => {
    const downloadPath = path.join(__dirname, 'test-results');
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath);
    }

    const context = await browser.newContext({ acceptDownloads: true });
    const newPage = await context.newPage();

    await newPage.goto('/');

    const downloadPromise = page.waitForEvent('download');
    await page.getByTestId('download-cv-trigger').click();
    const download = await downloadPromise;

    const downloadFilePath = path.join(downloadPath, download.suggestedFilename());

    // Wait for the download to complete
    await download.saveAs(downloadFilePath);

    expect(download.suggestedFilename()).toBe('eduardo_couto_resume.pdf');
    // Verify the file exists
    expect(fs.existsSync(downloadFilePath)).toBeTruthy();

    // Check if the file is a valid PDF
    const dataBuffer = fs.readFileSync(downloadFilePath);
    const pdfData = await pdfParse(dataBuffer);
    expect(pdfData.numpages).toBeGreaterThan(0);

    // Clean up the file
    fs.unlinkSync(downloadFilePath);
    await context.close();
  });

  test('Should submit the Contact form successfully', async ({ page }) => {
    // Navigate to the Contact section
    await page.goto('/#contact');

    // Fill the form
    await page.getByTestId('contact-name-input').pressSequentially('John Doe');
    await page.getByTestId('contact-email-input').fill('john.doe@example.com');
    await page.getByTestId('contact-message-input').fill('Hello, This is a test message.');

    // Click the submit button
    await page.click('text=Submit');

    const toastContainer = page.getByTestId('toast-container');
    // Verify submission success message or redirection
    await expect(toastContainer).toBeVisible();
    await expect(toastContainer).toContainText('Email sent successfully!');
  });

  test('Should show the contact form errors', async ({ page }) => {
    // Navigate to the Contact section
    await page.goto('/#contact');

    // Fill the form
    await page.getByTestId('contact-name-input').pressSequentially('J');
    await page.getByTestId('contact-email-input').fill('john.doe@example.com');
    await page.getByTestId('contact-message-input').fill('');
    // Click the submit button
    await page.click('text=Submit');

    // Verify the error messages
    await expect(page.getByTestId('invalid-name-warning')).toHaveText(
      'Name must be at least 2 characters long',
    );

    await expect(page.getByTestId('invalid-email-warning')).toBeHidden();

    await expect(page.getByTestId('invalid-message-warning')).toHaveText(
      'Message must be at least 10 characters long',
    );
  });
});
