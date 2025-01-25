import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import SupplierForm from './SupplierForm';

const SupplierList: React.FC = () => {
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<any | null>(null);
    const toast = useToast();

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('/api/supplier');
            setSuppliers(response.data);
        } catch (error) {
            toast({ title: 'Error fetching suppliers', status: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/supplier/${id}`);
            fetchSuppliers();
            toast({ title: 'Supplier deleted', status: 'success' });
        } catch (error) {
            toast({ title: 'Error deleting supplier', status: 'error' });
        }
    };

    return (
        <Box p={5}>
            <Button colorScheme="teal" mb={4} onClick={() => { setSelectedSupplier(null); setFormVisible(true); }}>Create New Supplier</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {suppliers.map(supplier => (
                        <Tr key={supplier.supplierId}>
                            <Td>{supplier.supplierId}</Td>
                            <Td>{supplier.name}</Td>
                            <Td>
                                <IconButton icon={<FiEdit2 />} onClick={() => { setSelectedSupplier(supplier); setFormVisible(true); }} />
                                <IconButton icon={<FiTrash2 />} onClick={() => handleDelete(supplier.supplierId)} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <SupplierForm visible={isFormVisible} onCancel={() => setFormVisible(false)} onSuccess={() => { setFormVisible(false); fetchSuppliers(); }} record={selectedSupplier} />
        </Box>
    );
};

export default SupplierList;
