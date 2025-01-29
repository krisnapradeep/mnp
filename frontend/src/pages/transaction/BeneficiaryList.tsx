import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BeneficiaryList = () => {
    const [districts, setDistricts] = useState([]);
    const [beneficiaryTypes, setBeneficiaryTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        districtId: '',
        beneficiaryTypeId: '',
        categoryId: '',
        quantity: '',
        unitCost: '',
        totalCost: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const districtsResponse = await axios.get('/api/districts');
            const beneficiaryTypesResponse = await axios.get('/api/beneficiary-types');
            const categoriesResponse = await axios.get('/api/categories');
            setDistricts(districtsResponse.data);
            setBeneficiaryTypes(beneficiaryTypesResponse.data);
            setCategories(categoriesResponse.data);
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/beneficiary-list', formData);
        // Handle success or error
    };

    return (
        <div>
            <h1>Beneficiary List</h1>
            <form onSubmit={handleSubmit}>
                <select name="districtId" onChange={handleChange} required>
                    <option value="">Select District</option>
                    {districts.map(district => (
                        <option key={district._id} value={district._id}>{district.districtName}</option>
                    ))}
                </select>
                <select name="beneficiaryTypeId" onChange={handleChange} required>
                    <option value="">Select Beneficiary Type</option>
                    {beneficiaryTypes.map(type => (
                        <option key={type._id} value={type._id}>{type.beneficiaryType}</option>
                    ))}
                </select>
                <select name="categoryId" onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>{category.categoryName}</option>
                    ))}
                </select>
                <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
                <input type="number" name="unitCost" placeholder="Unit Cost" onChange={handleChange} />
                <input type="number" name="totalCost" placeholder="Total Cost" onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default BeneficiaryList;
