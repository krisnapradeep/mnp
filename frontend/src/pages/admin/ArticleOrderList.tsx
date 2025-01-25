import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import ArticleOrderForm from './ArticleOrderForm';

const ArticleOrderList: React.FC = () => {
    const [articleOrders, setArticleOrders] = useState<any[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedArticleOrder, setSelectedArticleOrder] = useState<any | null>(null);
    const toast = useToast();

    useEffect(() => {
        fetchArticleOrders();
    }, []);

    const fetchArticleOrders = async () => {
        try {
            const response = await axios.get('/api/article-order');
            setArticleOrders(response.data);
        } catch (error) {
            toast({ title: 'Error fetching article orders', status: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/article-order/${id}`);
            fetchArticleOrders();
            toast({ title: 'Article order deleted', status: 'success' });
        } catch (error) {
            toast({ title: 'Error deleting article order', status: 'error' });
        }
    };

    return (
        <Box p={5}>
            <Button colorScheme="teal" mb={4} onClick={() => { setSelectedArticleOrder(null); setFormVisible(true); }}>Create New Article Order</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Supplier</Th>
                        <Th>Article</Th>
                        <Th>Quantity</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {articleOrders.map(order => (
                        <Tr key={order.articleOrderId}>
                            <Td>{order.articleOrderId}</Td>
                            <Td>{order.supplierName}</Td>
                            <Td>{order.articleName}</Td>
                            <Td>{order.quantity}</Td>
                            <Td>
                                <IconButton icon={<FiEdit2 />} onClick={() => { setSelectedArticleOrder(order); setFormVisible(true); }} />
                                <IconButton icon={<FiTrash2 />} onClick={() => handleDelete(order.articleOrderId)} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <ArticleOrderForm visible={isFormVisible} onCancel={() => setFormVisible(false)} onSuccess={() => { setFormVisible(false); fetchArticleOrders(); }} record={selectedArticleOrder} />
        </Box>
    );
};

export default ArticleOrderList;
