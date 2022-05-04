<script context="module">
    export async function load({ params }) {
        let contName = params.contName;
        return {
            stuff: { contName },
            props: { contName },
        };
    }
</script>

<script>
    import { onMount } from "svelte";
    import { user } from "/src/stores";
    import { selectedContinent } from "/src/utilities/continentsConfig";
    import { selectedWorld } from "/src/utilities/worldConfig";

    export let contName;

    $: if (!$selectedContinent && $selectedWorld?.continents && $user) {
        // console.log("No Continent selected");
        //find the continent in the world using the url slug
        $selectedContinent = $selectedWorld.continents.find(
            (cont) => cont.name === contName
        );
    }
    onMount(() => {});
</script>

<slot />
