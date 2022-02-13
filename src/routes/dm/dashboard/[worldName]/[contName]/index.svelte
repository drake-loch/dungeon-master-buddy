<script>
    // @ts-ignore
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import CoolPanel from "/src/ui/components/CoolPanel/CoolPanel.svelte";
    import PanelHolder from "/src/ui/components/PanelHolder/PanelHolder.svelte";
    import { page } from "$app/stores";
    // import { selectedWorld } from "/src/stores/worldsStore";
    import Breadcrumb from "/src/ui/components/Breadcrumb/Breadcrumb.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedContinent } from "/src/utilities/continentsConfig";

    export let contName = $page.params.contName;

    $: if ($selectedWorld && $selectedContinent) {
        //do stuff
        $breadcrumb.current = $selectedContinent.name;
        $breadcrumb.currentType = "continent";
        $breadcrumb.path = [
            {
                url: `/dm/dashboard/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
        ];
    }

    // onMount(() => {
    //     if ($selectedWorld && $selectedContinent) {
    //         //do stuff
    //         $breadcrumb.current = $selectedContinent.name;
    //         $breadcrumb.currentType = "continent";
    //         $breadcrumb.path = [
    //             {
    //                 url: `/dm/dashboard/${$selectedWorld.name}`,
    //                 name: $selectedWorld.name,
    //             },
    //         ];
    //     }
    // });
</script>

{#if $selectedWorld && $selectedContinent}
    <section>
        <Breadcrumb />
        <PanelHolder>
            <CoolPanel
                title="Provinces"
                nav="/dm/dashboard/{$selectedWorld.name}/{$selectedContinent.name}/provinces"
                options={[
                    {
                        name: "Manage Provinces",
                        nav: `/dm/dashboard/${$selectedWorld.name}/${$selectedContinent.name}/provinces`,
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
