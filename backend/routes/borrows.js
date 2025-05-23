const express = require('express');
const router = express.Router();
const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

// Get all borrows
router.get('/', async (req, res) => {
    try {
        const borrows = await Borrow.find()
            .populate('book', 'title author isbn')
            .populate('user', 'name email membershipNumber');
        res.json(borrows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get one borrow
router.get('/:id', async (req, res) => {
    try {
        const borrow = await Borrow.findById(req.params.id)
            .populate('book', 'title author isbn')
            .populate('user', 'name email membershipNumber');
        if (!borrow) return res.status(404).json({ message: 'Borrow record not found' });
        res.json(borrow);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create borrow
router.post('/', async (req, res) => {
    try {
        // Check if book is available
        const book = await Book.findById(req.body.book);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        if (book.available <= 0) return res.status(400).json({ message: 'Book is not available' });

        // Create borrow record
        const borrow = new Borrow(req.body);
        const newBorrow = await borrow.save();

        // Update book availability
        book.available -= 1;
        await book.save();

        res.status(201).json(newBorrow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Return book
router.patch('/:id/return', async (req, res) => {
    try {
        const borrow = await Borrow.findById(req.params.id);
        if (!borrow) return res.status(404).json({ message: 'Borrow record not found' });
        if (borrow.status === 'returned') return res.status(400).json({ message: 'Book already returned' });

        // Update borrow record
        borrow.status = 'returned';
        borrow.returnDate = new Date();
        
        // Calculate fine if overdue
        const dueDate = new Date(borrow.dueDate);
        const returnDate = new Date();
        if (returnDate > dueDate) {
            const daysOverdue = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
            borrow.fine = daysOverdue * 1; // $1 per day fine
        }

        await borrow.save();

        // Update book availability
        const book = await Book.findById(borrow.book);
        book.available += 1;
        await book.save();

        res.json(borrow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get user's borrows
router.get('/user/:userId', async (req, res) => {
    try {
        const borrows = await Borrow.find({ user: req.params.userId })
            .populate('book', 'title author isbn')
            .populate('user', 'name email membershipNumber');
        res.json(borrows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 