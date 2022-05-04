import type { User } from 'firebase/auth';
import { get, writable } from 'svelte/store';
import type { Skill, SubSkill } from './skillsConfig';
import { selectedWorld, UpdateWorld, worlds } from './worldConfig';
import type { World } from './worldConfig';
import { UpdateWorldsInDB } from './firebase';

export interface Race {
    name: string,
    id: number,
    skillBonus: [],
    info: string,
    age: string,
    alignment: string,
    size: string,
    speed: string,
    extras: [],
    maleNames: string[],
    femaleNames: string[],
    neutralNames: string[],
    familyNames: string[],
}
export interface Char {
    name: string,
    level: number,
    id: number,
    race: Race | string,
    skills: Skill[],
    subSkills: SubSkill[] | [],
    profs: string[],
    maxHitPoints: number,
    currentHitPoints: number,
    defence: number,
    desc: string,
    age: string,
    hairColour: string,
    eyeColour: string,
    gender: string,
    occupation: string,
    location: {
        continent: string | null,
        region: string | null,
        settlement: string | null,
        wanderer: boolean,
    },
    languages: string,
}
export interface NPC extends Char {
    isSimple: boolean,
    quests: [],
    extraNotes: string,
}
export interface PC extends Char {
    playerName: string,
}
export interface Creature extends Char {
    type: string,
}

export function createNewChar(newID?: number): PC {
    let settings = get(selectedWorld).settings;
    return {
        name: '',
        level: 1,
        id: newID || -1,
        race: '',
        skills: deepCopyFunction(settings.skillSetFormat.skills),
        subSkills: deepCopyFunction(settings.skillSetFormat.subSkills),
        profs: [],
        maxHitPoints: 5,
        currentHitPoints: 5,
        defence: 0,
        desc: '',
        age: '',
        hairColour: '',
        eyeColour: '',
        gender: '',
        occupation: '',
        location: {
            continent: '',
            region: '',
            settlement: '',
            wanderer: false,
        },
        languages: '',
        playerName: '',

    }
}
export function createNewNPC(newID: number): NPC {
    let settings = get(selectedWorld).settings;
    return {
        name: '',
        level: 1,
        id: newID,
        race: '',
        skills: deepCopyFunction(settings.skillSetFormat.skills),
        subSkills: deepCopyFunction(settings.skillSetFormat.subSkills),
        profs: [],
        maxHitPoints: 5,
        currentHitPoints: 5,
        defence: 0,
        desc: '',
        age: '',
        hairColour: '',
        eyeColour: '',
        gender: '',
        occupation: '',
        location: {
            continent: '',
            region: '',
            settlement: '',
            wanderer: false,
        },
        languages: '',
        isSimple: false,
        quests: [],
        extraNotes: '',


    }
}

export function addChartoWorld(user: User, world: World, newChar: Char): World {
    world.allPCs.push(newChar as PC);
    UpdateWorld(user, world);
    return world;
}

//update character in world and update world in db
export function updatePCInDB(user: User, world: World, char: PC): World {
    world.allPCs[char.id] = char;
    UpdateWorld(user, world);
    return world;
}


export function addNPCtoWorld(user: User, world: World, newChar: Char): World {
    world.allNPCs.push(newChar as NPC);
    UpdateWorld(user, world);
    return world;
}

//update NPC in world and update world in db
export function updateNPCInDB(user: User, world: World, char: NPC): World {
    world.allNPCs[char.id] = char;
    UpdateWorld(user, world);
    return world;
}

export const hairColours = [
    "white",
    "blonde",
    "silver",
    "gray",
    "brown",
    "light brown",
    "dark brown",
    "black",
    "red",
    "dark red",
    "light red",
    "bald",
];
export const eyeColours = [
    "white",
    "silver",
    "gray",
    "brown",
    "blue",
    "gold",
    "green",
];
//plz don't cancel me, just some predefined for randomization
export const genders = ["male", "female", "non-binary"];

export const occupations = getSortedOcc();

function getSortedOcc(): string[] {
    let arr = [
        "Fisher",
        "Captain",
        "Shopkeeper",
        "Farmer",
        "Butler",
        "Squire",
        "Knight",
        "Guard",
        "Royalty",
        "Nobleperson",
        "Tax Collector",
        "Sellsword",
        "Smuggler",
        "Thief",
        "Bandit",
        "Thug",
        "Beggar",
        "Musician",
        "Bard",
        "Cook",
        "Adventurer",
        "Druid",
        "Priest",
        "Labouror",
        "Millworker",
        "Merchant",
        "Traveling Merchant",
        "Swindler",
        "Town Drunk",
        "Bounty Hunter",
        "Hunter",
        "Trapper",
        "Soldier",
    ].sort()
    arr.unshift("None");
    return arr;
}

const deepCopyFunction = (inObject) => {
    let outObject, value, key

    if (typeof inObject !== "object" || inObject === null) {
        return inObject // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}

    for (key in inObject) {
        value = inObject[key]

        // Recursively (deep) copy for nested objects, including arrays
        outObject[key] = deepCopyFunction(value)
    }

    return outObject
}



export function createNewRace(): Race {
    const world = get(selectedWorld);
    return {
        name: '',
        id: world?.races.length | 0,
        skillBonus: [],
        info: '',
        age: '',
        alignment: '',
        size: '',
        speed: '',
        extras: [],
        maleNames: [],
        femaleNames: [],
        neutralNames: [],
        familyNames: [],
    }
}

export function addRaceToWorld(user, race: Race) {
    const world = get(selectedWorld);
    world.races.push(race);
    UpdateWorld(user, world);
    return world
}
export function DeleteRaceFromWorld(user, race: Race) {
    const world = get(selectedWorld);
    //find race in world and remove it and update db
    world.races.splice(race.id, 1);
    UpdateWorld(user, world);

    return world
}

