# 🚀 API Anti Mangkrak (Project Management Backend)

Sistem Backend API profesional berbasis **Node.js** dan **Express.js** yang dirancang khusus untuk memantau, mencatat, dan mengelola daftar proyek kodingan agar tidak mangkrak di tengah jalan. Proyek ini dibangun dengan standar industri, menerapkan pola arsitektur **MVC**, terintegrasi dengan **MongoDB Cloud Atlas**, serta dilengkapi sistem validasi, penanganan error global, agregasi statistik, dan pengamanan berlapis menggunakan **JWT (JSON Web Token)**.

---

## 🗺️ Peta Jalan & Progress Pengembangan (Checklist)

- [x] **Tahap 1:** Inisialisasi Proyek & Git Lokal
- [x] **Tahap 2:** Setup Remote Repository & Sambung ke GitHub
- [x] **Tahap 3:** Instalasi Express.js & Nodemon
- [x] **Tahap 4:** Konfigurasi `package.json` & File `.gitignore`
- [x] **Tahap 5:** Pembuatan Server Utama Dasar (`index.js`)
- [x] **Tahap 6:** Integrasi Database MongoDB Atlas via Mongoose
- [x] **Tahap 7:** Implementasi Pola Arsitektur MVC (Model-View-Controller)
- [x] **Tahap 8:** Implementasi Fitur Search, Filter, & Pagination pada `GET /api/projects`
- [x] **Tahap 9:** Pembuatan Centralized Error Handler Middleware (Anti-Crash)
- [x] **Tahap 10:** Implementasi Input Validation Ketat menggunakan **Joi**
- [x] **Tahap 11:** Pembuatan Endpoint Statistik Proyek via MongoDB Aggregation Pipeline (`GET /api/projects/stats`)
- [x] **Tahap 12:** Implementasi Sistem Autentikasi **JWT (JSON Web Token)** untuk Proteksi Endpoint Sensitif

---

## 🏗️ Struktur Arsitektur Folder (MVC Pattern)

```text
api-anti-mangkrak/
├── assets/
│   └── flowchart-backend-api.png
├── src/
│   ├── config/
│   │   └── db.js               # Konfigurasi koneksi MongoDB Atlas
│   ├── controllers/
│   │   ├── authController.js   # Logika bisnis autentikasi login (JWT)
│   │   └── projectController.js# Logika bisnis CRUD, Search, Filter, Pagination, & Statistik
│   ├── middleware/
│   │   ├── auth.js             # Satpam verifikasi JWT Token
│   │   ├── errorHandler.js     # Global Error Handler (Mongoose CastError & Validation)
│   │   └── validator.js        # Satpam validasi input data via Joi
│   ├── models/
│   │   └── projectModel.js     # Skema data Mongoose untuk MongoDB
│   └── routes/
│       └── projectRoutes.js    # Pemetaan jalur endpoint URL proyek
├── .env                        # Variabel lingkungan (Environment Variables)
├── .gitignore
├── index.js                    # Entry point server utama Express
├── package.json
└── README.md
```

---

## 🛠️ Stack Teknologi yang Digunakan

- **Runtime Environment:** Node.js
- **Framework Backend:** Express.js
- **Database:** MongoDB Atlas (Cloud) & Mongoose ODM
- **Validation:** Joi
- **Security & Auth:** JSON Web Token (JWT)
- **Development Tool:** Nodemon (Auto-reload Server)
- **Version Control:** Git & GitHub

---

## 📡 Dokumentasi Endpoint API

| Method HTTP | URL Endpoint          | Deskripsi & Fungsi Utama               | Status Keamanan |
| :---------- | :-------------------- | :------------------------------------- | :-------------- |
| **GET**     | `/`                   | Cek Status Server Utama                | Publik          |
| **POST**    | `/api/auth/login`     | Login Admin untuk Mendapatkan JWT      | Publik          |
| **GET**     | `/api/projects/stats` | Rekapitulasi Statistik Status Proyek   | Publik          |
| **GET**     | `/api/projects`       | Mengambil Data (Search, Filter, Page)  | Publik          |
| **GET**     | `/api/projects/:id`   | Mengambil Detail 1 Proyek berdasarkan ID| Publik         |
| **POST**    | `/api/projects`       | Menambah Proyek Baru (Validasi Joi)    | 🔒 Protected (JWT) |
| **PUT**     | `/api/projects/:id`   | Mengubah Data Proyek (Validasi Joi)    | 🔒 Protected (JWT) |
| **DELETE**  | `/api/projects/:id`   | Menghapus Proyek dari Database         | 🔒 Protected (JWT) |

---

## 📐 Arsitektur Alur Kerja Server (Flowchart)

![Flowchart Backend API](assets/flowchart-backend-api.png)

---
> *Dokumentasi resmi dikelola langsung oleh AI Collaborator (Karen) bersama Lead Developer: Bos Plankton.* 🚀
