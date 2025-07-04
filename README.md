# 🎓 Placement Portal – AI Powered Placement Cell Web Application

![Placement Portal Banner]![1](https://github.com/user-attachments/assets/eb39db7d-4669-4137-9230-22914054445e)


An all-in-one AI-powered web application that simplifies the placement process for **students**, **recruiters**, and **TPOs/Admins**. Streamline job applications, interview preparation, and recruitment activities on a single centralized platform.

---

## 📚 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [For Students](#-for-students)
  - [For Recruiters](#-for-recruiters)
  - [For TPOs/Admins](#-for-tposadmins)
- [Technical Stack](#-technical-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Screenshots](#-screenshots)


---

## 🚀 Overview

The **Placement Portal** is designed to assist students in preparing for and navigating the job placement process while helping recruiters and TPOs manage the end-to-end recruitment pipeline efficiently. Powered by AI, it offers resume analysis, interview question feedback, skill assessments, and more.

---

## ✨ Key Features

### 👩‍🎓 For Students

- 🔍 **Job Search**: Explore and apply for opportunities from top companies
- 🤖 **AI Career Chatbot**: Personalized guidance for careers and interviews
- 📄 **Resume Builder & Parser**: Upload, analyze, and enhance your resume
- 🎤 **Interview Preparation**: Get feedback on answers and interview tips
- 💬 **Messaging System**: Chat with recruiters and placement officers and other students

---

### 🏢 For Recruiters

- 📢 **Job Posting**: Post and manage job listings with custom filters
- 📂 **Applicant Tracking**: View and manage candidates efficiently
- 🔎 **Candidate Search**: Filter candidates by skills and experience
- 📊 **Company Dashboard**: Central hub to manage all recruitment activity

---

### 🎓 For TPOs/Admins

- 👥 **Student Management**: Monitor student profiles and placement status
- 🏢 **Recruiter Management**: Oversee recruiter activity and job postings
- 📌 **Job Management**: Supervise postings and application flow
- 📈 **Analytics**: View placement trends and reporting metrics

---

## 🛠️ Technical Stack

- **Frontend**: React  
- **Backend**: Node.js / Express.js  
- **Database**: MongoDB   
- **AI Components**:
  - Career Chatbot
  - Resume Parsing and Recommendations
  - Resume Builder
  - Mock Interview
  - Resume Sorting(for Recruiters)
- **Authentication**: JWT 

---

## 🧩 Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/yourusername/placement-portal.git
   als git clone the backend folder from the Ai-Powered-Placement-Cell-Backend repo
   cd placement-portal
   npm install
   use --legacy-peer-deps for some packages as some packages are of older version
   npm start for frontend
   npm run dev for backend
   ```

   🔧 Configuration
Create a .env file based on .env.example. Fill in the following:

DB_URI: MongoDB use your atlas cluster credential

JWT_SECRET: JWT signing secret

AI_API_KEY: API key for AI services ( Groq cloud Api) apikey is in the frontend folder apikey form but you can shift it to the backend for better security

▶️ Usage
Open the app at http://localhost:3000

Register as a Student, Recruiter,
And For admin directly add a credential in database

Explore dashboards, apply for jobs, or manage postings based on your role


 Screenshots
🎓 Student Dashboard
![5](https://github.com/user-attachments/assets/16563da9-8ecd-42bc-804f-bdfe93d7a5aa)

🏢 Recruiter View
![12](https://github.com/user-attachments/assets/c3b7ac7d-9c4b-4b81-bee3-b516c5d24831)


📄 Admin View
![15](https://github.com/user-attachments/assets/19be1371-9394-466a-a588-b3586180d617)


  
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
