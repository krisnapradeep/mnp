import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { axiosInstance } from '../../../config/config';

const BeneficiaryTypeForm: React.FC<{ visible: boolean; onCancel: () => void; onSuccess: () => void; record?: any; }> = ({ visible, onCancel, onSuccess, record }) => {
    const [beneficiaryType, setBeneficiaryType] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (record) {
            setBeneficiaryType(record.beneficiaryType);
        } else {
            setBeneficiaryType('');
        }
    }, [record]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (record) {
                await axiosInstance.put(`/beneficiary-type/${record.beneficiaryTypeId}`, { beneficiaryType });
                toast({ title: 'Beneficiary type updated', status: 'success' });
            } else {
                await axiosInstance.post('/beneficiary-type', { beneficiaryType });
                toast({ title: 'Beneficiary type created', status: 'success' });
            }
            setBeneficiaryType('');
            onSuccess();
        } catch (error) {
            toast({ title: 'Error saving beneficiary type', status: 'error' });
        }
    };

    if (!visible) return null;

    return (
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Beneficiary Type Name</FormLabel>
                    <Input value={beneficiaryType} onChange={(e) => setBeneficiaryType(e.target.value)} />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">{record ? 'Update' : 'Create'} Beneficiary Type</Button>
                <Button mt={4} ml={4} onClick={onCancel}>Cancel</Button>
            </form>
        </Box>
    );
};

export default BeneficiaryTypeForm;
