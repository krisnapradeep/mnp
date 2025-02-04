import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { axiosInstance } from '@/config/config';

const SupplierPaymentForm: React.FC<{ visible: boolean; onCancel: () => void; onSuccess: () => void; record?: any; }> = ({ visible, onCancel, onSuccess, record }) => {
    const [supplierId, setSupplierId] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (record) {
            setSupplierId(record.supplierId);
            setAmount(record.amount);
            setDate(record.date);
        } else {
            setSupplierId('');
            setAmount('');
            setDate('');
        }
    }, [record]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (record) {
                await axiosInstance.put(`/supplier-payment/${record.supplierPaymentId}`, { supplierId, amount, date });
                toast({ title: 'Supplier payment updated', status: 'success' });
            } else {
                await axiosInstance.post('/supplier-payment', { supplierId, amount, date });
                toast({ title: 'Supplier payment created', status: 'success' });
            }
            setSupplierId('');
            setAmount('');
            setDate('');
            onSuccess();
        } catch (error) {
            toast({ title: 'Error saving supplier payment', status: 'error' });
        }
    };

    if (!visible) return null;

    return (
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Supplier ID</FormLabel>
                    <Input value={supplierId} onChange={(e) => setSupplierId(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Amount</FormLabel>
                    <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">{record ? 'Update' : 'Create'} Supplier Payment</Button>
                <Button mt={4} ml={4} onClick={onCancel}>Cancel</Button>
            </form>
        </Box>
    );
};

export default SupplierPaymentForm;
