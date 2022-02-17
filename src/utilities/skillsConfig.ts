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
export function CreateSubNewSkill(name: string): SubSkill {
    const newSubSkill: SubSkill = {
        name: name,
        baseValue: 0,
        mod: 0,
        parentSkill: '',
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
        CreateSubNewSkill("acrobatics"),
        CreateSubNewSkill("animalHandling"),
        CreateSubNewSkill("arcana"),
        CreateSubNewSkill("athletics"),
        CreateSubNewSkill("deception"),
        CreateSubNewSkill("history"),
        CreateSubNewSkill("insight"),
        CreateSubNewSkill("intimidation"),
        CreateSubNewSkill("investigation"),
        CreateSubNewSkill("medicine"),
        CreateSubNewSkill("nature"),
        CreateSubNewSkill("perception"),
        CreateSubNewSkill("performance"),
        CreateSubNewSkill("persuasion"),
        CreateSubNewSkill("religion"),
        CreateSubNewSkill("sleightOfHand"),
        CreateSubNewSkill("stealth"),
        CreateSubNewSkill("survival")
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