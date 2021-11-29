import DoRequest from "./ReqService";

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