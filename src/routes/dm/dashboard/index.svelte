<script>
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
    <h1>Hello there!</h1>
{/if}

<style>
    h1 {
        background-color: red;
        height: 200vh;
    }
</style>
