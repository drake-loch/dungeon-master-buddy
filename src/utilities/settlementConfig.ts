import { get, writable } from "svelte/store";
import { selectedProvince, UpdateProvinceInDB } from "./provinceConfig";
import type { User } from "firebase/auth";
//=========================================================

export interface Settlement {
    name: string,
    desc: string,
    id: number,
    settlements: Settlement[],
}

export const selectedSettlement = writable<Settlement | null>(null)


export function CreateNewSettlement(user: User, name: string) {
    const newSettlement: Settlement = {
        name: name,
        desc: "",
        id: get(selectedProvince)?.settlements.length > 0 ? get(selectedProvince).settlements.length : 0,
        settlements: [],
    };
    let sp = get(selectedProvince);
    sp.settlements.push(newSettlement);
    UpdateProvinceInDB(user, sp);
    return sp;
}