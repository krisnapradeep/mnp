const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user.model');
const UserType = require('./models/userType.model');
const Year = require('./models/year.model');
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
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();
    await mongoose.connection.collection('usertypes').drop();
    await mongoose.connection.collection('Years').drop();
    await mongoose.connection.collection('beneficiarytypes').drop();
    await mongoose.connection.collection('beneficiaries').drop();
    await mongoose.connection.collection('districts').drop();
    await mongoose.connection.collection('categories').drop();
    await mongoose.connection.collection('articles').drop();
    await mongoose.connection.collection('suppliers').drop();
    await mongoose.connection.collection('supplierpayments').drop();
    await mongoose.connection.collection('articleorders').drop();
    await mongoose.connection.collection('beneficiarylists').drop();


    
    await UserType.deleteMany();
    //await User.deleteMany();
    await Year.deleteMany();
    await BeneficiaryType.deleteMany();
    await Beneficiary.deleteMany();
    await District.deleteMany();
    await Category.deleteMany();
    await Article.deleteMany();
    await Supplier.deleteMany();
    await SupplierPayment.deleteMany();
    await ArticleOrder.deleteMany();
    await BeneficiaryList.deleteMany();

    // Sample data
    const userTypes = [{ userType: 'admin', isActive: true }, { userType: 'user', isActive: true }];
    //const users = [{ name: 'Admin', email: 'admin@example.com', password: 'password', userTypeId: 'admin' }];
    const Years = [{ year: 2025, isCurrent: true, isActive: true }];
    const beneficiaryTypes = [{ beneficiaryType: 'Type A', isActive: true }];
    const beneficiaries = [{ name: 'John Doe', uniqueId: '12345', yearId: '2025' }];
    const districts = [{ districtName: 'District 1', head: 'Head 1', contactNo: '1234567890' }];
    const categories = [{ categoryName: 'Category 1', isActive: true }];
    const articles = [{ categoryId: 'Category 1', articleName: 'Article 1' }];
    const suppliers = [{ name: 'Supplier 1', contactNo: '0987654321', address: 'Address 1' }];
    const supplierPayments = [{ supplierId: 'Supplier 1', amount: 100, paymentMode: 'Cash' }];
    const articleOrders = [{ articleId: 'Article 1', supplierId: 'Supplier 1', quantity: 10 }];
    const beneficiaryLists = [{ beneficiaryTypeId: 'Type A', districtId: 'District 1', articleId: 'Article 1' }];

    // Insert data
    await UserType.insertMany(userTypes);
    //await User.insertMany(users);
    await Year.insertMany(Years);
    await BeneficiaryType.insertMany(beneficiaryTypes);
    await Beneficiary.insertMany(beneficiaries);
    await District.insertMany(districts);
    await Category.insertMany(categories);
    await Article.insertMany(articles);
    await Supplier.insertMany(suppliers);
    await SupplierPayment.insertMany(supplierPayments);
    await ArticleOrder.insertMany(articleOrders);
    await BeneficiaryList.insertMany(beneficiaryLists);

    console.log('Data seeded successfully');
    mongoose.connection.close();
};

seedData();
