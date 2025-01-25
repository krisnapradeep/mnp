// seeds/index.js
const mongoose = require('mongoose');
const UserType = require('../models/userType.model');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    // Clear existing data
    await UserType.deleteMany({});
    await User.deleteMany({});

    // Create user types
    const userTypes = await UserType.create([
      { userType: 'admin', isActive: true },
      { userType: 'user', isActive: true }
    ]);

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      userTypeId: userTypes[0]._id,
      username: 'admin',
      name: 'System Admin',
      email: 'admin@example.com',
      password: adminPassword,
      isActive: true
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

module.exports = seedDatabase;