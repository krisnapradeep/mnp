//import React from 'react';
import {
    Box,
    Flex,
    Text,
    useColorModeValue,
    Icon
} from '@chakra-ui/react';

interface MiniStatisticsProps {
    title: string;
    amount: string;
    icon: any;
    percentage?: number;
}

const MiniStatistics: React.FC<MiniStatisticsProps> = ({
    title,
    amount,
    icon,
    percentage
}) => {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const cardBg = useColorModeValue('white', 'navy.700');
    const iconBg = useColorModeValue('secondaryGray.300', 'navy.700');
    const cardShadow = useColorModeValue(
        '0px 18px 40px rgba(112, 144, 176, 0.12)',
        'unset'
    );

    return (
        <Box
            bg={cardBg}
            rounded="20px"
            p={4}
            shadow={cardShadow}
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
        >
            <Flex justifyContent="space-between" alignItems="center">
                <Box>
                    <Text
                        color="gray.500"
                        fontSize="sm"
                        fontWeight="500"
                        mb={1}
                    >
                        {title}
                    </Text>
                    <Text
                        color={textColor}
                        fontSize="2xl"
                        fontWeight="700"
                    >
                        {amount}
                    </Text>
                    {percentage && (
                        <Text
                            color={percentage > 0 ? 'green.500' : 'red.500'}
                            fontSize="sm"
                            fontWeight="500"
                        >
                            {percentage > 0 ? '+' : ''}{percentage}%
                        </Text>
                    )}
                </Box>
                <Box
                    bg={iconBg}
                    w="56px"
                    h="56px"
                    rounded="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Icon
                        as={icon}
                        w={6}
                        h={6}
                        color={textColor}
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export default MiniStatistics;
