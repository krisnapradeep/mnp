import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { axiosInstance } from '../../../config/config';
import CategoryForm from './CategoryForm';

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
    const toast = useToast();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/category');
            setCategories(response.data);
        } catch (error) {
            toast({ title: 'Error fetching categories', status: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/category/${id}`);
            fetchCategories();
            toast({ title: 'Category deleted', status: 'success' });
        } catch (error) {
            toast({ title: 'Error deleting category', status: 'error' });
        }
    };

    return (
        <Box p={5}>
            <Button colorScheme="teal" mb={4} onClick={() => { setSelectedCategory(null); setFormVisible(true); }}>Create New Category</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {categories.map(category => (
                        <Tr key={category.categoryId}>
                            <Td>{category.categoryId}</Td>
                            <Td>{category.categoryName}</Td>
                            <Td>
                                <IconButton icon={<FiEdit2 />} onClick={() => { setSelectedCategory(category); setFormVisible(true); }} />
                                <IconButton icon={<FiTrash2 />} onClick={() => handleDelete(category.categoryId)} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <CategoryForm visible={isFormVisible} onCancel={() => setFormVisible(false)} onSuccess={() => { setFormVisible(false); fetchCategories(); }} record={selectedCategory} />
        </Box>
    );
};

export default CategoryList;
