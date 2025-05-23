// 📁 controllers/borrowController.js
const service = require('../services/borrowService');

exports.borrowBook = async (req, res) => {
    try {
        const { userId, bookId, startTime, endTime } = req.body;
        const result = await service.borrowBook(userId, bookId, startTime, endTime);
        res.status(200).json({ message: 'Book borrowed successfully', data: result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
