import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/config';
import { DataTable } from '../../components/DataTable/DataTable';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { Modal } from '../../components/Modal/Modal';
import { useBeneficiaryForm } from '../../hooks/useBeneficiaryForm';
import {
    BeneficiaryType,
    DistrictList,
    District,
    CategoryList,
    ArticleList,
    Article,
    BeneficiaryRecord,
    BeneficiaryListParams
} from '../../types/beneficiary';
import './BeneficiaryList.css';

const BeneficiaryList: React.FC = () => {
    // Use the beneficiary form hook
    const {
        formData,
        setFormData,
        loading: formLoading,
        error: formError,
        handleSubmit,
        resetForm,
        isEditMode,
        setIsEditMode
    } = useBeneficiaryForm(() => {
        // Callback after successful submission
        fetchRecentEntries();
        setShowProgressBar(false); // to hide
    });

    // State
    const [formType, setFormType] = useState<BeneficiaryType>('District');
    const [districts, setDistricts] = useState<DistrictList>({ status: '', length: 0, data: [] });
    const [categories, setCategories] = useState<CategoryList>({ status: '', length: 0, data: [] });
    const [articles, setArticles] = useState<ArticleList>({ status: '', length: 0, data: [] });
    const [recentEntries, setRecentEntries] = useState<BeneficiaryRecord>({ status: '', length: 0, data: [] });
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showProgressBar, setShowProgressBar] = useState(true);

    // API calls
    const fetchRecentEntries = async () => {
        console.log("fetchRecentEntries");
        try {
            setLoading(true);
            const response = await axiosInstance.get<BeneficiaryRecord>('/beneficiarylist');
            console.log("beneficiarylist", response.data);
            setRecentEntries(response.data);
        } catch (error) {
            setError('Failed to fetch recent entries');
            console.error('Error fetching recent entries:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch initial data
    useEffect(() => {
        fetchRecentEntries();
        if (formType === 'District') {
            fetchDistricts();
        } else {
            // Reset district-specific state when switching to other types
            setSelectedDistrict(null);
            setCategories({ status: '', length: 0, data: [] });
        }
    }, [formType]);

    // API calls
    const fetchDistricts = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get<DistrictList>('/districtfund');
            setDistricts(response.data);
        } catch (error) {
            setError('Failed to fetch districts');
            console.error('Error fetching districts:', error);
        } finally {
            setLoading(false);
        }
    };


    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get<CategoryList>('/category');
            setCategories(response.data);
        } catch (error) {
            setError('Failed to fetch categories');
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchArticles = async (categoryId: string) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get<ArticleList>(`/article/category/${categoryId}`);
            setArticles(response.data);
        } catch (error) {
            setError('Failed to fetch articles');
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    // Event handlers
    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleTypeChange", event.target.value);
        const newType = event.target.value as BeneficiaryType;
        setFormType(newType);
        // Reset form with the new type
        setFormData({
            type: newType,
            mode: 'New',
            id: '',
            districtId: '',
            categoryId: '',
            articleId: '',
            quantity: 0,
            unitCost: 0,
            totalCost: 0
        });
        
        // Clear related data
        setSelectedDistrict(null);
        setCategories({ status: '', length: 0, data: [] });
        setArticles({ status: '', length: 0, data: [] });
        setError(null);
        setIsEditMode(false);
        setShowProgressBar(false);

        // Fetch relevant data based on type
        if (newType === 'District') {
            fetchDistricts();
        } else {
            fetchCategories();
        }
    };

    const handleDistrictChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const districtId = event.target.value;
        setFormData(prev => ({ ...prev, districtId }));
        if (districtId) {
            // Find the selected district from the districts list
            const selectedDist = districts.data.find(d => d.districtId === districtId);
            setSelectedDistrict(selectedDist || null);
            setShowProgressBar(true);  // to show
            await fetchCategories()
           
        } else {
            setSelectedDistrict(null);
            setCategories({ status: '', length: 0, data: [] });
            setShowProgressBar(false); // to hide
        }
    };

    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = event.target.value;
        setFormData(prev => ({ ...prev, categoryId }));
        if (categoryId) {
            await fetchArticles(categoryId);
        } else {
            setArticles({ status: '', length: 0, data: [] });
        }
    };

    const handleArticleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const article = articles.data.find(a => a.id === event.target.value);
        if (article) {
            setFormData(prev => ({
                ...prev,
                articleId: article.id,
                unitCost: article.unitCost,
                totalCost: prev.quantity * article.unitCost
            }));
        }
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = parseInt(event.target.value) || 0;
        setFormData(prev => ({
            ...prev,
            quantity,
            totalCost: quantity * prev.unitCost
        }));
    };

    const handleEdit = async (record: BeneficiaryListParams) => {
        console.log("handleEdit", record);
        setFormType(record.beneficiaryType);
        setIsEditMode(true); // Enable edit mode
        
        // First set the form data
        setFormData({
            type: record.beneficiaryType,
            mode: 'Edit',
            id: record.id,
            districtId: record.districtId,
            categoryId: record.categoryId,
            articleId: record.articleId,
            beneficiaryId: record.beneficiaryId,
            beneficiaryName: record.beneficiaryName,
            code: record.code,
            prefix: record.prefix,
            uniqueId: record.uniqueId,
            quantity: record.quantity,
            unitCost: record.unitCost,
            totalCost: record.totalCost
        });

        // Then fetch the necessary data for dropdowns
        try {
            if (record.beneficiaryType === 'District') {
                await fetchDistricts();
                if (record.districtId) {
                    const selectedDist = districts.data.find(d => d.districtId === record.districtId);
                    console.log("handleEdit District",record.districtId, selectedDist, districts.data);
                    setSelectedDistrict(selectedDist || null);
                    setShowProgressBar(true); // to hide
                }
            }
            
            // Fetch categories regardless of type
            await fetchCategories();
            
            // If we have a category ID, fetch the articles
            if (record.categoryId) {
                await fetchArticles(record.categoryId);
            }
        } catch (error) {
            console.error('Error fetching data for edit mode:', error);
            setError('Failed to load all required data for editing');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                setLoading(true);
                await axiosInstance.delete(`/beneficiarylist/${id}`);
                // Optimistic update
                // setRecentEntries(prev => prev.filter(entry => entry._id !== id));
            } catch (error) {
                setError('Failed to delete record');
                console.error('Error deleting record:', error);
                // Refresh the list in case of error
                await fetchRecentEntries();
            } finally {
                setLoading(false);
            }
        }
    };

    const renderForm = () => (
        <form onSubmit={handleSubmit} className="data-entry-form">
            {formType === 'District' && (
                <div className="form-group">
                    <label htmlFor="districtId">District</label>
                    <select
                        id="districtId"
                        value={formData.districtId || ''}
                        onChange={handleDistrictChange}
                        required
                    >
                        <option value="">Select District</option>
                        {districts?.data.map(district => (
                            <option key={district.districtId} value={district.districtId}>
                                {district.name}
                            </option>
                        ))}
                    </select>

                    {selectedDistrict && showProgressBar && (
                        <ProgressBar
                            total={selectedDistrict.funds_total}
                            utilized={selectedDistrict.funds_utilised}
                        />
                    )}
                </div>
            )}

            {formType !== 'District' && (
                <>
                    <div className="form-group">
                        <label htmlFor="code">{formType} ID</label>
                        <input
                            id="code"
                            type="number"
                            value={formData.code || ''}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                code: e.target.value ? Number(e.target.value) : undefined
                            }))}
                            required
                            minLength={4}
                            maxLength={4}
                            placeholder={`Enter ${formType} ID`}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="beneficiaryName">{formType} Name</label>
                        <input
                            id="beneficiaryName"
                            type="text"
                            value={formData.beneficiaryName || ''}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                beneficiaryName: e.target.value
                            }))}
                            required
                            placeholder={`Enter ${formType} Name`}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="uniqueId">Aadhaar</label>
                        <input
                            id="uniqueId"
                            type="text"
                            value={formData.uniqueId || ''}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                uniqueId: e.target.value
                            }))}
                            required
                            minLength={12}
                            maxLength={12}
                            placeholder={`Enter Aadhaar Number`}
                        />
                    </div>
                </>
            )}

            <div className="form-group">
                <label htmlFor="categoryId">Category</label>
                <select
                    id="categoryId"
                    value={formData.categoryId}
                    onChange={handleCategoryChange}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.data.map(category => (
                        <option key={category._id} value={category._id}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="articleId">Article</label>
                <select
                    id="articleId"
                    value={formData.articleId}
                    onChange={handleArticleChange}
                    required
                >
                    <option value="">Select Article</option>
                    {articles.data.map(article => (
                        <option key={article.id} value={article.id}>
                            {article.articleName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                    id="quantity"
                    type="number"
                    value={formData.quantity || ''}
                    onChange={handleQuantityChange}
                    required
                    min="1"
                    placeholder="Enter quantity"
                />
            </div>

            <div className="form-group">
                <label htmlFor="unitCost">Unit Cost (₹)</label>
                <input
                    id="unitCost"
                    type="number"
                    value={formData.unitCost}
                    readOnly
                    placeholder="Unit cost will be displayed here"
                />
            </div>

            <div className="form-group">
                <label htmlFor="totalCost">Total Cost (₹)</label>
                <input
                    id="totalCost"
                    type="number"
                    value={formData.totalCost}
                    readOnly
                    placeholder="Total cost will be calculated automatically"
                />
            </div>

            <button
                type="submit"
                className="submit-button"
                disabled={loading}
            >
                {loading ? 'Saving...' : isEditModalOpen ? 'Update Record' : 'Save Record'}
            </button>
        </form>
    );

    return (
        <div className="beneficiary-list-container">
            <header className="page-header">
                <h1>Beneficiary Management</h1>
            </header>

            <main className="main-content">
                <section className="form-section">
                    {error && <div className="error-message">{error}</div>}
                    {formError && <div className="error-message">{formError}</div>}

                    <div className="type-selection">
                        {['District', 'Public', 'Institute', 'Panchayat'].map((type) => (
                            <label key={type}>
                                <input
                                    type="radio"
                                    name="type"
                                    value={type}
                                    checked={formType === type}
                                    onChange={handleTypeChange}
                                />
                                {type}
                            </label>
                        ))}
                    </div>

                    {renderForm()}
                </section>

                <section className="table-section">
                    <h2>Recent Entries</h2>
                    <DataTable
                        data={recentEntries}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        hiddenColumns={['district', 'year', 'beneficiaryName', 'code', 'prefix', 'createdBy']}
                        columnOrder={[
                            'beneficiaryType',
                            'category',
                            'article',
                            'beneficiary',
                            'uniqueId',
                            'quantity',
                            'unitCost',
                            'totalCost'
                        ]}
                        isEditMode={isEditMode}
                    />
                </section>
            </main>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    resetForm();
                }}
                title="Edit Record"
            >
                {renderForm()}
            </Modal>

            <footer className="page-footer">
                <p> 2025 Beneficiary Management System</p>
            </footer>
        </div>
    );
};

export default BeneficiaryList;
