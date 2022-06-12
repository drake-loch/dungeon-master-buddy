<script>
    // @ts-ignore
    import { selectedWorld } from "/src/utilities/worldConfig";
    import CoolPanel from "/src/ui/components/CoolPanel/CoolPanel.svelte";
    import PanelHolder from "/src/ui/components/PanelHolder/PanelHolder.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedContinent } from "/src/utilities/continentsConfig";
    import { selectedProvince } from "/src/utilities/provinceConfig";
    import { selectedSettlement } from "/src/utilities/settlementConfig";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    $: if (
        $selectedWorld &&
        $selectedContinent &&
        $selectedProvince &&
        $selectedSettlement
    ) {
        $breadcrumb.current = $selectedSettlement.name;
        $breadcrumb.currentType = "Settlement";
        $breadcrumb.path = [
            {
                url: `/dm/worlds/${$selectedWorld.name}/${$selectedContinent.name}/${$selectedProvince.name}`,
                name: $selectedProvince.name,
            },
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
    let contName = $page.params.contName;
    let province = $page.params.provinceName;
    let settlement = $page.params.settlementName;

    $: if (!$selectedSettlement && $selectedWorld && province) {
        const cont = $selectedWorld.continents.find(
            (cont) => cont.name === contName
        );
        const prov = cont?.provinces.find((prov) => prov.name === province);
        // console.log(prov);
        $selectedSettlement = prov?.settlements.find(
            (sett) => sett?.name === settlement
        );
    }
</script>

{#if $selectedWorld && $selectedContinent && $selectedProvince && $selectedSettlement}
    <section>
        <DashModule
            canEditTitle={true}
            canEditDesc={true}
            title="Description"
            desc="Province Description"
        />
        <DashModule title="Shops" desc="View Shops in this settlement." />
        <DashModule title="NPCs" desc="View NPCs in this settlement." />
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
