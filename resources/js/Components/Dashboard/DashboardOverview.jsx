import React, { useState, useEffect } from 'react';
import {
    Box,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Flex,
    Icon,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Text,
    useColorModeValue,
    VStack,
    HStack,
    Circle,
} from '@chakra-ui/react';
import { MdCategory, MdCheckCircle, MdCancel, MdTimeline } from 'react-icons/md';
import axios from 'axios';

const StatCard = ({ label, value, icon, color, helpText }) => {
    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Stat
            px={6}
            py={5}
            bg={bg}
            shadow="sm"
            border="1px"
            borderColor={borderColor}
            rounded="3xl"
        >
            <Flex justifyContent="space-between" align="center">
                <Box>
                    <StatLabel fontWeight="medium" color="gray.500">
                        {label}
                    </StatLabel>
                    <StatNumber fontSize="3xl" fontWeight="800">
                        {value}
                    </StatNumber>
                    <StatHelpText mb={0}>{helpText}</StatHelpText>
                </Box>
                <Flex
                    w={12}
                    h={12}
                    bg={`${color}.50`}
                    color={`${color}.500`}
                    rounded="2xl"
                    align="center"
                    justify="center"
                >
                    <Icon as={icon} w={6} h={6} />
                </Flex>
            </Flex>
        </Stat>
    );
};

export default function DashboardOverview() {
    const [data, setData] = useState({ stats: { total: 0, active: 0, inactive: 0 }, latest_services: [] });
    const [loading, setLoading] = useState(true);
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    useEffect(() => {
        axios.get('/api/dashboard-summary')
            .then(res => {
                setData(res.data.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <Text>Loading summary...</Text>;

    return (
        <VStack spacing={8} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                <StatCard 
                    label="Total Services" 
                    value={data.stats.total} 
                    icon={MdCategory} 
                    color="blue" 
                    helpText="Across all categories"
                />
                <StatCard 
                    label="Active Services" 
                    value={data.stats.active} 
                    icon={MdCheckCircle} 
                    color="green" 
                    helpText="Live and running"
                />
                <StatCard 
                    label="Inactive Services" 
                    value={data.stats.inactive} 
                    icon={MdCancel} 
                    color="red" 
                    helpText="Paused or disabled"
                />
            </SimpleGrid>

            <Box bg={cardBg} p={8} rounded="3xl" shadow="sm" border="1px" borderColor={borderColor}>
                <HStack mb={6} spacing={3}>
                    <Icon as={MdTimeline} color="blue.500" w={6} h={6} />
                    <Heading size="md">Latest Services</Heading>
                </HStack>
                
                <Box overflowX="auto">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Service</Th>
                                <Th>Category</Th>
                                <Th>Status</Th>
                                <Th>Created At</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.latest_services.map((service) => (
                                <Tr key={service.id}>
                                    <Td fontWeight="bold">{service.title}</Td>
                                    <Td>
                                        <Badge variant="subtle" rounded="full" px={3} colorScheme="blue">
                                            {service.category}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        <HStack spacing={2}>
                                            <Circle size="8px" bg={service.status === 'active' ? 'green.400' : 'red.400'} />
                                            <Text fontSize="sm" color={service.status === 'active' ? 'green.600' : 'red.600'}>
                                                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                                            </Text>
                                        </HStack>
                                    </Td>
                                    <Td color="gray.500" fontSize="sm">
                                        {new Date(service.created_at).toLocaleDateString()}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </VStack>
    );
}
