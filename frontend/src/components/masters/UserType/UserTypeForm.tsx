import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { axiosInstance } from '../../../config/config';

const UserTypeForm: React.FC<{ visible: boolean; onCancel: () => void; onSuccess: () => void; }> = ({ visible, onCancel, onSuccess }) => {
    const [name, setName] = useState('');
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/user-types', { name });
            toast({ title: 'User type created', status: 'success' });
            setName('');
            onSuccess();
        } catch (error) {
            toast({ title: 'Error creating user type', status: 'error' });
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
                <Button mt={4} colorScheme="teal" type="submit">Create User Type</Button>
                <Button mt={4} ml={4} onClick={onCancel}>Cancel</Button>
            </form>
        </Box>
    );
};

export default UserTypeForm;
