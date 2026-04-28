import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    useDisclosure,
    IconButton,
    useToast,
    Flex,
    Spacer,
    useColorModeValue,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
} from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { MdMenu } from 'react-icons/md';
import { useDebounce } from 'use-debounce';
import axios from 'axios';

// Separate Components
import Sidebar from '@/Components/Dashboard/Sidebar';
import EmptyState from '@/Components/Dashboard/EmptyState';
import ServiceList from '@/Components/Dashboard/ServiceList';
import ServiceModal from '@/Components/Dashboard/ServiceModal';
import ProfileSettings from '@/Components/Dashboard/ProfileSettings';

export default function ServiceDashboard({ auth, services: initialServices = [], filters }) {
    const [currentView, setCurrentView] = useState('services');
    const [services, setServices] = useState(Array.isArray(initialServices) ? initialServices : []);
    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');
    const [debouncedSearch] = useDebounce(search, 500);

    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure();
    
    const [editingService, setEditingService] = useState(null);
    const [data, setData] = useState({ title: '', description: '', category: '', status: 'active' });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    
    const toast = useToast();

    // Fetch services from API
    const fetchServices = async () => {
        try {
            const response = await axios.get('/api/services', {
                params: { search: debouncedSearch, status: statusFilter }
            });
            
            if (response.data && response.data.data) {
                setServices(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching services", error);
            setServices([]);
        }
    };

    // Trigger search/filter
    useEffect(() => {
        fetchServices();
    }, [debouncedSearch, statusFilter]);

    const handleOpenModal = (service = null) => {
        setErrors({});
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
            setData({ title: '', description: '', category: '', status: 'active' });
        }
        onModalOpen();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            if (editingService) {
                await axios.put(`/api/services/${editingService.id}`, data);
                toast({ title: 'Service Updated', status: 'success' });
            } else {
                await axios.post('/api/services', data);
                toast({ title: 'Service Created', status: 'success' });
            }
            onModalClose();
            fetchServices();
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

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        
        try {
            await axios.delete(`/api/services/${id}`);
            toast({ title: 'Service Deleted', status: 'warning' });
            fetchServices();
        } catch (error) {
            toast({ title: 'Error', status: 'error' });
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await axios.patch(`/api/services/${id}/toggle`);
            fetchServices();
        } catch (error) {
            toast({ title: 'Error toggling status', status: 'error' });
        }
    };

    const sideBarBg = useColorModeValue('white', 'gray.900');
    const mainBg = useColorModeValue('gray.50', 'blackAlpha.300');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Flex minH="100vh" bg={mainBg}>
            <Head title="ServiceHub | Management" />

            {/* Desktop Sidebar */}
            <Box w="280px" bg={sideBarBg} borderRight="1px" borderColor={borderColor} display={{ base: 'none', lg: 'block' }} position="fixed" h="full" zIndex={20}>
                <Sidebar user={auth.user} currentView={currentView} setCurrentView={setCurrentView} />
            </Box>

            {/* Mobile Drawer */}
            <Drawer isOpen={isSidebarOpen} placement="left" onClose={onSidebarClose}>
                <DrawerOverlay />
                <DrawerContent bg={sideBarBg}>
                    <DrawerCloseButton />
                    <Sidebar user={auth.user} currentView={currentView} setCurrentView={setCurrentView} onSidebarClose={onSidebarClose} />
                </DrawerContent>
            </Drawer>

            {/* Main Content */}
            <Box flex={1} ml={{ base: 0, lg: '280px' }} transition="margin 0.2s">
                <Flex bg={sideBarBg} h="80px" align="center" px={{ base: 4, md: 10 }} position="sticky" top={0} zIndex={10} borderBottom="1px" borderColor={borderColor}>
                    <IconButton display={{ base: 'flex', lg: 'none' }} icon={<MdMenu />} onClick={onSidebarOpen} variant="ghost" mr={4} />
                    <Heading size="lg" fontWeight="800">
                        {currentView === 'dashboard' ? 'Overview' : 'Digital Services'}
                    </Heading>
                    <Spacer />
                </Flex>

                <Container maxW="container.xl" py={10} px={{ base: 4, md: 10 }}>
                    {currentView === 'services' ? (
                        services.length === 0 && !search && !statusFilter ? (
                            <EmptyState onOpenModal={handleOpenModal} />
                        ) : (
                            <ServiceList 
                                services={services} 
                                onOpenModal={handleOpenModal} 
                                onDelete={handleDelete}
                                onToggleStatus={handleToggleStatus}
                                search={search}
                                setSearch={setSearch}
                                statusFilter={statusFilter}
                                setStatusFilter={setStatusFilter}
                            />
                        )
                    ) : currentView === 'settings' ? (
                        <ProfileSettings user={auth.user} />
                    ) : (
                        <VStack py={20} align="center">
                            <Heading size="lg">Dashboard Overview</Heading>
                            <Text color="gray.500">Welcome back, {auth.user.name}!</Text>
                        </VStack>
                    )}
                </Container>
            </Box>

            <ServiceModal isOpen={isModalOpen} onClose={onModalClose} editingService={editingService} data={data} setData={setData} errors={errors} processing={processing} onSubmit={handleSubmit} />
        </Flex>
    );
}
