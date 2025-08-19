// Mengimpor framework Express
const express = require('express');

// Mengimpor controller yang akan menangani logika
const { handleContactSubmission } = require('../controllers/contactController');

// Membuat instance baru dari Express Router
const router = express.Router();

/*
 * ==========================================================================
 *  API Endpoint untuk Formulir Kontak
 * ==========================================================================
 *
 * @route   POST /api/contact
 * @desc    Menerima dan menyimpan data dari formulir kontak
 * @access  Public
 *
 */
router.post('/', handleContactSubmission);


// Mengekspor router agar bisa digunakan di file server.js utama
module.exports = router;