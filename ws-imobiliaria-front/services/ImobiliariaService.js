import DoRequest from "./ReqService";

//#region Owners
export const getOwners = async (token) => {
    return await DoRequest(
        "IMOBILIARIA",
        `proprietarios`,
        {},
        "GET",
        true,
        {},
        token
    );
}

export const editOwner = async (body, token) => {
    return await DoRequest(
        "IMOBILIARIA",
        `proprietarios`,
        body,
        "PUT",
        true,
        {},
        token
    );
}
export const postOwner = async (body, token) => {
    return await DoRequest(
        "IMOBILIARIA",
        `proprietarios`,
        body,
        "POST",
        true,
        {},
        token
    );
}
//#endregion
export const getProperties = async (token, owner) => {
    return await DoRequest(
        "IMOBILIARIA",
        `imoveis/owner/${owner}`,
        {},
        "GET",
        true,
        {},
        token
    );
}

export const getPropertySituations = async (token) => {
    return await DoRequest(
        "IMOBILIARIA",
        "situacoes",
        {},
        "GET",
        true,
        {},
        token
    );
}

export const postProperty = async (body, token) => {
    return await DoRequest(
        "IMOBILIARIA",
        `imoveis`,
        body,
        "POST",
        true,
        {},
        token
    );
}

export const editProperty = async (body, token) => {
    return await DoRequest(
        "IMOBILIARIA",
        `imoveis`,
        body,
        "PUT",
        true,
        {},
        token
    );
}