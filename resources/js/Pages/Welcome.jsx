import React from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Stack,
    Text,
    SimpleGrid,
    Icon,
    useColorModeValue,
    HStack,
    Spacer,
    Circle,
    Square,
    Divider,
    VStack,
    Badge,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Avatar,
    Wrap,
    WrapItem,
    Center,
    Image,
} from '@chakra-ui/react';
import { Head, Link } from '@inertiajs/react';
import { 
    MdRocketLaunch, 
    MdShield, 
    MdElectricBolt, 
    MdArrowForward,
    MdHub,
    MdCheckCircle,
    MdAutoMode,
    MdQueryStats,
    MdLayers,
    MdOutlineSupportAgent,
    MdDesignServices,
    MdStorage,
    MdSpeed,
} from 'react-icons/md';

const NavLink = ({ children, href }) => (
    <Box 
        as="a" 
        href={href} 
        fontSize="sm" 
        fontWeight="semibold" 
        _hover={{ color: 'blue.500' }} 
        transition="all 0.2s"
    >
        {children}
    </Box>
);

const SectionTitle = ({ subtitle, title, centered = true }) => (
    <VStack spacing={3} align={centered ? "center" : "start"} mb={16}>
        <Badge colorScheme="blue" variant="subtle" rounded="full" px={4} py={1} textTransform="uppercase" letterSpacing="widest">
            {subtitle}
        </Badge>
        <Heading size="2xl" fontWeight="800" textAlign={centered ? "center" : "left"}>
            {title}
        </Heading>
    </VStack>
);

const FeatureItem = ({ icon, title, desc }) => (
    <HStack align="start" spacing={4} p={6} rounded="2xl" bg={useColorModeValue('white', 'whiteAlpha.50')} border="1px" borderColor={useColorModeValue('gray.100', 'gray.800')}>
        <Circle size="40px" bg="blue.50" color="blue.500">
            <Icon as={icon} w={5} h={5} />
        </Circle>
        <VStack align="start" spacing={1}>
            <Text fontWeight="bold">{title}</Text>
            <Text fontSize="sm" color="gray.500">{desc}</Text>
        </VStack>
    </HStack>
);

const Testimonial = ({ name, role, content, avatar }) => (
    <VStack 
        p={8} 
        bg={useColorModeValue('white', 'gray.800')} 
        rounded="3xl" 
        shadow="xl" 
        border="1px" 
        borderColor={useColorModeValue('gray.100', 'gray.700')}
        align="start"
        spacing={4}
    >
        <Text fontSize="md" color="gray.600" italic>"{content}"</Text>
        <HStack>
            <Avatar size="sm" name={name} />
            <VStack align="start" spacing={0}>
                <Text fontWeight="bold" fontSize="sm">{name}</Text>
                <Text fontSize="xs" color="gray.500">{role}</Text>
            </VStack>
        </HStack>
    </VStack>
);

