const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user.model');
const UserType = require('./models/userType.model');
const YearMaster = require('./models/yearMaster.model');
const BeneficiaryType = require('./models/beneficiaryType.model');
const Beneficiary = require('./models/beneficiary.model');
const District = require('./models/district.model');
const Category = require('./models/category.model');
const Article = require('./models/article.model');
const Supplier = require('./models/supplier.model');
const SupplierPayment = require('./models/supplierPayment.model');
const ArticleOrder = require('./models/articleOrder.model');
const BeneficiaryList = require('./models/beneficiaryList.model');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();
    await mongoose.connection.collection('usertypes').drop();
    await mongoose.connection.collection('yearmasters').drop();
    await mongoose.connection.collection('beneficiarytypes').drop();
    await mongoose.connection.collection('beneficiaries').drop();
    await mongoose.connection.collection('districts').drop();
    await mongoose.connection.collection('categories').drop();
    await mongoose.connection.collection('articles').drop();
    await mongoose.connection.collection('suppliers').drop();
    await mongoose.connection.collection('supplierpayments').drop();
    await mongoose.connection.collection('articleorders').drop();
    await mongoose.connection.collection('beneficiarylists').drop();

    // Sample data
    const userTypes = await UserType.insertMany([{ userType: 'admin', isActive: true }, { userType: 'user', isActive: true }]);
    const yearMasters = await YearMaster.insertMany([{ year: 2025, isCurrent: true, isActive: true }]);
    const beneficiaryTypes = await BeneficiaryType.insertMany([{ beneficiaryType: 'Type A', isActive: true }]);
    const beneficiaries = await Beneficiary.insertMany([{ name: 'John Doe', uniqueId: '12345', yearId: yearMasters[0]._id, benefiedItem: 'Item A', benefiedItemId: new mongoose.Types.ObjectId(), beneficiaryId: 1 }]);
    const districts = await District.insertMany([{ districtName: 'District 1', head: 'Head 1', contactNo: '1234567890', communicationAddress: '123 Main St', emailId: 'head1@example.com' }]);
    const categories = await Category.insertMany([{ categoryName: 'Category 1', isActive: true }]);
    const articles = await Article.insertMany([{ categoryId: categories[0]._id, articleName: 'Article 1' }]);
    const suppliers = await Supplier.insertMany([{ name: 'Supplier 1', contactNo: '0987654321', address: 'Address 1', bankAccountName: 'Bank Account 1', bankAccountNo: '1234567890', bankAccountIFSC: 'IFSC001' }]);
    const supplierPayments = await SupplierPayment.insertMany([{ supplierId: suppliers[0]._id, amount: 100, paymentMode: 'Cash' }]);
    const articleOrders = await ArticleOrder.insertMany([{ articleId: articles[0]._id, supplierId: suppliers[0]._id, quantity: 10, unitCost: 50, totalCost: 500 }]);
    const beneficiaryLists = await BeneficiaryList.insertMany([{ beneficiaryTypeId: beneficiaryTypes[0]._id, districtId: districts[0]._id, articleId: articles[0]._id, quantity: 5, unitCost: 100, totalCost: 500, yearId: yearMasters[0]._id }]);

    console.log('Data seeded successfully');
    mongoose.connection.close();
};

seedData();
