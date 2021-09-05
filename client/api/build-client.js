import axios from "axios";

const buildClient = ({req}) => {
    if (typeof window === 'undefined') {
        //requests to server
        return axios.create({
            baseURL: 'http://www.fipubook-microservices-prod.com/',
            headers: req.headers
        })
    } else {
        return axios.create({
            baseURL: '/'
        })
    }
}

export default buildClient;