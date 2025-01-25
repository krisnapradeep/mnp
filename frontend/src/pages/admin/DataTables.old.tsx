import React, { useState } from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    chakra,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    useColorModeValue,
    Text,
    Flex,
    Grid
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper
} from '@tanstack/react-table';

type Person = {
    name: string;
    role: string;
    status: string;
    date: string;
    progress: number;
};

const data: Person[] = [
    {
        name: "John Michael",
        role: "Manager",
        status: "Online",
        date: "23/04/18",
        progress: 80,
    },
    {
        name: "Alexa Liras",
        role: "Developer",
        status: "Offline",
        date: "23/04/18",
        progress: 70,
    },
    {
        name: "Laurent Michael",
        role: "Executive",
        status: "Online",
        date: "19/09/17",
        progress: 90,
    },
    {
        name: "Freduardo Hill",
        role: "Developer",
        status: "Online",
        date: "24/12/08",
        progress: 60,
    },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
    columnHelper.accessor('name', {
        cell: info => <Text fontWeight="bold">{info.getValue()}</Text>,
        header: 'Name'
    }),
    columnHelper.accessor('role', {
        cell: info => info.getValue(),
        header: 'Role'
    }),
    columnHelper.accessor('status', {
        cell: info => (
            <Text
                color={info.getValue() === 'Online' ? 'green.500' : 'red.500'}
                fontWeight="bold"
            >
                {info.getValue()}
            </Text>
        ),
        header: 'Status'
    }),
    columnHelper.accessor('date', {
        cell: info => info.getValue(),
        header: 'Date'
    }),
    columnHelper.accessor('progress', {
        cell: info => `${info.getValue()}%`,
        header: 'Progress'
    }),
];

const ComplexTable = () => {
    const [globalFilter, setGlobalFilter] = useState('');

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <Box
            bg={useColorModeValue('white', 'gray.700')}
            rounded="xl"
            shadow="base"
            p={6}
        >
            <Flex justify="space-between" mb={4}>
                <InputGroup maxW="300px">
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                        placeholder="Search..."
                        value={globalFilter ?? ''}
                        onChange={e => setGlobalFilter(e.target.value)}
                    />
                </InputGroup>
            </Flex>

            <Box overflowX="auto">
                <Table>
                    <Thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <Th key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map(row => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            <Flex justify="space-between" mt={4}>
                <Button
                    onClick={() => table.previousPage()}
                    isDisabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    onClick={() => table.nextPage()}
                    isDisabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </Flex>
        </Box>
    );
};

const CheckTable = () => {
    // Add your CheckTable component implementation here
    return <div>CheckTable</div>;
};

export default function DataTables() {
    const bgColor = useColorModeValue('secondaryGray.100', 'navy.900');

    return (
        <Box
            pt={{ base: '130px', md: '80px', xl: '80px' }}
            pb="20px"
            px={{ base: '20px', md: '30px', xl: '40px' }}
            bg={bgColor}
            minH="100vh"
        >
            <Grid
                templateColumns="1fr"
                gap="20px"
            >
                {/* Complex Table */}
                <ComplexTable />

                {/* Check Table */}
                <CheckTable />
            </Grid>
        </Box>
    );
}
