import React from 'react';
import {
    Box,
    Flex,
    Text,
    useColorModeValue,
    Select
} from '@chakra-ui/react';
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { name: '1', value1: 2500, value2: 1500 },
    { name: '2', value1: 3000, value2: 2000 },
    { name: '3', value1: 2000, value2: 1000 },
    { name: '4', value1: 3500, value2: 2500 },
    { name: '5', value1: 2800, value2: 1800 },
    { name: '6', value1: 3200, value2: 2200 },
    { name: '7', value1: 2600, value2: 1600 }
];

const BarChart = () => {
    const bgColor = useColorModeValue('white', 'navy.700');
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

    return (
        <Box
            bg={bgColor}
            p={6}
            rounded="20px"
            shadow="sm"
        >
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
                <Box>
                    <Text
                        color={textColor}
                        fontSize="lg"
                        fontWeight="700"
                        mb={1}
                    >
                        Weekly Sales
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                        Sales & Revenue Overview
                    </Text>
                </Box>
                <Select
                    maxW="150px"
                    size="sm"
                    defaultValue="weekly"
                    borderRadius="full"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </Select>
            </Flex>

            <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={data} barGap={5}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={borderColor}
                            vertical={false}
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'gray.500', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'gray.500', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: bgColor,
                                border: 'none',
                                borderRadius: '10px',
                                boxShadow: '0px 0px 20px rgba(0,0,0,0.1)'
                            }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
                        />
                        <Bar
                            dataKey="value1"
                            fill="#4318FF"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                        <Bar
                            dataKey="value2"
                            fill="#6AD2FF"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default BarChart;
