import React, { useEffect, useState, useRef } from 'react';
import { 
    Box, 
    Button, 
    Table, 
    Thead, 
    Tbody, 
    Tr, 
    Th, 
    Td, 
    IconButton, 
    useToast, 
    Spinner,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Text
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { axiosInstance } from '../../../config/config';
import ArticleForm from './ArticleForm';

interface Article {
    articleId: string;
    articleName: string;
    categoryId: string;
    categoryName: string;
    description?: string;
    isActive: boolean;
}

const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
    const toast = useToast();
    const cancelRef = useRef(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get<Article[]>('/article');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
            toast({
                title: 'Error fetching articles',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        } finally {
            setIsLoading(false);
        }
    };

    const openDeleteConfirmation = (id: string) => {
        setArticleToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!articleToDelete) return;

        try {
            await axiosInstance.delete(`/article/${articleToDelete}`);
            fetchArticles();
            toast({
                title: 'Article deleted',
                status: 'success',
                duration: 2000,
                isClosable: true
            });
        } catch (error) {
            console.error('Error deleting article:', error);
            toast({
                title: 'Error deleting article',
                description: error instanceof Error ? error.message : 'Unknown error',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        } finally {
            setIsDeleteDialogOpen(false);
            setArticleToDelete(null);
        }
    };

    const handleEdit = (article: Article) => {
        setSelectedArticle(article);
        setFormVisible(true);
    };

    return (
        <Box p={5}>
            <Button 
                colorScheme="teal" 
                mb={4} 
                onClick={() => { 
                    setSelectedArticle(null); 
                    setFormVisible(true); 
                }}
            >
                Create New Article
            </Button>
            
            {isLoading ? (
                <Spinner size="xl" />
            ) : articles.length === 0 ? (
                <Text textAlign="center" color="gray.500">No articles found</Text>
            ) : (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Category</Th>
                            <Th>Description</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {articles.map(article => (
                            <Tr key={article.articleId}>
                                <Td>{article.articleName}</Td>
                                <Td>{article.categoryName}</Td>
                                <Td>{article.description || 'N/A'}</Td>
                                <Td>
                                    <Text 
                                        color={article.isActive ? 'green.500' : 'red.500'}
                                    >
                                        {article.isActive ? 'Active' : 'Inactive'}
                                    </Text>
                                </Td>
                                <Td>
                                    <IconButton
                                        aria-label="Edit"
                                        icon={<FiEdit2 />}
                                        mr={2}
                                        onClick={() => handleEdit(article)}
                                    />
                                    <IconButton
                                        aria-label="Delete"
                                        icon={<FiTrash2 />}
                                        colorScheme="red"
                                        onClick={() => openDeleteConfirmation(article.articleId)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}

            {isFormVisible && (
                <ArticleForm 
                    visible={isFormVisible}
                    onCancel={() => setFormVisible(false)}
                    onSuccess={() => {
                        fetchArticles();
                        setFormVisible(false);
                    }}
                    record={selectedArticle}
                />
            )}

            <AlertDialog
                isOpen={isDeleteDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsDeleteDialogOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Article
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsDeleteDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

export default ArticleList;
