import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { axiosInstance } from '../config/config';

const UserTypeList = () => {
    const [userTypes, setUserTypes] = useState([]);
    const toast = useToast();

    useEffect(() => {
        fetchUserTypes();
    }, []);

    const fetchUserTypes = async () => {
        try {
            const response = await axiosInstance.get('/usertypes');
            setUserTypes(response.data);
        } catch (error) {
            toast({ title: 'Error fetching user types', status: 'error' });
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/user-types/${id}`);
            fetchUserTypes();
            toast({ title: 'User type deleted', status: 'success' });
        } catch (error) {
            toast({ title: 'Error deleting user type', status: 'error' });
        }
    };

    return (
        <Box p={5}>
            <Button colorScheme="teal" mb={4} onClick={() => {/* Navigate to create form */}}>Create New User Type</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {userTypes.map((userType) => (
                        <Tr key={userType}>
                            <Td>{userType}</Td>
                            <Td>{userType}</Td>
                            <Td>
                                <IconButton icon={<FiEdit2 />} aria-label="Edit" onClick={() => {/* Navigate to edit form */}} />
                                <IconButton icon={<FiTrash2 />} aria-label="Delete" onClick={() => handleDelete(userType.id)} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default UserTypeList;
