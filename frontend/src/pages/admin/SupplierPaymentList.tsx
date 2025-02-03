import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { axiosInstance } from '../../../config/config';
import SupplierPaymentForm from './SupplierPaymentForm';

const SupplierPaymentList: React.FC = () => {
    const [supplierPayments, setSupplierPayments] = useState<any[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedSupplierPayment, setSelectedSupplierPayment] = useState<any | null>(null);
    const toast = useToast();

    useEffect(() => {
        fetchSupplierPayments();
    }, []);

    const fetchSupplierPayments = async () => {
        try {
            const response = await axiosInstance.get('/supplierpayment');
            setSupplierPayments(response.data);
        } catch (error) {
            toast({ title: 'Error fetching supplier payments', status: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/supplier-payment/${id}`);
            fetchSupplierPayments();
            toast({ title: 'Supplier payment deleted', status: 'success' });
        } catch (error) {
            toast({ title: 'Error deleting supplier payment', status: 'error' });
        }
    };

    return (
        <Box p={5}>
            <Button colorScheme="teal" mb={4} onClick={() => { setSelectedSupplierPayment(null); setFormVisible(true); }}>Create New Supplier Payment</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Supplier</Th>
                        <Th>Amount</Th>
                        <Th>Date</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {supplierPayments.map(payment => (
                        <Tr key={payment.supplierPaymentId}>
                            <Td>{payment.supplierPaymentId}</Td>
                            <Td>{payment.supplierName}</Td>
                            <Td>{payment.amount}</Td>
                            <Td>{payment.date}</Td>
                            <Td>
                                <IconButton icon={<FiEdit2 />} onClick={() => { setSelectedSupplierPayment(payment); setFormVisible(true); }} />
                                <IconButton icon={<FiTrash2 />} onClick={() => handleDelete(payment.supplierPaymentId)} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <SupplierPaymentForm visible={isFormVisible} onCancel={() => setFormVisible(false)} onSuccess={() => { setFormVisible(false); fetchSupplierPayments(); }} record={selectedSupplierPayment} />
        </Box>
    );
};

export default SupplierPaymentList;
