/*

Campaign Builder:

Campaigns are one large story or stories that are made up of smaller parts. These smaller parts would
be called acts (or just quests if acts aren't wanted). Each act is made up of quests. Quests may have prompts which are described below.
Prompts will be used while a game is running.

----------------
DM PROMPTS:

in-short:
a page that helps dms manage a session by giving them promts that they can create

long explination
: a new dm or perhaps a unorganized dm wants to run a game, so they create a campign.
they create a session within the campaign that allows them to create a play-by-play of how
they want to run the game.

a session contains promps which could either be generated by the dm,players or randomly. These promps could be as
simple as a plot point, or more specific like character dialog.

DM-promt: 
"You arrive in a small village. The streets are cobbled with very fine looking houses that line the street.
as you walk down the street, the locals stare at you with a look of mild bitterness. A very well dressed man sitting
outside a shop call Talon's Workshop stands up and moves to block your path. He says: 'Hey, you aren't from around here,
what's yer busniess here?' "

These promts would be avalible for a dm to see in a timeline

*/

import type { User } from "firebase/auth";
import { UpdateWorld } from "./worldConfig";
import type { World } from "./worldConfig";
import { setCampaigns } from "./firebase";
import { writable } from "svelte/store";

export const campaigns = writable<Campaign[]>([]);
export const selectedCampaign = writable<Campaign>()

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
}

export interface Campaign {
    title: string;
    id: number;
    desc: string;
    timeline: any[];
}

export function CreateNewCampaign(user: User, campaigns: Campaign[], name: string): Campaign {
    const newCampaign = {
        title: name,
        id: campaigns.length,
        desc: '',
        timeline: [],
    }
    setCampaigns(newCampaign, user);

    return newCampaign;
}

