import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';
import { axiosInstance } from '../../config/config';

const UserTypeList: React.FC = () => {
    const [userTypes, setUserTypes] = useState<any[]>([]);
    const toast = useToast();

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                const response = await axiosInstance.get('/usertypes');
                setUserTypes(response.data);
            } catch (error) {
                toast({
                    title: "Error fetching user types.",
                    description: "Unable to load user types from the server.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };
        fetchUserTypes();
    }, []);

    return (
        <Box p={4}>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>User Type</Th>
                        <Th>Description</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {userTypes.map((userType) => (
                        <Tr key={userType.id}>
                            <Td>{userType.name}</Td>
                            <Td>{userType.description}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default UserTypeList;
