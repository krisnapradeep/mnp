require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user.model');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin@123456',
        role: 'admin',
        position: 'System Administrator',
        department: 'IT'
    },
    {
        name: 'Regular User',
        email: 'user@example.com',
        password: 'User@123456',
        role: 'user',
        position: 'Staff Member',
        department: 'Operations'
    }
];

async function seedUsers() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clear existing users
        await User.deleteMany({});
        console.log('Cleared existing users');

        // Create new users
        const createdUsers = await User.create(users);
        console.log('Created users:', createdUsers.map(user => ({
            name: user.name,
            email: user.email,
            role: user.role
        })));

        console.log('\nYou can now login with these credentials:');
        console.log('Admin User:');
        console.log('Email: admin@example.com');
        console.log('Password: Admin@123456');
        console.log('\nRegular User:');
        console.log('Email: user@example.com');
        console.log('Password: User@123456');

    } catch (error) {
        console.error('Error seeding users:', error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run the seed function
seedUsers();
