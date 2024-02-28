import { SearchField } from "./ui/SearchField";
import { Box } from "@chakra-ui/react";

export const EventSearch = ({ onSearch, eventsArray }) => {
    const handleChange = (e) => {
        const matchedEvents = eventsArray.filter((event) => {
            return event.title
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });

        onSearch(matchedEvents);
    };

    return (
        <>
            <Box w="45vw">
                <SearchField onChange={handleChange} />
            </Box>
        </>
    );
};
