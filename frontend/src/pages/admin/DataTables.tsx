import React from 'react';
import {
    Box,
    Grid,
    useColorModeValue
} from '@chakra-ui/react';
import ComplexTable from '../../components/admin/tables/ComplexTable';
import CheckTable from '../../components/admin/tables/CheckTable';

export default function DataTables() {
    const bgColor = useColorModeValue('secondaryGray.100', 'navy.900');

    return (
        <Box
            pt={{ base: '130px', md: '80px', xl: '80px' }}
            pb="20px"
            px={{ base: '20px', md: '30px', xl: '40px' }}
            bg={bgColor}
            minH="100vh"
        >
            <Grid
                templateColumns="1fr"
                gap="20px"
            >
                <ComplexTable />
                <CheckTable />
            </Grid>
        </Box>
    );
}
