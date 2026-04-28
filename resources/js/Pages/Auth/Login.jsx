import React from 'react';
import {
    Box,
    Button,
    Checkbox,
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
    Alert,
    AlertIcon,
    FormErrorMessage,
    Center,
    Flex
} from '@chakra-ui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { MdHub, MdLockOpen } from 'react-icons/md';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const bgGradient = useColorModeValue(
        'radial(blue.50 0%, white 100%)',
        'radial(gray.900 0%, black 100%)'
    );
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.100', 'gray.700');

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Box bg={bgGradient} minH="100vh">
            <Head title="Log in" />
            
            <Container maxW="container.sm" pt={20}>
                <VStack spacing={8} align="stretch">
                    <Center flexDir="column">
                        <Icon as={MdHub} w={12} h={12} color="blue.500" mb={4} />
                        <Heading size="xl" letterSpacing="tight">Welcome Back</Heading>
                        <Text color="gray.500" mt={2}>Enter your credentials to access your hub</Text>
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
                                {status && (
                                    <Alert status="success" rounded="xl">
                                        <AlertIcon />
                                        {status}
                                    </Alert>
                                )}

                                <FormControl isInvalid={errors.email}>
                                    <FormLabel>Email Address</FormLabel>
                                    <Input 
                                        type="email" 
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="name@company.com"
                                        rounded="xl"
                                        h="12"
                                        autoFocus
                                    />
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.password}>
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

                                <Flex w="full" justify="space-between" align="center">
                                    <Checkbox 
                                        colorScheme="blue" 
                                        isChecked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    >
                                        Remember me
                                    </Checkbox>
                                    {canResetPassword && (
                                        <ChakraLink as={Link} href={route('password.request')} color="blue.500" fontSize="sm" fontWeight="bold">
                                            Forgot password?
                                        </ChakraLink>
                                    )}
                                </Flex>

                                <Button 
                                    type="submit" 
                                    colorScheme="blue" 
                                    w="full" 
                                    h="12" 
                                    rounded="xl" 
                                    isLoading={processing}
                                    leftIcon={<MdLockOpen />}
                                    shadow="lg"
                                    _hover={{ shadow: 'xl', transform: 'translateY(-2px)' }}
                                    transition="all 0.2s"
                                >
                                    Sign In
                                </Button>
                            </VStack>
                        </form>
                    </Box>

                    <Center>
                        <Text color="gray.500" fontSize="sm">
                            Don't have an account?{' '}
                            <ChakraLink as={Link} href={route('register')} color="blue.500" fontWeight="bold">
                                Create Account
                            </ChakraLink>
                        </Text>
                    </Center>
                </VStack>
            </Container>
        </Box>
    );
}
