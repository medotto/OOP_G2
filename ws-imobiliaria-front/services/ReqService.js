const setHeaderProp = (header, propName, propValue) => header[propName] = propValue;
import Store from "../redux/store/Store";
import * as ToasterActions from "../redux/actions/ToasterActions";

export const assembleAPIAddress = (endpoint) => {
    return `${process.env.API_ADDRESS}:${process.env.API_PORT}/${endpoint}`
}
/**
 * Makes a request to API. Receives the requisition url on path, the data, the req method and 
 * req headers (optional)
 * @constructor
 */
const DoRequest = async (endpoint, data, method, hasAuth = true, headers = {}) => {

    var requestConfig = {
        method: method,
        headers: headers,
        body: null
    };

    if (method !== "GET")
        requestConfig.body = JSON.stringify(data);

    if (Object.entries(requestConfig.headers) == 0) {
        setHeaderProp(requestConfig.headers, "Content-Type", "application/json");
        setHeaderProp(requestConfig.headers, "Accept", "*");
        setHeaderProp(requestConfig.headers, "Connection", "keep-alive");
        setHeaderProp(requestConfig.headers, "Access-Control-Allow-Origin", "*");
        setHeaderProp(requestConfig.headers, "Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
        setHeaderProp(requestConfig.headers, "Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    }

    let result = await fetch(assembleAPIAddress(endpoint), requestConfig)
        .then((resp) => resp.json())
        .then(resp => resp);

    switch (result.status) {
        case 500:
            Store.dispatch(ToasterActions.PushToaster("error", result.body));
        case 401:
            Store.dispatch(ToasterActions.PushToaster("error", "User unauthorized."));
            break;
        default: return result;
    }

    return result;
}

export default DoRequest;