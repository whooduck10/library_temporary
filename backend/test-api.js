const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

async function testAPI() {
    try {
        // Test Books API
        console.log('\n=== Testing Books API ===');
        
        // Get all books
        const books = await axios.get(`${API_URL}/books`);
        console.log('\nAll Books:', books.data);

        // Create a new book
        const newBook = await axios.post(`${API_URL}/books`, {
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            isbn: "9780547928227",
            category: "Fantasy",
            description: "A fantasy novel about the adventures of Bilbo Baggins",
            quantity: 3,
            available: 3,
            publishedYear: 1937,
            publisher: "Mariner Books"
        });
        console.log('\nCreated Book:', newBook.data);

        // Test Users API
        console.log('\n=== Testing Users API ===');
        
        // Get all users
        const users = await axios.get(`${API_URL}/users`);
        console.log('\nAll Users:', users.data);

        // Create a new user
        const newUser = await axios.post(`${API_URL}/users`, {
            name: "Alice Johnson",
            email: "alice@example.com",
            password: "password789",
            role: "user",
            phone: "555-0123",
            address: "789 Pine St",
            membershipNumber: "MEM003",
            isActive: true
        });
        console.log('\nCreated User:', newUser.data);

        // Test Borrows API
        console.log('\n=== Testing Borrows API ===');
        
        // Get all borrows
        const borrows = await axios.get(`${API_URL}/borrows`);
        console.log('\nAll Borrows:', borrows.data);

        // Create a new borrow
        const newBorrow = await axios.post(`${API_URL}/borrows`, {
            book: books.data[0]._id,
            user: users.data[0]._id,
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        });
        console.log('\nCreated Borrow:', newBorrow.data);

    } catch (error) {
        console.error('Error testing API:', error.response ? error.response.data : error.message);
    }
}

// Run the tests
testAPI(); 