'use server';

import { ContactFormSchema } from '@/domain/contact-form';
import ContactFormEmail from '@/email/contact-form-email';
import { ENV_VARS } from '@/lib/environment';
import { waitTime } from '@/lib/utils';
import { waitUntil } from '@vercel/functions';
import React from 'react';
import { Resend } from 'resend';

const { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL, NODE_ENV } = ENV_VARS;

const resend = new Resend(RESEND_API_KEY);

export async function contactFormAction(formData: unknown) {
  const parsedFormData = ContactFormSchema.safeParse(formData);

  if (!parsedFormData.success) {
    return {
      error: parsedFormData.error.flatten().fieldErrors,
    };
  }

  const { data } = parsedFormData;
  const { email: senderEmail, message, name } = data;

  if (NODE_ENV === 'development') {
    await waitTime(500);
    return {
      response: {
        status: 200,
        data: {
          message: 'Email sent successfully!',
        },
      },
    };
  }

  waitUntil(
    (async () => {
      console.log('[contactFormAction] Sending email to:', RESEND_TO_EMAIL);
      try {
        await resend.emails.send({
          from: RESEND_FROM_EMAIL,
          to: RESEND_TO_EMAIL,
          subject: 'Message from Contact Form 🔥',
          text: `Name: ${name}\nEmail: ${senderEmail}\nMessage: ${message}`,
          reply_to: senderEmail,
          react: React.createElement(ContactFormEmail, { senderEmail, message, name }),
        });
        console.log('[contactFormAction] Email sent successfully');
      } catch (err) {
        console.error('[contactFormAction] Failed to send email:', err);
      }
    })(),
  );

  return { success: true };
}
