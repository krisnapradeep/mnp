import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';

const ArticleOrderForm: React.FC<{ visible: boolean; onCancel: () => void; onSuccess: () => void; record?: any; }> = ({ visible, onCancel, onSuccess, record }) => {
    const [supplierId, setSupplierId] = useState('');
    const [articleId, setArticleId] = useState('');
    const [quantity, setQuantity] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (record) {
            setSupplierId(record.supplierId);
            setArticleId(record.articleId);
            setQuantity(record.quantity);
        } else {
            setSupplierId('');
            setArticleId('');
            setQuantity('');
        }
    }, [record]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (record) {
                await axios.put(`/api/article-order/${record.articleOrderId}`, { supplierId, articleId, quantity });
                toast({ title: 'Article order updated', status: 'success' });
            } else {
                await axios.post('/api/article-order', { supplierId, articleId, quantity });
                toast({ title: 'Article order created', status: 'success' });
            }
            setSupplierId('');
            setArticleId('');
            setQuantity('');
            onSuccess();
        } catch (error) {
            toast({ title: 'Error saving article order', status: 'error' });
        }
    };

    if (!visible) return null;

    return (
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Supplier ID</FormLabel>
                    <Input value={supplierId} onChange={(e) => setSupplierId(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Article ID</FormLabel>
                    <Input value={articleId} onChange={(e) => setArticleId(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Quantity</FormLabel>
                    <Input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">{record ? 'Update' : 'Create'} Article Order</Button>
                <Button mt={4} ml={4} onClick={onCancel}>Cancel</Button>
            </form>
        </Box>
    );
};

export default ArticleOrderForm;
