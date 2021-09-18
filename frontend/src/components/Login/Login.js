import React from "react"
import {Form, Card, Button, Container} from 'react-bootstrap'
import {Link, useHistory} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {

    const history = useHistory();

    let userObj = {
        email: '',
        password: ''
    }

    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: userObj,
        validationSchema: Yup.object({
            email: Yup.string().max(50, 'Email must be shorter than 50 characters').required().email(),
            password: Yup.string().min(6, 'Password should be longer than 6 characters').required(),
        }),
        onSubmit: ({email, password}) => {
            let userObj = { email: email,  password: password}
            Swal.fire({
                title: 'Please wait...',
                html: '',
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            });
            axios.post('http://localhost:5000/api/login', userObj).then( resp => {
                localStorage.setItem("user",JSON.stringify(resp.data));
                history.push('/Home');
            }).catch(err => {
                Swal.fire('User not found!', '', 'error');
            });
            Swal.close();
        }
    });

    return(
        <>
            <Container className= "w-50 mt-4">
                <Card>
                    <Card.Header>
                        <h2 className="text-center mb-2 mt-2">
                            LOGIN PAGE
                        </h2>
                    </Card.Header>
                    <Card.Body className="p-3">
                        <Form onSubmit={handleSubmit}>
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
                            <Button className="w-100 mt-4" type={"submit"}>
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <div className="w-100 text-center mt-2">
                            Create an account?
                            <Link to='/signup'><b>Sign Up!</b></Link>
                        </div>
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default Login;

