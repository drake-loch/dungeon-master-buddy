import { writable } from 'svelte/store';
import type { User } from "firebase/auth";
import { getMyWorlds, setWorld, UpdateWorldsInDB } from "./firebase";
import { AddDefaultSkills } from "./skillsConfig";
import { get } from "svelte/store";
import type { Continent } from "./continentsConfig";
import type { Creature, NPC, PC, Race } from './charManager';
import { createNewRace } from './charManager';
import type { Item, Spell } from './combatConfig';

export interface World {
    name: string,
    desc: string,
    creatorID: string,
    id: number,
    continents: Continent[],
    deities: [],
    allNPCs: NPC[],
    allPCs: PC[],
    allCreatures: Creature[],
    orgs: [],
    religions: [],
    campaigns: [],
    races: Race[],
    species: [],
    items: Item[],
    spells: Spell[],
    settings: {
        skillSetFormat: [],
        skillSets: [],
    },
}


export const worlds = writable<World[]>([]);
export const selectedWorld = writable<World>()


export function CreateNewWorld(name: string, user, skillset?) {
    const human = createNewRace();
    human.name = 'Human';
    human.info = 'It you.';
    human.skillBonus = [];


    const newWorld: World = {
        name: name,
        desc: '',
        creatorID: user.uid,
        id: get(worlds)?.length > 0 ? get(worlds).length : 0,
        continents: [],
        deities: [],
        wandNPCs: [],
        allNPCs: [],
        allPCs: [],
        allCreatures: [],
        orgs: [],
        religions: [],
        campaigns: [],
        races: [human],
        species: [],
        items: [],
        spells: [],
        settings: {
            skillSetFormat: skillset ? skillset : AddDefaultSkills()[0],
            skillSets: AddDefaultSkills(),
        },
    };


    if (get(worlds)) {
        const ws = get(worlds)
        ws.push(newWorld)
        console.log(ws);
        sessionStorage.setItem("worlds", JSON.stringify(ws));
    } else {
        console.log("No Worlds");
        sessionStorage.setItem("worlds", JSON.stringify([newWorld]));
    }

    setWorld(newWorld, user);

    return get(worlds);
}


export async function GetWorldsFromDB(user) {
    let w = await getMyWorlds(user)
    let world = w.find((u) => u?.projectID === user.uid)
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

export function UpdateWorld(user, worldToUpdate) {
    //takes a world and updates it in the worlds array
    console.log("updating world");
    let w = get(worlds);
    w.splice(worldToUpdate.id, 1, worldToUpdate);
    sessionStorage.setItem("worlds", JSON.stringify(w));
    UpdateWorldsInDB(user, w);
}


export function FindItemByName(listToSearch: any[], name: string) {
    return listToSearch.find((w) => w.name === name);
}