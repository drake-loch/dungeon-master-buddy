import type { User } from "firebase/auth";
import { setCampaigns, UpdateCampaignsInDB } from "./firebase";
import { get, writable } from "svelte/store";

export const campaigns = writable<Campaign[]>([]);
export const selectedCampaign = writable<Campaign>()

export const selectedQuest = writable<Quest>()

export interface Lore {
    id: number;
    title: string;
    desc: string;
}


//these are used for timelines
export interface Prompt {
    title: string
    id: number;
    type: string;
    desc: string;
    hasRead: boolean;
    questID: number;
}

export const PROMPT_TYPES = ['lore', 'prompt', 'npc', 'encounter', 'quest']

export interface Quest {
    id: number;
    title: string;
    desc: string;
    prompts: Prompt[];
    lore: Lore[];
    location: { world: number, continent: number, prov: number, settlement: number };
}

export interface Campaign {
    title: string;
    id: number;
    world: number;
    desc: string;
    timeline: any[];
    quests: Quest[];
}

export function CreateNewCampaign(user: User, campaigns: Campaign[], name: string): Campaign {
    const newCampaign = {
        title: name,
        id: campaigns.length,
        world: -1,
        desc: "Welcome to the Campaign Builder. This is where you can create campaigns for your world. Quests are the main way to progress through your campaign. Some Campaigns have only one quest, while others have multiple quests.",
        timeline: [],
        quests: [],
    }
    setCampaigns(newCampaign, user);

    return newCampaign;
}

export function UpdateCampaign(user, campaignToUpdate) {
    //takes a campaign and updates it in the campaigns array
    console.log("updating campaign");
    let c = get(campaigns);
    c.splice(campaignToUpdate.id, 1, campaignToUpdate);
    console.log("updated campaigns", c);
    UpdateCampaignsInDB(user, c);
}

export function DeleteCampaign(campaignToDelete, user: User) {
    let c = get(campaigns);
    c.splice(campaignToDelete.id, 1);
    c.forEach((c, i) => {
        c.id = i;
    });
    campaigns.set(c);
    console.log(c);

    UpdateCampaignsInDB(user, c);
}


