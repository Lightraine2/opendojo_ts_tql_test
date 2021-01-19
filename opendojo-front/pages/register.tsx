import { resolveHref } from "next/dist/next-server/lib/router/router";
import {Formik, Form} from 'formik';
import {Wrapper} from "../components/wrapper";
import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Button, Input, Box }from "@chakra-ui/core";
import {InputField} from "../components/InputField";
import { useMutation } from "urql";

interface registerProps {

}

const REGISTER_MUTATION = 
`
mutation Register($username: String!, $password:String!) {
    register(options: {username: $username, password: $password}) {
        errors {
            field
            message
        }
        user {
            id
            username
        }
    }
}
`

// notice how here we've wrapped the whole app in the urql client - and we'll call the mutations from gql in the components. 

const Register: React.FC<registerProps> = ({}) => {
    const [,register] = useMutation(REGISTER_MUTATION);
    return (
        <Wrapper variant="small">
        <Formik 
        initialValues={{ username: "", password: ""}}
        onSubmit={async (values) => {
         const response = await register(values);
        }}
        >
            {({isSubmitting}) => (
                <Form>
                 <InputField 
                 name="username" 
                 placeholder="username"
                 label="username" />
                 <Box mt={4}>
                 <InputField 
                 name="password" 
                 placeholder="password"
                 label="Password"
                 type="password" />
                 </Box>
                 <Button mt={4} isLoading={isSubmitting} type="submit" variantColor="teal">register </Button>
                </Form>
            )}
        </Formik>
        </Wrapper>
  
    );
}

export default Register;