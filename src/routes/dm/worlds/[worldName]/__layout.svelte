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
    import { showBreadcrumb } from "/src/utilities/breadCrumbStore";
    import { userData } from "/src/utilities/userData";

    export let worldName;
    let size = "";
    function toggleCollapse() {
        navExpanded.set(!$navExpanded);
    }
    $: size = $navExpanded ? "col" : "";

    $: if ($user?.uid && $userData?.worlds.length > 0 && !$selectedWorld) {
        $selectedWorld = $userData.worlds.find((w) => w.name === worldName);
        console.log($selectedWorld);
    }
    onMount(async () => {
        $showBreadcrumb = true;
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
