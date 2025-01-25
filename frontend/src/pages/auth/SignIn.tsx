import { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Text,
    useColorModeValue,
    useToast,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const validateForm = () => {
        if (!email) {
            setError('Email is required');
            return false;
        }
        if (!password) {
            setError('Password is required');
            return false;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            console.log('Submitting login form with email:', email);
            await login(email, password);
            
            toast({
                title: 'Login Successful',
                description: 'Welcome back!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            
            navigate('/admin/default');
        } catch (error: any) {
            console.error('Login form error:', error);
            const errorMessage = error.message || 'An unexpected error occurred';
            setError(errorMessage);
            
            toast({
                title: 'Login Failed',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Box
                maxW={'445px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'2xl'}
                rounded={'xl'}
                p={6}
                my={12}
            >
                <VStack spacing={4} align="stretch">
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        lineHeight={1.1}
                        fontSize={{ base: '2xl', md: '3xl' }}
                    >
                        Sign in to your account
                    </Heading>

                    {error && (
                        <Alert status="error" rounded="md">
                            <AlertIcon />
                            <Box flex="1">
                                <AlertTitle>Authentication Error</AlertTitle>
                                <AlertDescription display="block">
                                    {error}
                                </AlertDescription>
                            </Box>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="mail@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError('');
                                    }}
                                />
                            </FormControl>

                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                />
                            </FormControl>

                            <Flex justify="space-between" align="center" w="full">
                                <Checkbox>Keep me logged in</Checkbox>
                                <Link color="brand.500" href="#" fontSize="sm">
                                    Forgot password?
                                </Link>
                            </Flex>

                            <Button
                                type="submit"
                                bg="brand.500"
                                w="full"
                                h="50"
                                color="white"
                                _hover={{
                                    bg: 'brand.600',
                                }}
                                isLoading={isLoading}
                                loadingText="Signing in..."
                            >
                                Sign in
                            </Button>

                            <Flex justify="center" align="center">
                                <Text fontSize="sm" color="gray.600">
                                    Not registered yet?{' '}
                                    <Link color="brand.500" href="#" fontWeight="bold">
                                        Create an Account
                                    </Link>
                                </Text>
                            </Flex>
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </Flex>
    );
}
