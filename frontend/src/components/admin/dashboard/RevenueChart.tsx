//import React from 'react';
import {
    Box,
    Flex,
    Text,
    useColorModeValue,
    Select
} from '@chakra-ui/react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'SEP', value1: 37000, value2: 25000 },
    { name: 'OCT', value1: 32000, value2: 28000 },
    { name: 'NOV', value1: 42000, value2: 30000 },
    { name: 'DEC', value1: 35000, value2: 27000 },
    { name: 'JAN', value1: 40000, value2: 32000 },
    { name: 'FEB', value1: 45000, value2: 35000 }
];

const RevenueChart = () => {
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
                        Weekly Revenue
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                        Revenue & Profit Overview
                    </Text>
                </Box>
                <Select
                    maxW="150px"
                    size="sm"
                    defaultValue="monthly"
                    borderRadius="full"
                >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </Select>
            </Flex>

            <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
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
                            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                        />
                        <Line
                            type="monotone"
                            dataKey="value1"
                            stroke="#4318FF"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value2"
                            stroke="#6AD2FF"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default RevenueChart;
