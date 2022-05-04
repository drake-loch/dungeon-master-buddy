<script context="module">
    export async function load({ params }) {
        let settlement = params.settlementName;
        return {
            stuff: { settlement },
            props: { settlement },
        };
    }
</script>

<script>
    import { selectedSettlement } from "/src/utilities/settlementConfig";
    import { onMount } from "svelte";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { page } from "$app/stores";

    export let contName = $page.params.contName;
    export let province = $page.params.provinceName;
    export let settlement;

    $: if (!$selectedSettlement && $selectedWorld) {
        const cont = $selectedWorld.continents.find(
            (cont) => cont.name === contName
        );
        const prov = cont.provinces.find((prov) => prov.name === province);
        // console.log(prov);
        $selectedSettlement = prov.settlements.find(
            (sett) => sett.name === settlement
        );
    }
    onMount(() => {
        // console.log($selectedWorld);
    });
</script>

<slot />
