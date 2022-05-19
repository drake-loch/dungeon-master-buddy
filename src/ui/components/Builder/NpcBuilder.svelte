<script lang="ts">
    import { selectedWorld } from "/src/utilities/worldConfig";
    import Builder from "/src/ui/components/Builder/Builder.svelte";
    import Skills from "/src/ui/components/Tabs/Skills.svelte";
    import { user } from "/src/stores";
    import BuilderButton from "../Tabs/components/BuilderButton.svelte";
    import { goto } from "$app/navigation";
    import NpcInfo from "../Tabs/npc/NpcInfo.svelte";
    import { addNPCtoWorld, updateNPCInDB } from "/src/utilities/charManager";
    import Quests from "../Tabs/npc/Quests.svelte";
    import { createNewNPC } from "/src/utilities/charManager";

    export let newChar = null;
    export let mode = "view";
    // $: console.log(newChar);

    function createChar() {
        $selectedWorld = addNPCtoWorld($user, $selectedWorld, newChar);
        goto(`/dm/worlds/${$selectedWorld.name}/npcs`);
    }
    function updateChar() {
        $selectedWorld = updateNPCInDB($user, $selectedWorld, newChar);
    }

    export let tabs = [
        { name: "Overview", isSelected: true, onlyMob: false },
        { name: "Skills", isSelected: false, onlyMob: true },
        { name: "Quests", isSelected: false, onlyMob: false },
        { name: "Gear/Spells", isSelected: false, onlyMob: false },
    ];

    $: currentSelectedTab = tabs.findIndex((tab) => tab.isSelected);
    let editMode = true;
    let currentSubPageIndex = 0;

    function randomize() {
        let randomNpc = createNewNPC(newChar.id);
        randomNpc.name = "Bobby B";
        newChar = randomNpc;
        console.log("random npc", randomNpc);
        console.log(" new npc after random", newChar);
    }
</script>

{#if newChar}
    <Builder bind:tabs {editMode} bind:currentSelectedTab>
        <span slot="tab-1">
            <NpcInfo slot="tab-1" {mode} {currentSubPageIndex} bind:newChar />
        </span>
        <span slot="tab-2">
            <Skills {mode} bind:newChar />
        </span>
        <span slot="tab-3">
            <Quests {mode} bind:newChar />
        </span>

        <span slot="buttons">
            {#if mode === "view"}
                <BuilderButton
                    type="good"
                    func={() => (mode = "edit")}
                    nav={null}>Edit NPC</BuilderButton
                >
            {:else if mode === "create"}
                <BuilderButton type="good" func={createChar} nav={null}
                    >Create NPC</BuilderButton
                >
                <BuilderButton type="tool" func={randomize} nav={null}
                    >Randomize NPC</BuilderButton
                >
            {:else if mode === "edit"}
                <BuilderButton type="good" func={updateChar}
                    >Update NPC</BuilderButton
                >
            {/if}
            <slot name="extra-buttons" />
        </span>
    </Builder>
{/if}

<style>
    @media only screen and (min-width: 1030px) {
        .mob-only {
            display: none;
        }
    }
</style>
