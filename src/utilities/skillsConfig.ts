export interface Skill {
    name: string,
    baseValue: number,
    mod: number,
}
export interface SkillSet {
    name: string,
    skills: Skill[],
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

export function CreateNewSkillSet(): SkillSet {
    const newSkillSet: SkillSet = {
        name: "",
        skills: [],
    };
    return newSkillSet
}
export function CreateNewSkillSetNamed(name: string) {
    return {
        name: name,
        skills: [],
    };
}

export function AddDefaultSkills(): SkillSet[] {
    let skillArrays: SkillSet[] = [];

    const newSkillSet1 = CreateNewSkillSetNamed("familiar");
    newSkillSet1.skills.push(CreateNewSkill("strength"));
    newSkillSet1.skills.push(CreateNewSkill("dexterity"));
    newSkillSet1.skills.push(CreateNewSkill("constitution"));
    newSkillSet1.skills.push(CreateNewSkill("wisdom"));
    newSkillSet1.skills.push(CreateNewSkill("intelligence"));
    newSkillSet1.skills.push(CreateNewSkill("charisma"));

    const newSkillSet2 = CreateNewSkillSetNamed("lengendary");
    newSkillSet2.skills.push(CreateNewSkill("agility"));
    newSkillSet2.skills.push(CreateNewSkill("fortitude"));
    newSkillSet2.skills.push(CreateNewSkill("might"));
    newSkillSet2.skills.push(CreateNewSkill("learning"));
    newSkillSet2.skills.push(CreateNewSkill("logic"));
    newSkillSet2.skills.push(CreateNewSkill("perception"));
    newSkillSet2.skills.push(CreateNewSkill("will"));
    newSkillSet2.skills.push(CreateNewSkill("deception"));
    newSkillSet2.skills.push(CreateNewSkill("persuasion"));
    newSkillSet2.skills.push(CreateNewSkill("presence"));
    newSkillSet2.skills.push(CreateNewSkill("alteration"));
    newSkillSet2.skills.push(CreateNewSkill("creation"));
    newSkillSet2.skills.push(CreateNewSkill("energy"));
    newSkillSet2.skills.push(CreateNewSkill("entropy"));
    newSkillSet2.skills.push(CreateNewSkill("influence"));
    newSkillSet2.skills.push(CreateNewSkill("movement"));
    newSkillSet2.skills.push(CreateNewSkill("perscience"));
    newSkillSet2.skills.push(CreateNewSkill("protection"));

    skillArrays.push(newSkillSet1);
    skillArrays.push(newSkillSet2);

    // console.log(skillArrays);

    return skillArrays
}