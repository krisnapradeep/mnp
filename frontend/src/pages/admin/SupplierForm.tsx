import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { axiosInstance } from '../../../config/config';

const SupplierForm: React.FC<{ visible: boolean; onCancel: () => void; onSuccess: () => void; record?: any; }> = ({ visible, onCancel, onSuccess, record }) => {
    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [address, setAddress] = useState('');
    const [bankAccountName, setBankAccountName] = useState('');
    const [bankAccountNo, setBankAccountNo] = useState('');
    const [bankAccountIFSC, setBankAccountIFSC] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (record) {
            setName(record.name);
            setContactNo(record.contactNo);
            setAddress(record.address);
            setBankAccountName(record.bankAccountName);
            setBankAccountNo(record.bankAccountNo);
            setBankAccountIFSC(record.bankAccountIFSC);
        } else {
            setName('');
            setContactNo('');
            setAddress('');
            setBankAccountName('');
            setBankAccountNo('');
            setBankAccountIFSC('');
        }
    }, [record]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (record) {
                await axiosInstance.put(`/supplier/${record.supplierId}`, { name, contactNo, address, bankAccountName, bankAccountNo, bankAccountIFSC });
                toast({ title: 'Supplier updated', status: 'success' });
            } else {
                await axiosInstance.post('/supplier', { name, contactNo, address, bankAccountName, bankAccountNo, bankAccountIFSC });
                toast({ title: 'Supplier created', status: 'success' });
            }
            setName('');
            setContactNo('');
            setAddress('');
            setBankAccountName('');
            setBankAccountNo('');
            setBankAccountIFSC('');
            onSuccess();
        } catch (error) {
            toast({ title: 'Error saving supplier', status: 'error' });
        }
    };

    if (!visible) return null;

    return (
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Contact No</FormLabel>
                    <Input value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Bank Account Name</FormLabel>
                    <Input value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Bank Account No</FormLabel>
                    <Input value={bankAccountNo} onChange={(e) => setBankAccountNo(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Bank Account IFSC</FormLabel>
                    <Input value={bankAccountIFSC} onChange={(e) => setBankAccountIFSC(e.target.value)} />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">{record ? 'Update' : 'Create'} Supplier</Button>
                <Button mt={4} ml={4} onClick={onCancel}>Cancel</Button>
            </form>
        </Box>
    );
};

export default SupplierForm;
