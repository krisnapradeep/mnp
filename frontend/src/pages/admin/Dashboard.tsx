//import React from 'react';
import {
    Box,
    Grid,
    useColorModeValue
} from '@chakra-ui/react';
import {
    FiDollarSign,
    //FiUsers,
    FiShoppingBag,
    FiActivity,
    FiPackage,
    FiBarChart
} from 'react-icons/fi';

import StatCard from '../../components/admin/dashboard/StatCard';
import RevenueChart from '../../components/admin/dashboard/RevenueChart';
import BarChart from '../../components/admin/dashboard/BarChart';
import PieChart from '../../components/admin/dashboard/PieChart';
import TaskList from '../../components/admin/dashboard/TaskList';
import ComplexTable from '../../components/admin/tables/ComplexTable';

export default function Dashboard() {
    const bgColor = useColorModeValue('secondaryGray.100', 'navy.900');

    return (
        <Box
            pt={{ base: '130px', md: '80px', xl: '80px' }}
            pb="20px"
            px={{ base: '20px', md: '30px', xl: '40px' }}
            bg={bgColor}
            minH="100vh"
            mt="60px"
        >
            {/* First Row - Statistics Cards */}
            <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(6, 1fr)' }}
                gap="20px"
                mb="20px"
            >
                <StatCard
                    title="Earnings"
                    value="$340.5"
                    icon={FiDollarSign}
                />
                <StatCard
                    title="Spend this month"
                    value="$642.39"
                    icon={FiBarChart}
                />
                <StatCard
                    title="Sales"
                    value="$574.34"
                    icon={FiShoppingBag}
                />
                <StatCard
                    title="Your Balance"
                    value="$1,000"
                    icon={FiDollarSign}
                />
                <StatCard
                    title="New Tasks"
                    value="145"
                    icon={FiActivity}
                />
                <StatCard
                    title="Total Projects"
                    value="$2433"
                    icon={FiPackage}
                />
            </Grid>

            {/* Second Row - Charts */}
            <Grid
                templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
                gap="20px"
                mb="20px"
            >
                <RevenueChart />
                <BarChart />
            </Grid>

            {/* Third Row - Table and Charts */}
            <Grid
                templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
                gap="20px"
                mb="20px"
            >
                <ComplexTable />
                <PieChart />
            </Grid>

            {/* Fourth Row - Table and Task Lists */}
            <Grid
                templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
                gap="20px"
            >
                <ComplexTable />
                <TaskList />
            </Grid>
        </Box>
    );
}
