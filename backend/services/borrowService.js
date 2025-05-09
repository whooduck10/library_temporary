const { Mutex } = require('async-mutex');
const repo = require('../repositories/borrowRepository');

const bookLocks = new Map();

function getMutex(bookId) {
    if (!bookLocks.has(bookId)) {
        bookLocks.set(bookId, new Mutex());
    }
    return bookLocks.get(bookId);
}

exports.borrowBook = async (userId, bookId, start, end) => {
    const mutex = getMutex(bookId);
    return await mutex.runExclusive(async () => {
        const conflict = await repo.checkConflict(bookId, start, end);
        if (conflict) throw new Error('Book already borrowed in this period.');
        return await repo.createBorrow(userId, bookId, start, end);
    });
};
