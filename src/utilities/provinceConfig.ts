import { get, writable } from "svelte/store";
import type { Settlement } from "./settlementConfig";

// import { selectedWorld } from "/src/stores/worldsStore";
import type { Continent } from "./continentsConfig";
import { selectedContinent } from "./continentsConfig";
// import { user } from "../stores/index";
import { selectedWorld, UpdateWorld } from "./worldConfig";
import type { World } from "./worldConfig";
import type { User } from "firebase/auth";

export interface Province {
    name: string,
    id: number,
    settlements: Settlement[],
}
export const selectedProvince = writable<Province | null>(null)

export function UpdateProvinceInDB(user: User, province: Province) {
    let sc = get(selectedContinent);
    //finds the province in the selected continent and up date it
    sc.provinces.forEach((p, i) => {
        if (p.id === province.id) {
            sc.provinces[i] = province;
        }
    });
    let sw: World = get(selectedWorld);
    sw.continents.splice(sw.continents.findIndex((c) => c.id === sc.id), 1, sc);


    UpdateWorld(user, sw);
}

//function to add a new province to a world
export function AddNewProvince(user, name?: string) {
    let sc: Continent = get(selectedContinent);
    const newProvince: Province = {
        name: name || "New Province",
        id: sc.provinces.length || 0,
        settlements: [],
    };

    sc.provinces.push(newProvince);
    //update selected continent in selected world
    let sw: World = get(selectedWorld);
    sw.continents.splice(sw.continents.findIndex((c: Continent) => c.id === sc.id), 1, sc);


    UpdateWorld(user, sw);

    return sc;
}
