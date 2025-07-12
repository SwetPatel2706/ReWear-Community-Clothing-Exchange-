# ReWear – Community Clothing Exchange 🧥♻️

ReWear is a full-stack web platform where users can exchange unused clothes within a community using a point-based system. It features authentication, item listing with images, swap requests, and an admin panel for moderation.

---

## 📦 Tech Stack

* Frontend: React.js (Bootstrap, React Router)
* Backend: Node.js, Express.js
* Database: PostgreSQL (with Sequelize ORM)
* Authentication: JWT
* Image Upload: Multer
* Dev Tools: Nodemon, Dotenv, VSCode

---

## 🏗️ Folder Structure

```
ReWear-Community-Clothing-Exchange/
│
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── Components/    # UI Pages (Login, Register, Profile, Admin etc.)
│   │   ├── services/      # Axios API instance
│   │   └── App.js etc.
│
├── server/                # Express backend
│   ├── controllers/       # Auth, Item, Swap Controllers
│   ├── middleware/        # Auth, Multer
│   ├── models/            # Sequelize Models (User, Item, Swap)
│   ├── routes/            # auth.routes.js, item.routes.js, swap.routes.js
│   ├── uploads/           # Uploaded images
│   ├── config/            # DB config
│   └── app.js             # Server entry point
```

---

## 🔐 Features

* ✅ User registration & login with JWT
* ✅ Admin login panel
* ✅ Upload items with image, description
* ✅ View all listed items with owner info
* ✅ Update & delete your own items
* ✅ Request a swap with another user
* ✅ Accept/decline swaps
* ✅ Secure access control via middleware
* ✅ Responsive UI with Bootstrap

---

## 🔧 Setup Instructions

1. Clone the repo:

```bash
git clone https://github.com/yourusername/ReWear-Community-Clothing-Exchange.git
cd ReWear-Community-Clothing-Exchange
```

2. Setup the backend:

```bash
cd server
npm install
cp .env.example .env        # Fill in DB and JWT_SECRET
npm run dev                 # Starts server with nodemon
```

.env file should contain:

```
PORT=5000
DB_NAME=rewear_db
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your_secret_key
```

3. Setup the frontend:

```bash
cd ../client
npm install
npm start
```

Also add the following to client/.env:

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 💡 API Endpoints

Base URL: /api

* POST /auth/register
* POST /auth/login
* GET /items/
* POST /items/ (with image)
* PUT /items/\:id
* DELETE /items/\:id
* POST /swaps/
* PUT /swaps/\:id
* GET /swaps/

All protected routes require Bearer token in headers.

---

## 📌 Future Plans

* ✅ Admin moderation of items
* 🔲 Chat between users
* 🔲 Sort/filter listings
* 🔲 Reward-based point system


