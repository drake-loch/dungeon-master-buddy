import { getMyWorlds, setWorld } from "./firebase";
import { AddDefaultSkills } from "./skillsConfig";


export function CreateNewWorld(name: string, skillset?) {
    const newWorld = {
        name: name,
        id: GetWorlds()?.length > 0 ? GetWorlds().length : 0,
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

    console.log(newWorld);

    if (GetWorlds()) {
        const worlds = GetWorlds();
        worlds.push(newWorld)
        console.log(worlds);
        localStorage.setItem("worlds", JSON.stringify(worlds));
    } else {
        console.log("No Worlds");
        localStorage.setItem("worlds", JSON.stringify([newWorld]));
    }
    setWorld(newWorld);

    return GetWorlds();

}


export function GetWorlds() {
    let toReturn = JSON.parse(localStorage.getItem('worlds'));
    // let toReturn = await getMyWorlds();
    if (toReturn) {
        return toReturn;
    } else {
        return null
    }
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

export function SetSelectedWorld(world) {
    localStorage.setItem("selectedWorld", JSON.stringify({ name: world.name, id: world.id }));
}

export function GetSelectedWorld() {
    const query = JSON.parse(localStorage.getItem("selectedWorld"));
    if (query) {
        return GetWorlds().find((world) => {
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