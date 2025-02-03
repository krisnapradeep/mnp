import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { axiosInstance } from '../../../config/config';

const UserTypeForm: React.FC<{ visible: boolean; onCancel: () => void; onSuccess: () => void; record?: any; }> = ({ visible, onCancel, onSuccess, record }) => {
    const [name, setName] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (record) {
            setName(record.userType);
        } else {
            setName('');
        }
    }, [record]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (record) {
                await axiosInstance.put(`/user-types/${record.userTypeId}`, { userType: name });
                toast({ title: 'User type updated', status: 'success' });
            } else {
                await axiosInstance.post('/user-types', { userType: name });
                toast({ title: 'User type created', status: 'success' });
            }
            setName('');
            onSuccess();
        } catch (error) {
            toast({ title: 'Error saving user type', status: 'error' });
        }
    };

    if (!visible) return null;

    return (
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>User Type Name</FormLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">{record ? 'Update' : 'Create'} User Type</Button>
                <Button mt={4} ml={4} onClick={onCancel}>Cancel</Button>
            </form>
        </Box>
    );
};

export default UserTypeForm;
