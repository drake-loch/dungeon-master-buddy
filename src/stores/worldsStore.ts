import type { World } from '/src/utilities/worldConfig';
import { writable } from 'svelte/store';


export const worlds = writable([]);
export const selectedWorld = writable({})

selectedWorld.subscribe(world => {
    if (localStorage.getItem("selectedWorld")) {
        localStorage.setItem("selectedWorld", JSON.stringify(world));
    }
})