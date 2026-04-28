import React from 'react';
import {
    VStack,
    Circle,
    Icon,
    Heading,
    Text,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { MdCategory, MdAdd } from 'react-icons/md';

export default function EmptyState({ onOpenModal }) {
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <VStack py={40} bg={cardBg} rounded="3xl" shadow="xl" border="2px dashed" borderColor={borderColor}>
            <Circle size="80px" bg="blue.50" color="blue.500" mb={4}>
                <Icon as={MdCategory} w={10} h={10} />
            </Circle>
            <Heading size="md">No services found</Heading>
            <Text color="gray.500" maxW="sm" textAlign="center">Get started by creating your first digital service orchestration.</Text>
            <Button 
                mt={6} 
                leftIcon={<MdAdd />} 
                colorScheme="blue" 
                onClick={onOpenModal} 
                rounded="xl" 
                shadow="lg"
            >
                Create First Service
            </Button>
        </VStack>
    );
}
