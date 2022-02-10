<script>
    // @ts-ignore
    import { GetSelectedWorld } from "/src/utilities/worldConfig";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import CoolPanel from "/src/ui/components/CoolPanel/CoolPanel.svelte";
    import PanelHolder from "/src/ui/components/PanelHolder/PanelHolder.svelte";

    let world = null;

    onMount(async () => {
        world = GetSelectedWorld();
        if (world) {
            //do stuff
        } else {
            goto("/");
        }
    });
</script>

{#if world}
    <PanelHolder>
        <CoolPanel
            nav="/dm/dashboard/continents"
            options={[
                { name: "Manage continents", nav: "/dm/dashboard/continents" },
                { name: "View Regions", nav: "/dm/dashboard/regions-list" },
            ]}
            title="Continents"
        />
        <CoolPanel nav="/dm/dashboard/builder" title="Character Sheet" />
        <CoolPanel
            options={[
                { name: "View List", nav: "/dm/dashboard/npc-list" },
                { name: "Create NPC", nav: "/dm/dashboard/builder" },
            ]}
            title="NPC List"
        />
        <CoolPanel title="Character Builder" />
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
{/if}

<style>
    @media only screen and (min-width: 1030px) {
        :global(body) {
            overflow: hidden;
        }
    }
</style>
