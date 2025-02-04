//import React from 'react';
import {
    Box,
    Flex,
    Text,
    Icon,
    useColorModeValue
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface StatCardProps {
    title: string;
    value: string;
    icon: IconType;
    subtitle?: string;
    trend?: {
        value: number;
        isUpward: boolean;
    };
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    subtitle,
    trend
}) => {
    const bgColor = useColorModeValue('white', 'navy.700');
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const iconBg = useColorModeValue('blue.100', 'whiteAlpha.200');
    const iconColor = useColorModeValue('blue.500', 'white');
    const trendColor = trend?.isUpward ? 'green.500' : 'red.500';

    return (
        <Box
            bg={bgColor}
            p={6}
            rounded="20px"
            shadow="sm"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
        >
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Text
                    color="gray.500"
                    fontSize="sm"
                    fontWeight="500"
                >
                    {title}
                </Text>
                <Box
                    bg={iconBg}
                    p={2}
                    rounded="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Icon
                        as={icon}
                        w={5}
                        h={5}
                        color={iconColor}
                    />
                </Box>
            </Flex>

            <Text
                color={textColor}
                fontSize="2xl"
                fontWeight="700"
                mb={2}
            >
                {value}
            </Text>

            {(subtitle || trend) && (
                <Flex alignItems="center" gap={2}>
                    {subtitle && (
                        <Text color="gray.500" fontSize="sm">
                            {subtitle}
                        </Text>
                    )}
                    {trend && (
                        <Text color={trendColor} fontSize="sm" fontWeight="500">
                            {trend.isUpward ? '+' : '-'}{Math.abs(trend.value)}%
                        </Text>
                    )}
                </Flex>
            )}
        </Box>
    );
};

export default StatCard;
