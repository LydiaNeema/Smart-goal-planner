# 🧠 Smart Goal Planner

> A React-based savings goal management dashboard that helps users set, track, and update their financial goals with ease.

![Smart Goal Planner Screenshot](https://raw.githubusercontent.com/LydiaNeema/Smart-goal-planner/main/smart-goal-planner/public/goal-dashboard.png)

---

## 🚀 Live Demo

🎯 [Click here to try it live!](https://smart-goal-planner-chi.vercel.app/)

---

## 📌 Features

- ✅ Create, edit, and delete **smart savings goals**
- 💰 Add and manage **deposits** toward each goal
- 📊 Track real-time progress with visual indicators
- ⏰ Get reminders for upcoming deadlines
- 📂 Organized views for goals and deposits
- 🧪 JSON Server backend simulating REST API

---

## 🛠️ Built With

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSON Server](https://github.com/typicode/json-server)
- [Vite](https://vitejs.dev/)

---

## 📁 Project Structure

smart-goal-planner/
│
├── public/ # Static assets
├── src/
│ ├── components/ # Navbar, Forms, Cards, Chart
│ ├── pages/ # Goals, Deposits, Dashboard
│ ├── routes/ # Routing logic
│ ├── App.jsx # Main app component
│ └── main.jsx # App entry point
│
├── db.json # JSON Server data file
├── server.js # Express + JSON Server backend
├── package.json
└── vite.config.js

yaml
Copy
Edit

---

## 🧪 Getting Started Locally

### Prerequisites

- Node.js v16 or later
- NPM

### Installation

```bash
git clone https://github.com/LydiaNeema/Smart-goal-planner.git
cd Smart-goal-planner/smart-goal-planner
npm install
Running Locally
Start both the frontend and backend:

bash
Copy
Edit
npm run dev
JSON Server will run at http://localhost:3000/api, Vite will serve the app on http://localhost:5173.

🔐 Sample Data (db.json)
json
Copy
Edit
{
  "goals": [
    {
      "id": 1,
      "title": "Emergency Fund",
      "description": "Save for unexpected expenses",
      "targetAmount": 100000,
      "savedAmount": 25000,
      "deadline": "2025-12-31"
    }
  ]
}
👩‍💻 Author
Lydia Neema
GitHub | LinkedIn

📃 License
This project is licensed under the MIT License.