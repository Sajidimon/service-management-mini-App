import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    Button,
    FormErrorMessage,
    useColorModeValue,
} from '@chakra-ui/react';

export default function ServiceModal({ 
    isOpen, 
    onClose, 
    editingService, 
    data, 
    setData, 
    errors, 
    processing, 
    onSubmit 
}) {
    const cardBg = useColorModeValue('white', 'gray.800');

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay backdropFilter="blur(8px)" />
            <ModalContent bg={cardBg} rounded="3xl" shadow="2xl">
                <form onSubmit={onSubmit}>
                    <ModalHeader px={8} pt={8} fontSize="2xl" fontWeight="800">
                        {editingService ? 'Edit Service' : 'New Service'}
                    </ModalHeader>
                    <ModalCloseButton mt={4} mr={4} />
                    <ModalBody px={8} pb={8}>
                        <VStack spacing={5}>
                            <FormControl isRequired isInvalid={errors.title}>
                                <FormLabel fontWeight="bold">Service Title</FormLabel>
                                <Input 
                                    placeholder="e.g. API Infrastructure" 
                                    value={data.title} 
                                    onChange={e => setData('title', e.target.value)} 
                                    rounded="xl" 
                                    h="12" 
                                />
                                {errors.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
                            </FormControl>

                            <FormControl isRequired isInvalid={errors.category}>
                                <FormLabel fontWeight="bold">Category</FormLabel>
                                <Select 
                                    placeholder="Select category" 
                                    value={data.category} 
                                    onChange={e => setData('category', e.target.value)} 
                                    rounded="xl" 
                                    h="12"
                                >
                                    <option value="Development">Development</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Consulting">Consulting</option>
                                </Select>
                                {errors.category && <FormErrorMessage>{errors.category}</FormErrorMessage>}
                            </FormControl>

                            <FormControl isInvalid={errors.description}>
                                <FormLabel fontWeight="bold">Description</FormLabel>
                                <Textarea 
                                    placeholder="Brief description..." 
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)} 
                                    rows={4} 
                                    rounded="xl" 
                                />
                                {errors.description && <FormErrorMessage>{errors.description}</FormErrorMessage>}
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel fontWeight="bold">Status</FormLabel>
                                <Select 
                                    value={data.status} 
                                    onChange={e => setData('status', e.target.value)} 
                                    rounded="xl" 
                                    h="12"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </Select>
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter px={8} pb={8} gap={3}>
                        <Button variant="ghost" onClick={onClose} rounded="xl" h="12" flex={1}>Cancel</Button>
                        <Button colorScheme="blue" type="submit" isLoading={processing} rounded="xl" h="12" flex={2}>
                            {editingService ? 'Update' : 'Create'}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}
