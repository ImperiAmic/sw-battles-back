# 🌌 Star Wars Battles – Backend

This is the backend service for the Star Wars Battles application. Built using Express and MongoDB, this API REST enables management of Star Wars-themed battle data.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Core Stack](#️-core-stack)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [License](#-license)

---

## 📖 Overview

This project implements an API REST for managing a list of Star Wars battles. Each battle contains relevant data such as the conflict name, participating sides, result, year, and an image. This API supports all standard CRUD operations, pagination, and detail views.

---

## ⚙️ Core Stack

- TypeScript for development
- Node.js for JavaScript runtime
- Express.js as the server framework
- MongoDB as the database
- Mongoose as the MongoDB object modeling
- Render for deployment

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 14
- MongoDB
- npm

### Setup

```bash
git clone https://github.com/ImperiAmic/sw-battles-back.git
code sw-battles-back
# At this point, open a bash terminal in your code editor
npm install
cp .env.sample .env
# Configure your MongoDB connection string in the .env file
npm start
```

---

## 📜 Available Scripts

```bash
npm start              # Start production server
npm run start:dev      # Start production server on watch mode
npm run build          # Compiles .ts files in src folder
npm run build:dev      # Compiles .ts files in src folder on watch mode
npm test               # Run tests
npm run test:dev       # Run tests on watch mode
```

---

## 📡 API Endpoints

| Method | URL             | Description                             | Body (example) | Response (example)                           |
| ------ | --------------- | --------------------------------------- | -------------- | -------------------------------------------- |
| GET    | /battles        | Get paginated list of battles           | –              | `{ battles: Battle[], battlesTotal: number}` |
| GET    | /battles?page=1 | Get paginated list of battles on page 1 | –              | `{ battles: Battle[], battlesTotal: number}` |
| PATCH  | /battles/:id    | Update winner of the battle             | -              | `{ battle: { Battle } }`                     |

---

## 🧪 Testing

- Test coverage: 90%+
- No bugs, code duplications, or technical debt (validated by Sonar)
- Use `npm test` to run the test suite

---

## 🤓 Author

This project was made by [Imperi Amic](https://www.imperiamic.com/)

---

## 📄 License

This project is licensed under the [CC BY-NC-SA 4.0 License](./LICENSE)
