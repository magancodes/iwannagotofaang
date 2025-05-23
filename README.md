# DevLens: AI-Powered GitHub Project Analyzer


## Project Overview

DevLens is an AI-powered GitHub project analyzer designed to elevate your repositories into FAANG-ready portfolio pieces. It provides a comprehensive analysis of your project, including tech stack detection, FAANG company fit assessment, resume-ready summaries, and personalized recommendations for improvement.  Think of it as a smart mentor helping you optimize your project for job applications and career advancement.

## Key Features

*   **Tech Stack Detection:**  Automatically identifies the programming languages, frameworks, and libraries used in your project.
*   **FAANG Company Fit:** Evaluates your project against the standards and expectations of top tech companies like Meta, Amazon, Apple, Netflix, and Google.
*   **Resume Generator:** Creates professional and compelling summaries of your project, tailored for inclusion in your resume.
*   **Custom Recommendations:** Provides personalized suggestions and actionable steps to enhance your project's quality, design, and overall presentation to potential employers.

## Code Documentation (Inferred)

Based on the `package.json` and initial `README.md`, the project appears to be built with the following key components:

*   **Next.js:**  A React framework for building performant and scalable web applications.  This suggests the project likely utilizes server-side rendering, routing, and other features provided by Next.js.
*   **React:** A JavaScript library for building user interfaces. The core UI components are likely built using React.
*   **Radix UI:**  A set of unstyled, accessible UI primitives. This indicates a focus on accessible and customizable UI components.
*   **Tailwind CSS:**  A utility-first CSS framework for rapidly styling the application.  This allows for quick and consistent UI development.
*   **@google/generative-ai:** Integrates Google's Generative AI models to provide AI-powered features.
*   **Axios:**  An HTTP client for making API requests to fetch data and interact with backend services.
*   **Zod:**  A TypeScript-first schema declaration and validation library, ensuring data integrity.

**Key Modules (Based on Dependencies - further examination of the codebase would be required for a more complete list):**

*   **UI Components (Radix UI):**  Likely manages various UI elements like dialogs, buttons, accordions, etc. This module handles the presentational layer of the application.
*   **API Interaction (Axios, @google/generative-ai):**  Handles communication with external APIs, fetching project data, and leveraging Google's AI capabilities.
*   **Form Handling (react-hook-form, @hookform/resolvers, Zod):**  Manages form state, validation, and submission.
*   **State Management (React Context, potentially other libraries):**  Handles application state, data flow, and updates.  *Note: This is inferred and may require further analysis.*

**Areas for further code examination:**

*   The core logic for analyzing GitHub repositories.
*   The implementation of the FAANG company fit algorithm.
*   The process of generating resume summaries using AI.
*   The algorithms behind personalized recommendations.

## Local Setup Instructions

Follow these steps to set up and run DevLens locally:

### Prerequisites

