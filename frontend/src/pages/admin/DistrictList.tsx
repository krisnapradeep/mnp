import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { axiosInstance } from '../../../config/config';
import DistrictForm from './DistrictForm';

const DistrictList: React.FC = () => {
    const [districts, setDistricts] = useState<any[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState<any | null>(null);
    const toast = useToast();

    useEffect(() => {
        fetchDistricts();
    }, []);

    const fetchDistricts = async () => {
        try {
            const response = await axiosInstance.get('/district');
            setDistricts(response.data);
        } catch (error) {
            toast({ title: 'Error fetching districts', status: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/district/${id}`);
            fetchDistricts();
            toast({ title: 'District deleted', status: 'success' });
        } catch (error) {
            toast({ title: 'Error deleting district', status: 'error' });
        }
    };

    return (
        <Box p={5}>
            <Button colorScheme="teal" mb={4} onClick={() => { setSelectedDistrict(null); setFormVisible(true); }}>Create New District</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Head</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {districts.map(district => (
                        <Tr key={district.districtId}>
                            <Td>{district.districtId}</Td>
                            <Td>{district.districtName}</Td>
                            <Td>{district.head}</Td>
                            <Td>
                                <IconButton icon={<FiEdit2 />} onClick={() => { setSelectedDistrict(district); setFormVisible(true); }} />
                                <IconButton icon={<FiTrash2 />} onClick={() => handleDelete(district.districtId)} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <DistrictForm visible={isFormVisible} onCancel={() => setFormVisible(false)} onSuccess={() => { setFormVisible(false); fetchDistricts(); }} record={selectedDistrict} />
        </Box>
    );
};

export default DistrictList;
