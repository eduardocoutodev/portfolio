# Eduardo Couto's Portfolio

Welcome to my portfolio repository! This project showcases my skills, projects, and experiences as a software developer. Built with [Next.js](https://nextjs.org/), this portfolio highlights my journey and the work I am passionate about.

## Getting Started

First, run the development server:

```bash
pnpm dev

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying src/app/page.tsx. The page auto-updates as you edit the file.
```

## Technical Documentation

This section provides an overview of the technical aspects of the project.

```mermaid
flowchart TD
    %% Client-Side Layer
    subgraph "Client-Side Layer"
        Browser["User Browser"]:::client
    end

    %% Next.js & Server-Side Layer
    subgraph "Next.js & Server-Side Layer"
        NextApp["Next.js App Directory"]:::server
        Pages["Pages & Layouts"]:::server
    end

    %% UI Components Layer
    subgraph "UI Components Layer"
        UIComponents["UI Components (Presentational)"]:::ui
        ContactForm["Contact Form Component"]:::ui
        OtherComponents["Other UI Components"]:::ui
    end

    %% Logic & State Management
    subgraph "Logic & State Management"
        Context["Global State & Context"]:::logic
        Domain["Domain Models & Logic"]:::logic
        Utilities["Utility Libraries"]:::lib
        ServerAction["Server Action (Contact Form)"]:::logic
    end

    %% External Services
    subgraph "External Services"
        EmailHandling["Email Handling (Resend)"]:::external
        Analytics["Analytics (PostHog)"]:::external
        ExternalLibs["Third-Party Libraries (Framer Motion)"]:::external
    end

    %% Data Flow Connections
    Browser -->|"HTTP_Request"| NextApp
    NextApp -->|"Renders"| Pages
    Pages -->|"Contains"| ContactForm
    Pages -->|"Imports"| UIComponents
    UIComponents -->|"Uses"| Context
    UIComponents -->|"Validates_with"| Domain
    UIComponents -->|"Helpers_from"| Utilities
    ContactForm -->|"Submits_to"| ServerAction
    ServerAction -->|"Routes_to"| EmailHandling
    NextApp -->|"Integrates"| Analytics
    NextApp -->|"Animates_with"| ExternalLibs

    %% Click Events (Paths for Development Navigation)
    click NextApp "https://github.com/eduardocoutodev/portfolio/tree/main/src/app"
    click UIComponents "https://github.com/eduardocoutodev/portfolio/tree/main/src/components"
    click Context "https://github.com/eduardocoutodev/portfolio/tree/main/src/context"
    click Domain "https://github.com/eduardocoutodev/portfolio/tree/main/src/domain"
    click Utilities "https://github.com/eduardocoutodev/portfolio/tree/main/src/lib"
    click EmailHandling "https://github.com/eduardocoutodev/portfolio/tree/main/src/email"
    click Analytics "https://github.com/eduardocoutodev/portfolio/blob/main/src/providers/posthog.tsx"

    %% Styles
    classDef client fill:#ffdead,stroke:#663300,stroke-width:2px;
    classDef server fill:#cde,stroke:#036,stroke-width:2px;
    classDef ui fill:#dff,stroke:#00f,stroke-width:2px;
    classDef logic fill:#dfd,stroke:#090,stroke-width:2px;
    classDef lib fill:#ffe,stroke:#cc0,stroke-width:2px;
    classDef external fill:#fdd,stroke:#900,stroke-width:2px;
```

### Frameworks and Libraries

- **Next.js 14**: This project is built using Next.js 14 with the App Directory structure. Next.js is a React framework that enables server-side rendering and generating static websites for React-based web applications.
- **React**: A JavaScript library for building user interfaces, particularly single-page applications where data changes over time.
- **Framer Motion**: Used for animations within the portfolio. It provides a simple yet powerful way to create animations and gestures for React elements.
- **Resend**: Utilized for handling email functionalities within the project.

### Project Structure

The project follows a modular architecture with the following main directories:

- **/src**: Contains the source code for the application.
  - **/app**: Includes the main application files such as layout and main page components.
  - **/components**: Houses all the React components used throughout the application.
  - **/context**: Contains context providers for managing global state.
  - **/domain**: Defines domain-specific logic and data structures.
  - **/lib**: Includes utility functions, hooks, and other libraries.
  - **/actions**: Contains server actions such as form submissions.
- **/public**: Holds static assets like images and the resume PDF.

### Key Features

- **Dynamic Content Rendering**: The portfolio dynamically renders content from various React components to provide a seamless and interactive user experience.
- **Responsive Design**: Ensures the portfolio is accessible and visually appealing on different devices and screen sizes.
- **Animations**: Utilizes Framer Motion for smooth and engaging animations throughout the site.
- **Email Handling**: Implements Resend for managing email communications through contact forms.

## About Me

After graduating with a degree in **Informatics Engineering**, I pursued my passion for software development. I have extensive experience in **full-stack development** through various roles and projects. My favorite part of programming is the problem-solving aspect. I love the feeling of finally figuring out a solution to a complex problem.

My core stack includes **Java, React, Angular, Quarkus, and Node.js**. I am also proficient in **AWS, Terraform, and Kubernetes**. I am always looking to learn new technologies and continuously improve my skills. I am currently open to **collaboration and new projects** in the field of software development.

## Contact

Feel free to reach out to me for collaboration or inquiries:

- Email: [contacts@eduardocouto.dev](mailto:contacts@eduardocouto.dev)
- Or use the form on the [Contact](#contact) section of this portfolio.
