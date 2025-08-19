// Mengimpor koneksi database dari file config
const db = require('../config/database');

/**
 * Fungsi untuk membersihkan input string sederhana.
 * Menghapus tag HTML untuk mencegah Cross-Site Scripting (XSS) dasar.
 * @param {string} str - Input string dari pengguna.
 * @returns {string} - String yang telah dibersihkan.
 */
const sanitizeInput = (str) => {
    if (typeof str !== 'string') return str;
    // Mereplace tag HTML dengan string kosong
    return str.replace(/<\/?[^>]+(>|$)/g, "");
};


/**
 * Controller untuk menangani pengiriman formulir kontak.
 * Menggunakan async/await untuk menangani operasi database secara asynchronous.
 */
const handleContactSubmission = async (req, res) => {
    // Menggunakan blok try...catch untuk penanganan error yang rapi
    try {
        // 1. Validasi Data di Sisi Server
        const { fullName, email, subject, message } = req.body;

        if (!fullName || !email || !message || !subject) {
            // Jika ada field wajib yang kosong, kirim respons error
            return res.status(400).json({ 
                success: false, 
                message: 'Semua field yang ditandai wajib diisi.' 
            });
        }
        
        // Validasi format email sederhana
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Format email tidak valid.'
            });
        }


        // 2. Sanitasi Input
        const sanitizedName = sanitizeInput(fullName);
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedSubject = sanitizeInput(subject);
        const sanitizedMessage = sanitizeInput(message);


        // 3. Menyimpan Data ke Database
        // SQL query menggunakan placeholder (?) untuk mencegah SQL Injection
        const sql = 'INSERT INTO inquiries (name, email, subject, message) VALUES (?, ?, ?, ?)';
        const values = [sanitizedName, sanitizedEmail, sanitizedSubject, sanitizedMessage];

        // Menjalankan query menggunakan koneksi dari pool
        const [result] = await db.execute(sql, values);

        // Cek apakah data berhasil dimasukkan
        if (result.affectedRows === 1) {
            // Jika berhasil, kirim respons sukses
            res.status(201).json({
                success: true,
                message: 'Pesan Anda telah berhasil terkirim. Terima kasih!'
            });
        } else {
            // Jika karena suatu alasan data gagal dimasukkan tanpa error
            throw new Error('Gagal menyimpan data ke database.');
        }

    } catch (error) {
        // Jika terjadi error (misal, koneksi database putus, dll.)
        console.error('Error di contactController:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'
        });
    }
};

// Mengekspor controller agar bisa digunakan di file routes
module.exports = {
    handleContactSubmission
};