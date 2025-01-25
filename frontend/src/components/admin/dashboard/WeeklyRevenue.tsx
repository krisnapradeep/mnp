import React from 'react';
import {
    Box,
    Flex,
    Text,
    useColorModeValue,
    Button,
    ButtonGroup
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
    { name: 'Week 1', revenue: 32000, profit: 24000 },
    { name: 'Week 2', revenue: 40000, profit: 29000 },
    { name: 'Week 3', revenue: 35000, profit: 25000 },
    { name: 'Week 4', revenue: 48000, profit: 35000 }
];

const WeeklyRevenue = () => {
    const [activeView, setActiveView] = React.useState<'revenue' | 'profit'>('revenue');
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
                        Weekly Revenue
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                        Revenue & Profit Overview
                    </Text>
                </Box>
                <ButtonGroup size="sm" isAttached variant="outline">
                    <Button
                        colorScheme={activeView === 'revenue' ? 'blue' : 'gray'}
                        onClick={() => setActiveView('revenue')}
                    >
                        Revenue
                    </Button>
                    <Button
                        colorScheme={activeView === 'profit' ? 'blue' : 'gray'}
                        onClick={() => setActiveView('profit')}
                    >
                        Profit
                    </Button>
                </ButtonGroup>
            </Flex>

            <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
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
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                background: cardBg,
                                border: 'none',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                            }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, activeView === 'revenue' ? 'Revenue' : 'Profit']}
                        />
                        <Line
                            type="monotone"
                            dataKey={activeView}
                            stroke="#4318FF"
                            strokeWidth={3}
                            dot={{ r: 6, fill: '#4318FF', strokeWidth: 3, stroke: '#fff' }}
                            activeDot={{ r: 8, fill: '#4318FF', strokeWidth: 3, stroke: '#fff' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default WeeklyRevenue;
