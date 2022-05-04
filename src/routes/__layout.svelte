<script>
    import { auth, getMyCampaigns, getUserData } from "../utilities/firebase";

    import "../global.css";
    import { user, isLoggedIn } from "../stores/index";
    import { GetWorldsFromDB } from "/src/utilities/worldConfig";
    // import { worlds } from "/src/stores/worldsStore";
    // import { selectedWorld } from "/src/stores/worldsStore";
    import { worlds } from "/src/utilities/worldConfig";
    import { campaigns } from "/src/utilities/campaignManager";
    import { userData } from "/src/utilities/userData";

    auth.onAuthStateChanged(async (u) => {
        if (u) {
            //logged in
            $user = u;
            $isLoggedIn = true;
            let data = await getUserData($user);
            $userData = { ...data[0] };

            $worlds = $userData.worlds;
            $campaigns = $userData.campaigns;
            console.log("data", $userData);
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
