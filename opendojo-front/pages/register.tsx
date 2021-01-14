import { resolveHref } from "next/dist/next-server/lib/router/router";
import {Formik, Form} from 'formik';
import Wrapper from '../components/wrapper';
import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input }from "@chakra-ui/core";

interface registerProps {

}


const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper variant="small">
        <Formik initialValues={{ username: "", password: ""}}
        onSubmit={(values) => {
            console.log(values);
        }}>
            {({values, handleChange}) => (
                <Form>
                    <FormControl>
                <FormLabel htmlFor="name">Username</FormLabel>
                <Input value={values.username} id="username" placeholder="name" />
                {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
              </FormControl>
                </Form>
            )}
        </Formik>
        </Wrapper>
  
    );
}

export default Register;