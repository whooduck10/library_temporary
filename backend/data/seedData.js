const Book = require('../models/Book');
const User = require('../models/User');
const Borrow = require('../models/Borrow');

const sampleBooks = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        category: "Fiction",
        description: "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
        quantity: 5,
        available: 5,
        publishedYear: 1925,
        publisher: "Scribner"
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "9780446310789",
        category: "Fiction",
        description: "The story of racial injustice and the loss of innocence in the American South.",
        quantity: 3,
        available: 3,
        publishedYear: 1960,
        publisher: "Grand Central Publishing"
    },
    {
        title: "1984",
        author: "George Orwell",
        isbn: "9780451524935",
        category: "Science Fiction",
        description: "A dystopian social science fiction novel and cautionary tale.",
        quantity: 4,
        available: 4,
        publishedYear: 1949,
        publisher: "Signet Classic"
    }
];

const sampleUsers = [
    {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "user",
        phone: "123-456-7890",
        address: "123 Main St",
        membershipNumber: "MEM001",
        isActive: true
    },
    {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password456",
        role: "admin",
        phone: "098-765-4321",
        address: "456 Oak St",
        membershipNumber: "MEM002",
        isActive: true
    }
];

const seedDatabase = async () => {
    try {
        // Clear existing data
        await Book.deleteMany({});
        await User.deleteMany({});
        await Borrow.deleteMany({});

        // Insert sample books
        const books = await Book.insertMany(sampleBooks);
        console.log('Sample books added');

        // Insert sample users
        const users = await User.insertMany(sampleUsers);
        console.log('Sample users added');

        // Create some sample borrows
        const borrows = [
            {
                book: books[0]._id,
                user: users[0]._id,
                borrowDate: new Date(),
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
                status: 'borrowed'
            },
            {
                book: books[1]._id,
                user: users[1]._id,
                borrowDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
                dueDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
                status: 'overdue',
                fine: 6 // $6 fine for 6 days overdue
            }
        ];

        await Borrow.insertMany(borrows);
        console.log('Sample borrows added');

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

module.exports = seedDatabase; 