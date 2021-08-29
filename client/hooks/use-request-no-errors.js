import axios from 'axios';

const useRequestNoErrors = ({url, method, body}) => {
    const doRequest = async () => {
        try {
            const response = await axios[method](url, body);

            return response.data
        } catch (err) {
            console.log(err)
        }
    };

    return {doRequest}
}

export default useRequestNoErrors;