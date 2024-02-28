import { Input } from "@chakra-ui/react";

export const SearchField = ({ onChange, ...props }) => {
    return (
        <>
            <Input
                bg="white"
                onChange={onChange}
                placeholder="type to search"
                {...props}
                borderRadius={0}
            ></Input>
        </>
    );
};
