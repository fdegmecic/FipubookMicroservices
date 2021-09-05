import axios from 'axios';

const useRequestNoErrors = ({url, method, body, onSuccess}) => {
    const doRequest = async () => {
        try {
            const response = await axios[method](url, body);

            if(onSuccess){
                onSuccess(response.data);
            }
        } catch (err) {
            console.log(err)
        }
    };

    return {doRequest}
}

export default useRequestNoErrors;