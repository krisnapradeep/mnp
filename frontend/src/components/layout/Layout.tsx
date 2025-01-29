import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box minH="100vh">
            <Header />
            <Flex>
                <Sidebar onClose={() => {}} display={{ base: 'none', md: 'block' }} />
                <Box
                    ml={{ base: 0, md: 60 }}
                    w="full"
                    mt="60px"
                >
                    {children}
                </Box>
            </Flex>
        </Box>
    );
};

export default Layout;
