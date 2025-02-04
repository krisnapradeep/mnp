import { useState, useEffect } from 'react';
import { axiosInstance } from '../config/config';
import { useDebounce } from './useDebounce';

export interface FormData {
    type: 'District' | 'Public' | 'Institute' | 'Panchayat';
    mode: 'New' | 'Edit';
    id?: string;
    districtId?: string;
    categoryId: string;
    articleId: string;
    beneficiaryId?: string;
    beneficiaryName?: string;
    code?: number;
    prefix?: string;
    uniqueId?: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
}

export interface UseFormResult {
    formData: FormData;
    loading: boolean;
    error: string | null;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    resetForm: () => void;
    isEditMode: boolean;
    setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultFormData: FormData = {
    type: 'District',
    mode: 'New',
    id: '',
    districtId: '',
    categoryId: '',
    articleId: '',
    quantity: 0,
    unitCost: 0,
    totalCost: 0
};

export function useBeneficiaryForm(onSubmitSuccess?: () => void, onEditModeChange?: (mode: boolean) => void): UseFormResult {
    const [formData, setFormData] = useState<FormData>(defaultFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const debouncedBeneficiaryId = useDebounce(formData.beneficiaryId, 500);

    useEffect(() => {
        if (debouncedBeneficiaryId && formData.type !== 'District') {
            checkBeneficiaryId();
        }
    }, [debouncedBeneficiaryId, formData.type]);

    const checkBeneficiaryId = async () => {
        if (!formData.beneficiaryId) return;
        
        try {
            const endpoint = `/${formData.type.toLowerCase()}Record/${formData.beneficiaryId}`;
            const response = await axiosInstance.get(endpoint);
            if (response.data) {
                setError(`${formData.type} record already exists!`);
            }
        } catch (error) {
            console.error('Error checking beneficiary ID:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        console.log("handleSubmit", formData);
        try {
            await axiosInstance.post('/beneficiarylist', formData);
            resetForm();
            onSubmitSuccess?.();
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to submit form');
            console.error('Form submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {

        setFormData({
            ...defaultFormData,
            categoryId: '',
            articleId: '',
            districtId: '',
            quantity: 0,
            unitCost: 0,
            totalCost: 0
        });
        setError(null);
        setIsEditMode(false);
        onEditModeChange?.(false);
    };

    return {
        formData,
        loading,
        error,
        setFormData,
        handleSubmit,
        resetForm,
        isEditMode,
        setIsEditMode: (mode: React.SetStateAction<boolean>) => {
            setIsEditMode(mode);
            onEditModeChange?.(typeof mode === 'function' ? mode(isEditMode) : mode);
        }
    };
}
