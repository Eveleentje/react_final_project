import React from "react";
import {
    Heading,
    Box,
    Image,
    HStack,
    Tag,
    Grid,
    GridItem,
    Button,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useLoaderData, Link } from "react-router-dom";
import { DeleteEvent } from "../components/DeleteEvent";

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

export const EventPage = () => {
    const { event, users, categories } = useLoaderData();
    const user = users.find((user) => user.id == event.createdBy);
    const eventCategories = categories.filter((category) =>
        event.categoryIds.find((categoryId) => categoryId == category.id)
    );
    const formatTime = (datetime) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        const newDate = new Date(datetime).toLocaleDateString([], options);
        return newDate;
    };

    return (
        <>
            <Grid templateColumns="repeat(2, 1fr)" gap={5} p={5}>
                <GridItem>
                    <Link to={`/edit/${event.id}`}>
                        <Button
                            size="sm"
                            marginRight={5}
                            rightIcon={<EditIcon />}
                        >
                            Edit
                        </Button>
                    </Link>
                    <DeleteEvent event={event} />

                    <Heading marginTop={5} paddingBottom={2} size="3xl">
                        {event.title}
                    </Heading>
                    {event.description ? (
                        <Heading size="md">{event.description}</Heading>
                    ) : (
                        ""
                    )}

                    <Box paddingTop={5} paddingBottom={5}>
                        <p>{formatTime(event.startTime)}</p>
                        <p>{formatTime(event.endTime)}</p>
                    </Box>
                    {event.categoryIds ? (
                        <Box>
                            {eventCategories.map((category) => (
                                <Tag
                                    marginRight={3}
                                    marginBottom={5}
                                    key={category.id}
                                >
                                    {category.name}
                                </Tag>
                            ))}
                        </Box>
                    ) : (
                        ""
                    )}

                    {event.createdBy ? (
                        <Box paddingTop={5} borderTop="1px solid">
                            <p>Submitted by:</p>

                            <HStack paddingTop={2}>
                                <Image
                                    borderRadius="full"
                                    boxSize="50px"
                                    src={user.image}
                                ></Image>
                                <Heading size="sm">{user.name}</Heading>
                            </HStack>
                        </Box>
                    ) : (
                        ""
                    )}
                </GridItem>
                <GridItem>
                    {event.image ? (
                        <Image
                            paddingTop={5}
                            paddingBottom={5}
                            src={event.image}
                        ></Image>
                    ) : (
                        ""
                    )}
                </GridItem>
            </Grid>
        </>
    );
};
