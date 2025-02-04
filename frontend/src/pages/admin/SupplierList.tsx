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
    Text,
    Flex
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { axiosInstance } from '../../../config/config';
import SupplierForm from './SupplierForm';

interface Supplier {
    supplierId: string;
    supplierName: string;
    contactPerson: string;
    contactNumber: string;
    email: string;
    address?: string;
    gstNumber?: string;
    isActive: boolean;
}

const SupplierList: React.FC = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [supplierToDelete, setSupplierToDelete] = useState<string | null>(null);
    const toast = useToast();
    const cancelRef = useRef(null);

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get<Supplier[]>('/supplier');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            toast({
                title: 'Error fetching suppliers',
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
        setSupplierToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!supplierToDelete) return;

        try {
            await axiosInstance.delete(`/supplier/${supplierToDelete}`);
            fetchSuppliers();
            toast({
                title: 'Supplier deleted',
                status: 'success',
                duration: 2000,
                isClosable: true
            });
        } catch (error) {
            console.error('Error deleting supplier:', error);
            toast({
                title: 'Error deleting supplier',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        } finally {
            setIsDeleteDialogOpen(false);
            setSupplierToDelete(null);
        }
    };

    const handleEdit = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setFormVisible(true);
    };

    return (
        <Box p={5}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Button 
                    colorScheme="teal" 
                    onClick={() => { 
                        setSelectedSupplier(null); 
                        setFormVisible(true); 
                    }}
                >
                    Create New Supplier
                </Button>
            </Flex>
            
            {isLoading ? (
                <Flex justifyContent="center" alignItems="center" height="200px">
                    <Spinner size="xl" />
                </Flex>
            ) : suppliers.length === 0 ? (
                <Text textAlign="center" color="gray.500">No suppliers found</Text>
            ) : (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Contact Person</Th>
                            <Th>Contact Number</Th>
                            <Th>Email</Th>
                            <Th>GST Number</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {suppliers.map(supplier => (
                            <Tr key={supplier.supplierId}>
                                <Td>{supplier.supplierName}</Td>
                                <Td>{supplier.contactPerson}</Td>
                                <Td>{supplier.contactNumber}</Td>
                                <Td>{supplier.email}</Td>
                                <Td>{supplier.gstNumber || 'N/A'}</Td>
                                <Td>
                                    <Text 
                                        color={supplier.isActive ? 'green.500' : 'red.500'}
                                    >
                                        {supplier.isActive ? 'Active' : 'Inactive'}
                                    </Text>
                                </Td>
                                <Td>
                                    <IconButton
                                        aria-label="Edit"
                                        icon={<FiEdit2 />}
                                        mr={2}
                                        onClick={() => handleEdit(supplier)}
                                    />
                                    <IconButton
                                        aria-label="Delete"
                                        icon={<FiTrash2 />}
                                        colorScheme="red"
                                        onClick={() => openDeleteConfirmation(supplier.supplierId)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}

            {isFormVisible && (
                <SupplierForm 
                    visible={isFormVisible}
                    onCancel={() => setFormVisible(false)}
                    onSuccess={() => {
                        fetchSuppliers();
                        setFormVisible(false);
                    }}
                    record={selectedSupplier}
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
                            Delete Supplier
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

export default SupplierList;
