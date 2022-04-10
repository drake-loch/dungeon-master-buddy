<script context="module">
    export async function load({ params }) {
        let province = params.provinceName;
        return {
            stuff: { province },
            props: { province },
        };
    }
</script>

<script>
    import { selectedProvince } from "/src/utilities/provinceConfig";

    import { onMount } from "svelte";
    import { user } from "/src/stores";
    import { selectedContinent } from "/src/utilities/continentsConfig";
    import { selectedWorld } from "/src/utilities/worldConfig";

    export let province;

    $: if (!$selectedProvince && $selectedContinent && $user) {
        console.log("No province selected");
        // console.log($selectedContinent);

        $selectedProvince = $selectedContinent.provinces.find(
            (prov) => prov.name === province
        );
    }
</script>

<slot />
