export const setHeaderProp = (header, propName, propValue) => header[propName] = propValue;
import Store from "../redux/store/Store";
import * as ToasterActions from "../redux/actions/ToasterActions";
import ApyType from "./ApiType";

export const assembleAPIAddress = (apiType, endpoint) => {
    let apiAddressWithPort = `${process.env.API_BASE_HOST}`

    switch (apiType) {
        case "IMOBILIARIA":
            apiAddressWithPort += `:${process.env.API_PORT}${process.env.API_ADDRESS}/${endpoint}`;
            break;
        case "USER":
            apiAddressWithPort += `:${process.env.USER_PORT}${process.env.USER_ADDRESS}/${endpoint}`;
            break;
        case "OAUTH":
            apiAddressWithPort += `:${process.env.AUTH_PORT}${process.env.AUTH_ADDRESS}/${endpoint}`;
            break;
        default:
            apiAddressWithPort += `:${process.env.API_PORT}${process.env.API_ADDRESS}/${endpoint}`;
            break;
    }
    return apiAddressWithPort;
}

/**
 * Makes a request to API. Receives the requisition url on path, the data, the req method and 
 * req headers (optional)
 * @constructor
 */
const DoRequest = async (apiType, endpoint, data, method, hasAuth = true, headers = {}, token = null) => {
    var requestConfig = {
        method: method,
        headers: headers,
        body: null
    };

    if (method !== "GET")
        requestConfig.body = JSON.stringify(data);

    if (Object.entries(requestConfig.headers) == 0)
        setHeaderProp(requestConfig.headers, "Content-Type", "application/json");

    setHeaderProp(requestConfig.headers, "Accept", "*");
    setHeaderProp(requestConfig.headers, "Connection", "keep-alive");

    if (hasAuth) {
        if (apiType === "OAUTH") {
            setHeaderProp(requestConfig.headers, "Authorization", `Basic ${window.btoa(process.env.API_BASIC_AUTH_USER
                + ":" +
                process.env.API_BASIC_AUTH_PASSWORD)}`);
        } else if (token) {
            requestConfig.headers = {
                ...requestConfig.headers,
                "Authorization": `Bearer ${token}`
            }
        }
    }

    let result = await fetch(assembleAPIAddress(apiType, endpoint), requestConfig)
        .then((resp) => resp.json())
        .catch((er) => "");

    switch (result.status) {
        case 500:
            Store.dispatch(ToasterActions.PushToaster("error", result.body));
        case 400:
            Store.dispatch(ToasterActions.PushToaster("error", "Credenciais incorretas."));
            break;
        case 401:
            Store.dispatch(ToasterActions.PushToaster("error", "User unauthorized."));
            break;
        default: return result;
    }

    return result;
}

export default DoRequest;