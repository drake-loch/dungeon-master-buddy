<script>
    // @ts-ignore
    import {
        GetSelectedWorld,
        selectedWorld,
        worlds,
    } from "/src/utilities/worldConfig";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import CoolPanel from "/src/ui/components/CoolPanel/CoolPanel.svelte";
    import PanelHolder from "/src/ui/components/PanelHolder/PanelHolder.svelte";
    import { page } from "$app/stores";
    // import { selectedWorld, worlds } from "/src/utilities/worldConfig";
    import Breadcrumb from "/src/ui/components/Breadcrumb/Breadcrumb.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";

    // export let wName = $page.params.worldName;

    onMount(async () => {
        if ($selectedWorld) {
            //do stuff
            $breadcrumb.current = $selectedWorld.name;
            $breadcrumb.currentType = "world";
            $breadcrumb.path = [];
        }
    });
</script>

{#if $selectedWorld}
    <section>
        <Breadcrumb />
        <PanelHolder>
            <CoolPanel
                title="Continents"
                nav="/dm/dashboard/{$selectedWorld.name}/continents"
                options={[
                    {
                        name: "Manage continents",
                        nav: `/dm/dashboard/${$selectedWorld.name}/continents`,
                    },
                    {
                        name: "View Provinces",
                        nav: `/dm/dashboard/${$selectedWorld.name}/provinces-list`,
                    },
                    {
                        name: "View Settlements",
                        nav: `/dm/dashboard/${$selectedWorld.name}/settlements-list`,
                    },
                ]}
            />
            <CoolPanel
                title="Character Sheet"
                nav="/dm/dashboard/{$selectedWorld.name}/builder"
            />
            <CoolPanel
                title="NPC List"
                options={[
                    {
                        name: "View List",
                        nav: `/dm/dashboard/${$selectedWorld.name}/npc-list`,
                    },
                    {
                        name: "Create NPC",
                        nav: `/dm/dashboard/${$selectedWorld.name}/builder`,
                    },
                ]}
            />
            <CoolPanel
                title="Character Builder"
                options={[
                    {
                        name: "Build Character",
                        nav: `/dm/dashboard/${$selectedWorld.name}/builder`,
                    },
                    {
                        name: "Create NPC",
                        nav: `/dm/dashboard/${$selectedWorld.name}/builder/npc`,
                    },
                    {
                        name: "Create PC",
                        nav: `/dm/dashboard/${$selectedWorld.name}/builder/pc`,
                    },
                    {
                        name: "Create Monster",
                        nav: `/dm/dashboard/${$selectedWorld.name}/builder/monster`,
                    },
                ]}
            />
            <CoolPanel title="Spellbook" />
            <CoolPanel title="Religions" />
            <CoolPanel title="Organizations" />
            <CoolPanel title="Factions" />
            <CoolPanel title="Monster" />
            <CoolPanel title="Races" />
            <CoolPanel title="Items" />
            <CoolPanel title="Settings" />
            <CoolPanel title="Regions" />
            <CoolPanel />
        </PanelHolder>
    </section>
{/if}

<style>
    @media only screen and (min-width: 1030px) {
        :global(body) {
            overflow: hidden;
        }
    }
</style>
