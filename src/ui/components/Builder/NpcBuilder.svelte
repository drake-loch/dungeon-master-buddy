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

    export let newChar = null;
    export let mode = "view";
    $: console.log(newChar);

    function createChar() {
        $selectedWorld = addNPCtoWorld($user, $selectedWorld, newChar);
        goto(`/dm/dashboard/${$selectedWorld.id}/npcs`);
    }
    function updateChar() {
        $selectedWorld = updateNPCInDB($user, $selectedWorld, newChar);
    }

    function toggleIsSimple() {}

    export let tabs = [
        { name: "Info", isSelected: true, amountOfPages: 2 },
        { name: "Skills", isSelected: false, amountOfPages: 1 },
        { name: "Quests", isSelected: false, amountOfPages: 1 },
        { name: "Gear/Spells", isSelected: false, amountOfPages: 1 },
    ];

    $: currentSelectedTab = tabs.findIndex((tab) => tab.isSelected);
    $: subPageMaxIndex = tabs[currentSelectedTab].amountOfPages - 1;
    let editMode = true;
    let simpleNpc = true;
    let currentSubPageIndex = 0;
</script>

{#if newChar}
    <Builder
        bind:tabs
        {editMode}
        bind:subPageMaxIndex
        bind:currentSelectedTab
        bind:currentSubPageIndex
    >
        <span slot="tab-1">
            <NpcInfo {mode} {currentSubPageIndex} bind:newChar />
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
</style>
