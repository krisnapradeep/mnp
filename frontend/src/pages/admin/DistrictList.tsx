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
import DistrictForm from './DistrictForm';

interface District {
    districtId: string;
    districtName: string;
    districtHead: string;
    contactNumber?: string;
    email?: string;
    isActive: boolean;
}

const DistrictList: React.FC = () => {
    const [districts, setDistricts] = useState<District[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [districtToDelete, setDistrictToDelete] = useState<string | null>(null);
    const toast = useToast();
    const cancelRef = useRef(null);

    useEffect(() => {
        fetchDistricts();
    }, []);

    const fetchDistricts = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get<District[]>('/district');
            setDistricts(response.data);
        } catch (error) {
            console.error('Error fetching districts:', error);
            toast({
                title: 'Error fetching districts',
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
        setDistrictToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!districtToDelete) return;

        try {
            await axiosInstance.delete(`/district/${districtToDelete}`);
            fetchDistricts();
            toast({
                title: 'District deleted',
                status: 'success',
                duration: 2000,
                isClosable: true
            });
        } catch (error) {
            console.error('Error deleting district:', error);
            toast({
                title: 'Error deleting district',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        } finally {
            setIsDeleteDialogOpen(false);
            setDistrictToDelete(null);
        }
    };

    const handleEdit = (district: District) => {
        setSelectedDistrict(district);
        setFormVisible(true);
    };

    return (
        <Box p={5}>
            <Button 
                colorScheme="teal" 
                mb={4} 
                onClick={() => { 
                    setSelectedDistrict(null); 
                    setFormVisible(true); 
                }}
            >
                Create New District
            </Button>
            
            {isLoading ? (
                <Spinner size="xl" />
            ) : districts.length === 0 ? (
                <Text textAlign="center" color="gray.500">No districts found</Text>
            ) : (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>District Head</Th>
                            <Th>Contact Number</Th>
                            <Th>Email</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {districts.map(district => (
                            <Tr key={district.districtId}>
                                <Td>{district.districtName}</Td>
                                <Td>{district.districtHead}</Td>
                                <Td>{district.contactNumber || 'N/A'}</Td>
                                <Td>{district.email || 'N/A'}</Td>
                                <Td>
                                    <Text 
                                        color={district.isActive ? 'green.500' : 'red.500'}
                                    >
                                        {district.isActive ? 'Active' : 'Inactive'}
                                    </Text>
                                </Td>
                                <Td>
                                    <IconButton
                                        aria-label="Edit"
                                        icon={<FiEdit2 />}
                                        mr={2}
                                        onClick={() => handleEdit(district)}
                                    />
                                    <IconButton
                                        aria-label="Delete"
                                        icon={<FiTrash2 />}
                                        colorScheme="red"
                                        onClick={() => openDeleteConfirmation(district.districtId)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}

            {isFormVisible && (
                <DistrictForm 
                    visible={isFormVisible}
                    onCancel={() => setFormVisible(false)}
                    onSuccess={() => {
                        fetchDistricts();
                        setFormVisible(false);
                    }}
                    record={selectedDistrict}
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
                            Delete District
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

export default DistrictList;
