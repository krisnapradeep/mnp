import { useState, FormEvent } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { axiosInstance } from '../config/config';

const UserTypeForm = () => {
    const [name, setName] = useState('');
    const toast = useToast();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/user-types', { name });
            toast({ title: 'User type created', status: 'success' });
            setName('');
        } catch (error) {
            toast({ title: 'Error creating user type', status: 'error' });
        }
    };

    return (
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>User Type Name</FormLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">Create User Type</Button>
            </form>
        </Box>
    );
};

export default UserTypeForm;
