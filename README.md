# ExpenseTracker

A full-stack **Expense Tracker** app that allows authenticated users to **add, edit, delete, and view** their daily expenses. It includes **category-wise summaries**, **charts**, and **password reset functionality** via **Nodemailer**.

##  Features

-  **User Authentication** (Register, Login, Logout)
-  **Forgot / Reset Password** using **Nodemailer**
-  **Add/ Edit/ Delete/ View Expenses**
-  **Category-wise Summary with Doughnut Chart**
-  **Valid user-based expense tracking**
-  **Protected Routes**
-  **Responsive UI with Tailwind CSS**

---

## Tech Stack

**Frontend**
- React (Vitee)
- Tailwind CSS
- Chart.js (via `react-chartjs-2`)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- Nodemailer (for password reset)
- JWT Authentication
- Cookie-based session

**Deployment**
- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas  

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Tanmay7575/ExpenseTracker.git
cd ExpenseTracker

##  Run Locally
1. Backend:
   cd backend
   cp  .env
   npm install
   npm run dev
2. Frontend:
   cd frontend
   cp .env
   npm install
   npm run dev
