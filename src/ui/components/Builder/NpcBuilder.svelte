<script lang="ts">
    import { selectedWorld } from "/src/utilities/worldConfig";
    import Builder from "/src/ui/components/Builder/Builder.svelte";
    import Skills from "/src/ui/components/Tabs/Skills.svelte";
    import { addChartoWorld, updatePCInDB } from "/src/utilities/charManager";
    import { user } from "/src/stores";
    import BuilderButton from "../Tabs/components/BuilderButton.svelte";
    import { goto } from "$app/navigation";
    import NpcInfo from "../Tabs/npc/NpcInfo.svelte";

    export let newChar = null;
    export let mode = "view";
    $: console.log(newChar);

    function createChar() {
        $selectedWorld = addChartoWorld($user, $selectedWorld, newChar);
        goto(`/dm/dashboard/${$selectedWorld.id}/characters`);
    }
    function updateChar() {
        $selectedWorld = updatePCInDB($user, $selectedWorld, newChar);
    }

    function toggleIsSimple() {}

    export let tabs = [
        { name: "Info", isSelected: true, amountOfPages: 2 },
        { name: "Gear", isSelected: false, amountOfPages: 1 },
        { name: "Spells", isSelected: false, amountOfPages: 1 },
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
