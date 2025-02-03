import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useAuth } from '../../context/AuthContext';
import { axiosInstance } from '../../config/config';

export default function Profile() {
    const { user, token } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axiosInstance.patch(
                'users/profile',
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            toast({
                title: 'Profile Updated',
                description: 'Your profile has been successfully updated.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to update profile',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box p={8}>
            <Box
                maxW={'800px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'2xl'}
                rounded={'xl'}
                p={6}
                mx="auto"
            >
                <Heading size="lg" mb={6}>Profile Settings</Heading>
                <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
                    <Center w={{ base: 'full', md: '200px' }}>
                        <Stack spacing={4} align={'center'}>
                            <Box position={'relative'}>
                                <Avatar
                                    size={'2xl'}
                                    src={user?.profileImage}
                                >
                                    <AvatarBadge
                                        as={IconButton}
                                        size="sm"
                                        rounded="full"
                                        top="-10px"
                                        colorScheme="red"
                                        aria-label="remove Image"
                                        icon={<SmallCloseIcon />}
                                    />
                                </Avatar>
                            </Box>
                            <Button w={'full'}>Change Avatar</Button>
                        </Stack>
                    </Center>
                    <Stack spacing={4} w={'full'}>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <Button
                            bg={'brand.400'}
                            color={'white'}
                            w="200px"
                            _hover={{
                                bg: 'brand.500',
                            }}
                            onClick={handleSubmit}
                            isLoading={isLoading}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                </Flex>
            </Box>
        </Box>
    );
}
