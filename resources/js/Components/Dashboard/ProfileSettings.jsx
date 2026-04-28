import React, { useState } from 'react';
import {
    Box,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Text,
    useToast,
    Divider,
    SimpleGrid,
    FormErrorMessage,
    useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

export default function ProfileSettings({ user }) {
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const toast = useToast();
    
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        
        try {
            await axios.patch('/api/profile', {
                name: data.name,
                email: data.email,
            });
            toast({ title: 'Profile Updated', status: 'success' });
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                toast({ title: 'Error', status: 'error' });
            }
        } finally {
            setProcessing(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        
        try {
            await axios.put('/api/profile/password', {
                current_password: data.current_password,
                password: data.password,
                password_confirmation: data.password_confirmation,
            });
            toast({ title: 'Password Updated', status: 'success' });
            setData({ ...data, current_password: '', password: '', password_confirmation: '' });
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                toast({ title: 'Error', status: 'error' });
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <VStack spacing={8} align="stretch">
            <Box bg={cardBg} p={8} rounded="3xl" shadow="sm" border="1px" borderColor={borderColor}>
                <VStack spacing={6} align="stretch">
                    <Box>
                        <Heading size="md">Profile Information</Heading>
                        <Text color="gray.500" fontSize="sm">Update your account's profile information and email address.</Text>
                    </Box>
                    <Divider />
                    <form onSubmit={handleUpdateInfo}>
                        <VStack spacing={4}>
                            <FormControl isRequired isInvalid={errors.name}>
                                <FormLabel>Name</FormLabel>
                                <Input 
                                    value={data.name} 
                                    onChange={e => setData({ ...data, name: e.target.value })} 
                                    rounded="xl" 
                                />
                                {errors.name && <FormErrorMessage>{errors.name[0]}</FormErrorMessage>}
                            </FormControl>

                            <FormControl isRequired isInvalid={errors.email}>
                                <FormLabel>Email Address</FormLabel>
                                <Input 
                                    type="email" 
                                    value={data.email} 
                                    onChange={e => setData({ ...data, email: e.target.value })} 
                                    rounded="xl" 
                                />
                                {errors.email && <FormErrorMessage>{errors.email[0]}</FormErrorMessage>}
                            </FormControl>

                            <Button 
                                type="submit" 
                                colorScheme="blue" 
                                isLoading={processing} 
                                rounded="xl" 
                                alignSelf="start"
                                px={8}
                            >
                                Save Changes
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </Box>

            <Box bg={cardBg} p={8} rounded="3xl" shadow="sm" border="1px" borderColor={borderColor}>
                <VStack spacing={6} align="stretch">
                    <Box>
                        <Heading size="md">Update Password</Heading>
                        <Text color="gray.500" fontSize="sm">Ensure your account is using a long, random password to stay secure.</Text>
                    </Box>
                    <Divider />
                    <form onSubmit={handleUpdatePassword}>
                        <VStack spacing={4}>
                            <FormControl isRequired isInvalid={errors.current_password}>
                                <FormLabel>Current Password</FormLabel>
                                <Input 
                                    type="password" 
                                    value={data.current_password} 
                                    onChange={e => setData({ ...data, current_password: e.target.value })} 
                                    rounded="xl" 
                                />
                                {errors.current_password && <FormErrorMessage>{errors.current_password[0]}</FormErrorMessage>}
                            </FormControl>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                                <FormControl isRequired isInvalid={errors.password}>
                                    <FormLabel>New Password</FormLabel>
                                    <Input 
                                        type="password" 
                                        value={data.password} 
                                        onChange={e => setData({ ...data, password: e.target.value })} 
                                        rounded="xl" 
                                    />
                                    {errors.password && <FormErrorMessage>{errors.password[0]}</FormErrorMessage>}
                                </FormControl>

                                <FormControl isRequired isInvalid={errors.password_confirmation}>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input 
                                        type="password" 
                                        value={data.password_confirmation} 
                                        onChange={e => setData({ ...data, password_confirmation: e.target.value })} 
                                        rounded="xl" 
                                    />
                                </FormControl>
                            </SimpleGrid>

                            <Button 
                                type="submit" 
                                colorScheme="blue" 
                                isLoading={processing} 
                                rounded="xl" 
                                alignSelf="start"
                                px={8}
                            >
                                Update Password
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </VStack>
    );
}
