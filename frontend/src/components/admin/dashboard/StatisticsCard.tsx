//import React from 'react';
import {
    Box,
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    useColorModeValue,
    Icon
} from '@chakra-ui/react';

interface StatisticsCardProps {
    title: string;
    value: string;
    percentage: number;
    icon: any;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value, percentage, icon }) => {
    const bgColor = useColorModeValue('white', 'navy.700');
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const iconBg = useColorModeValue('secondaryGray.300', 'navy.700');

    return (
        <Box
            bg={bgColor}
            p={6}
            rounded="20px"
            shadow="sm"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
        >
            <Flex justifyContent="space-between" alignItems="center">
                <Stat>
                    <StatLabel
                        fontSize="sm"
                        color="gray.500"
                        fontWeight="500"
                        mb={2}
                    >
                        {title}
                    </StatLabel>
                    <StatNumber
                        color={textColor}
                        fontSize="2xl"
                        fontWeight="700"
                    >
                        {value}
                    </StatNumber>
                    <StatHelpText
                        display="flex"
                        alignItems="center"
                        gap={1}
                    >
                        <StatArrow type={percentage > 0 ? 'increase' : 'decrease'} />
                        {Math.abs(percentage)}% since last month
                    </StatHelpText>
                </Stat>
                <Box
                    p={3}
                    bg={iconBg}
                    rounded="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Icon as={icon} w={6} h={6} color={textColor} />
                </Box>
            </Flex>
        </Box>
    );
};

export default StatisticsCard;
