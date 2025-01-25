import React from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Flex,
    Icon,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Input,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
    Progress
} from '@chakra-ui/react';
import { FiMoreVertical, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';

interface ProgressData {
    value: number;
    color: string;
}

interface TableRow {
    name: string;
    status: string;
    date: string;
    progress: ProgressData;
}

const tableData: TableRow[] = [
    {
        name: "Marketplace",
        status: "Approved",
        date: "24 Jan 2025",
        progress: { value: 75.5, color: "green" }
    },
    {
        name: "Venus DB PRO",
        status: "Pending",
        date: "23 Jan 2025",
        progress: { value: 35.4, color: "orange" }
    },
    {
        name: "Venus DS",
        status: "Approved",
        date: "20 Jan 2025",
        progress: { value: 85.7, color: "green" }
    },
    {
        name: "CRM Dashboard",
        status: "Rejected",
        date: "18 Jan 2025",
        progress: { value: 25.5, color: "red" }
    }
];

const ComplexTable = () => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const bgColor = useColorModeValue("white", "navy.700");

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return 'green.500';
            case 'pending':
                return 'orange.500';
            case 'rejected':
                return 'red.500';
            default:
                return 'gray.500';
        }
    };

    return (
        <Box
            bg={bgColor}
            rounded="20px"
            p={6}
            shadow="sm"
        >
            <Flex justifyContent="space-between" mb={6}>
                <Text
                    color={textColor}
                    fontSize="xl"
                    fontWeight="700"
                >
                    Complex Table
                </Text>
                <Flex gap={4}>
                    <InputGroup maxW="200px">
                        <InputLeftElement>
                            <Icon as={FiSearch} color="gray.400" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search..."
                            borderRadius="full"
                        />
                    </InputGroup>
                    <Button
                        colorScheme="blue"
                        borderRadius="full"
                    >
                        Add New
                    </Button>
                </Flex>
            </Flex>

            <Box overflowX="auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th
                                borderColor={borderColor}
                                color="gray.400"
                            >
                                Name
                            </Th>
                            <Th
                                borderColor={borderColor}
                                color="gray.400"
                            >
                                Status
                            </Th>
                            <Th
                                borderColor={borderColor}
                                color="gray.400"
                            >
                                Date
                            </Th>
                            <Th
                                borderColor={borderColor}
                                color="gray.400"
                            >
                                Progress
                            </Th>
                            <Th
                                borderColor={borderColor}
                                color="gray.400"
                            >
                                Actions
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tableData.map((row, index) => (
                            <Tr key={index}>
                                <Td
                                    borderColor={borderColor}
                                    color={textColor}
                                >
                                    {row.name}
                                </Td>
                                <Td borderColor={borderColor}>
                                    <Text
                                        color={getStatusColor(row.status)}
                                        fontWeight="600"
                                    >
                                        {row.status}
                                    </Text>
                                </Td>
                                <Td
                                    borderColor={borderColor}
                                    color={textColor}
                                >
                                    {row.date}
                                </Td>
                                <Td borderColor={borderColor}>
                                    <Flex alignItems="center" gap={3}>
                                        <Progress
                                            value={row.progress.value}
                                            colorScheme={row.progress.color}
                                            size="sm"
                                            w="100px"
                                            borderRadius="full"
                                        />
                                        <Text
                                            color={textColor}
                                            fontWeight="600"
                                        >
                                            {row.progress.value}%
                                        </Text>
                                    </Flex>
                                </Td>
                                <Td borderColor={borderColor}>
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            variant="ghost"
                                            size="sm"
                                            px={2}
                                        >
                                            <Icon as={FiMoreVertical} />
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem icon={<Icon as={FiEdit2} />}>
                                                Edit
                                            </MenuItem>
                                            <MenuItem
                                                icon={<Icon as={FiTrash2} />}
                                                color="red.500"
                                            >
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default ComplexTable;
