import type { User } from "firebase/auth";
import { getMyWorlds, setWorld, UpdateWorldInDB } from "./firebase";
import { AddDefaultSkills } from "./skillsConfig";
import { get } from "svelte/store";
import { worlds, selectedWorld } from "/src/stores/worldsStore";

export interface World {
    name: string,
    creatorID: number,
    id: number,
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
        skillSetFormat: [],
        skillSets: [],
    },
}


export function CreateNewWorld(name: string, user: User, skillset?) {
    const newWorld = {
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

export function DeleteWorld(worldToDelete) {
    let worlds = JSON.parse(localStorage.getItem("worlds"));
    let newWorlds = worlds.filter(world => {
        if (world.id !== worldToDelete.id && world.name !== worldToDelete.name) {
            console.log("bingo!");
            return world
        }
    })
    localStorage.setItem("worlds", JSON.stringify(newWorlds));
    return newWorlds
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
    UpdateWorldInDB(user, w);
}

export function AddNewContinent(user, name?: string) {
    let sw = get(selectedWorld);
    const newContinent = {
        name: name || "New Continent",
        id: sw.id || 0,
        provinces: [],
        settlements: [],
        npcs: [],
    };


    sw.continents.push(newContinent);
    console.log(sw);

    UpdateWorld(user, sw);

    return sw;
}