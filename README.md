# 🏫 School Management System API

A modular, scalable **Node.js + Express** backend for a School Management System built with **MongoDB**, **Mongoose**, and clean service/controller structure. Built for practice and ready for production-grade features like error handling, logging, validation, and student registration.

---

## 🚀 Features

- ✅ Modular MVC structure with service abstraction
- ✅ User & Student registration with linked profile
- ✅ Joi-based validation
- ✅ Centralized error handling with `ApiError` and `catchAsync`
- ✅ Role-based user model (Admin, Student, Teacher, etc.)
- ✅ Winston logging with daily rotation
- ✅ MongoDB via Mongoose
- ✅ Secure password hashing with bcrypt
- ✅ Ready-to-extend for auth, teachers, parents, etc.

---

## 📁 Project Structure

```
├── config/
│   └── logger.js             # Winston logger with daily rotate
├── controllers/
│   └── student.controller.js
├── models/
│   ├── User.js
│   └── StudentProfile.js
├── routes/
│   └── student.route.js
├── services/
│   └── user.service.js
├── utils/
│   ├── ApiError.js
│   └── catchAsync.js
├── validations/
│   ├── user.validation.js
│   ├── studentProfile.validation.js
│   └── studentRegister.validation.js
├── middlewares/
│   ├── error.js              # errorConverter + errorHandler
│   └── validate.js
├── .env
├── app.js / index.js
└── README.md
```

---

## 📦 Installation

```bash
git clone <your-repo-url>
cd sms
npm install
cp .env.example .env
```

---

## 🧪 Run the App

```bash
# For dev
npm run dev

# For prod
npm start
```

---

### GET `/api/students/profile/:userId`

Returns student's profile by their user ID.

---

## ✅ Technologies

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Joi** for validation
- **Winston** + `winston-daily-rotate-file` for logging
- **bcryptjs** for password hashing

---

## 🧹 Linting

```bash
npm run lint
npm run lint:fix
```

---

## 📌 To-Do / Suggestions

- [ ] Add JWT authentication
- [ ] Add Teacher, Guardian, Class management
- [ ] Add Swagger/OpenAPI docs
- [ ] Unit & Integration tests using Jest

---

## 💡 Author

Built with ❤️ by **Shakeel Ahamed**  
Located in New Delhi, India 🇮🇳

---

## 📄 License

This project is for educational purposes and may be extended for production with security and testing enhancements.
