import React, { useState } from 'react';
import {
    Box,
    Flex,
    HStack,
    Icon,
    Input,
    Button,
    Divider,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Circle,
    Text,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
    Select,
    Switch,
    useDisclosure,
    ButtonGroup,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react';
import { 
    MdSearch, 
    MdFilterList, 
    MdAdd, 
    MdMoreVert, 
    MdEdit, 
    MdDelete,
    MdChevronLeft,
    MdChevronRight
} from 'react-icons/md';
import ConfirmationModal from './ConfirmationModal';

export default function ServiceList({ 
    services, 
    onOpenModal, 
    onDelete,
    onToggleStatus,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    pagination,
    onPageChange
}) {
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const mainBg = useColorModeValue('gray.50', 'blackAlpha.300');
    
    // Confirmation States
    const { isOpen: isToggleOpen, onOpen: onToggleOpen, onClose: onToggleClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    
    const [selectedService, setSelectedService] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleToggleClick = (service) => {
        setSelectedService(service);
        onToggleOpen();
    };

    const handleDeleteClick = (service) => {
        setSelectedService(service);
        onDeleteOpen();
    };

    const handleConfirmToggle = () => {
        if (selectedService) {
            onToggleStatus(selectedService.id);
            onToggleClose();
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedService) {
            setIsDeleting(true);
            try {
                await onDelete(selectedService.id);
                onDeleteClose();
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <Box bg={cardBg} rounded="3xl" shadow="sm" border="1px" borderColor={borderColor} overflow="hidden">
            <Flex p={6} align="center" gap={4} wrap="wrap">
                <Box flex={1} minW="200px">
                    <InputGroup size="md">
                        <InputLeftElement pointerEvents="none">
                            <Icon as={MdSearch} color="gray.400" />
                        </InputLeftElement>
                        <Input
                            bg={mainBg}
                            placeholder="Search services..." 
                            fontSize="sm" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            rounded="xl"
                            border="1px"
                            borderColor={borderColor}
                            _focus={{
                                borderColor: 'blue.400',
                                boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)',
                            }}
                        />
                    </InputGroup>
                </Box>
                
                <HStack spacing={2}>
                    <Icon as={MdFilterList} color="gray.400" />
                    <Select 
                        variant="outline" 
                        size="sm" 
                        w="150px" 
                        rounded="xl"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Select>
                </HStack>

                <Button 
                    leftIcon={<MdAdd />} 
                    colorScheme="blue" 
                    rounded="xl" 
                    onClick={() => onOpenModal()}
                >
                    Add Service
                </Button>
            </Flex>
            <Divider />
            <TableContainer>
                <Table variant="simple" size="lg">
                    <Thead bg={useColorModeValue('gray.50', 'whiteAlpha.50')}>
                        <Tr>
                            <Th>Service Title</Th>
                            <Th>Category</Th>
                            <Th>Status</Th>
                            <Th textAlign="right">Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {services.length > 0 ? (
                            services.map((service) => (
                                <Tr key={service.id} _hover={{ bg: useColorModeValue('gray.50', 'whiteAlpha.100') }} transition="background 0.2s">
                                    <Td fontWeight="bold">{service.title}</Td>
                                    <Td>
                                        <Badge colorScheme={service.category === 'Development' ? 'blue' : 'purple'} variant="subtle" rounded="full" px={3}>
                                            {service.category}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        <HStack spacing={2}>
                                            <Circle size="8px" bg={service.status === 'active' ? 'green.400' : 'red.400'} />
                                            <Text fontSize="sm" color={service.status === 'active' ? 'green.600' : 'red.600'} fontWeight="medium">
                                                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                                            </Text>
                                        </HStack>
                                    </Td>
                                    <Td textAlign="right">
                                         <Switch 
                                            colorScheme="green" 
                                            isChecked={service.status === 'active'} 
                                            onChange={() => handleToggleClick(service)}
                                            size="md"
                                            mr="10px"
                                        />
                                        <Menu>
                                            <MenuButton as={IconButton} icon={<MdMoreVert />} variant="ghost" rounded="full" size="sm" />
                                            <MenuList rounded="xl" shadow="xl">
                                                <MenuItem icon={<MdEdit />} onClick={() => onOpenModal(service)}>Edit</MenuItem>
                                                <MenuItem icon={<MdDelete />} color="red.500" onClick={() => handleDeleteClick(service)}>Delete</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={5} textAlign="center" py={10} color="gray.500">
                                    No services match your search criteria.
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>

            {/* Pagination Controls */}
            {pagination && pagination.last_page > 1 && (
                <Flex px={6} py={4} align="center" justify="space-between" borderTop="1px" borderColor={borderColor} bg={useColorModeValue('gray.50', 'whiteAlpha.50')}>
                    <Text fontSize="sm" color="gray.500">
                        Showing page <strong>{pagination.current_page}</strong> of <strong>{pagination.last_page}</strong> ({pagination.total} results)
                    </Text>
                    <ButtonGroup size="sm" isAttached variant="outline" rounded="xl">
                        <IconButton
                            icon={<MdChevronLeft />}
                            disabled={pagination.current_page === 1}
                            onClick={() => onPageChange(pagination.current_page - 1)}
                            aria-label="Previous page"
                        />
                        <Button disabled cursor="default" px={4}>
                            {pagination.current_page}
                        </Button>
                        <IconButton
                            icon={<MdChevronRight />}
                            disabled={pagination.current_page === pagination.last_page}
                            onClick={() => onPageChange(pagination.current_page + 1)}
                            aria-label="Next page"
                        />
                    </ButtonGroup>
                </Flex>
            )}

            {/* Status Toggle Confirmation */}
            <ConfirmationModal 
                isOpen={isToggleOpen}
                onClose={onToggleClose}
                onConfirm={handleConfirmToggle}
                title="Confirm Status Change"
                body={`Are you sure you want to ${selectedService?.status === 'active' ? 'deactivate' : 'activate'} the service "${selectedService?.title}"?`}
                confirmText={`Yes, ${selectedService?.status === 'active' ? 'Deactivate' : 'Activate'}`}
                confirmColor={selectedService?.status === 'active' ? 'orange' : 'green'}
            />

            {/* Delete Confirmation */}
            <ConfirmationModal 
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
                onConfirm={handleConfirmDelete}
                title="Delete Service"
                body={`Are you sure you want to delete "${selectedService?.title}"? This action cannot be undone.`}
                confirmText="Delete Service"
                confirmColor="red"
                isLoading={isDeleting}
            />
        </Box>
    );
}
