import { UpdateWorld } from "./worldConfig";
import type { World } from "./worldConfig";

export interface Item {
    name: string;
    type: string;
    description: string;
    weight: number | string;
    value: number | string;
    id: number;
}
export interface Weapon extends Item {
    damage: number | string;
    stat: string;
    range: number | string;
    damageType: string;
    ammo?: number | string;
    ammoType?: string;
}
export interface Armor extends Item {
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
        id: 0
    }
}
export function newWeapon(): Weapon {
    return {
        name: '',
        type: '',
        description: '',
        weight: '',
        value: '',
        damage: '',
        range: '',
        damageType: '',
        id: 0,
        stat: '',
    }
}

export function addItemToWorld(user: any, item: Item, world: World) {
    world.items.push(item);
    console.log('adding item to world', world);

    console.log(user);


    UpdateWorld(user, world);

}