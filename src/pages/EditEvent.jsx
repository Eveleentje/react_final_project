import React from "react";
import { useState } from "react";
import { Heading, Box, useToast } from "@chakra-ui/react";
import { EditForm } from "../components/EditForm";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
    const users = await fetch("http://localhost:3000/users");
    const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
    const categories = await fetch("http://localhost:3000/categories");

    return {
        event: await event.json(),
        users: await users.json(),
        categories: await categories.json(),
    };
};

export const EditEvent = () => {
    const { event, users, categories } = useLoaderData();
    const toast = useToast();

    const editEvent = async (edits) => {
        try {
            const response = await fetch(
                `http://localhost:3000/events/${event.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(edits),
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                }
            );
            if (response.ok) {
                toast({
                    title: "Successfully updated",
                    description: "Thank you for updating this event",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: `${error}, please try again`,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Heading>Edit Event</Heading>
                <EditForm event={event} editEvent={editEvent} />
            </Box>
        </>
    );
};
