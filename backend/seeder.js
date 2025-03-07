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
const districtFunds = require('./models/districtFunds.model');

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
    // await mongoose.connection.db.dropCollection('districtFunds');

    // const userId = '6798927979b01a610a3e844a';
    // const yearsid = '6798927979b01a610a3e844c';
    // const get_districts = await District.find();
    // for (let i = 0; i < get_districts.length; i++) {

    //     const newDistrictFund = new districtFunds({
    //         districtId: get_districts[i]._id,
    //         yearId: yearsid,
    //         funds_total: 100000,
    //         funds_utilised: 0,
    //         funds_balance: 100000,
    //         createdBy: userId,
    //     });
    //     await newDistrictFund.save();
    // }

    await mongoose.connection.db.dropCollection('users');
    await mongoose.connection.db.dropCollection('usertype');
    await mongoose.connection.db.dropCollection('year');
    await mongoose.connection.db.dropCollection('beneficiarytype');
    await mongoose.connection.db.dropCollection('beneficiary');
    await mongoose.connection.db.dropCollection('district');
    await mongoose.connection.db.dropCollection('category');
    await mongoose.connection.db.dropCollection('article');
    await mongoose.connection.db.dropCollection('suppliers');
    await mongoose.connection.db.dropCollection('supplierpayment');
    await mongoose.connection.db.dropCollection('articleorder');
    await mongoose.connection.db.dropCollection('beneficiarylist');
    await mongoose.connection.db.dropCollection('districtFunds');

    // Sample data 
    const userTypes = await UserType.insertMany([{ userType: 'admin', isActive: true }, { userType: 'user', isActive: true }]);

    const newUser = new User(
            {
                name: "Admin",
                email: "admin@example.com",
                password: "Admin@123456",
                profileImage: "default.jpg",
                active: true,
                userType: userTypes[0]._id
            }
    );
    user = await newUser.save();
    console.log("User created:", user._id);
    const userId = user._id;
    const Years = await Year.insertMany([{ year: 2025, isCurrent: true, createdBy: userId }]);
    const beneficiaryTypes = await BeneficiaryType.insertMany([
        { beneficiaryType: 'District', createdBy: userId },
        { beneficiaryType: 'Public', createdBy: userId },
        { beneficiaryType: 'Institute', createdBy: userId },
        { beneficiaryType: 'Panchyat', createdBy: userId },
    ]);

   
    const districts = await District.insertMany([
        { districtName: 'Ariyalur', createdBy: userId },
        { districtName: 'Chennai central', createdBy: userId },
        { districtName: 'Chennai North', createdBy: userId },
        { districtName: 'Chennai South', createdBy: userId },
        { districtName: 'Chittor - Rural', createdBy: userId },
        { districtName: 'Chittor - Urban', createdBy: userId },
        { districtName: 'Coimbatore', createdBy: userId },
        { districtName: 'Cuddalore', createdBy: userId },
        { districtName: 'Dharmapuri', createdBy: userId },
        { districtName: 'Dindugal', createdBy: userId },
        { districtName: 'Erode', createdBy: userId },
        { districtName: 'Kanchipuram', createdBy: userId },
        { districtName: 'Kanyakumari', createdBy: userId },
        { districtName: 'Karnataka', createdBy: userId },
        { districtName: 'Karur', createdBy: userId },
        { districtName: 'Kerala -a.Iduki ', createdBy: userId },
        { districtName: 'Kerala -b.Palaghat', createdBy: userId },
        { districtName: 'Krishnagiri North', createdBy: userId },
        { districtName: 'Krishnagiri South', createdBy: userId },
        { districtName: 'Madurai', createdBy: userId },
        { districtName: 'Mumbai', createdBy: userId },
        { districtName: 'Thane', createdBy: userId },
        { districtName: 'Namakkal', createdBy: userId },
        { districtName: 'Nellore', createdBy: userId },
        { districtName: 'Nilgris', createdBy: userId },
        { districtName: 'Perambalur', createdBy: userId },
        { districtName: 'Puducherry', createdBy: userId },
        { districtName: 'Pudukottai', createdBy: userId },
        { districtName: 'Ramnad', createdBy: userId },
        { districtName: 'Salem', createdBy: userId },
        { districtName: 'Siva Gangai', createdBy: userId },
        { districtName: 'Tanjavur', createdBy: userId },
        { districtName: 'Theni', createdBy: userId },
        { districtName: 'Tiruchi', createdBy: userId },
        { districtName: 'Tirunelveli', createdBy: userId },
        { districtName: 'Tirupur', createdBy: userId },
        { districtName: 'Tiruvallur', createdBy: userId },
        { districtName: 'Tiruvannamalai', createdBy: userId },
        { districtName: 'Tuticurion', createdBy: userId },
        { districtName: 'Vellore - west', createdBy: userId },
        { districtName: 'Vellore -East', createdBy: userId },
        { districtName: 'Vellore -North', createdBy: userId },
        { districtName: 'Vellore -South', createdBy: userId },
        { districtName: 'Vijayawada', createdBy: userId },
        { districtName: 'Villupuram', createdBy: userId },
        { districtName: 'Virudhu nagar', createdBy: userId },
        { districtName: 'Vishakapatinam', createdBy: userId },

    ]);
    const get_districts = await District.find();
    for (let i = 0; i < get_districts.length; i++) {

        const newDistrictFund = new districtFunds({
            districtId: get_districts[i]._id,
            yearId: Years[0]._id,
            funds_total: 100000,
            funds_utilised: 0,
            funds_balance: 100000,
            createdBy: userId,
        });
        await newDistrictFund.save();
    }


    const categories = await Category.insertMany([
        { categoryName: 'Article', createdBy: userId },
        { categoryName: 'Project', createdBy: userId },
        { categoryName: 'Educational Aid', createdBy: userId },
        { categoryName: 'Medical Aid', createdBy: userId },
        { categoryName: 'Business Aid', createdBy: userId },
        { categoryName: 'Handicapped Aid', createdBy: userId },
        { categoryName: 'House renovation aid', createdBy: userId },
        { categoryName: 'Financial Aid', createdBy: userId },
        { categoryName: 'Livelihood aid', createdBy: userId },
    ]);
    const articles = await Article.insertMany([
        { categoryId: categories[0]._id, articleName: 'Laptop', createdBy: userId, unitCost:37500 },
        { categoryId: categories[0]._id, articleName: 'Commercial wet grinder 5 Ltrs', createdBy: userId, unitCost:19000 },
        { categoryId: categories[0]._id, articleName: 'Push Cart with Top', createdBy: userId, unitCost:14500 },
        { categoryId: categories[0]._id, articleName: 'Aluminium Idli Making Box', createdBy: userId, unitCost:4500 },
        { categoryId: categories[1]._id, articleName: 'Pillow & Bes Sheet (Vela Karunai Illam)', createdBy: userId, unitCost:330 },
        { categoryId: categories[0]._id, articleName: 'Sewing Machine Ordinary with Motor', createdBy: userId, unitCost:6300 },
        { categoryId: categories[1]._id, articleName: 'One month provision materials', createdBy: userId, unitCost:29678 },
        { categoryId: categories[0]._id, articleName: 'Sewing Machine Ordinary', createdBy: userId, unitCost:5200 },
        { categoryId: categories[0]._id, articleName: 'Sewing Machine Overlock', createdBy: userId, unitCost:7500 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.30000)', createdBy: userId, unitCost:30000 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.20000)', createdBy: userId, unitCost:20000 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.15000)', createdBy: userId, unitCost:15000 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.25000)', createdBy: userId, unitCost:25000 },
        { categoryId: categories[0]._id, articleName: '2 Ltr Floor model Wet Grinder', createdBy: userId, unitCost:7000 },
        { categoryId: categories[3]._id, articleName: 'Medical Aid (Rs.40000)', createdBy: userId, unitCost:40000 },
        { categoryId: categories[3]._id, articleName: 'Medical Aid (Rs.34000)', createdBy: userId, unitCost:34000 },
        { categoryId: categories[3]._id, articleName: 'Medical Aid (Rs.30000)', createdBy: userId, unitCost:30000 },
        { categoryId: categories[0]._id, articleName: 'Colour Printer', createdBy: userId, unitCost:15000 },
        { categoryId: categories[0]._id, articleName: 'Bosch Electrician Kit 13 RE', createdBy: userId, unitCost:6300 },
        { categoryId: categories[0]._id, articleName: 'Wheelchair', createdBy: userId, unitCost:5775 },
        { categoryId: categories[0]._id, articleName: 'Iron MS Stove 2 Burner', createdBy: userId, unitCost:2400 },
        { categoryId: categories[0]._id, articleName: 'Domestic HGT wet grinder 2 ltr ', createdBy: userId, unitCost:8200 },
        { categoryId: categories[0]._id, articleName: 'Sewing Machine Heavy', createdBy: userId, unitCost:10600 },
        { categoryId: categories[0]._id, articleName: 'HP Laser Printer 126 A', createdBy: userId, unitCost:19000 },
        { categoryId: categories[0]._id, articleName: '20 kg dabara set', createdBy: userId, unitCost:4500 },
        { categoryId: categories[0]._id, articleName: 'Single burner stove', createdBy: userId, unitCost:1500 },
        { categoryId: categories[0]._id, articleName: 'Tiffen Set', createdBy: userId, unitCost:3800 },
        { categoryId: categories[1]._id, articleName: 'Paper plate making machine ', createdBy: userId, unitCost:188800 },
        { categoryId: categories[1]._id, articleName: 'Oxygen Concentrator', createdBy: userId, unitCost:71680 },
        { categoryId: categories[1]._id, articleName: 'Agri Pump set with panel and starter', createdBy: userId, unitCost:47850 },
        { categoryId: categories[1]._id, articleName: 'Jercy Cows', createdBy: userId, unitCost:62500 },
        { categoryId: categories[1]._id, articleName: 'Paper plate semi Automatic printing machine ', createdBy: userId, unitCost:203550 },
        { categoryId: categories[3]._id, articleName: 'Medical Aid (Rs.50000)', createdBy: userId, unitCost:50000 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.50000)', createdBy: userId, unitCost:50000 },
        { categoryId: categories[0]._id, articleName: 'Push Cart without Top', createdBy: userId, unitCost:12500 },
        { categoryId: categories[0]._id, articleName: 'Gents Cycle', createdBy: userId, unitCost:5500 },
        { categoryId: categories[0]._id, articleName: 'Iron Box', createdBy: userId, unitCost:6600 },
        { categoryId: categories[0]._id, articleName: 'Bosch Electrician Kit 10 RE', createdBy: userId, unitCost:4250 },
        { categoryId: categories[0]._id, articleName: 'Activa DLX', createdBy: userId, unitCost:50000 },
        { categoryId: categories[0]._id, articleName: 'Girls Cycle', createdBy: userId, unitCost:5300 },
        { categoryId: categories[0]._id, articleName: 'Tree cutting machine (Petrol Engine)', createdBy: userId, unitCost:9300 },
        { categoryId: categories[0]._id, articleName: 'Agri Battery Sprayer ', createdBy: userId, unitCost:4500 },
        { categoryId: categories[0]._id, articleName: 'Desktop computer', createdBy: userId, unitCost:43000 },
        { categoryId: categories[0]._id, articleName: 'Diamond pressure cooker 12 litre', createdBy: userId, unitCost:1200 },
        { categoryId: categories[0]._id, articleName: 'Lenova Tab', createdBy: userId, unitCost:16000 },
        { categoryId: categories[3]._id, articleName: 'Medical Aid (Rs.10000)', createdBy: userId, unitCost:10000 },
        { categoryId: categories[3]._id, articleName: 'Medical Aid (Rs.20000)', createdBy: userId, unitCost:20000 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.10000)', createdBy: userId, unitCost:10000 },
        { categoryId: categories[0]._id, articleName: 'Domestic table top wet grinder 2 ltr', createdBy: userId, unitCost:3500 },
        { categoryId: categories[1]._id, articleName: 'Waiting Hall for Hospital', createdBy: userId, unitCost:150000 },
        { categoryId: categories[4]._id, articleName: 'Business Aid (Rs.10000)', createdBy: userId, unitCost:10000 },
        { categoryId: categories[0]._id, articleName: 'Suzuki 125', createdBy: userId, unitCost:118915 },
        { categoryId: categories[0]._id, articleName: 'Instant Grinder 30 Kgs', createdBy: userId, unitCost:22300 },
        { categoryId: categories[1]._id, articleName: 'Hemo Dialysis Equipment', createdBy: userId, unitCost:680960 },
        { categoryId: categories[0]._id, articleName: 'Prestige Pressure cooker', createdBy: userId, unitCost:3628 },
        { categoryId: categories[0]._id, articleName: 'SURYA GAS STOVE', createdBy: userId, unitCost:3800 },
        { categoryId: categories[0]._id, articleName: 'Aluminium vessels Sets', createdBy: userId, unitCost:4000 },
        { categoryId: categories[0]._id, articleName: 'Washing machine ', createdBy: userId, unitCost:19990 },
        { categoryId: categories[0]._id, articleName: 'Study Materials', createdBy: userId, unitCost:60 },
        { categoryId: categories[0]._id, articleName: 'RO System', createdBy: userId, unitCost:47731 },
        { categoryId: categories[1]._id, articleName: 'RO System', createdBy: userId, unitCost:21240 },
        { categoryId: categories[1]._id, articleName: 'Grocery & Provision materials', createdBy: userId, unitCost:504195 },
        { categoryId: categories[1]._id, articleName: 'Clothing ', createdBy: userId, unitCost:251150 },
        { categoryId: categories[0]._id, articleName: 'Agri Engine Operated Power sprayer (Knapsak)  1.5 HP', createdBy: userId, unitCost:12000 },
        { categoryId: categories[0]._id, articleName: 'Grinder 2 Ltr (Madurai)', createdBy: userId, unitCost:5700 },
        { categoryId: categories[0]._id, articleName: 'Cooking vessel Aluminiun -Big& medium', createdBy: userId, unitCost:11760 },
        { categoryId: categories[0]._id, articleName: 'Push Cart without top  and with top', createdBy: userId, unitCost:31360 },
        { categoryId: categories[1]._id, articleName: 'Furniture set for school', createdBy: userId, unitCost:35600 },
        { categoryId: categories[0]._id, articleName: 'Prestige Mixer Grinder', createdBy: userId, unitCost:6500 },
        { categoryId: categories[0]._id, articleName: 'Agri Bolo Power sprayer 1.2 HP Petrol', createdBy: userId, unitCost:8400 },
        { categoryId: categories[1]._id, articleName: 'Aid for Construction of house', createdBy: userId, unitCost:50000 },
        { categoryId: categories[5]._id, articleName: 'Handicapped Aid (Rs.10000)', createdBy: userId, unitCost:10000 },
        { categoryId: categories[0]._id, articleName: 'E Bike ', createdBy: userId, unitCost:80000 },
        { categoryId: categories[0]._id, articleName: 'Push Cart with Top & Tiffen set', createdBy: userId, unitCost:18300 },
        { categoryId: categories[0]._id, articleName: 'PVC Chairs', createdBy: userId, unitCost:570 },
        { categoryId: categories[1]._id, articleName: 'Improvement construction work of Yatra Nivas Rameswaram (pavala villa building)', createdBy: userId, unitCost:375000 },
        { categoryId: categories[0]._id, articleName: 'Weed cutting Machine', createdBy: userId, unitCost:48000 },
        { categoryId: categories[0]._id, articleName: 'Electric Iron Box', createdBy: userId, unitCost:750 },
        { categoryId: categories[0]._id, articleName: 'Agri Manual Sprayer', createdBy: userId, unitCost:3000 },
        { categoryId: categories[1]._id, articleName: 'Tree Sapling Plantation', createdBy: userId, unitCost:10 },
        { categoryId: categories[1]._id, articleName: 'Comstruction of Toilet block for Govt.High School (Projects)', createdBy: userId, unitCost:245000 },
        { categoryId: categories[1]._id, articleName: 'Comstruction of Toilet block for Mariamman Temple (Projects)', createdBy: userId, unitCost:173800 },
        { categoryId: categories[1]._id, articleName: 'Devottee House Renovation', createdBy: userId, unitCost:250000 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.130000)', createdBy: userId, unitCost:130000 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.174350)', createdBy: userId, unitCost:174350 },
        { categoryId: categories[0]._id, articleName: 'Two Wheeler Subsidy', createdBy: userId, unitCost:50000 },
        { categoryId: categories[0]._id, articleName: 'Gas stove', createdBy: userId, unitCost:5350 },
        { categoryId: categories[0]._id, articleName: '25, 25, 10 &15 Ltrs Aluminium Cooking Vesels', createdBy: userId, unitCost:30010 },
        { categoryId: categories[0]._id, articleName: '100 Ltr Cooker', createdBy: userId, unitCost:27000 },
        { categoryId: categories[1]._id, articleName: 'Nethaji Old age Home(Clothing) (1 Set)', createdBy: userId, unitCost:7324 },
        { categoryId: categories[1]._id, articleName: 'Construction of waiting hall  near (15X10  shed) maternity ward (Project)', createdBy: userId, unitCost:100000 },
        { categoryId: categories[0]._id, articleName: '3 Ltr Wet Grinder', createdBy: userId, unitCost:15400 },
        { categoryId: categories[0]._id, articleName: 'GP Welding Machine Arc 200', createdBy: userId, unitCost:6750 },
        { categoryId: categories[1]._id, articleName: 'Flood Relief Fund', createdBy: userId, unitCost:15909.0909090909 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.16000)', createdBy: userId, unitCost:16000 },
        { categoryId: categories[3]._id, articleName: 'Medical Aid (Rs.98000)', createdBy: userId, unitCost:98000 },
        { categoryId: categories[3]._id, articleName: 'Medical Aid (Rs.100000)', createdBy: userId, unitCost:100000 },
        { categoryId: categories[0]._id, articleName: 'Push Cart with Top & Aluminium  idli box', createdBy: userId, unitCost:19000 },
        { categoryId: categories[0]._id, articleName: 'Hearing Aid', createdBy: userId, unitCost:9090 },
        { categoryId: categories[6]._id, articleName: 'House renovation aid (Rs.26000)', createdBy: userId, unitCost:26000 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.26000)', createdBy: userId, unitCost:26000 },
        { categoryId: categories[0]._id, articleName: 'Domestic table top wet grinder 2 ltr tilting type', createdBy: userId, unitCost:6000 },
        { categoryId: categories[0]._id, articleName: 'Handicapped Hand tricycle', createdBy: userId, unitCost:7000 },
        { categoryId: categories[0]._id, articleName: 'Printer HP 1108', createdBy: userId, unitCost:8000 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.150000)', createdBy: userId, unitCost:150000 },
        { categoryId: categories[1]._id, articleName: 'Adhiparasakthi  Old age Home', createdBy: userId, unitCost:252220 },
        { categoryId: categories[0]._id, articleName: 'Electrical Power cable - 15 Coils Rice -  500 Kgs', createdBy: userId, unitCost:0 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.17000)', createdBy: userId, unitCost:17000 },
        { categoryId: categories[3]._id, articleName: 'medical Aid', createdBy: userId, unitCost:30000 },
        { categoryId: categories[0]._id, articleName: 'Agri Battery Sprayer', createdBy: userId, unitCost:4500 },
        { categoryId: categories[7]._id, articleName: 'House Construction Aid (Rs.20000)', createdBy: userId, unitCost:20000 },
        { categoryId: categories[0]._id, articleName: 'Wet Grinder 5 Ltrs', createdBy: userId, unitCost:19116 },
        { categoryId: categories[8]._id, articleName: 'Livelihood aid (Rs.15000)', createdBy: userId, unitCost:15000 },
        { categoryId: categories[0]._id, articleName: 'Two wheeler', createdBy: userId, unitCost:104000 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.15525)', createdBy: userId, unitCost:15525 },
        { categoryId: categories[7]._id, articleName: 'Financial Aid (Rs.25000)', createdBy: userId, unitCost:25000 },
        { categoryId: categories[0]._id, articleName: 'Handicapped Scooter (50% Funding)', createdBy: userId, unitCost:0 },
        { categoryId: categories[0]._id, articleName: 'Wet Grinder 3 Ltr', createdBy: userId, unitCost:15400 },
        { categoryId: categories[4]._id, articleName: 'Business Aid (Rs.20000) ', createdBy: userId, unitCost:20000 },
        { categoryId: categories[6]._id, articleName: 'House renovation aid (Rs.25000)', createdBy: userId, unitCost:25000 },
        { categoryId: categories[4]._id, articleName: 'Business Aid (Rs.15000)', createdBy: userId, unitCost:15000 },
        { categoryId: categories[0]._id, articleName: 'Handicapped three wheel scooter (Batery)', createdBy: userId, unitCost:0 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.26530)', createdBy: userId, unitCost:26530 },
        { categoryId: categories[7]._id, articleName: 'Financial Aid (Rs.100000)', createdBy: userId, unitCost:100000 },
        { categoryId: categories[0]._id, articleName: 'Handicapped Tricycle', createdBy: userId, unitCost:7035 },
        { categoryId: categories[3]._id, articleName: 'Medical Aid (Rs.25000)', createdBy: userId, unitCost:25000 },
        { categoryId: categories[0]._id, articleName: 'Handicapped Scooter', createdBy: userId, unitCost:50000 },
        { categoryId: categories[0]._id, articleName: 'Push cart without top & Iron Box', createdBy: userId, unitCost:19100 },
        { categoryId: categories[4]._id, articleName: 'Business Aid (Rs.25000)', createdBy: userId, unitCost:25000 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.8000)', createdBy: userId, unitCost:8000 },
        { categoryId: categories[0]._id, articleName: '40% cost Of Auto Vehicle', createdBy: userId, unitCost:0 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.60000)', createdBy: userId, unitCost:60000 },
        { categoryId: categories[2]._id, articleName: 'Educational Aid (Rs.38000)', createdBy: userId, unitCost:38000 },
        { categoryId: categories[4]._id, articleName: 'Business Aid for Blind (Rs.10000)', createdBy: userId, unitCost:10000 },
        { categoryId: categories[8]._id, articleName: 'Livelihood Aid', createdBy: userId, unitCost:25000 },
        { categoryId: categories[7]._id, articleName: 'MUSICAL INSTRUMENTS AID (Rs.15000)', createdBy: userId, unitCost:15000 },
        { categoryId: categories[0]._id, articleName: 'Steel Cupboard', createdBy: userId, unitCost:12390 },
        { categoryId: categories[0]._id, articleName: 'Office Table 4x2', createdBy: userId, unitCost:5500 },
        { categoryId: categories[0]._id, articleName: 'S Type Chair', createdBy: userId, unitCost:2100 },
        { categoryId: categories[1]._id, articleName: '1000 Kg Rice', createdBy: userId, unitCost:50000 },
        { categoryId: categories[0]._id, articleName: 'Fixed Wheel chair', createdBy: userId, unitCost:4410 },
        { categoryId: categories[0]._id, articleName: 'Reception steel 4 seater set', createdBy: userId, unitCost:8400 },
        { categoryId: categories[0]._id, articleName: 'Audio Mixer ', createdBy: userId, unitCost:50905 },
        { categoryId: categories[0]._id, articleName: 'Canon  photocopier (Xerox) IR 4925', createdBy: userId, unitCost:283200 },
        { categoryId: categories[7]._id, articleName: 'Environment Dev Aid (Rs.20000)', createdBy: userId, unitCost:20000 },
        { categoryId: categories[0]._id, articleName: 'Television', createdBy: userId, unitCost:20000 },
        { categoryId: categories[0]._id, articleName: 'Tricycle Front Load', createdBy: userId, unitCost:14000 },
        { categoryId: categories[0]._id, articleName: 'Tricycle back Load', createdBy: userId, unitCost:22400 },
        { categoryId: categories[0]._id, articleName: 'Bosch Electrician Kit 22 RE', createdBy: userId, unitCost:6700 },
        { categoryId: categories[0]._id, articleName: 'BP and Sugar Apparatus', createdBy: userId, unitCost:5000 },
        { categoryId: categories[0]._id, articleName: 'Ceiling fan', createdBy: userId, unitCost:2000 },


    ]);

    const beneficiaries = await Beneficiary.insertMany([
        {
            name: 'Sri Ramakrishna Athmalayam',
            code: '021',
            prefix: 'P',
            uniqueId: '388247126683',
            yearId: Years[0]._id, 
            benefiedItem: 'Electrical Power cable - 15 Coils Rice -  500 Kgs',
            createdBy: user._id
        },
        ]);


    const suppliers = await Supplier.insertMany([
        {
            name: 'Supplier 1',
            createdBy: user._id
        },
        {
            name: 'Supplier 2',
            createdBy: user._id
        },
        {
            name: 'Supplier 3',
            createdBy: user._id
        }
    ]);

    const supplierPayments = await SupplierPayment.insertMany([{ supplierId: suppliers[0]._id, amount: 100, paymentMode: 'Cash', createdBy: user._id }]);
    const articleOrders = await ArticleOrder.insertMany([{ articleId: articles[0]._id, supplierId: suppliers[0]._id, quantity: 10, unitCost: 50, totalCost: 500, createdBy: user._id }]);

    const beneficiaryLists = await BeneficiaryList.insertMany([
        {
            beneficiaryTypeId: beneficiaryTypes[0]._id,
            yearId: Years[0]._id,
            articleId: articles[0]._id,
            districtId: districts[0]._id,
            //beneficiaryId: beneficiaries[0]._id,
            quantity:1,
            unitCost: 100,
            totalCost: 100,
            createdBy: user._id
        },
        {
            beneficiaryTypeId: beneficiaryTypes[1]._id,
            yearId: Years[0]._id,
            articleId: articles[1]._id,
            //districtId: districts[1]._id,
            beneficiaryId: beneficiaries[0]._id,
            quantity:4,
            unitCost: 500,
            totalCost: 2000,
            createdBy: user._id
        }
    ]);

    console.log('Data seeded successfully');
    mongoose.connection.close();
};

seedData();
