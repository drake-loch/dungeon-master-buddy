export interface Skill {
    name: string,
    baseValue: number,
    mod: number,
}
export interface SubSkill {
    name: string,
    baseValue: number,
    mod: number,
    parentSkill: string,
}
export interface SkillSet {
    name: string,
    skills: Skill[],
    subSkills: SubSkill[],
}

export function CreateNewSkill(name: string) {
    //skill has 3 components, a name,base value and a modifier
    const newSkill: Skill = {
        name: name,
        baseValue: 0,
        mod: 0,
    }
    return newSkill
}
export function CreateSubNewSkill(name: string, parent?: string): SubSkill {
    const newSubSkill: SubSkill = {
        name: name,
        baseValue: 0,
        mod: 0,
        parentSkill: parent,
    }
    return newSubSkill
}


export function CreateNewSkillSet(name?: string): SkillSet {
    return {
        name: name ? name : '',
        skills: [],
        subSkills: [],
    };
}

export function AddDefaultSkills(): SkillSet[] {
    let skillArrays: SkillSet[] = [];

    const newSkillSet1 = CreateNewSkillSet("familiar");
    newSkillSet1.skills.push(
        CreateNewSkill("strength"),
        CreateNewSkill("dexterity"),
        CreateNewSkill("constitution"),
        CreateNewSkill("wisdom"),
        CreateNewSkill("intelligence"),
        CreateNewSkill("charisma")
    );
    newSkillSet1.subSkills.push(
        CreateSubNewSkill("acrobatics", "dexterity"),
        CreateSubNewSkill("animalHandling", "wisdom"),
        CreateSubNewSkill("arcana", "intelligence"),
        CreateSubNewSkill("athletics", "strength"),
        CreateSubNewSkill("deception", "charisma"),
        CreateSubNewSkill("history", "intelligence"),
        CreateSubNewSkill("insight", "wisdom"),
        CreateSubNewSkill("intimidation", "charisma"),
        CreateSubNewSkill("investigation", "intelligence"),
        CreateSubNewSkill("medicine", "wisdom"),
        CreateSubNewSkill("nature", "intelligence"),
        CreateSubNewSkill("perception", "wisdom"),
        CreateSubNewSkill("performance", "charisma"),
        CreateSubNewSkill("persuasion", "charisma"),
        CreateSubNewSkill("religion", "intelligence"),
        CreateSubNewSkill("sleightOfHand", "dexterity"),
        CreateSubNewSkill("stealth", "dexterity"),
        CreateSubNewSkill("survival", "wisdom")
    );

    const newSkillSet2 = CreateNewSkillSet("lengendary");
    newSkillSet2.skills.push(
        CreateNewSkill("agility"),
        CreateNewSkill("fortitude"),
        CreateNewSkill("might"),
        CreateNewSkill("learning"),
        CreateNewSkill("logic"),
        CreateNewSkill("perception"),
        CreateNewSkill("will"),
        CreateNewSkill("deception"),
        CreateNewSkill("persuasion"),
        CreateNewSkill("presence"),
        CreateNewSkill("alteration"),
        CreateNewSkill("creation"),
        CreateNewSkill("energy"),
        CreateNewSkill("entropy"),
        CreateNewSkill("influence"),
        CreateNewSkill("movement"),
        CreateNewSkill("perscience"),
        CreateNewSkill("protection")
    );

    skillArrays.push(newSkillSet1);
    skillArrays.push(newSkillSet2);

    // console.log(skillArrays);

    return skillArrays
}

// //function that returns a list of subskills for a given skill
// export function GetSubSkills(skillName: string, subSkills: SubSkill[]): SubSkill[] {
//     return subSkills.filter((subSkill) => subSkill.parentSkill === skillName);
// }


export function CheckForModChange(sValue: number): number {
    //updates modifier for a stat

    let modVal;
    if (sValue >= 0 && sValue < 2) {
        modVal = -5;
    } else if (sValue >= 2 && sValue < 4) {
        modVal = -4;
    } else if (sValue >= 4 && sValue < 6) {
        modVal = -3;
    } else if (sValue >= 6 && sValue < 8) {
        modVal = -2;
    } else if (sValue >= 8 && sValue < 10) {
        modVal = -1;
    } else if (sValue >= 10 && sValue < 12) {
        modVal = 0;
    } else if (sValue >= 12 && sValue < 14) {
        modVal = 1;
    } else if (sValue >= 14 && sValue < 16) {
        modVal = 2;
    } else if (sValue >= 16 && sValue < 18) {
        modVal = 3;
    } else if (sValue >= 18 && sValue < 20) {
        modVal = 4;
    } else if (sValue >= 20) {
        modVal = 5;
    } else {
        modVal = 0;
    }

    return modVal
}