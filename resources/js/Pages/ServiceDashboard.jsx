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
import DashboardOverview from '@/Components/Dashboard/DashboardOverview';

export default function ServiceDashboard({ auth, services: initialServices = [], filters }) {
    const [currentView, setCurrentView] = useState('dashboard');
    const [services, setServices] = useState(Array.isArray(initialServices) ? initialServices : []);
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');
    const [debouncedSearch] = useDebounce(search, 500);

    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure();
    
    const [editingService, setEditingService] = useState(null);
    const [data, setRawData] = useState({
        title: '',
        description: '',
        category: '',
        status: 'active',
    });

    // Helper to update data like Inertia's useForm
    const setData = (key, value) => {
        setRawData(prev => ({ ...prev, [key]: value }));
    };
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    
    const toast = useToast();

    // Fetch services from API
    const fetchServices = async (page = 1) => {
        try {
            const response = await axios.get('/api/services', {
                params: { 
                    search: debouncedSearch, 
                    status: statusFilter,
                    page: page
                }
            });
            
            if (response.data && response.data.data) {
                setServices(response.data.data);
                setPagination(response.data.meta);
            }
        } catch (error) {
            console.error("Error fetching services", error);
            setServices([]);
        } finally {
            setInitialLoading(false);
        }
    };

    // Trigger search/filter
    useEffect(() => {
        fetchServices(1);
    }, [debouncedSearch, statusFilter]);

    const handleOpenModal = (service = null) => {
        setErrors({});
        if (service && service.id) {
            setEditingService(service);
            setRawData({
                title: service.title,
                description: service.description || '',
                category: service.category,
                status: service.status,
            });
        } else {
            setEditingService(null);
            setRawData({ title: '', description: '', category: '', status: 'active' });
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
        
        try {
            await axios.delete(`/api/services/${id}`);
            toast({ title: 'Service Deleted', status: 'warning' });
            fetchServices();
        } catch (error) {
            toast({ title: 'Error', status: 'error' });
        }
    };

    const handleToggleStatus = async (id) => {
        if (!id) return;
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
                        initialLoading ? (
                            <Flex justify="center" align="center" h="400px">
                                <Text fontSize="lg" color="gray.500">Loading your services...</Text>
                            </Flex>
                        ) : services.length === 0 && !search && !statusFilter ? (
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
                                pagination={pagination}
                                onPageChange={fetchServices}
                            />
                        )
                    ) : currentView === 'settings' ? (
                        <ProfileSettings user={auth.user} />
                    ) : (
                        <DashboardOverview />
                    )}
                </Container>
            </Box>

            <ServiceModal isOpen={isModalOpen} onClose={onModalClose} editingService={editingService} data={data} setData={setData} errors={errors} processing={processing} onSubmit={handleSubmit} />
        </Flex>
    );
}
