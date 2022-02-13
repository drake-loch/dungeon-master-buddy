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
    import { selectedSettlement } from "/src/utilities/settlementConfig";

    export let wName = $page.params.worldName;
    export let cName = $page.params.contName;

    onMount(async () => {
        if ($selectedWorld && $selectedContinent && $selectedProvince) {
            $breadcrumb.current = $selectedSettlement.name;
            $breadcrumb.currentType = "Settlement";
            $breadcrumb.path = [
                {
                    url: `/dm/dashboard/${$selectedWorld.name}/${$selectedContinent.name}/${$selectedProvince.name}`,
                    name: $selectedProvince.name,
                },
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
    });
</script>

{#if $selectedWorld}
    <section>
        <Breadcrumb />
        <PanelHolder>
            <CoolPanel
                title="Shops"
                nav="/dm/dashboard/{$selectedWorld.name}/{$selectedContinent.name}/{$selectedProvince}/{$selectedSettlement.name}/shops"
                options={[
                    {
                        name: "Manage Shops",
                        nav: `/dm/dashboard/${$selectedWorld.name}/${$selectedContinent.name}/${$selectedProvince.name}/${$selectedSettlement.name}/shops`,
                    },
                    {
                        name: "Create Shop",
                        nav: `/dm/dashboard/${$selectedWorld.name}/${$selectedContinent.name}/${$selectedProvince.name}/${$selectedSettlement.name}/shops/create`,
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
