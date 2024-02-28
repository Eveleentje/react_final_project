import { useState } from "react";
import {
    Input,
    Radio,
    RadioGroup,
    CheckboxGroup,
    Checkbox,
    FormControl,
    FormLabel,
    Button,
} from "@chakra-ui/react";
import "./EventForm.css";

export const EventForm = ({ createEvent }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [location, setLocation] = useState("");
    const [createdBy, setCreator] = useState("");
    const [categoryIds, setCategoryIds] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        createEvent({
            title,
            description,
            image,
            location,
            createdBy,
            categoryIds,
            startTime,
            endTime,
        });
    };

    const checkboxClicked = (e) => {
        const checked = e.target.checked;
        const value = parseInt(e.target.value);

        console.log(checked);

        if (checked) {
            setCategoryIds([...categoryIds, value]);
        }
        if (!checked) {
            setCategoryIds(
                categoryIds.filter((categoryId) => categoryId !== value)
            );
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel marginTop={5}>
                        Select who submits the event
                    </FormLabel>
                    <RadioGroup
                        marginBottom={5}
                        onChange={setCreator}
                        value={createdBy}
                    >
                        <Radio value="1" marginRight={5}>
                            Ignacio Doe
                        </Radio>
                        <Radio value="2">Jane Bennett</Radio>
                    </RadioGroup>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Title of the event</FormLabel>
                    <Input
                        type="text"
                        placeholder="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        marginBottom={5}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                        type="text"
                        placeholder="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        marginBottom={5}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Image</FormLabel>
                    <Input
                        type="url"
                        placeholder="image url"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        marginBottom={5}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Location</FormLabel>
                    <Input
                        type="text"
                        placeholder="location"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        marginBottom={5}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Categories</FormLabel>
                    <CheckboxGroup>
                        <Checkbox
                            name="sports"
                            value="1"
                            onChange={checkboxClicked}
                            marginRight={5}
                        >
                            Sports
                        </Checkbox>

                        <Checkbox
                            name="games"
                            value="2"
                            onChange={checkboxClicked}
                            marginRight={5}
                        >
                            Games
                        </Checkbox>
                        <Checkbox
                            name="relaxation"
                            value="3"
                            onChange={checkboxClicked}
                            marginRight={5}
                        >
                            Relaxation
                        </Checkbox>
                    </CheckboxGroup>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel marginTop={5}>Start time</FormLabel>
                    <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        marginBottom={5}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>End time</FormLabel>
                    <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        marginBottom={5}
                    />
                </FormControl>
                <Button
                    borderRadius={0}
                    border="1px solid black"
                    bg="white"
                    _hover={{ bg: "black", color: "white" }}
                    type="submit"
                    marginTop={5}
                >
                    Add event
                </Button>
            </form>
        </>
    );
};
