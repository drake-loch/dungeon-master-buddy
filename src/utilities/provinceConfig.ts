import { writable } from "svelte/store";
import type { Settlement } from "./settlementConfig";

export interface Province {
    name: string,
    id: number,
    settlements: Settlement[],
}

export const selectedProvince = writable<Province | null>(null)