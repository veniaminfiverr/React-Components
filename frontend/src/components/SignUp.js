import React, {useEffect, useState} from "react"
import {Form, Card, Button, Container} from 'react-bootstrap'
import {connect} from "react-redux";



const SignUp = () => {

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Hello im clicked!");
    }
    
    return(
        <>
            <Container className= "w-auto mt-4">
                <Card>
                    <Card.Header>
                        <h2 className="text-center mb-2 mt-2">
                            Create an account
                        </h2>
                    </Card.Header>
                    <Card.Body className="p-3">
                        {/*<div className="container">*/}
                        {/*    <UploadImage setProfileImg={setProfileImg} placeholder={props.user ? props.user.img : ''} mode={props.mode}/>*/}
                        {/*</div>*/}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"
                                              id="name"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                              id="email"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                              id="password"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contact No.</Form.Label>
                                <Form.Control type="number"
                                              id="phone"/>
                            </Form.Group>
                            <Button className="w-100 mt-4" type={"submit"}>
                                Sign up
                            </Button>
                        </Form>
                    </Card.Body>
                    {/*{"Signup" === props.mode ? (*/}
                    {/*    <Card.Footer>*/}
                    {/*        <div className="w-100 text-center mt-2">*/}
                    {/*            Already have an account?*/}
                    {/*        </div>*/}
                    {/*    </Card.Footer>*/}
                    {/*) : ''*/}
                    {/*}*/}
                </Card>
            </Container>
        </>
    )
}

export default SignUp;

