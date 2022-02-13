import { writable } from 'svelte/store';
import type { User } from "firebase/auth";
import { getMyWorlds, setWorld, UpdateWorldsInDB } from "./firebase";
import { AddDefaultSkills } from "./skillsConfig";
import { get } from "svelte/store";
// import { worlds, selectedWorld } from "/src/stores/worldsStore";
import type { Continent } from "./continentsConfig";
import type { Province } from "./provinceConfig";
import type { Settlement } from "./settlementConfig";

export interface World {
    name: string,
    creatorID: string,
    id: number,
    continents: Continent[],
    deities: [],
    wandNPCs: [],
    allNPCs: [],
    orgs: [],
    religions: [],
    campaigns: [],
    races: [],
    species: [],
    settings: {
        skillSetFormat: [],
        skillSets: [],
    },
}


export const worlds = writable<World[]>([]);
export const selectedWorld = writable<World>()


export function CreateNewWorld(name: string, user: User, skillset?) {
    const newWorld: World = {
        name: name,
        creatorID: user.uid,
        id: get(worlds)?.length > 0 ? get(worlds).length : 0,
        continents: [],
        deities: [],
        wandNPCs: [],
        allNPCs: [],
        orgs: [],
        religions: [],
        campaigns: [],
        races: [],
        species: [],
        settings: {
            skillSetFormat: skillset ? skillset : AddDefaultSkills()[0],
            skillSets: AddDefaultSkills(),
        },
    };


    if (get(worlds)) {
        const ws = get(worlds)
        ws.push(newWorld)
        console.log(ws);
        localStorage.setItem("worlds", JSON.stringify(ws));
    } else {
        console.log("No Worlds");
        localStorage.setItem("worlds", JSON.stringify([newWorld]));
    }

    setWorld(newWorld, user);

    return get(worlds);
}


export async function GetWorldsFromDB(user) {
    let users = await getMyWorlds(user)
    let world = users.find((u) => u?.projectID === user.uid)

    return world?.worlds ? world.worlds : []
}

export function DeleteWorld(worldToDelete, user: User) {
    let w = get(worlds);

    //remove world to delete from worlds array and update new worlds array with ids that reflect their position in a array
    w.splice(worldToDelete.id, 1);
    w.forEach((w, i) => {
        w.id = i;
    });

    worlds.set(w);
    console.log(w);

    UpdateWorldsInDB(user, w);
}

export function GetSelectedWorld() {
    const query = JSON.parse(localStorage.getItem("selectedWorld"));
    if (query) {
        return get(worlds).find((world) => {
            if (query.id === world.id && query.id === world.id) {
                return world
            } else {
                return null;
            }
        })
    } else {
        return null;
    }
}

export function UpdateWorld(user, newWorld) {
    //takes a world and updates it in localStorage
    console.log("updating world");
    let w = get(worlds);
    w.splice(newWorld.id, 1, newWorld);
    sessionStorage.setItem("worlds", JSON.stringify(w));
    UpdateWorldsInDB(user, w);
}


//function to find a world by name, returns the world if found, else returns null
export function FindWorldByName(name: string) {
    let w: World[] = get(worlds);
    return w.find((w) => w.name === name);
}