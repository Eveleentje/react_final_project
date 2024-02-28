import { useState } from "react";
import {
    Input,
    Radio,
    RadioGroup,
    CheckboxGroup,
    Checkbox,
    FormLabel,
    Button,
    FormControl,
} from "@chakra-ui/react";

export const EditForm = ({ editEvent, event }) => {
    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [image, setImage] = useState(event.image);
    const [location, setLocation] = useState(event.location);
    const [createdBy, setCreator] = useState(event.createdBy);
    const [categoryIds, setCategoryIds] = useState(event.categoryIds);
    const [startTime, setStartTime] = useState(event.startTime);
    const [endTime, setEndTime] = useState(event.endTime);

    const checkboxPreset = categoryIds.map(String);
    const creatorToString = createdBy.toString();

    const handleSubmit = (event) => {
        event.preventDefault();

        editEvent({
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
                    <FormLabel>Title</FormLabel>
                    <Input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />

                    <FormLabel paddingTop={5}>Description</FormLabel>
                    <Input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                    <FormLabel paddingTop={5}>Image url</FormLabel>
                    <Input
                        type="url"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                    <FormLabel paddingTop={5}>Location</FormLabel>
                    <Input
                        type="text"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                    />
                    <FormLabel paddingTop={5}>Submitted by</FormLabel>
                    <RadioGroup onChange={setCreator} value={creatorToString}>
                        <Radio marginRight={5} value="1">
                            Ignacio Doe
                        </Radio>
                        <Radio value="2">Jane Bennett</Radio>
                    </RadioGroup>
                    <FormLabel paddingTop={5}>Categories</FormLabel>
                    <CheckboxGroup defaultValue={checkboxPreset}>
                        <Checkbox
                            marginRight={5}
                            id="1"
                            name="sports"
                            value="1"
                            onChange={checkboxClicked}
                            defaultChecked
                        >
                            Sports
                        </Checkbox>

                        <Checkbox
                            marginRight={5}
                            id="2"
                            name="games"
                            value="2"
                            onChange={checkboxClicked}
                        >
                            Games
                        </Checkbox>
                        <Checkbox
                            marginRight={5}
                            id="3"
                            name="relaxation"
                            value="3"
                            onChange={checkboxClicked}
                        >
                            Relaxation
                        </Checkbox>
                    </CheckboxGroup>
                    <FormLabel paddingTop={5}>Start time</FormLabel>
                    <Input
                        placeholder={startTime}
                        size="md"
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    <FormLabel paddingTop={5}>End time</FormLabel>
                    <Input
                        placeholder={endTime}
                        size="md"
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </FormControl>
                <Button
                    type="submit"
                    borderRadius={0}
                    border="1px solid black"
                    bg="white"
                    _hover={{ bg: "black", color: "white" }}
                    marginTop={5}
                >
                    Edit event
                </Button>
            </form>
        </>
    );
};
