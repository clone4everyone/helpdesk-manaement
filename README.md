# Helpdesk Management System

This is a web-based Helpdesk Management System designed to streamline ticket management for both administrators and regular users. It provides functionalities for users to create and track support tickets, and for administrators to manage users, view logs, and oversee all tickets.

## Features

### User Features:
*   **User Authentication**: Sign up, sign in, and password recovery (simulated).
*   **Dashboard**: View a summary of personal ticket statistics (total, solved, awaiting approval, in progress).
*   **New Ticket Creation**: Submit new support tickets with details like subject, category, type, priority, and description.
*   **My Tickets**: View a list of all submitted tickets, their status, and support information.
*   **Ticket Details View**: Click on a ticket number to see full details in a modal, including the ability to rate the ticket.
*   **Profile Settings**: Update personal information like username and password.

### Admin Features:
*   **Admin Authentication**: Dedicated admin login for system management.
*   **Dashboard**: Overview of all tickets in the system (total, solved, awaiting approval, in progress) and team statistics.
*   **Database Management**: View and manage user accounts, including deletion.
*   **User Log History**: Dynamic display of user sign-in and sign-out activities.
*   **Settings**: General application settings (simulated).
*   **Profile Settings**: Update admin profile information.

## Technologies Used

*   **React**: A JavaScript library for building user interfaces.
*   **Vite**: A fast build tool that provides a quick development experience.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **Lucide React**: A collection of open-source icons for React applications.
*   **Local Storage**: Used for client-side data persistence (user accounts, tickets, logs).

## Setup Instructions

To get this project up and running on your local machine, follow these steps:

1.  **Prerequisites**:
    *   Ensure you have Node.js (version 18 or higher recommended) and npm (Node Package Manager) installed.

2.  **Install Dependencies**:
    Navigate to the project directory in your terminal and install the required packages:
    <br>
    <bolt-quick-action type="message" message="Run npm install">npm install</bolt-quick-action>

3.  **Run the Development Server**:
    Once the dependencies are installed, you can start the development server:
    <br>
    <bolt-quick-action type="message" message="Run npm run dev">npm run dev</bolt-quick-action>
    The application will typically open in your browser at `http://localhost:5173`.

4.  **Build for Production**:
    To create a production-ready build of the application:
    <br>
    <bolt-quick-action type="message" message="Run npm run build">npm run build</bolt-quick-action>
    This will generate optimized static assets in the `dist` directory.

## Usage

### Logging In:
*   **Admin Login**: Use `username: admin` and `password: admin` to log in as an administrator.
*   **User Login**: You can create a new user account via the "Sign Up" link on the login page, or use any existing user credentials if you have previously signed up.

### Data Persistence:
All user accounts, tickets, and activity logs are stored in your browser's Local Storage. This means data will persist even if you close and reopen the browser tab, but it is not shared across different browsers or devices.

## Project Structure

The project follows a standard React application structure:

