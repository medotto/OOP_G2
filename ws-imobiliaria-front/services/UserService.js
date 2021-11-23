import DoRequest from "./ReqService";

export const searchUser = async (email) => {
    return await DoRequest(
        "USER",
        `users/search?email=${email}`,
        {},
        "GET",
        false,
        {}
    );
}