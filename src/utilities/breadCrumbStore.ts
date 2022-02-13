import { writable } from 'svelte/store';

export interface Path {
    url: string,
    name: string,
}


export const breadcrumb = writable({
    path: [],
    current: "",
    currentType: "",
});