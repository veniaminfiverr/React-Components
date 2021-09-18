import React, {useEffect, useState} from "react"
import {Form, Card, Button, Container} from 'react-bootstrap'
import {Link,useHistory} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";

const SignUp = () => {

    const history = useHistory();

    let userObj = {
        email: '',
        password: '',
        name: '',
        phone: ''
    }

    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: userObj,
        validationSchema: Yup.object({
            email: Yup.string().max(50, 'Email must be shorter than 50 characters').required().email(),
            password: Yup.string().min(6, 'Password should be longer than 6 characters').required(),
            name: Yup.string().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
            phone: Yup.number().required()
        }),
        onSubmit: ({name,email, password,phone}) => {
            let userObj = { email: email,  password: password,  name: name,  phone: phone}
            Swal.fire({
                title: 'Please wait...',
                html: '',
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            });
            axios.post('http://localhost:5000/api/signup', userObj).then( resp => {
                Swal.close();
                history.push('/');
            })
            .catch(err => {
                Swal.fire('Some error occurred!', '', 'error');
            });
            Swal.close()
        }
    });
    
    return(
        <>
            <Container className= "w-50 mt-4">
                <Card>
                    <Card.Header>
                        <h2 className="text-center mb-2 mt-2">
                            Create an account
                        </h2>
                    </Card.Header>
                    <Card.Body className="p-3">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"
                                              value={values.name}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              id="name"/>
                                {touched.name && errors.name ? (
                                    <div className="text-danger h6 pt-2 pb-2">{errors.name}</div>
                                ): null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                              value={values.email}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              id="email"
                                              className={touched.email && errors.email && "border-danger"}
                                />
                                {touched.email && errors.email ? (
                                    <div className="text-danger h6 pt-3 pb-3">{errors.email}</div>
                                ): null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                              value={values.password}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              id="password"/>
                                {touched.password && errors.password ? (
                                    <div className="text-danger h6 pt-2 pb-2">{errors.password}</div>
                                ): null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contact No.</Form.Label>
                                <Form.Control type="number"
                                              value={values.phone}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              id="phone"/>
                                {touched.phone && errors.phone ? (
                                    <div className="text-danger h6 pt-2 pb-2">{errors.phone}</div>
                                ): null}
                            </Form.Group>
                            <Button className="w-100 mt-4" type={"submit"}>
                                Sign up
                            </Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <div className="w-100 text-center mt-2">
                            Already have an account?
                            <Link to='/'><b>Log in!</b></Link>
                        </div>
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default SignUp;

