import { get, writable } from "svelte/store";
import { UpdateWorldsInDB } from "./firebase";
import type { Province } from "./provinceConfig";
import { selectedWorld, UpdateWorld } from "./worldConfig";
import type { World } from "./worldConfig";
import { user } from "../stores/index";


export interface Continent {
    name: string,
    desc: string,
    id: number,
    provinces: Province[],
}

export const selectedContinent = writable<Continent | null>(null)


export function UpdateContinentInDB(continent: Continent) {
    let sw: World = get(selectedWorld);
    sw.continents.splice(sw.continents.findIndex((c: Continent) => c.id === continent.id), 1, continent);
    UpdateWorldsInDB(get(user), sw);
}

export function AddNewContinent(user, name?: string) {
    let sw: World = get(selectedWorld);
    const newContinent: Continent = {
        name: name || "New Continent",
        desc: "",
        id: sw.id || 0,
        provinces: [],
    };

    sw.continents.push(newContinent);
    UpdateWorld(user, sw);

    return sw;
}