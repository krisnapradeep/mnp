////import React from 'react';
import {
    Box,
    Flex,
    Text,
    useColorModeValue,
    Select
} from '@chakra-ui/react';
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

const data = [
    { name: 'Your Files', value: 63 },
    { name: 'System', value: 25 },
    { name: 'Other', value: 12 }
];

const COLORS = ['#4318FF', '#6AD2FF', '#EFF4FB'];

const PieChart = () => {
    const bgColor = useColorModeValue('white', 'navy.700');
    const textColor = useColorModeValue('secondaryGray.900', 'white');

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
                        Your Pie Chart
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                        Storage Information
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
                    <RechartsPieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}-${entry}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: bgColor,
                                border: 'none',
                                borderRadius: '10px',
                                boxShadow: '0px 0px 20px rgba(0,0,0,0.1)'
                            }}
                            formatter={(value: number) => [`${value}%`, 'Usage']}
                        />
                    </RechartsPieChart>
                </ResponsiveContainer>
            </Box>

            <Flex justifyContent="center" gap={6} mt={4}>
                {data.map((item, index) => (
                    <Flex key={index} alignItems="center" gap={2}>
                        <Box
                            w="10px"
                            h="10px"
                            rounded="full"
                            bg={COLORS[index]}
                        />
                        <Text fontSize="sm" color="gray.500">
                            {item.name}
                        </Text>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};

export default PieChart;
