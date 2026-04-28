import React from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Link as ChakraLink,
    VStack,
    useColorModeValue,
    Icon,
    FormErrorMessage,
    Center,
    SimpleGrid,
} from '@chakra-ui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { MdHub, MdPersonAdd } from 'react-icons/md';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const bgGradient = useColorModeValue(
        'radial(blue.50 0%, white 100%)',
        'radial(gray.900 0%, black 100%)'
    );
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.100', 'gray.700');

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <Box bg={bgGradient} minH="100vh">
            <Head title="Register" />
            
            <Container maxW="container.sm" pt={16}>
                <VStack spacing={8} align="stretch">
                    <Center flexDir="column">
                        <Icon as={MdHub} w={12} h={12} color="blue.500" mb={4} />
                        <Heading size="xl" letterSpacing="tight">Create Account</Heading>
                        <Text color="gray.500" mt={2}>Join the future of service orchestration</Text>
                    </Center>

                    <Box 
                        bg={cardBg} 
                        p={10} 
                        rounded="3xl" 
                        shadow="2xl" 
                        border="1px" 
                        borderColor={borderColor}
                    >
                        <form onSubmit={submit}>
                            <VStack spacing={5}>
                                <FormControl isRequired isInvalid={errors.name}>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input 
                                        type="text" 
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="John Doe"
                                        rounded="xl"
                                        h="12"
                                        autoFocus
                                    />
                                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={errors.email}>
                                    <FormLabel>Email Address</FormLabel>
                                    <Input 
                                        type="email" 
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="name@company.com"
                                        rounded="xl"
                                        h="12"
                                    />
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                </FormControl>

                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                                    <FormControl isRequired isInvalid={errors.password}>
                                        <FormLabel>Password</FormLabel>
                                        <Input 
                                            type="password" 
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="••••••••"
                                            rounded="xl"
                                            h="12"
                                        />
                                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isRequired isInvalid={errors.password_confirmation}>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <Input 
                                            type="password" 
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="••••••••"
                                            rounded="xl"
                                            h="12"
                                        />
                                        <FormErrorMessage>{errors.password_confirmation}</FormErrorMessage>
                                    </FormControl>
                                </SimpleGrid>

                                <Button 
                                    type="submit" 
                                    colorScheme="blue" 
                                    w="full" 
                                    h="12" 
                                    rounded="xl" 
                                    isLoading={processing}
                                    leftIcon={<MdPersonAdd />}
                                    shadow="lg"
                                    _hover={{ shadow: 'xl', transform: 'translateY(-2px)' }}
                                    transition="all 0.2s"
                                    mt={4}
                                >
                                    Create Hub Account
                                </Button>
                            </VStack>
                        </form>
                    </Box>

                    <Center>
                        <Text color="gray.500" fontSize="sm">
                            Already have an account?{' '}
                            <ChakraLink as={Link} href={route('login')} color="blue.500" fontWeight="bold">
                                Sign In
                            </ChakraLink>
                        </Text>
                    </Center>
                </VStack>
            </Container>
        </Box>
    );
}
