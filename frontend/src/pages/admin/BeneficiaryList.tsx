import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { axiosInstance } from '../../config/config';
import BeneficiaryForm from './BeneficiaryForm';

const BeneficiaryList: React.FC = () => {
    const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState<any | null>(null);
    const toast = useToast();

    useEffect(() => {
        fetchBeneficiaries();
    }, []);

    const fetchBeneficiaries = async () => {
        try {
            const response = await axiosInstance.get('/beneficiary');
            setBeneficiaries(response.data);
        } catch (error) {
            toast({ title: 'Error fetching beneficiaries', status: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/beneficiary/${id}`);
            fetchBeneficiaries();
            toast({ title: 'Beneficiary deleted', status: 'success' });
        } catch (error) {
            toast({ title: 'Error deleting beneficiary', status: 'error' });
        }
    };

    return (
        <Box p={5}>
            <Button colorScheme="teal" mb={4} onClick={() => { setSelectedBeneficiary(null); setFormVisible(true); }}>Create New Beneficiary</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {beneficiaries.map(beneficiary => (
                        <Tr key={beneficiary.beneficiaryId}>
                            <Td>{beneficiary.beneficiaryId}</Td>
                            <Td>{beneficiary.name}</Td>
                            <Td>
                                <IconButton icon={<FiEdit2 />} aria-label="Edit" onClick={() => { setSelectedBeneficiary(beneficiary); setFormVisible(true); }} />
                                <IconButton icon={<FiTrash2 />} aria-label="Delete" onClick={() => handleDelete(beneficiary.beneficiaryId)} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <BeneficiaryForm visible={isFormVisible} onCancel={() => setFormVisible(false)} onSuccess={() => { setFormVisible(false); fetchBeneficiaries(); }} record={selectedBeneficiary} />
        </Box>
    );
};

export default BeneficiaryList;
