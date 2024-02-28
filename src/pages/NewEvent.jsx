import React from "react";
import { useState } from "react";
import { Heading, Box, useToast } from "@chakra-ui/react";
import { EventForm } from "../components/EventForm";

export const NewEvent = () => {
    const [events, setEvents] = useState([]);
    const toast = useToast();
    const loadPage = () => {
        window.location.reload(false);
    };

    const createEvent = async (event) => {
        try {
            const response = await fetch("http://localhost:3000/events", {
                method: "POST",
                body: JSON.stringify(event),
                headers: { "Content-Type": "application/json;charset=utf-8" },
            });
            event.id = (await response.json()).id;
            setEvents(events.concat(event));

            if (response.ok) {
                toast({
                    title: "Event created",
                    description: "Thank you for creating a new event",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
            }
            setTimeout(loadPage, 4500);
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: `${error}, please try again`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };
    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Heading>New Event</Heading>
                <EventForm createEvent={createEvent} />
            </Box>
        </>
    );
};
