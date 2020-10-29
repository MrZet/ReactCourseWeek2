import makeRequest from './MakeFetchRequest'

const BASE_URL = "http://localhost:5000";

const FetchAuthenticationApi = {
   login:async function (credentials) {
        const response = await makeRequest(`${BASE_URL}/login`, "POST", credentials);
        const result = await response.json()
        return result;
    }
}

export default FetchAuthenticationApi