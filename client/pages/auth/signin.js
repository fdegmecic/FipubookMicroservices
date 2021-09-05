import {useEffect, useState} from 'react';
import useRequest from "../../hooks/use-request";
import Router from 'next/router';
import {Col, Container, Row} from "react-bootstrap";
import Link from 'next/link';
import Image from "next/image";
import SignUp from "./signup";

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

 /*   useEffect(()=> {
        const router = useRouter();
        if(currentUser) {
            return router.push('/')
        }
    }, [])
*/
    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <Container>
                    <Row className="mt-5">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg ">
                            <Image
                                src="https://res.cloudinary.com/dwsbhnc1g/image/upload/v1630184633/ci71hrda4ntkbvugi8xe.png"
                                width={100}
                                height={100}
                                layout="fixed"
                            />
                            <div className="form-group font-semibold">
                                <label>Email Address</label>
                                <input
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group font-semibold">
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
                            <div className="mt-2 font-semibold">
                                <p className="text-gray-500">Don't have an account?</p>
                                <div className="text-blue-400">
                                    <Link href={'/auth/signup'}> Sign up here</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </form>
        </div>
    );
}

/*SignIn.getInitialProps= async(client)=> {
    const {data} = await client.get('/api/users/currentuser');

    return {
        data.currentUser
    }
}*/

export default SignIn;
