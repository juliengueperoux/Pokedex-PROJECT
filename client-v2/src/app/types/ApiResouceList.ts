import { ResourceMap } from ".";

export type ApiResourceList<T extends ResourceMap> = {
    count: number;
    next: string;
    previous: string;
    results: T[];
};