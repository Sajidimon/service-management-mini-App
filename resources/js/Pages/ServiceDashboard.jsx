import React, { useState } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    SimpleGrid,
    Badge,
    VStack,
    HStack,
    Icon,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    FormErrorMessage,
    Circle,
    Select,
    IconButton,
    useToast,
    Flex,
    Spacer,
    Divider,
    Card,
    CardBody,
    CardFooter,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Tooltip,
    Avatar,
} from '@chakra-ui/react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { 
    MdAdd, 
    MdEdit, 
    MdDelete, 
    MdMoreVert, 
    MdCategory, 
    MdOutlinePowerSettingsNew,
    MdDashboard,
    MdHub,
    MdSettings,
    MdLogout,
    MdMenu,
    MdPerson,
    MdBarChart
} from 'react-icons/md';

const SidebarItem = ({ icon, label, isActive, href = "#" }) => {
    const activeBg = useColorModeValue('blue.50', 'whiteAlpha.100');
    const activeColor = 'blue.500';
    const inactiveColor = useColorModeValue('gray.600', 'gray.400');

    return (
        <HStack
            as={Link}
            href={href}
            w="full"
            px={4}
            py={3}
            rounded="xl"
            spacing={3}
            bg={isActive ? activeBg : 'transparent'}
            color={isActive ? activeColor : inactiveColor}
            transition="all 0.2s"
            _hover={{
                bg: activeBg,
                color: activeColor,
                transform: 'translateX(5px)'
            }}
        >
            <Icon as={icon} w={5} h={5} />
            <Text fontWeight={isActive ? "bold" : "medium"}>{label}</Text>
        </HStack>
    );
};

