import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { axiosInstance } from '../../config/config';

const CategoryForm: React.FC<{ visible: boolean; onCancel: () => void; onSuccess: () => void; record?: any; }> = ({ visible, onCancel, onSuccess, record }) => {
    const [categoryName, setCategoryName] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (record) {
            setCategoryName(record.categoryName);
        } else {
            setCategoryName('');
        }
    }, [record]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (record) {
                await axiosInstance.put(`/category/${record.categoryId}`, { categoryName });
                toast({ title: 'Category updated', status: 'success' });
            } else {
                await axiosInstance.post('/category', { categoryName });
                toast({ title: 'Category created', status: 'success' });
            }
            setCategoryName('');
            onSuccess();
        } catch (error) {
            toast({ title: 'Error saving category', status: 'error' });
        }
    };

    if (!visible) return null;

    return (
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Category Name</FormLabel>
                    <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">{record ? 'Update' : 'Create'} Category</Button>
                <Button mt={4} ml={4} onClick={onCancel}>Cancel</Button>
            </form>
        </Box>
    );
};

export default CategoryForm;
