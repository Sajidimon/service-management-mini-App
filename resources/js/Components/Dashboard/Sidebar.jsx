import React from 'react';
import {
    VStack,
    HStack,
    Icon,
    Heading,
    Text,
    Divider,
    Avatar,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { Link } from '@inertiajs/react';
import { 
    MdDashboard, 
    MdCategory, 
    MdBarChart, 
    MdSettings, 
    MdHub, 
    MdLogout 
} from 'react-icons/md';

const SidebarItem = ({ icon, label, isActive, onClick }) => {
    const activeBg = useColorModeValue('blue.50', 'whiteAlpha.100');
    const activeColor = 'blue.500';
    const inactiveColor = useColorModeValue('gray.600', 'gray.400');

    return (
        <HStack
            w="full"
            px={4}
            py={3}
            rounded="xl"
            spacing={3}
            bg={isActive ? activeBg : 'transparent'}
            color={isActive ? activeColor : inactiveColor}
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
                bg: activeBg,
                color: activeColor,
                transform: 'translateX(5px)'
            }}
            onClick={onClick}
        >
            <Icon as={icon} w={5} h={5} />
            <Text fontWeight={isActive ? "bold" : "medium"}>{label}</Text>
        </HStack>
    );
};

export default function Sidebar({ user, currentView, setCurrentView, onSidebarClose }) {
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <VStack spacing={8} align="stretch" h="full" py={8}>
            <HStack px={4} spacing={3}>
                <Icon as={MdHub} w={8} h={8} color="blue.500" />
                <Heading size="md" letterSpacing="tight">ServiceHub</Heading>
            </HStack>

            <VStack spacing={2} align="stretch" flex={1}>
                <SidebarItem 
                    icon={MdDashboard} 
                    label="Dashboard" 
                    isActive={currentView === 'dashboard'} 
                    onClick={() => { setCurrentView('dashboard'); onSidebarClose?.(); }}
                />
                <SidebarItem 
                    icon={MdCategory} 
                    label="Services" 
                    isActive={currentView === 'services'} 
                    onClick={() => { setCurrentView('services'); onSidebarClose?.(); }}
                />
                <SidebarItem 
                    icon={MdSettings} 
                    label="Settings" 
                    isActive={currentView === 'settings'} 
                    onClick={() => { setCurrentView('settings'); onSidebarClose?.(); }}
                />
            </VStack>

            <Divider borderColor={borderColor} />

            <VStack spacing={4} align="stretch">
                <HStack px={4} spacing={3}>
                    <Avatar size="sm" name={user.name} />
                    <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="bold" noOfLines={1}>{user.name}</Text>
                        <Text fontSize="xs" color="gray.500" noOfLines={1}>{user.email}</Text>
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
}
