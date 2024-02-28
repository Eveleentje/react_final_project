import { Button } from "@chakra-ui/react";
import "./CategoryFilter.css";

export const CategoryFilter = ({ setCategoryFilter, categories }) => {
    return (
        <>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <Button
                            _hover={{ bg: "black", color: "white" }}
                            borderRadius={0}
                            border="solid black 1px"
                            bg="white"
                            onClick={() => setCategoryFilter(category.id)}
                        >
                            {category.name}
                        </Button>
                    </li>
                ))}
                <li>
                    <Button
                        _hover={{ bg: "black", color: "white" }}
                        borderRadius={0}
                        border="solid black 1px"
                        bg="white"
                        onClick={() => setCategoryFilter(null)}
                    >
                        clear filter
                    </Button>
                </li>
            </ul>
        </>
    );
};
