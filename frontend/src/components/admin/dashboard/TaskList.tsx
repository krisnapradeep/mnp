import React from 'react';
import {
    Box,
    Flex,
    Text,
    Checkbox,
    Badge,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useColorModeValue,
    Progress
} from '@chakra-ui/react';
import { FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Task {
    id: number;
    title: string;
    status: 'pending' | 'in-progress' | 'completed';
    progress: number;
    assignee: {
        name: string;
        avatar: string;
    };
    dueDate: string;
}

const tasks: Task[] = [
    {
        id: 1,
        title: "Update Homepage Design",
        status: 'in-progress',
        progress: 60,
        assignee: {
            name: "Alex Smith",
            avatar: "https://bit.ly/dan-abramov"
        },
        dueDate: "24 Jan 2025"
    },
    {
        id: 2,
        title: "Add Authentication Flow",
        status: 'completed',
        progress: 100,
        assignee: {
            name: "Sarah Johnson",
            avatar: "https://bit.ly/sage-adebayo"
        },
        dueDate: "23 Jan 2025"
    },
    {
        id: 3,
        title: "Fix Navigation Bug",
        status: 'pending',
        progress: 0,
        assignee: {
            name: "Mike Wilson",
            avatar: "https://bit.ly/prosper-baba"
        },
        dueDate: "25 Jan 2025"
    },
    {
        id: 4,
        title: "Implement Dark Mode",
        status: 'in-progress',
        progress: 75,
        assignee: {
            name: "Emily Brown",
            avatar: "https://bit.ly/code-beast"
        },
        dueDate: "26 Jan 2025"
    }
];

const TaskList = () => {
    const bgColor = useColorModeValue('white', 'navy.700');
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

    const getStatusColor = (status: Task['status']) => {
        switch (status) {
            case 'completed':
                return 'green';
            case 'in-progress':
                return 'orange';
            case 'pending':
                return 'gray';
            default:
                return 'gray';
        }
    };

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
                        Tasks Overview
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                        {tasks.length} tasks in total
                    </Text>
                </Box>
            </Flex>

            <Box>
                {tasks.map((task) => (
                    <Box
                        key={task.id}
                        py={4}
                        borderBottom="1px"
                        borderColor={borderColor}
                        _last={{ borderBottom: 'none' }}
                    >
                        <Flex justifyContent="space-between" alignItems="center" mb={3}>
                            <Flex alignItems="center" gap={3}>
                                <Checkbox colorScheme="blue" isChecked={task.status === 'completed'} />
                                <Box>
                                    <Text
                                        color={textColor}
                                        fontSize="md"
                                        fontWeight="600"
                                        mb={1}
                                    >
                                        {task.title}
                                    </Text>
                                    <Text color="gray.500" fontSize="sm">
                                        Due {task.dueDate}
                                    </Text>
                                </Box>
                            </Flex>
                            <Flex alignItems="center" gap={4}>
                                <Badge
                                    colorScheme={getStatusColor(task.status)}
                                    rounded="full"
                                    px={3}
                                    py={1}
                                >
                                    {task.status}
                                </Badge>
                                <Avatar
                                    size="sm"
                                    name={task.assignee.name}
                                    src={task.assignee.avatar}
                                />
                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        icon={<FiMoreVertical />}
                                        variant="ghost"
                                        size="sm"
                                    />
                                    <MenuList>
                                        <MenuItem icon={<FiEdit2 />}>Edit</MenuItem>
                                        <MenuItem icon={<FiTrash2 />} color="red.500">Delete</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        </Flex>
                        <Progress
                            value={task.progress}
                            size="sm"
                            colorScheme={getStatusColor(task.status)}
                            borderRadius="full"
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default TaskList;
