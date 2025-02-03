import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { axiosInstance } from '../../config/config';
import UserTypeForm from './UserTypeForm';

const UserTypeList: React.FC = () => {
    const [userTypes, setUserTypes] = useState<any[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState<any | null>(null);
    const toast = useToast();

    useEffect(() => {
        fetchUserTypes();
    }, []);

    const fetchUserTypes = async () => {
        try {
            const response = await axiosInstance.get('/userytpes');
            setUserTypes(response.data);
        } catch (error) {
            toast({ title: 'Error fetching user types', status: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
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
            <Button colorScheme="teal" mb={4} onClick={() => { setSelectedUserType(null); setFormVisible(true); }}>Create New User Type</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>User Type</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {userTypes.map(userType => (
                        <Tr key={userType.userTypeId}>
                            <Td>{userType.userTypeId}</Td>
                            <Td>{userType.userType}</Td>
                            <Td>{userType.isActive ? 'Active' : 'Inactive'}</Td>
                            <Td>
                                <IconButton icon={<FiEdit2 />} aria-label="Edit" onClick={() => { setSelectedUserType(userType); setFormVisible(true); }}  />
                                <IconButton icon={<FiTrash2 />} aria-label="Delete" onClick={() => handleDelete(userType.userTypeId)} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <UserTypeForm visible={isFormVisible} onCancel={() => setFormVisible(false)} onSuccess={() => { setFormVisible(false); fetchUserTypes(); }} record={selectedUserType} />
        </Box>
    );
};

export default UserTypeList;
