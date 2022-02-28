<script>
    import { auth } from "../utilities/firebase";

    import "../global.css";
    import { user, isLoggedIn } from "../stores/index";
    import { goto } from "$app/navigation";
    import { GetWorldsFromDB } from "/src/utilities/worldConfig";
    // import { worlds } from "/src/stores/worldsStore";
    // import { selectedWorld } from "/src/stores/worldsStore";
    import { worlds } from "/src/utilities/worldConfig";
    import { selectedWorld } from "/src/utilities/worldConfig";

    auth.onAuthStateChanged(async (u) => {
        if (u) {
            //logged in
            $user = u;
            $isLoggedIn = true;
            worlds.set(await GetWorldsFromDB($user));
        } else {
            //not logged in
            $user = null;
            $isLoggedIn = false;
        }
    });
</script>

<svelte:head>
    <title>Dungeon Master Buddy</title>
    <html lang="en" />
</svelte:head>

<div>
    <slot />
</div>

<style>
    div {
        background-color: var(--col-dark-light);
        min-height: calc(100vh);
        box-sizing: border-box;
    }

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
