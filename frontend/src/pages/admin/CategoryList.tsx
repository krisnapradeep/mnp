import React, { useEffect, useState, useRef } from 'react';
import { 
    Box, 
    Button, 
    Table, 
    Thead, 
    Tbody, 
    Tr, 
    Th, 
    Td, 
    IconButton, 
    useToast, 
    Spinner,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Text
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { axiosInstance } from '../../../config/config';
import CategoryForm from './CategoryForm';

interface Category {
    categoryId: string;
    categoryName: string;
    description?: string;
    isActive: boolean;
}

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
    const toast = useToast();
    const cancelRef = useRef(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get<Category[]>('/category');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast({
                title: 'Error fetching categories',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        } finally {
            setIsLoading(false);
        }
    };

    const openDeleteConfirmation = (id: string) => {
        setCategoryToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!categoryToDelete) return;

        try {
            await axiosInstance.delete(`/category/${categoryToDelete}`);
            fetchCategories();
            toast({
                title: 'Category deleted',
                status: 'success',
                duration: 2000,
                isClosable: true
            });
        } catch (error) {
            console.error('Error deleting category:', error);
            toast({
                title: 'Error deleting category',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        } finally {
            setIsDeleteDialogOpen(false);
            setCategoryToDelete(null);
        }
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setFormVisible(true);
    };

    return (
        <Box p={5}>
            <Button 
                colorScheme="teal" 
                mb={4} 
                onClick={() => { 
                    setSelectedCategory(null); 
                    setFormVisible(true); 
                }}
            >
                Create New Category
            </Button>
            
            {isLoading ? (
                <Spinner size="xl" />
            ) : categories.length === 0 ? (
                <Text textAlign="center" color="gray.500">No categories found</Text>
            ) : (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Description</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories.map(category => (
                            <Tr key={category.categoryId}>
                                <Td>{category.categoryName}</Td>
                                <Td>{category.description || 'N/A'}</Td>
                                <Td>
                                    <Text 
                                        color={category.isActive ? 'green.500' : 'red.500'}
                                    >
                                        {category.isActive ? 'Active' : 'Inactive'}
                                    </Text>
                                </Td>
                                <Td>
                                    <IconButton
                                        aria-label="Edit"
                                        icon={<FiEdit2 />}
                                        mr={2}
                                        onClick={() => handleEdit(category)}
                                    />
                                    <IconButton
                                        aria-label="Delete"
                                        icon={<FiTrash2 />}
                                        colorScheme="red"
                                        onClick={() => openDeleteConfirmation(category.categoryId)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}

            {isFormVisible && (
                <CategoryForm 
                    visible={isFormVisible}
                    onCancel={() => setFormVisible(false)}
                    onSuccess={() => {
                        fetchCategories();
                        setFormVisible(false);
                    }}
                    record={selectedCategory}
                />
            )}

            <AlertDialog
                isOpen={isDeleteDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsDeleteDialogOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Category
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsDeleteDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

export default CategoryList;
