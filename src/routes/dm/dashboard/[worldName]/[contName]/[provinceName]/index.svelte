<script>
    // @ts-ignore
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { onMount } from "svelte";
    import CoolPanel from "/src/ui/components/CoolPanel/CoolPanel.svelte";
    import PanelHolder from "/src/ui/components/PanelHolder/PanelHolder.svelte";
    import { page } from "$app/stores";
    import Breadcrumb from "/src/ui/components/Breadcrumb/Breadcrumb.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedContinent } from "/src/utilities/continentsConfig";
    import { selectedProvince } from "/src/utilities/provinceConfig";

    export let wName = $page.params.worldName;
    export let cName = $page.params.contName;

    $: if ($selectedWorld && $selectedContinent && $selectedProvince) {
        $breadcrumb.current = $selectedProvince.name;
        $breadcrumb.currentType = "Province";
        $breadcrumb.path = [
            {
                url: `/dm/dashboard/${$selectedWorld.name}/${$selectedContinent.name}`,
                name: $selectedContinent.name,
            },
            {
                url: `/dm/dashboard/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
        ];
    }
</script>

{#if $selectedWorld && $selectedContinent && $selectedProvince}
    <section>
        <Breadcrumb />
        <PanelHolder>
            <CoolPanel
                title="Settlements"
                nav="/dm/dashboard/{$selectedWorld.name}/{$selectedContinent.name}/{$selectedProvince}/settlements"
                options={[
                    {
                        name: "Manage Settlements",
                        nav: `/dm/dashboard/${$selectedWorld.name}/${$selectedContinent.name}/${$selectedProvince.name}/settlements`,
                    },
                    {
                        name: "Manage continents",
                        nav: `/dm/dashboard/${$selectedWorld.name}/continents`,
                    },
                ]}
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
            <!-- <CoolPanel /> -->
        </PanelHolder>
    </section>
{/if}

<style>
    section {
        min-width: 75%;
    }
    @media only screen and (min-width: 1030px) {
        :global(body) {
            overflow: hidden;
        }
    }
</style>
