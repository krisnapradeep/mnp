////import React from 'react';
import {
    Box,
    Flex,
    Text,
    useColorModeValue,
    Select
} from '@chakra-ui/react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Mon', value: 50 },
    { name: 'Tue', value: 80 },
    { name: 'Wed', value: 60 },
    { name: 'Thu', value: 90 },
    { name: 'Fri', value: 70 },
    { name: 'Sat', value: 40 },
    { name: 'Sun', value: 30 }
];

const DailyTraffic = () => {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const cardBg = useColorModeValue('white', 'navy.700');
    const cardShadow = useColorModeValue(
        '0px 18px 40px rgba(112, 144, 176, 0.12)',
        'unset'
    );

    return (
        <Box
            bg={cardBg}
            rounded="20px"
            p={6}
            shadow={cardShadow}
        >
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
                <Box>
                    <Text
                        color={textColor}
                        fontSize="lg"
                        fontWeight="700"
                        mb={1}
                    >
                        Daily Traffic
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                        Daily visitors count
                    </Text>
                </Box>
                <Select
                    w="120px"
                    variant="subtle"
                    defaultValue="weekly"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </Select>
            </Flex>

            <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#E2E8F0"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#A0AEC0', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#A0AEC0', fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(237, 242, 247, 0.6)' }}
                            contentStyle={{
                                background: cardBg,
                                border: 'none',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                            }}
                        />
                        <Bar
                            dataKey="value"
                            fill="#4318FF"
                            radius={[4, 4, 0, 0]}
                            barSize={30}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default DailyTraffic;
