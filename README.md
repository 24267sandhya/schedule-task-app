# 📋 Schedule Task App

> **Author:** Sandhya Yadav  
> **Platform:** React Native (Expo)  
> **Repository:** [GitHub Link](https://github.com/24267sandhya/schedule-task-app)  
> **Installation Link on your Android Device:** [App Link](https://expo.dev/accounts/sandhya_yadav/projects/schedule/builds/71b01c8f-f73e-4398-8eb7-88908367649a)
>
![Your paragraph text](https://github.com/user-attachments/assets/772c8aae-9d5e-4c90-87ee-90e764704321)



## 🧠 Overview

Schedule Task App is a simple and intuitive mobile application that allows users to create, manage, and track their daily tasks. Built using React Native with Expo, it provides a lightweight yet effective solution for personal productivity.



## 🚀 Getting Started

### 📦 Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go App](https://expo.dev/client) (on your phone)

### 🔧 Installation


# Clone the repository
git clone https://github.com/24267sandhya/schedule-task-app.git  
cd schedule-task-app

# Install dependencies
npm install


### 📱 Run on Device


# Start Expo development server
npx expo start


* Open the **Expo Go** app on your mobile device.
* Scan the QR code displayed in your terminal/browser.
* The app will load on your phone.



## ⚙️ Features

* ✅ Add new tasks
* ✅ Mark tasks as completed
* ✅ View scheduled tasks
* ✅ Lightweight and responsive UI
* ✅ Priority-based local notifications:  

  🔴 High priority: notified 30 minutes before

  🟡 Medium priority: notified 2 hours before

  🟢 Low priority: notified 5 hours before

  ✅ Notifications stop when a task is marked as completed



## 🤔 Challenges Faced

* 🔄 Faced version mismatch issues with `expo` and `react-native-gesture-handler`, resolved using `npx expo install`.
* 🧪 Testing real-time updates on mobile devices with different screen sizes was tricky.
* 🧩 Adjusting image dimensions for Expo’s asset validation during build.



## 🧠 Design Decisions

* Opted for **Expo** to simplify cross-platform development and QR-based testing.
* Minimal UI with focus on **usability** and **task visibility**.
* Used local state for task tracking to keep the app fast and dependency-free.



## 📂 Folder Structure

my-tasks/  
├── assets/             # App icons and images  
├── components/         # Reusable components (if any)  
├── App.js              # Main app entry point  
├── app.json            # Expo config  
├── package.json        # Dependencies and scripts  
└── README.md
