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

    $: if ($selectedWorld) {
        $breadcrumb.current = $selectedWorld.name;
        $breadcrumb.currentType = "world";
        $breadcrumb.path = [];
    }
</script>

{#if $selectedWorld}
    <section>
        <PanelHolder>
            <CoolPanel
                title="Campaigns"
                options={[
                    {
                        name: "Manage Campaigns",
                        nav: `/dm/campaigns`,
                    },
                ]}
            />
            <CoolPanel
                title="Continents"
                nav="/dm/worlds/{$selectedWorld.name}/continents"
                options={[
                    {
                        name: "Manage continents",
                        nav: `/dm/worlds/${$selectedWorld.name}/continents`,
                    },
                    {
                        name: "View Provinces",
                        nav: `/dm/worlds/${$selectedWorld.name}/provinces-list`,
                    },
                    {
                        name: "View Settlements",
                        nav: `/dm/worlds/${$selectedWorld.name}/settlements-list`,
                    },
                ]}
            />
            <CoolPanel
                title="Builder"
                options={[
                    {
                        name: "Build Character",
                        nav: `/dm/worlds/${$selectedWorld.name}/character-sheet`,
                    },
                    {
                        name: "Build NPC",
                        nav: `/dm/worlds/${$selectedWorld.name}/builder/npc`,
                    },
                    {
                        name: "Build Creature",
                        nav: `/dm/worlds/${$selectedWorld.name}/builder/creature`,
                    },
                ]}
            />
            <CoolPanel
                title="Races"
                options={[
                    {
                        name: "View Races",
                        nav: `/dm/worlds/${$selectedWorld.name}/races`,
                    },
                ]}
            />
            <CoolPanel
                title="NPCs"
                options={[
                    {
                        name: "All NPCs",
                        nav: `/dm/worlds/${$selectedWorld.name}/npcs`,
                    },
                    {
                        name: "Create NPC",
                        nav: `/dm/worlds/${$selectedWorld.name}/builder`,
                    },
                ]}
            />
            <CoolPanel
                title="Player Characters"
                options={[
                    {
                        name: "View List",
                        nav: `/dm/worlds/${$selectedWorld.name}/characters`,
                    },
                    {
                        name: "Create PC",
                        nav: `/dm/worlds/${$selectedWorld.name}/builder`,
                    },
                ]}
            />
            <CoolPanel title="Spellbook" />
            <CoolPanel title="Religions" />
            <CoolPanel title="Organizations" />
            <CoolPanel title="Factions" />
            <CoolPanel title="Lore" />
            <CoolPanel title="Items" />
            <CoolPanel title="Settings" />
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
