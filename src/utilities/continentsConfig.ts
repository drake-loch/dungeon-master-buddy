import { writable } from "svelte/store";
import type { Province } from "./provinceConfig";

export interface Continent {
    name: string,
    id: number,
    provinces: Province[],
}

export const selectedContinent = writable<Continent | null>(null)