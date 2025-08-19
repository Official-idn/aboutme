# Backend API untuk Website Biografi Danu Ferdianto

Ini adalah server backend yang dibangun menggunakan Node.js dan Express, dirancang khusus untuk menangani pengiriman data dari formulir kontak di website biografi Danu Ferdianto. Arsitektur yang digunakan adalah MVC (Model-View-Controller) untuk memastikan kode tetap terorganisir dan mudah dikelola.

---

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut di mesin Anda:
-   **Node.js**: Versi 14.x atau yang lebih baru.
-   **NPM**: Biasanya terinstal bersama Node.js.
-   **Database**: Server MySQL atau MariaDB yang sedang berjalan.
-   **Git**: (Opsional) Untuk manajemen versi.

---

## 🚀 Panduan Setup Lokal

Ikuti langkah-langkah berikut untuk menjalankan server ini di lingkungan lokal Anda.

### 1. Kloning & Instalasi

```bash
# Pindah ke direktori backend
cd backend

# Instal semua dependency yang dibutuhkan
npm install
```

### 2. Konfigurasi Variabel Lingkungan (.env)

Buat sebuah file baru bernama `.env` di dalam direktori `/backend`. Salin konten dari `.env.example` (jika ada) atau isi dengan format berikut, sesuaikan dengan konfigurasi database Anda:

```env
# Konfigurasi Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=masukkan_password_database_anda
DB_NAME=biografi_db

# Konfigurasi Server
PORT=3001
```

### 3. Setup Database

Pastikan server MySQL Anda berjalan. Buat sebuah database baru dengan nama yang sesuai dengan `DB_NAME` di file `.env` Anda (contoh: `biografi_db`).

Setelah itu, jalankan skrip SQL berikut di *client* database Anda untuk membuat tabel `inquiries`:

```sql
CREATE TABLE IF NOT EXISTS `inquiries` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('unread', 'read', 'archived') NOT NULL DEFAULT 'unread',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 🖥️ Cara Menjalankan Server

-   **Untuk Development (dengan auto-reload menggunakan `nodemon`):**
    ```bash
    npm run dev
    ```
-   **Untuk Produksi:**
    ```bash
    npm start
    ```

Setelah berhasil, Anda akan melihat pesan di terminal:
`🚀 Server backend berjalan di http://localhost:3001`

---

## 📖 Struktur API Endpoint

Berikut adalah dokumentasi untuk endpoint API yang tersedia.

### **Kirim Pesan Kontak**

-   **Metode:** `POST`
-   **URL:** `/api/contact`
-   **Deskripsi:** Menerima data dari formulir kontak, melakukan validasi, dan menyimpannya ke database.
-   **Body (raw, JSON):**
    ```json
    {
      "fullName": "Nama Pengirim",
      "email": "email@pengirim.com",
      "subject": "Peluang Kemitraan / Investasi",
      "message": "Isi pesan yang ingin disampaikan."
    }
    ```
-   **Respons Sukses (201):**
    ```json
    {
      "success": true,
      "message": "Pesan Anda telah berhasil terkirim. Terima kasih!"
    }
    ```
-   **Respons Gagal (400 - Bad Request):**
    ```json
    {
      "success": false,
      "message": "Semua field yang ditandai wajib diisi."
    }
    ```
-   **Respons Gagal (500 - Internal Server Error):**
    ```json
    {
      "success": false,
      "message": "Terjadi kesalahan pada server. Silakan coba lagi nanti."
    }
    ```

---

## ☁️ Petunjuk Singkat untuk Deployment

Saat akan men-deploy aplikasi ini ke server produksi (misalnya DigitalOcean, Heroku, Vultr, dll.), ikuti langkah-langkah umum berikut:

1.  **Konfigurasi Variabel Lingkungan:** Jangan pernah mengunggah file `.env` Anda ke repository Git. Di server hosting Anda, gunakan panel kontrol atau *command line* untuk mengatur variabel lingkungan yang sama (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`).

2.  **Instalasi di Server:** Unggah kode Anda ke server, lalu jalankan `npm install --production` untuk menginstal hanya *dependencies* yang dibutuhkan untuk produksi.

3.  **Gunakan Process Manager:** Jangan menjalankan aplikasi dengan `node server.js` secara langsung di produksi. Gunakan *process manager* seperti **PM2**. PM2 akan menjaga aplikasi Anda tetap berjalan, me-restart-nya jika terjadi *crash*, dan memungkinkan Anda menjalankan aplikasi dalam mode *cluster* untuk performa yang lebih baik.
    -   Instal PM2 secara global: `npm install pm2 -g`
    -   Mulai aplikasi: `pm2 start server.js --name "biografi-api"`
    -   Simpan konfigurasi: `pm2 save`

4.  **Konfigurasi CORS untuk Produksi:** Di file `server.js`, ubah `app.use(cors());` menjadi lebih spesifik untuk hanya mengizinkan permintaan dari domain front-end Anda guna meningkatkan keamanan.
    ```javascript
    // Contoh
    app.use(cors({ origin: 'https://www.danuferdianto-biografi.com' }));
    ```

5.  **Setup Reverse Proxy:** Gunakan web server seperti **Nginx** atau **Apache** sebagai *reverse proxy*. Ini akan menangani permintaan HTTP/HTTPS yang masuk dan meneruskannya ke aplikasi Node.js Anda yang berjalan di `localhost:PORT`. Ini adalah praktik standar untuk keamanan dan performa.