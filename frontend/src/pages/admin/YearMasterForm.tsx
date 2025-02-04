import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { axiosInstance } from '@/config/config';

const YearMasterForm: React.FC<{ visible: boolean; onCancel: () => void; onSuccess: () => void; record?: any; }> = ({ visible, onCancel, onSuccess, record }) => {
    const [year, setYear] = useState<number | string>('');
    const [isCurrent, setIsCurrent] = useState<boolean>(false);
    const toast = useToast();

    useEffect(() => {
        if (record) {
            setYear(record.year);
            setIsCurrent(record.isCurrent);
        } else {
            setYear('');
            setIsCurrent(false);
        }
    }, [record]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (record) {
                await axiosInstance.put(`/year/${record.yearMasterId}`, { year, isCurrent });
                toast({ title: 'Year updated', status: 'success' });
            } else {
                await axiosInstance.post('/year', { year, isCurrent });
                toast({ title: 'Year created', status: 'success' });
            }
            setYear('');
            setIsCurrent(false);
            onSuccess();
        } catch (error) {
            toast({ title: 'Error saving year', status: 'error' });
        }
    };

    if (!visible) return null;

    return (
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Year</FormLabel>
                    <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Is Current</FormLabel>
                    <Input type="checkbox" checked={isCurrent} onChange={(e) => setIsCurrent(e.target.checked)} />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">{record ? 'Update' : 'Create'} Year</Button>
                <Button mt={4} ml={4} onClick={onCancel}>Cancel</Button>
            </form>
        </Box>
    );
};

export default YearMasterForm;
