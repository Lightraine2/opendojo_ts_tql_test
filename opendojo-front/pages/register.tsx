import { resolveHref } from "next/dist/next-server/lib/router/router";
import {Formik, Form} from 'formik';
import {Wrapper} from "../components/wrapper";
import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Button, Input, Box }from "@chakra-ui/core";
import {InputField} from "../components/InputField";

interface registerProps {

}


const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper variant="small">
        <Formik initialValues={{ username: "", password: ""}}
        onSubmit={(values) => {
            console.log(values);
        }}>
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