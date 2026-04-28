import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    HStack,
    Icon,
    Text,
} from '@chakra-ui/react';
import { MdWarning } from 'react-icons/md';

export default function ConfirmationModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    body, 
    confirmText = "Confirm", 
    confirmColor = "blue",
    isLoading = false
}) {
    const cancelRef = React.useRef();

    return (
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
                            <Icon as={MdWarning} color={`${confirmColor}.400`} />
                            <Text>{title}</Text>
                        </HStack>
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {body}
                    </AlertDialogBody>

                    <AlertDialogFooter gap={3}>
                        <Button ref={cancelRef} onClick={onClose} rounded="xl" variant="ghost">
                            Cancel
                        </Button>
                        <Button 
                            colorScheme={confirmColor} 
                            onClick={onConfirm} 
                            rounded="xl" 
                            shadow="lg"
                            isLoading={isLoading}
                        >
                            {confirmText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
