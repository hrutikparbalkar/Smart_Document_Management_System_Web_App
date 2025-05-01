# Document Management System

This is a **Document Management System** that allows users and admins to manage and view documents efficiently. It provides a user-friendly interface for both users and administrators to interact with the system, upload files, view documents, and communicate via real-time chat. The system also sends real-time email notifications to users.

---

## Table of Contents

- [Features](#features)
  - [Admin Features](#admin-features)
  - [User Features](#user-features)
- [Installation](#installation)
- [Usage](#usage)
  - [Admin Panel](#admin-panel)
  - [User Panel](#user-panel)
- [Technologies](#technologies)
- [Screenshots](#screenshots)

---

## Features

### Admin Features

- **Add Documents**: Admin can upload and manage documents in the system.
- **Add Users**: Admin can create and manage users, including editing and deleting user details.
- **Manage Users**: Admin can delete, edit, or view user profiles.
- **Chat with Users**: Admin can communicate with users in real-time via the chat feature.
- **Add Notices**: Admin can post notices that all users can view.
- **Real-Time Email Notifications**: Admin can send instant email notifications to users for any updates or changes in the system.
- **Document Display Page**: Admin has access to a page to view and manage all documents uploaded by users.

### User Features

- **View Documents**: Users can only view documents uploaded by the admin.
- **Chat with Admin**: Users can chat with the admin in real-time for queries or support.
- **View Notices**: Users can view notices posted by the admin.
- **Real-Time Email Notifications**: Users will receive email notifications about document updates, new notices, etc.

---

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (Recommended version: 14 or above)
- **npm** (Node package manager)

---

### Steps to Install

1. **Clone this repository to your local machine:**
git clone https://github.com/hrutikparbalkar/Smart_Document_Management_System_Web_App.git

2. **Navigate to the project folder:**
cd Smart-Document-Management-System

3. **Install the dependencies:**
npm install
4. **Set up environment variables:**
Create a .env file at the root of the project.
Add your Firebase credentials (API key, project ID, etc.) into the .env file.
Ex:
REACT_APP_FIREBASE_API_KEY="your_firebase_api_key"
REACT_APP_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
REACT_APP_FIREBASE_PROJECT_ID="your_firebase_project_id"
REACT_APP_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
REACT_APP_FIREBASE_APP_ID="your_firebase_app_id"
REACT_APP_FIREBASE_MEASUREMENT_ID="your_firebase_measurement_id"

5. **Run the development server:**
npm start


### Technologies
Frontend: React.js, Tailwind CSS

Backend: Firebase Authentication, Firebase Firestore, Firebase Storage

### ScreenShots
### Screenshot 1: Admin Panel

![Admin Panel](public/images/Home.png)

This is the admin panel where the admin can manage documents and users.


