import type { Resource, ResourceMap } from "../types";
import { ApiResourceList } from "../types/ApiResouceList";

export const BASE_URI = "https://pokeapi.co/api/v2";

export const fetchResource = async <R extends Resource>(param: string | number, resource: R): Promise<ResourceMap[R]> => {
    const _param = typeof param === "string" ? param.toLowerCase() : param;

    const data = await fetch(`${BASE_URI}/${resource}/${_param}`).then(async (res) => res.json());

    if (!_isValid(data)) {
        throw new Error(`Invalid data received from ${BASE_URI}/${resource}/${_param}`);
    }

    return data;
}


export const fetchLlistResource = async <R extends Resource>(resource: R, limit: number = 20, offset: number = 0): Promise<ApiResourceList<ResourceMap[R]>> => {
    const params = new URLSearchParams({ limit: `${limit}`, offset: `${offset}` });
    const data = await fetch(`${BASE_URI}/${resource}?${params}`).then(async (res) => res.json());

    if (!_isListValid(data)) {
        throw new Error(`Invalid data received from ${BASE_URI}/${resource}?${params}`);
    }

    return data;
}

const _isValid = (data: any): boolean => {
    return "id" in data && "name" in data;
}

const _isListValid = (data: any): boolean => {
    return Array.isArray(data) && _isValid(data[0]);
}