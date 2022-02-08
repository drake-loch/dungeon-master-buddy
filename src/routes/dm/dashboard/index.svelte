<script>
    // @ts-ignore
    import { GetSelectedWorld } from "/src/utilities/worldConfig";
    import { onMount } from "svelte";

    let world = null;

    onMount(async () => {
        world = GetSelectedWorld();
        if (world) {
            //do stuff
        } else {
            window.location.assign("/");
        }
    });
</script>

{#if world}
    <section />
{/if}

<style>
    section {
        width: 100%;
        height: 150vh;
        overflow-y: scroll;
        box-sizing: border-box;
        padding: 1rem 0.5rem;
    }

    @media only screen and (min-width: 1030px) {
        :global(body) {
            overflow: hidden;
        }
    }
</style>
