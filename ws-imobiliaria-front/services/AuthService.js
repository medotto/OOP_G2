import { setHeaderProp } from "./ReqService";
import DoRequest from "./ReqService";
import { formatUrlEncodedForm } from "./General";
import { useDispatch } from "react-redux";
import * as UserActions from "../redux/actions/UserActions";
import * as ToasterActions from "../redux/actions/ToasterActions";
import { searchUser } from "./UserService";

export const getUserToken = async (email, password, dispatch, router) => {
    const headers = {};
    let funcResult = false;
    setHeaderProp(headers, "Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", email);
    urlencoded.append("password", password);
    urlencoded.append("grant_type", "password");

    const result = await DoRequest(
        "OAUTH",
        `oauth/token?username=${email}&password=${password}&grant_type=password`,
        urlencoded,
        "POST",
        true,
        headers
    );
    if (result.access_token) {
        searchUser(email).then((resp) => {
            if (resp.stAtivo) {
                funcResult = true;
                if (localStorage)
                    localStorage.setItem("userCredentials", JSON.stringify({ email, access_token: result.access_token }))
                dispatch(UserActions.SetUserToken(result.access_token));
                dispatch(UserActions.SetUserRoles(resp.roleList));
                router.push("/PropertySearch");
            } else
                dispatch(ToasterActions.PushToaster("error", "O usuário precisa ser aprovado pelo administrador para poder entrar no sistema."));
        })
    } else {
        funcResult = result;
        dispatch(ToasterActions.PushToaster("error", result.error_description, 10000));
    }

    return funcResult;
}