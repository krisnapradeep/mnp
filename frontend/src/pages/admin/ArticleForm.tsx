import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';

const ArticleForm: React.FC<{ visible: boolean; onCancel: () => void; onSuccess: () => void; record?: any; }> = ({ visible, onCancel, onSuccess, record }) => {
    const [articleName, setArticleName] = useState('');
    const [description, setDescription] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (record) {
            setArticleName(record.articleName);
            setDescription(record.description);
        } else {
            setArticleName('');
            setDescription('');
        }
    }, [record]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (record) {
                await axios.put(`/api/article/${record.articleId}`, { articleName, description });
                toast({ title: 'Article updated', status: 'success' });
            } else {
                await axios.post('/api/article', { articleName, description });
                toast({ title: 'Article created', status: 'success' });
            }
            setArticleName('');
            setDescription('');
            onSuccess();
        } catch (error) {
            toast({ title: 'Error saving article', status: 'error' });
        }
    };

    if (!visible) return null;

    return (
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Article Name</FormLabel>
                    <Input value={articleName} onChange={(e) => setArticleName(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">{record ? 'Update' : 'Create'} Article</Button>
                <Button mt={4} ml={4} onClick={onCancel}>Cancel</Button>
            </form>
        </Box>
    );
};

export default ArticleForm;
