import { resolveHref } from "next/dist/next-server/lib/router/router";
import {Formik, Form} from 'formik';
import {Wrapper} from "../components/Wrapper";
import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Button, Input, Box }from "@chakra-ui/core";
import {InputField} from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";

interface registerProps {

}



// notice how here we've wrapped the whole app in the urql client - and we'll call the mutations from gql in the components. 

const Register: React.FC<registerProps> = ({}) => {
    const [,register] = useRegisterMutation();
    return (
        <Wrapper variant="small">
        <Formik 
        initialValues={{ username: "", password: ""}}
        onSubmit={async (values, {setErrors}) => {
         const response = await register(values);
         if (response.data?.register.errors) {
             [{field: 'username', message: 'something wrong'}]
            setErrors(
                {
                    username: "error"
                }
            )
         }
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