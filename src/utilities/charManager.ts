import { get, writable } from 'svelte/store';
import { selectedWorld } from './worldConfig';

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
    questGiver: boolean,
    quests: [],
    languages: string,
}

export function createNewChar(newID: number): Char {
    return {
        name: '',
        level: 1,
        id: newID,
        race: '',
        skills: get(selectedWorld).settings.skillSetFormat.skills,
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
        questGiver: false,
        quests: [],
        languages: '',
    }
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



