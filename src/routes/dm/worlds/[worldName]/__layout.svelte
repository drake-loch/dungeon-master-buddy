<script context="module">
    export async function load({ params }) {
        let worldName = params.worldName;
        return {
            stuff: { worldName },
            props: { worldName },
        };
    }
</script>

<script>
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { navExpanded } from "/src/stores/navbarStore";
    import { onMount } from "svelte";
    import { user } from "/src/stores";
    import { GetWorldsFromDB } from "/src/utilities/worldConfig";
    import { worlds } from "/src/utilities/worldConfig";

    export let worldName;
    let size = "";
    function toggleCollapse() {
        navExpanded.set(!$navExpanded);
    }
    $: size = $navExpanded ? "col" : "";

    onMount(async () => {
        if (!$selectedWorld && $user) {
            console.log("No world selected");
            if (JSON.parse(sessionStorage.getItem("worlds")).length > 0) {
                console.log("Worlds in session store");
                $worlds = JSON.parse(sessionStorage.getItem("worlds"));
                $selectedWorld = $worlds.find((w) => w.name === worldName);
            } else {
                $worlds = await GetWorldsFromDB($user);
                $selectedWorld = $worlds.find((w) => w.name === worldName);
            }
        }
    });
</script>

<slot />

<style>
    /* Scroll Bar */
    ::-webkit-scrollbar {
        width: 2px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: red;
        border-radius: 10px;
    }
</style>
