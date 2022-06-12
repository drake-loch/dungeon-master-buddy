<script>
    // @ts-ignore
    import {
        GetSelectedWorld,
        selectedWorld,
        worlds,
    } from "/src/utilities/worldConfig";
    import { onMount } from "svelte";
    import CoolPanel from "/src/ui/components/CoolPanel/CoolPanel.svelte";
    import PanelHolder from "/src/ui/components/PanelHolder/PanelHolder.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { user } from "/src/stores";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import { selectedContinent } from "/src/utilities/continentsConfig";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import CreateContinent from "/src/ui/components/ModWindow/ModWindows/CreateContinent.svelte";

    $: if ($selectedWorld) {
        $breadcrumb.current = $selectedWorld.name;
        $breadcrumb.currentType = "world";
        $breadcrumb.path = [];
    }
    $selectedContinent = undefined;

    let toggleMod;
</script>

<ModWindow bind:this={toggleMod}>
    <CreateContinent toggleMod={toggleMod.toggleMod} />
</ModWindow>

{#if $selectedWorld}
    <section>
        <DashModule
            canEditTitle={false}
            canEditDesc={true}
            title="Description"
            desc="World Description"
        />
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Continents"
            desc="View and edit continents."
        >
            <div class="select-list" slot="extra">
                <ListSelector
                    bind:selectedItem={$selectedContinent}
                    items={$selectedWorld.continents}
                />
                <div class="button-list">
                    {#if $selectedContinent}
                        <LittleButton
                            type="tool pc"
                            func={() =>
                                goto(`${$page.url}/${$selectedContinent.name}`)}
                            >View</LittleButton
                        >
                    {/if}
                    <LittleButton
                        type="good pc"
                        func={() => toggleMod.toggleMod()}>New</LittleButton
                    >
                    {#if $selectedContinent}
                        <LittleButton type="warning pc" func={() => {}}
                            >Delete</LittleButton
                        >
                    {/if}
                </div>
            </div>
        </DashModule>
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Character Builder"
            desc="View, Create amd edit characters, NPCs and Creatures here."
            buttons={[
                { title: "View NPCS", func: () => goto(`${$page.url}/npcs`) },
                {
                    title: "View Character",
                    func: () => goto(`${$page.url}/characters`),
                },
                {
                    title: "View Creatures",
                    func: () => goto(`${$page.url}/creatures`),
                },
            ]}
        />
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Campaigns"
            desc="View, Create amd edit Campaigns."
            buttons={[
                {
                    title: "View Campaigns",
                    func: () => goto(`${$page.url}/campaigns`),
                },
            ]}
        />
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Quests"
            desc="View, Create amd edit Quests."
            buttons={[
                {
                    title: "View Quests",
                    func: () => goto(`${$page.url}/quests`),
                },
            ]}
        />
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Races"
            desc="View, Create amd edit races."
            buttons={[
                { title: "View Races", func: () => goto(`${$page.url}/races`) },
            ]}
        />
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Spellbook"
            desc="View, Create amd edit Spells."
            buttons={[
                {
                    title: "View Spells",
                    func: () => goto(`${$page.url}/spellbook`),
                },
            ]}
        />
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Factions"
            desc="View, Create amd edit factions."
            buttons={[
                {
                    title: "View factions",
                    func: () => goto(`${$page.url}/factions`),
                },
            ]}
        />
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Organizations"
            desc="View, Create amd edit Organizations."
            buttons={[
                {
                    title: "View Organizations",
                    func: () => goto(`${$page.url}/organizations`),
                },
            ]}
        />
        <!-- <PanelHolder>
            <CoolPanel title="Spellbook" />
            <CoolPanel title="Religions" />
            <CoolPanel title="Lore" />
            <CoolPanel title="Items" />
            <CoolPanel title="Settings" />
            <CoolPanel />
        </PanelHolder> -->
    </section>
{/if}

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    @media only screen and (min-width: 1030px) {
        :global(body) {
            overflow: hidden;
        }
        section {
            padding-bottom: 5rem;
            align-items: center;
        }
        .select-list {
            display: flex;
            /* background-color: red; */
        }
        .button-list {
            margin-left: 1rem;
            display: flex;
            flex-direction: column;
            width: 50%;
            gap: 0.5rem;
        }
    }
</style>
