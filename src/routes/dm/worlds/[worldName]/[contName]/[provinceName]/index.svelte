<script>
    // @ts-ignore
    import { selectedWorld } from "/src/utilities/worldConfig";
    import CoolPanel from "/src/ui/components/CoolPanel/CoolPanel.svelte";
    import PanelHolder from "/src/ui/components/PanelHolder/PanelHolder.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedContinent } from "/src/utilities/continentsConfig";
    import { selectedProvince } from "/src/utilities/provinceConfig";

    $: if ($selectedWorld && $selectedContinent && $selectedProvince) {
        $breadcrumb.current = $selectedProvince.name;
        $breadcrumb.currentType = "Province";
        $breadcrumb.path = [
            {
                url: `/dm/worlds/${$selectedWorld.name}/${$selectedContinent.name}`,
                name: $selectedContinent.name,
            },
            {
                url: `/dm/worlds/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
        ];
    }
</script>

{#if $selectedWorld && $selectedContinent && $selectedProvince}
    <section>
        <PanelHolder>
            <CoolPanel
                title="Settlements"
                nav="/dm/worlds/{$selectedWorld.name}/{$selectedContinent.name}/{$selectedProvince}/settlements"
                options={[
                    {
                        name: "Manage Settlements",
                        nav: `/dm/worlds/${$selectedWorld.name}/${$selectedContinent.name}/${$selectedProvince.name}/settlements`,
                    },
                    {
                        name: "Manage continents",
                        nav: `/dm/worlds/${$selectedWorld.name}/continents`,
                    },
                ]}
            />
            <CoolPanel
                title="NPC List"
                options={[
                    {
                        name: "View List",
                        nav: `/dm/worlds/${$selectedWorld.name}/npc-list`,
                    },
                    {
                        name: "Create NPC",
                        nav: `/dm/worlds/${$selectedWorld.name}/builder`,
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
