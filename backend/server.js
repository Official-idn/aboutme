// 1. Impor Modul-modul yang Dibutuhkan
require('dotenv').config(); // Memuat variabel dari file .env
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Mengimpor router kontak yang telah kita buat
const contactRoutes = require('./routes/contactRoutes');

// 2. Inisialisasi Aplikasi Express
const app = express();
const PORT = process.env.PORT || 3000; // Gunakan port dari .env, atau default ke 3000

// 3. Terapkan Middleware Keamanan & Fungsional
console.log('Menerapkan middleware...');

// Menggunakan Helmet untuk mengatur header keamanan HTTP
// Ini adalah langkah keamanan dasar yang sangat penting.
app.use(helmet());

// Menggunakan CORS untuk mengizinkan permintaan dari domain front-end
// Di produksi, Anda harus mengkonfigurasinya agar lebih spesifik
// Contoh: app.use(cors({ origin: 'https://www.danuferdianto.com' }));
app.use(cors());

// Middleware untuk mem-parsing body request sebagai JSON
// Ini memungkinkan kita membaca `req.body` di controller.
app.use(express.json());

// Middleware untuk mem-parsing body request dari form URL-encoded (opsional, tapi baik untuk dimiliki)
app.use(express.urlencoded({ extended: true }));

console.log('Middleware berhasil diterapkan.');


// 4. Hubungkan Routes (Rute) API
console.log('Menghubungkan rute API...');

// Semua rute yang didefinisikan di contactRoutes akan diawali dengan /api/contact
app.use('/api/contact', contactRoutes);

console.log('Rute API berhasil terhubung.');


// 5. Middleware Penanganan Error Sederhana (Catch-all)
// Ini akan menangani rute yang tidak ditemukan (404)
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' });
});

// Ini adalah error handler dasar.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan internal pada server.' });
});


// 6. Jalankan Server
app.listen(PORT, () => {
    console.log(`================================================`);
    console.log(`🚀 Server backend berjalan di http://localhost:${PORT}`);
    console.log(`================================================`);
});```

---

**Konfirmasi Sub-Modul 4.3 (Final):**

Dengan ini, seluruh logika untuk API formulir kontak telah selesai. `server.js` kini berfungsi sebagai pusat kendali yang mengikat *middleware* keamanan dan *router* kita menjadi satu aplikasi backend yang fungsional.

**Langkah Selanjutnya Setelah Ini:**
1.  Buka terminal di dalam folder `D:\DANUFERDIANTO\WEB BIOGRAFI DF\backend`.
2.  Jalankan perintah `npm install`.
3.  Pastikan file `.env` sudah diisi dengan benar.
4.  Jalankan perintah `npm run dev` untuk memulai server.

Apakah implementasi server utama ini sudah jelas dan sesuai dengan yang Anda harapkan?

Jika ya, mohon berikan konfirmasi **"Lanjutkan"** untuk kami memulai tugas terakhir, **Sub-Modul 4.4: Dokumentasi Developer & Petunjuk Deployment**.