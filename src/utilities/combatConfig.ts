import { selectedWorld, UpdateWorld } from "./worldConfig";
import type { World } from "./worldConfig";
import { get } from "svelte/store";
import { user } from "../stores";
import type { User } from "firebase/auth";

export interface Item {
    name: string;
    type: string;
    description: string;
    weight: number | string;
    value: number | string;
    id: number;
    unique: boolean;
}
export interface Weapon extends Item {
    damage: number | string;
    stat: string;
    range: number | string;
    damageType: string;
    ammo?: number | string;
    ammoType?: string;
}

export interface Armour extends Item {
    defence: number | string;
    armorType: string;
    stat: string;
}

export const physicalDamageTypes = ['bludgeoning', 'piercing', 'slashing'];
export const magicalDamageTypes = ['fire', 'ice', 'lightning', 'acid', 'poison', 'radiatant'];


export const magicSchools: string[] = [
    "Abjuration",
    "Conjuration",
    "Divination",
    "Enchantment",
    "Evocation",
    "Illusion",
    "Necromancy",
    "Transmutation",
    "Other"
];
export interface Spell {
    name: string;
    description: string;
    id: number;
    damage: number | string;
    school: string;
    range: number | string;
    components: string[];
    material?: string[];
    duration: number | string;
    level: number | string;
    isRitual: boolean;
}

export function newItem(): Item {
    return {
        name: '',
        type: '',
        description: '',
        weight: '',
        value: '',
        id: 0,
        unique: false,
    }
}
export function newWeapon(): Weapon {
    return {
        name: '',
        type: 'weapon',
        description: '',
        weight: '',
        value: '',
        damage: '',
        range: '',
        damageType: '',
        id: 0,
        stat: '',
        unique: false,
    }
}
export function newArmour(): Armour {
    return {
        name: '',
        type: 'armour',
        description: '',
        weight: '',
        value: '',
        defence: '',
        armorType: '',
        stat: '',
        id: 0,
        unique: false,
    }
}

export function addItemToWorld(user: any, item: Item, world: World): void {
    world.items.push(item);
    console.log('adding item to world', world);

    console.log(user);


    UpdateWorld(user, world);

}

export function getItemById(id: number, world: World) {
    // console.log('getting item by id', id, world);

    return world.items.find(item => item.id === id);
}

export function newSpell(): Spell {
    return {
        name: '',
        description: '',
        id: 0,
        damage: '',
        school: '',
        range: '',
        components: [],
        duration: '',
        level: '',
        isRitual: false,
    }
}

export function addSpellToWorld(user: any, spell: Spell): void {
    const world: World = get(selectedWorld);
    if (user === undefined || world === undefined) return;
    world.spells.push(spell);
    UpdateWorld(user, world);
}
export function updateSpellToWorld(user: any, spell: Spell): void {
    const world: World = get(selectedWorld);
    if (user === undefined || world === undefined) return;
    const index = world.spells.findIndex(s => s.id === spell.id);
    world.spells[index] = spell;
    UpdateWorld(user, world);
}
export function removeSpellFromWorld(user: any, spell: Spell, world: World): void {
    if (user === undefined || world === undefined) return;
    world.spells = world.spells.filter(s => s.id !== spell.id);
    UpdateWorld(user, world);
}