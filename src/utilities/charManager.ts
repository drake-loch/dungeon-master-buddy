import type { User } from 'firebase/auth';
import { get, writable } from 'svelte/store';
import type { Skill, SubSkill } from './skillsConfig';
import { selectedWorld, UpdateWorld } from './worldConfig';
import type { World } from './worldConfig';

export interface Race {
    name: string,
    skillBonus: [],
    info: string,
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
    quests: [],
    languages: string,
}

export function createNewChar(newID: number): Char {
    let settings = get(selectedWorld).settings;
    return {
        name: '',
        level: 1,
        id: newID,
        race: '',
        skills: settings.skillSetFormat.skills,
        subSkills: settings.skillSetFormat.subSkills,
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
    }
}

export function addChartoWorld(user: User, world: World, newChar: Char): World {
    world.allPCs.push(newChar);
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

export const occupations = [
    "none",
    "Fisher",
    "Captain",
    "Shopkeeper",
    "Farmer",
    "Butler",
    "Squire",
    "Knight",
    "Guard",
    "Royality",
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
];



