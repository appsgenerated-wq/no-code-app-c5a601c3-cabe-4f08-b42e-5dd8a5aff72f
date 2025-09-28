# MarsRecruit - Mission Application Portal

This is a full-stack React application built with Manifest that serves as a recruitment portal for a fictional Mars mission. Potential recruits can create an account, log in, and submit an application to join the mission.

## Features

- **User Authentication**: Secure signup and login for recruits, powered by Manifest's `authenticable` feature.
- **Application Submission**: Recruits can submit a detailed application, including a rich-text essay.
- **Dashboard**: After logging in, users can view the status of their submitted application (Pending, Under Review, Approved, Rejected).
- **Admin Interface**: A built-in admin panel (accessible at `/admin`) allows mission control to review applications and update their status.
- **Health Check**: A visual indicator shows the connection status to the Manifest backend.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Manifest (YAML-based schema)
- **API Communication**: Manifest SDK

## Getting Started

### Prerequisites

- Node.js (v18+)
- A running Manifest backend instance.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**

    Create a `.env` file in the root of the project and add your Manifest backend URL and App ID:

    ```
    VITE_BACKEND_URL=https://your-manifest-backend-url.com
    VITE_APP_ID=your-app-id
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## Admin Access

- **URL**: `https://your-manifest-backend-url.com/admin`
- **Default Credentials**: `admin@manifest.build` / `admin`
