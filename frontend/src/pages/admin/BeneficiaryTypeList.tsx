import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { axiosInstance } from '@/config/config';
import BeneficiaryTypeForm from './BeneficiaryTypeForm';

const BeneficiaryTypeList: React.FC = () => {
    const [beneficiaryTypes, setBeneficiaryTypes] = useState<any[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedBeneficiaryType, setSelectedBeneficiaryType] = useState<any | null>(null);
    const toast = useToast();

    useEffect(() => {
        fetchBeneficiaryTypes();
    }, []);

    const fetchBeneficiaryTypes = async () => {
        try {
            const response = await axiosInstance.get('/beneficiarytype');
            setBeneficiaryTypes(response.data);
        } catch (error) {
            toast({ title: 'Error fetching beneficiary types', status: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/beneficiary-type/${id}`);
            fetchBeneficiaryTypes();
            toast({ title: 'Beneficiary type deleted', status: 'success' });
        } catch (error) {
            toast({ title: 'Error deleting beneficiary type', status: 'error' });
        }
    };

    return (
        <Box p={5}>
            <Button colorScheme="teal" mb={4} onClick={() => { setSelectedBeneficiaryType(null); setFormVisible(true); }}>Create New Beneficiary Type</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Beneficiary Type</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {beneficiaryTypes.map(beneficiaryType => (
                        <Tr key={beneficiaryType.beneficiaryTypeId}>
                            <Td>{beneficiaryType.beneficiaryTypeId}</Td>
                            <Td>{beneficiaryType.beneficiaryType}</Td>
                            <Td>{beneficiaryType.isActive ? 'Active' : 'Inactive'}</Td>
                            <Td>
                                <IconButton
                                    icon={<FiEdit2 />}
                                    onClick={() => { setSelectedBeneficiaryType(beneficiaryType); setFormVisible(true); }}
                                    aria-label="Edit beneficiary type"
                                />
                                <IconButton
                                    icon={<FiTrash2 />}
                                    onClick={() => handleDelete(beneficiaryType.beneficiaryTypeId)}
                                    aria-label="Delete beneficiary type"
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <BeneficiaryTypeForm visible={isFormVisible} onCancel={() => setFormVisible(false)} onSuccess={() => { setFormVisible(false); fetchBeneficiaryTypes(); }} record={selectedBeneficiaryType} />
        </Box>
    );
};

export default BeneficiaryTypeList;
