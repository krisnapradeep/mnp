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
import BeneficiaryForm from './BeneficiaryForm';

interface Beneficiary {
    beneficiaryId: string;
    beneficiaryName: string;
    beneficiaryType: string;
    district: string;
    address?: string;
    contactNumber?: string;
    email?: string;
    isActive: boolean;
}

const BeneficiaryList: React.FC = () => {
    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [beneficiaryToDelete, setBeneficiaryToDelete] = useState<string | null>(null);
    const toast = useToast();
    const cancelRef = useRef(null);

    useEffect(() => {
        fetchBeneficiaries();
    }, []);

    const fetchBeneficiaries = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get<Beneficiary[]>('/beneficiary');
            setBeneficiaries(response.data);
        } catch (error) {
            console.error('Error fetching beneficiaries:', error);
            toast({
                title: 'Error fetching beneficiaries',
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
        setBeneficiaryToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!beneficiaryToDelete) return;

        try {
            await axiosInstance.delete(`/beneficiary/${beneficiaryToDelete}`);
            fetchBeneficiaries();
            toast({
                title: 'Beneficiary deleted',
                status: 'success',
                duration: 2000,
                isClosable: true
            });
        } catch (error) {
            console.error('Error deleting beneficiary:', error);
            toast({
                title: 'Error deleting beneficiary',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        } finally {
            setIsDeleteDialogOpen(false);
            setBeneficiaryToDelete(null);
        }
    };

    const handleEdit = (beneficiary: Beneficiary) => {
        setSelectedBeneficiary(beneficiary);
        setFormVisible(true);
    };

    return (
        <Box p={5}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Button 
                    colorScheme="teal" 
                    onClick={() => { 
                        setSelectedBeneficiary(null); 
                        setFormVisible(true); 
                    }}
                >
                    Create New Beneficiary
                </Button>
            </Flex>
            
            {isLoading ? (
                <Flex justifyContent="center" alignItems="center" height="200px">
                    <Spinner size="xl" />
                </Flex>
            ) : beneficiaries.length === 0 ? (
                <Text textAlign="center" color="gray.500">No beneficiaries found</Text>
            ) : (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Type</Th>
                            <Th>District</Th>
                            <Th>Contact Number</Th>
                            <Th>Email</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {beneficiaries.map(beneficiary => (
                            <Tr key={beneficiary.beneficiaryId}>
                                <Td>{beneficiary.beneficiaryName}</Td>
                                <Td>{beneficiary.beneficiaryType}</Td>
                                <Td>{beneficiary.district}</Td>
                                <Td>{beneficiary.contactNumber || 'N/A'}</Td>
                                <Td>{beneficiary.email || 'N/A'}</Td>
                                <Td>
                                    <Text 
                                        color={beneficiary.isActive ? 'green.500' : 'red.500'}
                                    >
                                        {beneficiary.isActive ? 'Active' : 'Inactive'}
                                    </Text>
                                </Td>
                                <Td>
                                    <IconButton
                                        aria-label="Edit"
                                        icon={<FiEdit2 />}
                                        mr={2}
                                        onClick={() => handleEdit(beneficiary)}
                                    />
                                    <IconButton
                                        aria-label="Delete"
                                        icon={<FiTrash2 />}
                                        colorScheme="red"
                                        onClick={() => openDeleteConfirmation(beneficiary.beneficiaryId)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}

            {isFormVisible && (
                <BeneficiaryForm 
                    visible={isFormVisible}
                    onCancel={() => setFormVisible(false)}
                    onSuccess={() => {
                        fetchBeneficiaries();
                        setFormVisible(false);
                    }}
                    record={selectedBeneficiary}
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
                            Delete Beneficiary
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

export default BeneficiaryList;
