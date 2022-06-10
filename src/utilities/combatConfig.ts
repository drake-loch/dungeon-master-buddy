import { UpdateWorld } from "./worldConfig";
import type { World } from "./worldConfig";

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

export function addItemToWorld(user: any, item: Item, world: World) {
    world.items.push(item);
    console.log('adding item to world', world);

    console.log(user);


    UpdateWorld(user, world);

}

export function getItemById(id: number, world: World) {
    // console.log('getting item by id', id, world);

    return world.items.find(item => item.id === id);
}