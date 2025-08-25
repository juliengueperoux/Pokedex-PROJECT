export type ApiResourceList<T> = {
    count: number;
    next: string;
    previous: string;
    results: T[];
};