export default function ServiceDashboard({ auth, services }) {
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure();
    const [editingService, setEditingService] = useState(null);
    const toast = useToast();

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        description: '',
        category: '',
        status: 'active',
    });

    const sideBarBg = useColorModeValue('white', 'gray.900');
    const mainBg = useColorModeValue('gray.50', 'blackAlpha.300');
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const handleOpenModal = (service = null) => {
        if (service) {
            setEditingService(service);
            setData({
                title: service.title,
                description: service.description || '',
                category: service.category,
                status: service.status,
            });
        } else {
            setEditingService(null);
            reset();
        }
        onModalOpen();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingService) {
            put(route('services.update', editingService.id), {
                onSuccess: () => {
                    onModalClose();
                    toast({ title: 'Service Updated', status: 'success', duration: 3000 });
                },
            });
        } else {
            post(route('services.store'), {
                onSuccess: () => {
                    onModalClose();
                    toast({ title: 'Service Created', status: 'success', duration: 3000 });
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this service?')) {
            destroy(route('services.destroy', id), {
                onSuccess: () => toast({ title: 'Service Deleted', status: 'warning', duration: 3000 }),
            });
        }
    };

    const SidebarContent = () => (
        <VStack spacing={8} align="stretch" h="full" py={8}>
            <HStack px={4} spacing={3}>
                <Icon as={MdHub} w={8} h={8} color="blue.500" />
                <Heading size="md" letterSpacing="tight">ServiceHub</Heading>
            </HStack>

            <VStack spacing={2} align="stretch" flex={1}>
                <SidebarItem icon={MdDashboard} label="Dashboard" isActive={true} />
                <SidebarItem icon={MdCategory} label="Services" isActive={false} />
                <SidebarItem icon={MdBarChart} label="Analytics" isActive={false} />
                <SidebarItem icon={MdSettings} label="Settings" isActive={false} />
            </VStack>

            <Divider />

            <VStack spacing={4} align="stretch">
                <HStack px={4} spacing={3}>
                    <Avatar size="sm" name={auth.user.name} />
                    <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="bold" noOfLines={1}>{auth.user.name}</Text>
                        <Text fontSize="xs" color="gray.500" noOfLines={1}>{auth.user.email}</Text>
                    </VStack>
                </HStack>
                <Button 
                    as={Link}
                    href={route('logout')}
                    method="post"
                    variant="ghost" 
                    colorScheme="red" 
                    justifyContent="start" 
                    leftIcon={<MdLogout />}
                    rounded="xl"
                >
                    Logout
                </Button>
            </VStack>
        </VStack>
    );

    return (
        <Flex minH="100vh" bg={mainBg}>
            <Head title="Service Dashboard" />

            {/* Desktop Sidebar */}
            <Box
                w="280px"
                bg={sideBarBg}
                borderRight="1px"
                borderColor={borderColor}
                display={{ base: 'none', lg: 'block' }}
                position="fixed"
                h="full"
                zIndex={20}
            >
                <SidebarContent />
            </Box>

            {/* Mobile Drawer */}
            <Drawer isOpen={isSidebarOpen} placement="left" onClose={onSidebarClose}>
                <DrawerOverlay />
                <DrawerContent bg={sideBarBg}>
                    <DrawerCloseButton />
                    <SidebarContent />
                </DrawerContent>
            </Drawer>

            {/* Main Content */}
            <Box 
                flex={1} 
                ml={{ base: 0, lg: '280px' }} 
                transition="margin 0.2s"
            >
                {/* Header */}
                <Flex 
                    bg={sideBarBg} 
                    h="80px" 
                    align="center" 
                    px={{ base: 4, md: 10 }} 
                    position="sticky" 
                    top={0} 
                    zIndex={10} 
                    borderBottom="1px" 
                    borderColor={borderColor}
                >
                    <IconButton 
                        display={{ base: 'flex', lg: 'none' }}
                        icon={<MdMenu />} 
                        onClick={onSidebarOpen} 
                        variant="ghost" 
                        mr={4}
                    />
                    <Heading size="lg" fontWeight="800">Digital Services</Heading>
                    <Spacer />
                </Flex>

                {/* Dashboard Content */}
                <Container maxW="container.xl" py={10} px={{ base: 4, md: 10 }}>
                    {services.length === 0 ? (
                        <VStack py={32} bg={cardBg} rounded="3xl" shadow="xl" border="2px dashed" borderColor={borderColor}>
                            <Circle size="80px" bg="blue.50" color="blue.500" mb={4}>
                                <Icon as={MdCategory} w={10} h={10} />
                            </Circle>
                            <Heading size="md">No services orchestrating yet</Heading>
                            <Text color="gray.500" maxW="sm" textAlign="center">Add your first digital service to start managing your infrastructure with ServiceHub.</Text>
                            <Button mt={6} leftIcon={<MdAdd />} colorScheme="blue" onClick={() => handleOpenModal()} rounded="xl">
                                Create First Service
                            </Button>
                        </VStack>
                    ) : (
                        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={8}>
                            {services.map((service) => (
                                <Card 
                                    key={service.id} 
                                    bg={cardBg} 
                                    rounded="3xl" 
                                    overflow="hidden" 
                                    shadow="xl" 
                                    border="1px" 
                                    borderColor={borderColor}
                                    transition="all 0.3s"
                                    _hover={{ transform: 'translateY(-5px)', shadow: '2xl', borderColor: 'blue.200' }}
                                >
                                    <CardBody p={8}>
                                        <Flex justify="space-between" align="start" mb={6}>
                                            <Badge colorScheme={service.category === 'Development' ? 'blue' : 'purple'} variant="subtle" px={3} py={1} rounded="full" textTransform="uppercase" fontSize="xs" fontWeight="bold">
                                                {service.category}
                                            </Badge>
                                            <Menu>
                                                <MenuButton as={IconButton} icon={<MdMoreVert />} variant="ghost" rounded="full" size="sm" />
                                                <MenuList rounded="xl" shadow="xl">
                                                    <MenuItem icon={<MdEdit />} onClick={() => handleOpenModal(service)}>Edit Service</MenuItem>
                                                    <MenuItem icon={<MdDelete />} color="red.500" onClick={() => handleDelete(service.id)}>Delete Service</MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </Flex>
                                        <Heading size="md" mb={4} lineHeight="1.2">{service.title}</Heading>
                                        <Text color="gray.500" fontSize="sm" noOfLines={3} lineHeight="tall">
                                            {service.description || 'No detailed orchestration parameters provided for this service.'}
                                        </Text>
                                    </CardBody>
                                    <Divider />
                                    <CardFooter bg={useColorModeValue('gray.50', 'whiteAlpha.50')} px={8} py={4}>
                                        <HStack spacing={2}>
                                            <Circle size="8px" bg={service.status === 'active' ? 'green.400' : 'red.400'} shadow="0 0 10px 0 rgba(0,0,0,0.1)" />
                                            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" color={service.status === 'active' ? 'green.500' : 'red.500'}>
                                                {service.status}
                                            </Text>
                                        </HStack>
                                    </CardFooter>
                                </Card>
                            ))}
                        </SimpleGrid>
                    )}
                </Container>
            </Box>

            {/* Add/Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={onModalClose} size="lg">
                <ModalOverlay backdropFilter="blur(8px)" />
                <ModalContent bg={cardBg} rounded="3xl" shadow="2xl">
                    <form onSubmit={handleSubmit}>
                        <ModalHeader px={8} pt={8} fontSize="2xl" fontWeight="800">
                            {editingService ? 'Edit Service' : 'Initialize Service'}
                        </ModalHeader>
                        <ModalCloseButton mt={4} mr={4} />
                        <ModalBody px={8} pb={8}>
                            <VStack spacing={5}>
                                <FormControl isRequired isInvalid={errors.title}>
                                    <FormLabel fontWeight="bold">Service Title</FormLabel>
                                    <Input 
                                        placeholder="e.g. Core API Infrastructure" 
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
                                        placeholder="Select classification"
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
                                </FormControl>

                                <FormControl isInvalid={errors.description}>
                                    <FormLabel fontWeight="bold">Orchestration Parameters</FormLabel>
                                    <Textarea 
                                        placeholder="Define the scope and technical parameters of this service..." 
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows={4}
                                        rounded="xl"
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel fontWeight="bold">System Status</FormLabel>
                                    <Select 
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        rounded="xl"
                                        h="12"
                                    >
                                        <option value="active">Active / Online</option>
                                        <option value="inactive">Inactive / Offline</option>
                                    </Select>
                                </FormControl>
                            </VStack>
                        </ModalBody>

                        <ModalFooter px={8} pb={8} gap={3}>
                            <Button variant="ghost" onClick={onModalClose} rounded="xl" h="12" flex={1}>Cancel</Button>
                            <Button colorScheme="blue" type="submit" isLoading={processing} rounded="xl" h="12" flex={2} shadow="lg">
                                {editingService ? 'Commit Changes' : 'Launch Service'}
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Flex>
    );
}
