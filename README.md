# 📝 TaskFlow

![TaskFlow](https://img.shields.io/badge/Task%20Management-React-blue?style=flat-square)  
A modern, real-time task management application with drag-and-drop functionality, built using **React, Firebase, Express.js, and MongoDB**.

🔗 **Live Demo:** [TaskFlow](https://taskflow-5ede4.web.app/)

---

## 📌 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [📦 Dependencies](#-dependencies)
- [💻 Installation & Setup](#-installation--setup)
- [📂 Project Structure](#-project-structure)
- [⚙️ API Endpoints](#️-api-endpoints)
- [🎨 UI & Design](#-ui--design)
- [🐛 Troubleshooting](#-troubleshooting)
- [📜 License](#-license)

---

## 🚀 Features

✅ **User Authentication** – Secure login via Google (Firebase Auth).  
✅ **Task Management** – Add, edit, delete, and reorder tasks.  
✅ **Drag & Drop Interface** – Move tasks between sections: _To-Do, In Progress, Done_.  
✅ **Real-time Sync** – Instant updates with MongoDB Change Streams & WebSockets.  
✅ **Persistent Data** – Tasks are saved and synced across devices.  
✅ **Responsive UI** – Fully optimized for desktop & mobile.  
✅ **Dark Mode** – Toggle between light and dark themes.  
✅ **Due Dates & Indicators** – Highlight overdue tasks in red.  
✅ **Activity Log** – Track task movements & changes.

---

## 🛠️ Technologies Used

### **Frontend (React)**

- **Vite.js** – Fast development & optimized builds.
- **React.js** – Component-based UI.
- **Tailwind CSS** – Modern styling.
- **React Router** – Seamless navigation.
- **react-beautiful-dnd** – Drag-and-drop interactions.
- **TanStack React Query** – Data fetching & caching.
- **Firebase Auth** – Google sign-in integration.

### **Backend (Node.js + Express)**

- **Express.js** – REST API handling.
- **MongoDB + Mongoose** – Database storage.
- **WebSockets (socket.io-client, ws)** – Real-time updates.
- **Axios** – API requests.
- **LocalForage** – Local storage for offline support.

---

## 📦 Dependencies

### **Frontend**

```json
"dependencies": {
  "@tanstack/react-query": "^5.66.9",
  "axios": "^1.7.9",
  "firebase": "^11.3.1",
  "localforage": "^1.10.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.2.0",
  "socket.io-client": "^4.8.1",
  "tailwindcss": "^4.0.7",
  "ws": "^8.18.1"
}
```

### **Backend**

```json
"dependencies": {
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "socket.io": "^4.8.1"
}
```

---

## 💻 Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/saleh-siam/taskflow.git
cd taskflow
```

### **2️⃣ Setup Frontend**

```sh
cd frontend
npm install
npm run dev
```

### **3️⃣ Setup Backend**

```sh
cd backend
npm install
npm start
```

### **4️⃣ Configure Environment Variables**

Create a `.env` file inside `backend/` and add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
FIREBASE_API_KEY=your_firebase_api_key
```

---

## 📂 Project Structure

```
taskflow/
│── frontend/          # React frontend (Vite.js)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # App screens
│   │   ├── hooks/        # Custom hooks
│   │   ├── context/      # Context API for state management
│   │   ├── assets/       # Static images/icons
│   │   ├── styles/       # Global styles
│   │   ├── App.js        # Main App component
│   │   └── main.js       # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
│── backend/           # Node.js backend (Express.js)
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API endpoints
│   ├── controllers/   # Business logic
│   ├── config/        # Database & server configs
│   ├── server.js      # Main server file
│   ├── package.json
│   └── .env
│
└── README.md          # Documentation
```

---

## ⚙️ API Endpoints

| Method   | Endpoint     | Description                           |
| -------- | ------------ | ------------------------------------- |
| `POST`   | `/tasks`     | Create a new task                     |
| `GET`    | `/tasks`     | Retrieve all tasks                    |
| `PUT`    | `/tasks/:id` | Update a task (title, desc, category) |
| `DELETE` | `/tasks/:id` | Delete a task                         |

---

## 🎨 UI & Design

- **Color Palette**: Maximum of **4 colors** for a minimal look.
- **Typography**: Clean and modern fonts.
- **Animations**: Smooth drag-and-drop experience.

---

## 🐛 Troubleshooting

**1️⃣ Firebase Authentication Not Working?**

- Ensure your Firebase API key is correctly set up in the `.env` file.
- Verify that Firebase authentication is enabled for Google Sign-In.

**2️⃣ MongoDB Connection Issues?**

- Check if MongoDB is running:
  ```sh
  mongod
  ```
- Ensure your `MONGO_URI` is correctly set in `.env`.

**3️⃣ WebSocket Issues?**

- Make sure the backend is running and WebSockets are correctly integrated.

---

## 📜 License

This project is licensed under the **MIT License**. Feel free to modify and distribute! 🚀

---