*   **Node.js:**  Ensure you have Node.js installed (version 18 or higher is recommended). You can download it from [nodejs.org](https://nodejs.org/).
*   **npm or yarn:**  Node Package Manager (npm) or Yarn is required to manage project dependencies. npm typically comes bundled with Node.js. Yarn can be installed globally: `npm install -g yarn` or `corepack enable`.
*   **Git:**  Git is necessary for cloning the repository. You can download it from [git-scm.com](https://git-scm.com/).
*   **Google Generative AI API Key:** You'll need a Google Generative AI API Key to utilize the AI features. Obtain one from [Google AI Studio](https://makersuite.google.com/app/apikey). You will have to set it as an environment variable (described below).

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url> # Replace <repository_url> with the actual repository URL (e.g., git clone https://github.com/your-username/devlens.git)
    cd devlens
    ```

2.  **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3. **Set up environment variables**
    Create a `.env.local` file in the root directory of the project and add the following:

    ```
    GOOGLE_API_KEY=<your_google_api_key>
    ```
    Replace `<your_google_api_key>` with your actual Google Generative AI API Key

### Running the Application

1.  **Start the development server:**

    Using npm:

    ```bash
    npm run dev
    ```

    Or using yarn:

    ```bash
    yarn dev
    ```

2.  **Access the application:**

    Open your web browser and navigate to `http://localhost:3000` (or the address shown in your terminal).

## Technologies Used

Here's a visual overview of the key technologies used in DevLens:

*   **Frontend:**

    *   ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
    *   ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
    *   ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
    *   ![Radix UI](https://img.shields.io/badge/Radix_UI-161E23?style=for-the-badge&logo=radix-ui&logoColor=%2380FFDB)
    *   ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

*   **AI & Backend:**
    *   ![Google Generative AI](https://img.shields.io/badge/Google_Generative_AI-4285F4?style=for-the-badge&logo=google-ai&logoColor=white)

*   **Other:**

    *   ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
    *   ![Yarn](https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
    *   ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
    *   ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjIxIiBoZWlnaHQ9IjIxIj48cGF0aCBkPSJNMTAuNDk1LDMuMTE5bDEwLjQ2Miw5Ljg4MWMuMzE3LjMwMSwuMzE2Ljc4OS0uMDAyLDEuMDlMMTAuNDk1LDIwLjg4MWMtLjMxOC4zMDEtLjc4Ni4zLjkzLTEuMDkwVjMuMTE5QzExLjI4MSwzLjQxOSwxMC44MTQsMy4wMjEsMTAuNDk1LDMuMTE5ek0zLDQuMjNIMzljLjU1MiwwLDEsLjQ0OCwxLDFWMjAuNzZjMCwuNTUyLS40NDgsMS0xLDFIMzFjLS41NTIsMC0xLS40NDgtMS0xVjUuMjNDMyw0LjY3OCwzLjQ0OCw0LjIzLDMsNC4yM3oiIGZpbGw9IiNmZmYiPjwvcGF0aD48L3N2Zz4=)
    *   ![Zod](https://img.shields.io/badge/Zod-007ACC?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjIxIiBoZWlnaHQ9IjIxIj48cGF0aCBkPSJNMTEuOTk4LDIuOTU5Yy00LjkzNCwwLTguOTYzLDMuOTU3LTguOTYzLDguODQ1czMuOTI5LDguODQ0LDguOTYzLDguODQ0czguOTYzLTMuOTU2LDguOTYzLTguODQ0UzE2LjkzMiwuOTU5LDExLjk5OCwuOTU5em0wLDEuNDY5YzQuMDMxLDAsNy4zMzMsMy4yOTgsNy4zMzMsNy4zNzZsMCwwYy0uMDIxLDQuMDc3LTMuMzA1LDcuMzcyLTcuMzMzLDcuMzcyYzQuMDMyLDAsNy4zMzQtMy4yOTUsNy4zMzQtNy4zNzJsMCwwQzE5LjMzMiA3LjcxNywxNi4wMjkuNDIsMTEuOTk4LDQuNDI1em0wLDUuMDczYy0xLjE4MiwwLTIuMTMxLjk0OS0yLjEzMSwyLjEzMXMuOTQ5LDIuMTMxLDIuMTMxLDIuMTMxczIuMTMxLS45NDksMi4xMzEtMi4xMzFTMTMuMTgsOS40OTgsMTEuOTk4LDkuNDk4em0wLDEuNDY5YzAuMzY1LDAsLjY2Mi4yOTcuNjYyLjY2MnMtLjI5Ny42NjItLjY2Mi42NjJzLS42NjItLjI5Ny0uNjYyLS42NjJTExLjYzMywxMS40MzYsMTEuOTk4LDExLjQzNnoiIGZpbGw9IiMyMTM1NDciPjwvcGF0aD48L3N2Zz4=)

## Contributing

We welcome contributions to DevLens! Please see the `CONTRIBUTING.md` file for guidelines on how to contribute.  *(Create th
