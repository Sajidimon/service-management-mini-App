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
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { 
    MdSearch, 
    MdFilterList, 
    MdAdd, 
    MdMoreVert, 
    MdEdit, 
    MdDelete,
    MdWarning
} from 'react-icons/md';

export default function ServiceList({ 
    services, 
    onOpenModal, 
    onDelete,
    onToggleStatus,
    search,
    setSearch,
    statusFilter,
    setStatusFilter
}) {
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const mainBg = useColorModeValue('gray.50', 'blackAlpha.300');
    
    // Confirmation Dialog State
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [pendingToggle, setPendingToggle] = useState(null);
    const cancelRef = React.useRef();

    const handleToggleClick = (service) => {
        setPendingToggle(service);
        onOpen();
    };

    const handleConfirmToggle = () => {
        if (pendingToggle) {
            onToggleStatus(pendingToggle.id);
            onClose();
            setPendingToggle(null);
        }
    };

    return (
        <Box bg={cardBg} rounded="3xl" shadow="sm" border="1px" borderColor={borderColor} overflow="hidden">
            <Flex p={6} align="center" gap={4} wrap="wrap">
                <HStack bg={mainBg} px={4} py={2} rounded="xl" flex={1} minW="200px">
                    <Icon as={MdSearch} color="gray.400" />
                    <Input
                        placeholder="Search services..." 
                        fontSize="sm" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </HStack>
                
                <HStack spacing={2}>
                    <Icon as={MdFilterList} color="gray.400" />
                    <Select 
                        variant="ghost" 
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
                                                <MenuItem icon={<MdDelete />} color="red.500" onClick={() => onDelete(service.id)}>Delete</MenuItem>
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

            {/* Status Toggle Confirmation Dialog */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay backdropFilter="blur(4px)">
                    <AlertDialogContent rounded="2xl" shadow="2xl">
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            <HStack>
                                <Icon as={MdWarning} color="orange.400" />
                                <Text>Confirm Status Change</Text>
                            </HStack>
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to {pendingToggle?.status === 'active' ? 'deactivate' : 'activate'} the service <strong>"{pendingToggle?.title}"</strong>?
                        </AlertDialogBody>

                        <AlertDialogFooter gap={3}>
                            <Button ref={cancelRef} onClick={onClose} rounded="xl" variant="ghost">
                                Cancel
                            </Button>
                            <Button colorScheme={pendingToggle?.status === 'active' ? 'orange' : 'green'} onClick={handleConfirmToggle} rounded="xl" shadow="lg">
                                Yes, {pendingToggle?.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
}
