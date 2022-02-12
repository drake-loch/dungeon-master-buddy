import { writable } from "svelte/store";

export interface Settlement {
    name: string,
    id: number,
    settlements: Settlement[],
}

export const selectedSettlement = writable({})