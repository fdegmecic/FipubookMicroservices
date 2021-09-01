import {useState} from 'react';
import useRequest from "../../hooks/use-request";
import Router from 'next/router';

const FormData = require('form-data')
import {Col, Container, Row} from "react-bootstrap";
import Image from "next/image";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setAvatar] = useState('');
    const formData = new FormData()
    formData.append("image", image)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("name", name)

    const {doRequest, errors} = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: formData,
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
                    <Row className="mt-5">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                            <Image
                                src="https://res.cloudinary.com/dwsbhnc1g/image/upload/v1630184633/ci71hrda4ntkbvugi8xe.png"
                                width={100}
                                height={100}
                                layout="fixed"
                            />
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
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    className="form-control"
                                    type="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Upload avatar</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    onChange={(e) => setAvatar(e.target.files[0])}
                                />
                            </div>
                            {errors}
                            <div className="col text-center pt-3">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </form>
        </div>
    );
}

export default SignUp;