export default function Welcome({ auth }) {
    const bgMain = useColorModeValue('white', 'gray.950');
    
    return (
        <Box bg={bgMain} minH="100vh" scrollBehavior="smooth">
            <Head title="ServiceHub | Modern Management" />

            {/* Navigation */}
            <Box as="nav" position="fixed" top={0} w="full" zIndex={10} py={4} bg={useColorModeValue('rgba(255,255,255,0.8)', 'rgba(10,10,10,0.8)')} backdropFilter="blur(10px)" borderBottom="1px" borderColor={useColorModeValue('gray.100', 'gray.800')}>
                <Container maxW="container.xl">
                    <Flex align="center">
                        <HStack spacing={2}>
                            <Icon as={MdHub} w={8} h={8} color="blue.500" />
                            <Heading size="md">ServiceHub</Heading>
                        </HStack>
                        <Spacer />
                        <HStack spacing={8} display={{ base: 'none', lg: 'flex' }}>
                            <NavLink href="#services">Services</NavLink>
                            <NavLink href="#how-it-works">How it works</NavLink>
                            <NavLink href="#features">Features</NavLink>
                            <NavLink href="#testimonials">Testimonials</NavLink>
                            <NavLink href="#faq">FAQ</NavLink>
                        </HStack>
                        <Spacer />
                        <HStack spacing={4}>
                            {auth.user ? (
                                <Button as={Link} href={route('dashboard')} colorScheme="blue" rounded="full" size="sm">Dashboard</Button>
                            ) : (
                                <>
                                    <Button as={Link} href={route('login')} variant="ghost" size="sm">Log in</Button>
                                    <Button as={Link} href={route('register')} colorScheme="blue" rounded="full" size="sm" px={6}>Get Started</Button>
                                </>
                            )}
                        </HStack>
                    </Flex>
                </Container>
            </Box>

            {/* Hero Section */}
            <Box pt={40} pb={32} id="hero">
                <Container maxW="container.xl">
                    <Stack direction={{ base: 'column', lg: 'row' }} spacing={16} align="center">
                        <Stack flex={1} spacing={8}>
                            <Badge w="fit-content" colorScheme="blue" rounded="full" px={4}>The Future is Here</Badge>
                            <Heading fontSize={{ base: '4xl', md: '7xl' }} fontWeight="900" lineHeight="1">
                                Manage Your <br />
                                <Text as="span" bgGradient="linear(to-r, blue.400, purple.500)" bgClip="text">Digital Services</Text>
                                <br /> with Precision.
                            </Heading>
                            <Text fontSize="xl" color="gray.500">
                                A high-performance management core designed for modern infrastructure. 
                                Orchestrate your services with zero friction.
                            </Text>
                            <HStack spacing={4}>
                                <Button size="lg" colorScheme="blue" rounded="full" px={10} rightIcon={<MdArrowForward />}>
                                    Initialize Now
                                </Button>
                                <Button size="lg" variant="ghost" rounded="full">
                                    Watch Demo
                                </Button>
                            </HStack>
                        </Stack>
                        <Box flex={1} w="full" position="relative" px={{ base: 4, lg: 0 }}>
                            {/* Decorative background glow */}
                            <Box
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                w="80%"
                                h="80%"
                                bg="blue.400"
                                filter="blur(100px)"
                                opacity="0.1"
                                zIndex={0}
                            />
                            
                            {/* Browser Frame Mockup */}
                            <Box
                                position="relative"
                                zIndex={1}
                                rounded="2xl"
                                shadow="2xl"
                                overflow="hidden"
                                border="1px"
                                borderColor={useColorModeValue('gray.200', 'gray.700')}
                                bg={useColorModeValue('white', 'gray.800')}
                                transition="all 0.3s ease"
                                _hover={{ transform: 'translateY(-10px)' }}
                            >
                                {/* Browser Header */}
                                <Flex 
                                    bg={useColorModeValue('gray.50', 'gray.900')} 
                                    px={4} 
                                    py={3} 
                                    borderBottom="1px" 
                                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                                    align="center"
                                    gap={2}
                                >
                                    <Circle size="10px" bg="red.400" />
                                    <Circle size="10px" bg="yellow.400" />
                                    <Circle size="10px" bg="green.400" />
                                    <Spacer />
                                    <Box h="6px" w="100px" bg={useColorModeValue('gray.200', 'gray.700')} rounded="full" />
                                    <Spacer />
                                </Flex>
                                
                                <Image 
                                    src="/images/hero-dashboard.png" 
                                    alt="Digital Service Management Dashboard"
                                    w="100%"
                                    h="100%"
                                    loading="lazy"
                                />
                            </Box>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            {/* Services Section */}
            <Box py={32} bg={useColorModeValue('gray.50', 'whiteAlpha.50')} id="services">
                <Container maxW="container.xl">
                    <SectionTitle subtitle="What we manage" title="Comprehensive Digital Services" />
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                        <FeatureItem icon={MdDesignServices} title="Design Orchestration" desc="Manage your creative assets and design workflows seamlessly across global teams." />
                        <FeatureItem icon={MdStorage} title="Cloud Infrastructure" desc="Instant management of storage, compute, and database nodes with automated scaling." />
                        <FeatureItem icon={MdOutlineSupportAgent} title="Service Intelligence" desc="AI-driven support and monitoring for every digital service in your portfolio." />
                        <FeatureItem icon={MdShield} title="Security Hardening" desc="Automated security auditing and vulnerability patching for active services." />
                        <FeatureItem icon={MdSpeed} title="Performance Tuning" desc="Real-time optimization of service delivery networks for ultra-low latency." />
                        <FeatureItem icon={MdAutoMode} title="Lifecycle Automation" desc="End-to-end automation from service registration to global decommissioning." />
                    </SimpleGrid>
                </Container>
            </Box>

            {/* How It Works Section */}
            <Box py={32} id="how-it-works">
                <Container maxW="container.xl">
                    <Stack direction={{ base: 'column', lg: 'row' }} spacing={20} align="center">
                        <Box flex={1}>
                            <Heading size="2xl" mb={8}>Simplified <Text as="span" color="blue.500">Workflow</Text></Heading>
                            <VStack align="start" spacing={12}>
                                <HStack spacing={6}>
                                    <Circle size="50px" bg="blue.500" color="white" fontWeight="bold">1</Circle>
                                    <Box>
                                        <Text fontWeight="bold" fontSize="lg">Registration</Text>
                                        <Text color="gray.500">Connect your digital assets to the Hub in seconds.</Text>
                                    </Box>
                                </HStack>
                                <HStack spacing={6}>
                                    <Circle size="50px" bg="blue.500" color="white" fontWeight="bold">2</Circle>
                                    <Box>
                                        <Text fontWeight="bold" fontSize="lg">Configuration</Text>
                                        <Text color="gray.500">Apply global policies and orchestration rules.</Text>
                                    </Box>
                                </HStack>
                                <HStack spacing={6}>
                                    <Circle size="50px" bg="blue.500" color="white" fontWeight="bold">3</Circle>
                                    <Box>
                                        <Text fontWeight="bold" fontSize="lg">Global Launch</Text>
                                        <Text color="gray.500">Monitor and manage with real-time analytics.</Text>
                                    </Box>
                                </HStack>
                            </VStack>
                        </Box>
                        <Box flex={1} bg="blue.500" rounded="3xl" p={12} color="white" shadow="xl">
                            <Icon as={MdRocketLaunch} w={20} h={20} mb={6} />
                            <Heading size="xl" mb={4}>Zero to Global in 5 Minutes</Heading>
                            <Text fontSize="lg" opacity={0.9}>Our platform eliminates the complexity of service management, allowing you to focus on what matters.</Text>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            {/* Features Section */}
            <Box py={32} bg={useColorModeValue('gray.50', 'whiteAlpha.50')} id="features">
                <Container maxW="container.xl">
                    <SectionTitle subtitle="Core Capabilities" title="Engineered for Performance" />
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                        <VStack p={8} bg={bgMain} rounded="2xl" align="start" spacing={4} border="1px" borderColor={useColorModeValue('gray.100', 'gray.800')}>
                            <Icon as={MdElectricBolt} w={10} h={10} color="orange.400" />
                            <Text fontWeight="bold">Lightning Fast</Text>
                            <Text fontSize="sm" color="gray.500">Optimized core for sub-millisecond management response times.</Text>
                        </VStack>
                        <VStack p={8} bg={bgMain} rounded="2xl" align="start" spacing={4} border="1px" borderColor={useColorModeValue('gray.100', 'gray.800')}>
                            <Icon as={MdShield} w={10} h={10} color="green.400" />
                            <Text fontWeight="bold">Secure Access</Text>
                            <Text fontSize="sm" color="gray.500">Identity-based management with granular permission controls.</Text>
                        </VStack>
                        <VStack p={8} bg={bgMain} rounded="2xl" align="start" spacing={4} border="1px" borderColor={useColorModeValue('gray.100', 'gray.800')}>
                            <Icon as={MdQueryStats} w={10} h={10} color="blue.400" />
                            <Text fontWeight="bold">Deep Insights</Text>
                            <Text fontSize="sm" color="gray.500">Comprehensive observability for every service in your hub.</Text>
                        </VStack>
                        <VStack p={8} bg={bgMain} rounded="2xl" align="start" spacing={4} border="1px" borderColor={useColorModeValue('gray.100', 'gray.800')}>
                            <Icon as={MdLayers} w={10} h={10} color="purple.400" />
                            <Text fontWeight="bold">Multi-Cloud</Text>
                            <Text fontSize="sm" color="gray.500">Uniform management across AWS, Azure, and Google Cloud.</Text>
                        </VStack>
                    </SimpleGrid>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Box py={32} id="testimonials">
                <Container maxW="container.xl">
                    <SectionTitle subtitle="Success Stories" title="Trusted by Global Teams" />
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                        <Testimonial 
                            name="Sarah Chen" 
                            role="CTO at TechFlow" 
                            content="ServiceHub transformed how we manage our digital infrastructure. The speed and security are unmatched." 
                        />
                        <Testimonial 
                            name="Marcus Thorne" 
                            role="Head of Ops at CloudScale" 
                            content="The zero-image, high-performance approach of this platform is exactly what modern dev teams need." 
                        />
                        <Testimonial 
                            name="Elena Rodriguez" 
                            role="Product Lead at NeoGlobal" 
                            content="I've never seen a management tool that is this intuitive yet powerful. A true game-changer." 
                        />
                    </SimpleGrid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box py={20} id="cta">
                <Container maxW="container.lg">
                    <Box 
                        bgGradient="linear(to-br, blue.600, purple.700)" 
                        rounded="4xl" 
                        p={{ base: 10, md: 20 }} 
                        textAlign="center" 
                        color="white"
                        shadow="2xl"
                    >
                        <Heading size="3xl" mb={6}>Start Orchestrating Today</Heading>
                        <Text fontSize="xl" mb={10} opacity={0.9}>Join 5,000+ companies managing services with ServiceHub.</Text>
                        <Button as={Link} href={route('register')} size="xl" h="16" px={12} bg="white" color="blue.600" rounded="2xl" _hover={{ bg: 'gray.100', transform: 'scale(1.05)' }}>
                            Join the Platform
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* FAQ Section */}
            <Box py={32} bg={useColorModeValue('gray.50', 'whiteAlpha.50')} id="faq">
                <Container maxW="container.md">
                    <SectionTitle subtitle="Support" title="Frequently Asked Questions" />
                    <Accordion allowMultiple>
                        <AccordionItem border="none" mb={4}>
                            <AccordionButton bg={bgMain} p={6} rounded="2xl" _expanded={{ bg: 'blue.500', color: 'white' }}>
                                <Box flex="1" textAlign="left" fontWeight="bold">
                                    Is it really image-free?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4} px={6} color="gray.500">
                                Yes! Our platform uses pure CSS and high-performance SVG icons to ensure maximum speed and accessibility.
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem border="none" mb={4}>
                            <AccordionButton bg={bgMain} p={6} rounded="2xl" _expanded={{ bg: 'blue.500', color: 'white' }}>
                                <Box flex="1" textAlign="left" fontWeight="bold">
                                    How secure is the platform?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4} px={6} color="gray.500">
                                We use Laravel Sanctum for robust API authentication and follow industry best practices for data encryption and access control.
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem border="none" mb={4}>
                            <AccordionButton bg={bgMain} p={6} rounded="2xl" _expanded={{ bg: 'blue.500', color: 'white' }}>
                                <Box flex="1" textAlign="left" fontWeight="bold">
                                    Can I integrate with my existing cloud?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4} px={6} color="gray.500">
                                Absolutely. ServiceHub is designed to be cloud-agnostic and supports all major providers and on-premise infrastructure.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Container>
            </Box>

            {/* Footer */}
            <Box py={20} borderTop="1px" borderColor={useColorModeValue('gray.100', 'gray.800')}>
                <Container maxW="container.xl">
                    <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
                        <HStack spacing={2}>
                            <Icon as={MdHub} w={6} h={6} color="blue.500" />
                            <Heading size="sm">ServiceHub</Heading>
                        </HStack>
                        <HStack spacing={8} mt={{ base: 8, md: 0 }} fontSize="xs" fontWeight="bold" color="gray.500">
                            <Text>Privacy</Text>
                            <Text>Terms</Text>
                            <Text>Security</Text>
                            <Text>Contact</Text>
                        </HStack>
                        <Text mt={{ base: 8, md: 0 }} fontSize="xs" color="gray.500">&copy; 2026 ServiceHub Management. All rights reserved.</Text>
                    </Flex>
                </Container>
            </Box>
        </Box>
    );
}
