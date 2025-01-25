import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';

const DistrictForm: React.FC<{ visible: boolean; onCancel: () => void; onSuccess: () => void; record?: any; }> = ({ visible, onCancel, onSuccess, record }) => {
    const [districtName, setDistrictName] = useState('');
    const [head, setHead] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [emailId, setEmailId] = useState('');
    const [communicationAddress, setCommunicationAddress] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (record) {
            setDistrictName(record.districtName);
            setHead(record.head);
            setContactNo(record.contactNo);
            setEmailId(record.emailId);
            setCommunicationAddress(record.communicationAddress);
        } else {
            setDistrictName('');
            setHead('');
            setContactNo('');
            setEmailId('');
            setCommunicationAddress('');
        }
    }, [record]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (record) {
                await axios.put(`/api/district/${record.districtId}`, { districtName, head, contactNo, emailId, communicationAddress });
                toast({ title: 'District updated', status: 'success' });
            } else {
                await axios.post('/api/district', { districtName, head, contactNo, emailId, communicationAddress });
                toast({ title: 'District created', status: 'success' });
            }
            setDistrictName('');
            setHead('');
            setContactNo('');
            setEmailId('');
            setCommunicationAddress('');
            onSuccess();
        } catch (error) {
            toast({ title: 'Error saving district', status: 'error' });
        }
    };

    if (!visible) return null;

    return (
        <Box p={5}>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>District Name</FormLabel>
                    <Input value={districtName} onChange={(e) => setDistrictName(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Head</FormLabel>
                    <Input value={head} onChange={(e) => setHead(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Contact No</FormLabel>
                    <Input value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email ID</FormLabel>
                    <Input value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Communication Address</FormLabel>
                    <Input value={communicationAddress} onChange={(e) => setCommunicationAddress(e.target.value)} />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">{record ? 'Update' : 'Create'} District</Button>
                <Button mt={4} ml={4} onClick={onCancel}>Cancel</Button>
            </form>
        </Box>
    );
};

export default DistrictForm;
