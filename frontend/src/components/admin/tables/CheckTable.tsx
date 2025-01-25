import React, { useState } from 'react';
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
    Checkbox,
    Icon,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Badge,
    useColorModeValue,
    Avatar
} from '@chakra-ui/react';
import { FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';

interface TableRow {
    name: string;
    email: string;
    role: string;
    status: string;
    lastActive: string;
    avatar: string;
}

const tableData: TableRow[] = [
    {
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
        lastActive: "23 min ago",
        avatar: "https://bit.ly/dan-abramov"
    },
    {
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Editor",
        status: "Offline",
        lastActive: "1 hour ago",
        avatar: "https://bit.ly/sage-adebayo"
    },
    {
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "Viewer",
        status: "Active",
        lastActive: "2 min ago",
        avatar: "https://bit.ly/prosper-baba"
    },
    {
        name: "Alice Brown",
        email: "alice@example.com",
        role: "Editor",
        status: "Active",
        lastActive: "Just now",
        avatar: "https://bit.ly/code-beast"
    }
];

const CheckTable = () => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const bgColor = useColorModeValue("white", "navy.700");

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedRows(tableData.map((_, index) => index));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (index: number) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter(i => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    const getStatusColor = (status: string) => {
        return status.toLowerCase() === 'active' ? 'green' : 'gray';
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
                    Check Table
                </Text>
                {selectedRows.length > 0 && (
                    <Button
                        colorScheme="red"
                        size="sm"
                        leftIcon={<Icon as={FiTrash2} />}
                    >
                        Delete Selected
                    </Button>
                )}
            </Flex>

            <Box overflowX="auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th
                                borderColor={borderColor}
                                width="40px"
                            >
                                <Checkbox
                                    isChecked={selectedRows.length === tableData.length}
                                    isIndeterminate={selectedRows.length > 0 && selectedRows.length < tableData.length}
                                    onChange={handleSelectAll}
                                />
                            </Th>
                            <Th
                                borderColor={borderColor}
                                color="gray.400"
                            >
                                User
                            </Th>
                            <Th
                                borderColor={borderColor}
                                color="gray.400"
                            >
                                Role
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
                                Last Active
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
                                    width="40px"
                                >
                                    <Checkbox
                                        isChecked={selectedRows.includes(index)}
                                        onChange={() => handleSelectRow(index)}
                                    />
                                </Td>
                                <Td borderColor={borderColor}>
                                    <Flex align="center" gap={3}>
                                        <Avatar
                                            size="sm"
                                            name={row.name}
                                            src={row.avatar}
                                        />
                                        <Box>
                                            <Text
                                                color={textColor}
                                                fontWeight="600"
                                            >
                                                {row.name}
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.500"
                                            >
                                                {row.email}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Td>
                                <Td
                                    borderColor={borderColor}
                                    color={textColor}
                                >
                                    {row.role}
                                </Td>
                                <Td borderColor={borderColor}>
                                    <Badge
                                        colorScheme={getStatusColor(row.status)}
                                        rounded="full"
                                        px={3}
                                        py={1}
                                    >
                                        {row.status}
                                    </Badge>
                                </Td>
                                <Td
                                    borderColor={borderColor}
                                    color="gray.500"
                                >
                                    {row.lastActive}
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

export default CheckTable;
