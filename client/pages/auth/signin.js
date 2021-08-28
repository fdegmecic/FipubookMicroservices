import {useState} from 'react';
import useRequest from "../../hooks/use-request";
import Router from 'next/router';
import {Col, Container, Row} from "react-bootstrap";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {doRequest, errors} = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    })

    const onSubmit = async (event) => {
        event.preventDefault();


        await doRequest();
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <Container>
                    <h1 align="center">Sign in</h1>
                    <Row className="mt-5">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {errors}
                            <div className="col text-center pt-3">
                            <button className="btn btn-primary">Sign In</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </form>
        </div>
    );
}

export default SignIn;
