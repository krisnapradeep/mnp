import React, { useState } from 'react';
import {
    Box,
    Flex,
    Icon,
    Text,
    Link,
    BoxProps,
    useColorModeValue,
    Collapse,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons';
import {
    FiHome,
    FiTrendingUp,
    FiStar,
    FiSettings,
} from 'react-icons/fi';

interface LinkItemProps {
    name: string;
    icon: IconType;
    path: string;
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Dashboard', icon: FiHome, path: '/admin/default' },
    { name: 'Reports', icon: FiTrendingUp, path: '/admin/data-tables' },
    // { name: 'Profile', icon: FiStar, path: '/admin/profile' },
    
];

const MasterItems: Array<LinkItemProps> = [
    { name: 'User Types', icon: FiStar, path: '/master/user-types' },
    { name: 'Beneficiaries', icon: FiStar, path: '/master/beneficiaries' },
    { name: 'Settings', icon: FiSettings, path: '/admin/settings' },
    { name: 'Articles', icon: FiStar, path: '/admin/articles' },
    { name: 'Article Orders', icon: FiStar, path: '/admin/article-orders' },
    { name: 'Beneficiary Types', icon: FiStar, path: '/admin/beneficiary-types' },
    { name: 'Categories', icon: FiStar, path: '/admin/categories' },
    { name: 'Districts', icon: FiStar, path: '/admin/districts' },
    { name: 'Suppliers', icon: FiStar, path: '/admin/suppliers' },
    { name: 'Supplier Payments', icon: FiStar, path: '/admin/supplier-payments' },
    { name: 'Year Master', icon: FiStar, path: '/admin/year-master' },
];

const TransactionItems: Array<LinkItemProps> = [
    { name: 'Article Orders', icon: FiStar, path: '/transaction/article-orders' },
    { name: 'Beneficiary List', icon: FiStar, path: '/transaction/beneficiary-list' },
];

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export default function Sidebar({ onClose, ...rest }: SidebarProps) {
    const location = useLocation();
    const [isMasterOpen, setMasterOpen] = useState(false);
    const [isTransactionOpen, setTransactionOpen] = useState(false);

    return (
        <Box
            as="aside"
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: '250px' }}
            pos="fixed"
            h="full"
            overflowY="auto"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    MNP
                </Text>
            </Flex>
            {LinkItems.map((link) => (
                <NavItem
                    key={link.name}
                    icon={link.icon}
                    path={link.path}
                    isActive={location.pathname === link.path}
                >
                    {link.name}
                </NavItem>
            ))}
            <NavItem
                icon={FiStar}
                path="#"
                isActive={isMasterOpen}
                onClick={() => setMasterOpen(!isMasterOpen)}
            >
                Master
            </NavItem>
            <Collapse in={isMasterOpen} animateOpacity>
                {MasterItems.map((link) => (
                    <NavItem
                        key={link.name}
                        icon={link.icon}
                        path={link.path}
                        isActive={location.pathname === link.path}
                    >
                        {link.name}
                    </NavItem>
                ))}
            </Collapse>
            <NavItem
                icon={FiStar}
                path="#"
                isActive={isTransactionOpen}
                onClick={() => setTransactionOpen(!isTransactionOpen)}
            >
                Transactions
            </NavItem>
            <Collapse in={isTransactionOpen} animateOpacity>
                {TransactionItems.map((link) => (
                    <NavItem
                        key={link.name}
                        icon={link.icon}
                        path={link.path}
                        isActive={location.pathname === link.path}
                    >
                        {link.name}
                    </NavItem>
                ))}
            </Collapse>
        </Box>
    );
}

interface NavItemProps extends BoxProps {
    icon: IconType;
    path: string;
    isActive?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

const NavItem = ({ icon, path, isActive, children, onClick, ...rest }: NavItemProps) => {
    return (
        <Link
            as={RouterLink}
            to={path}
            style={{ textDecoration: 'none' }}
            onClick={onClick}
            {...rest}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="md"
                role="group"
                backgroundColor={isActive ? 'cyan.400' : 'transparent'}
                _hover={{ bg: 'cyan.200', color: 'white' }}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        as={icon}
                        _groupHover={{ color: 'white' }}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};
