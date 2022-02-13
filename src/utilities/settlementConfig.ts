import { get, writable } from "svelte/store";

//stores
//import selectedworld, selectedcontinent, selectedprovince from their configs
// import { selectedWorld } from "/src/stores/worldsStore";
import { selectedContinent } from "./continentsConfig";
import { selectedProvince, UpdateProvinceInDB } from "./provinceConfig";
import { user } from "../stores/index";
import type { User } from "firebase/auth";
//=========================================================

export interface Settlement {
    name: string,
    id: number,
    settlements: Settlement[],
}

export const selectedSettlement = writable<Settlement | null>(null)


//function that creates a new settlement and adds it to the world
export function CreateNewSettlement(user: User, name: string) {
    const newSettlement: Settlement = {
        name: name,
        id: get(selectedProvince)?.settlements.length > 0 ? get(selectedProvince).settlements.length : 0,
        settlements: [],
    };
    let sp = get(selectedProvince);
    sp.settlements.push(newSettlement);
    UpdateProvinceInDB(user, sp);
}

//function that
