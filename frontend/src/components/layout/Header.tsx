//import React from 'react';
import {
    Box,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorMode,
    useColorModeValue,
    //Avatar,
    Text,
    Badge
} from '@chakra-ui/react';
import {
    FiSearch,
    FiBell,
    FiMoon,
    FiSun,
    FiUser,
    FiLogOut,
    FiSettings
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const bgColor = useColorModeValue('white', 'navy.800');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const shadowColor = useColorModeValue(
        '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
        '14px 17px 40px 4px rgba(12, 44, 76, 0.08)'
    );

    const handleLogout = async () => {
        await logout();
        navigate('/auth/signin');
    };

    return (
        <Box
            position="fixed"
            top="0"
            left={{ base: 0, md: 60 }}
            right="0"
            zIndex="sticky"
            bg={bgColor}
            borderBottom="1px"
            borderColor={borderColor}
            boxShadow={shadowColor}
            transition="all 0.3s"
        >
            <Flex
                alignItems="center"
                justifyContent="space-between"
                px={{ base: '20px', md: '30px', xl: '40px' }}
                py="16px"
            >
                {/* Logo/Brand */}
                <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={useColorModeValue('blue.600', 'white')}
                >
                    மக்கள் நலப்பணி
                </Text>

                {/* Right Section */}
                <Flex alignItems="center" gap={4}>
                    {/* Search */}
                    <InputGroup w="200px" display={{ base: 'none', md: 'block' }}>
                        <InputLeftElement>
                            <FiSearch color="gray.400" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search..."
                            borderRadius="full"
                            bg={useColorModeValue('gray.100', 'navy.700')}
                        />
                    </InputGroup>

                    {/* Notification */}
                    <IconButton
                        aria-label="Notifications"
                        icon={<FiBell />}
                        variant="ghost"
                        position="relative"
                    >
                        <Badge
                            position="absolute"
                            top="-2px"
                            right="-2px"
                            colorScheme="red"
                            borderRadius="full"
                            w="18px"
                            h="18px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            3
                        </Badge>
                    </IconButton>

                    {/* Dark Mode Toggle */}
                    <IconButton
                        aria-label="Toggle Dark Mode"
                        icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                        onClick={toggleColorMode}
                        variant="ghost"
                    />

                    {/* User Menu */}
                    <Menu>
                        <MenuButton>
                            {/* <Avatar
                                size="sm"
                                name="John Doe"
                                src="../../assets/images/profile.jpg"
                            /> */}
                            <IconButton
                                aria-label="Toggle Dark Mode"
                                icon={<FiUser />}
                                variant="ghost"
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem icon={<FiUser />} onClick={() => navigate('/admin/profile')} >Profile</MenuItem>
                            <MenuItem icon={<FiSettings />}>Settings</MenuItem>
                            <MenuItem
                                icon={<FiLogOut />}
                                onClick={handleLogout}
                                color="red.500"
                            >
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;
