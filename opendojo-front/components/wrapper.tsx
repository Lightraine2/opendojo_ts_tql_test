import React from 'react';
import {Box} from "@chakra-ui/core";

// sample ts component structure

//props defined within an interface
//questionmark = optional prop

interface WrapperProps {
    variant?: "small" | "regular";
}

// component as const, taking the props
export const Wrapper: React.FC<WrapperProps> = ({children, variant='regular'}) => {
    return (
        <Box maxW={variant === 'regular' ? "800px": "400px"} w="100%" mt={8} mx="auto">
            {children}
        </Box>
    )
}

