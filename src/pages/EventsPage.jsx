import React from "react";
import {
    Heading,
    Card,
    CardBody,
    Grid,
    GridItem,
    Box,
    Text,
    HStack,
    Tag,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { EventSearch } from "../components/EventSearch";
import { CategoryFilter } from "../components/CategoryFilter";

export const loader = async () => {
    const events = await fetch("http://localhost:3000/events");
    const categories = await fetch("http://localhost:3000/categories");
    return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
    const { events, categories } = useLoaderData();

    const [eventsArray, setEventsArray] = useState(events);
    const [categoryFilter, setCategoryFilter] = useState(null);

    console.log(categoryFilter);
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

    useEffect(() => {
        if (categoryFilter != null) {
            setEventsArray(
                eventsArray.filter((event) =>
                    event.categoryIds.find(
                        (categoryId) => categoryId == categoryFilter
                    )
                )
            );
        } else {
            setEventsArray(events);
        }
    }, [categoryFilter]);

    return (
        <>
            <Box p={[0, 20, 50]} minHeight="100vh">
                <Box paddingBottom={3}>
                    <EventSearch
                        eventsArray={eventsArray}
                        onSearch={setEventsArray}
                    />
                </Box>
                <Box paddingBottom={10}>
                    <CategoryFilter
                        setCategoryFilter={setCategoryFilter}
                        categories={categories}
                    />
                </Box>
                <Heading size="3xl" paddingBottom={10}>
                    All events
                </Heading>
                <Grid
                    className="eventslist"
                    templateColumns={[
                        "1fr",
                        "repeat(2, 1fr)",
                        "repeat(3, 1fr)",
                    ]}
                    gap={6}
                >
                    {eventsArray.map((event) => (
                        <GridItem key={event.id}>
                            <Card
                                borderRadius={0}
                                border="solid black 1px"
                            >
                                <CardBody>
                                    <Link to={`event/${event.id}`}>
                                        <Heading size="lg" paddingBottom={1}>
                                            {event.title}
                                        </Heading>
                                    </Link>
                                    {event.description ? (
                                        <Heading size="sm" paddingBottom={3}>
                                            {event.description}
                                        </Heading>
                                    ) : (
                                        ""
                                    )}
                                    {event.image ? (
                                        <img src={event.image}></img>
                                    ) : (
                                        ""
                                    )}

                                    <Text paddingTop={5}>
                                        Starts: {formatTime(event.startTime)}
                                    </Text>
                                    <Text>
                                        Ends: {formatTime(event.endTime)}
                                    </Text>
                                    {event.categoryIds ? (
                                        <HStack paddingTop={5}>
                                            {categories
                                                .filter((category) =>
                                                    event.categoryIds.find(
                                                        (categoryId) =>
                                                            categoryId ==
                                                            category.id
                                                    )
                                                )
                                                .map((cat) => (
                                                    <Tag key={cat.id}>
                                                        {cat.name}
                                                    </Tag>
                                                ))}
                                        </HStack>
                                    ) : (
                                        ""
                                    )}
                                </CardBody>
                            </Card>
                        </GridItem>
                    ))}
                </Grid>
            </Box>
        </>
    );
};
