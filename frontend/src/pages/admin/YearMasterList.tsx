import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { axiosInstance } from '@/config/config';
import YearMasterForm from './YearMasterForm';

const YearMasterList: React.FC = () => {
    const [years, setYears] = useState<any[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedYear, setSelectedYear] = useState<any | null>(null);
    const toast = useToast();

    useEffect(() => {
        fetchYears();
    }, []);

    const fetchYears = async () => {
        try {
            const response = await axiosInstance.get('/year');
            setYears(response.data);
        } catch (error) {
            toast({ title: 'Error fetching years', status: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/year/${id}`);
            fetchYears();
            toast({ title: 'Year deleted', status: 'success' });
        } catch (error) {
            toast({ title: 'Error deleting year', status: 'error' });
        }
    };

    return (
        <Box p={5}>
            <Button colorScheme="teal" mb={4} onClick={() => { setSelectedYear(null); setFormVisible(true); }}>Create New Year</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Year</Th>
                        <Th>Current</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {years.map(year => (
                        <Tr key={year.yearMasterId}>
                            <Td>{year.yearMasterId}</Td>
                            <Td>{year.year}</Td>
                            <Td>{year.isCurrent ? 'Yes' : 'No'}</Td>
                            <Td>
                                <IconButton 
                                    aria-label="Edit year"
                                    icon={<FiEdit2 />} 
                                    onClick={() => { setSelectedYear(year); setFormVisible(true); }} 
                                />
                                <IconButton 
                                    aria-label="Delete year"
                                    icon={<FiTrash2 />} 
                                    onClick={() => handleDelete(year.yearMasterId)} 
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <YearMasterForm visible={isFormVisible} onCancel={() => setFormVisible(false)} onSuccess={() => { setFormVisible(false); fetchYears(); }} record={selectedYear} />
        </Box>
    );
};

export default YearMasterList;
