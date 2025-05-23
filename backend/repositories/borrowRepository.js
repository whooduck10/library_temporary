const db = require('../models/db');

exports.checkConflict = async (bookId, start, end) => {
    const q = `
    SELECT 1 FROM borrows
    WHERE book_id = $1
    AND (
      ($2 BETWEEN start_time AND end_time)
      OR ($3 BETWEEN start_time AND end_time)
      OR (start_time BETWEEN $2 AND $3)
      OR (end_time BETWEEN $2 AND $3)
    )
    LIMIT 1;
  `;
    const result = await db.query(q, [bookId, start, end]);
    return result.rows.length > 0;
};

exports.createBorrow = async (userId, bookId, start, end) => {
    const q = `INSERT INTO borrows (user_id, book_id, start_time, end_time)
             VALUES ($1, $2, $3, $4)`;
    await db.query(q, [userId, bookId, start, end]);
    return { userId, bookId, start, end };
};
