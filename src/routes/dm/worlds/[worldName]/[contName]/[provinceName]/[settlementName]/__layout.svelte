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
    import { selectedProvince } from "/src/utilities/provinceConfig";

    import { user } from "/src/stores";
    import { selectedSettlement } from "/src/utilities/settlementConfig";
    import { onMount } from "svelte";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { page } from "$app/stores";

    export let contName = $page.params.contName;
    export let province = $page.params.provinceName;
    export let settlement;

    onMount(() => {
        console.log($selectedWorld);
        if (!$selectedSettlement) {
            const cont = $selectedWorld.continents.find(
                (cont) => cont.name === contName
            );
            const prov = cont.provinces.find((prov) => prov.name === province);
            console.log(prov);
            $selectedSettlement = prov.settlements.find(
                (sett) => sett.name === settlement
            );
        }
    });
</script>

<slot />
