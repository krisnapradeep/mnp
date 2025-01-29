const mongoose = require('mongoose');
const { fetchArticlesWithCategories, fetchBeneficiariesWithDetails, fetchBeneficiaryListsWithDetails } = require('./models/orm');

// Connect to MongoDB (update the connection string as needed)
const dbURI = 'mongodb://localhost:27017/omsakthi';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        return Promise.all([
            fetchArticlesWithCategories(),
            fetchBeneficiariesWithDetails(),
            fetchBeneficiaryListsWithDetails()
        ]);
    })
    .then(([articles, beneficiaries, beneficiaryLists]) => {
        console.log('Articles with Categories:', articles);
        console.log('Beneficiaries with Details:', beneficiaries);
        console.log('Beneficiary Lists with Details:', beneficiaryLists);
    })
    .catch(err => console.error('Error connecting to MongoDB:', err))
    .finally(() => mongoose.connection.close());
