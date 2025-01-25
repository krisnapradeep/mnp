import React, { useEffect, useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import ArticleForm from './ArticleForm';

const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
    const toast = useToast();

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('/api/article');
            setArticles(response.data);
        } catch (error) {
            toast({ title: 'Error fetching articles', status: 'error' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/article/${id}`);
            fetchArticles();
            toast({ title: 'Article deleted', status: 'success' });
        } catch (error) {
            toast({ title: 'Error deleting article', status: 'error' });
        }
    };

    return (
        <Box p={5}>
            <Button colorScheme="teal" mb={4} onClick={() => { setSelectedArticle(null); setFormVisible(true); }}>Create New Article</Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {articles.map(article => (
                        <Tr key={article.articleId}>
                            <Td>{article.articleId}</Td>
                            <Td>{article.articleName}</Td>
                            <Td>
                                <IconButton icon={<FiEdit2 />} onClick={() => { setSelectedArticle(article); setFormVisible(true); }} />
                                <IconButton icon={<FiTrash2 />} onClick={() => handleDelete(article.articleId)} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <ArticleForm visible={isFormVisible} onCancel={() => setFormVisible(false)} onSuccess={() => { setFormVisible(false); fetchArticles(); }} record={selectedArticle} />
        </Box>
    );
};

export default ArticleList;
