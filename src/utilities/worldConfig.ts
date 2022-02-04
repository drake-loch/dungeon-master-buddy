import { AddDefaultSkills } from "./skillsConfig";


export function CreateNewWorld(name: string, skillset?) {
    const newWorld = {
        name: name,
        id: 1,
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


}

export function GetWorlds() {
    let toReturn = JSON.parse(localStorage.getItem('worlds'));
    if (toReturn) {
        return toReturn;
    } else {
        return null
    }
}