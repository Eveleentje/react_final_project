import React from "react";
import { useNavigate } from "react-router-dom";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export const DeleteEvent = ({ event }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const navigate = useNavigate();

    const deleteEventFunction = async (event) => {
        const response = await fetch(
            `http://localhost:3000/events/${event.id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
            }
        );
        if (response.ok) {
            navigate('/');
        }
    };

    const warning = () => {
        deleteEventFunction(event);
        onClose();
    };

    return (
        <>
            <Button size="sm" onClick={onOpen} rightIcon={<DeleteIcon />}>
                Delete
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Are you sure you want to delete the event?
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            You are about to delete this event. This action can
                            not be undone.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={warning}
                                ml={3}
                                colorScheme="purple"
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};
