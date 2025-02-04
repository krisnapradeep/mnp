import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { axiosInstance } from '@/config/config';

const BeneficiaryForm: React.FC<{ visible: boolean; onCancel: () => void; onSuccess: () => void; record?: any; }> = ({ visible, onCancel, onSuccess, record }) => {
    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [address, setAddress] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (record) {
            setName(record.name);
            setContactNo(record.contactNo);
            setAddress(record.address);
        } else {
            setName('');
            setContactNo('');
            setAddress('');
        }
    }, [record]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (record) {
                await axiosInstance.put(`/beneficiary/${record.beneficiaryId}`, { name, contactNo, address });
                toast({ title: 'Beneficiary updated', status: 'success' });
            } else {
                await axiosInstance.post('/beneficiary', { name, contactNo, address });
                toast({ title: 'Beneficiary created', status: 'success' });
            }
            setName('');
            setContactNo('');
            setAddress('');
            onSuccess();
        } catch (error) {
            toast({ title: 'Error saving beneficiary', status: 'error' });
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
                <Button mt={4} colorScheme="teal" type="submit">{record ? 'Update' : 'Create'} Beneficiary</Button>
                <Button mt={4} ml={4} onClick={onCancel}>Cancel</Button>
            </form>
        </Box>
    );
};

export default BeneficiaryForm;
