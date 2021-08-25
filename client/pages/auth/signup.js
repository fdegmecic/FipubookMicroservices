import {useState} from 'react';
import useRequest from "../../hooks/use-request";
import Router from 'next/router';
const FormData = require('form-data')

const Signup = () => {
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
                <h1>Sign Up</h1>
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
                <button className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
