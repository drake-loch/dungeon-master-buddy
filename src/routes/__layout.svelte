<script>
    import { auth } from "../utilities/firebase";

    import "../global.css";
    import { user, isLoggedIn } from "../stores/index";
    import { goto } from "$app/navigation";
    import { GetWorldsFromDB } from "/src/utilities/worldConfig";
    import { worlds } from "/src/stores/worldsStore";
    import { selectedWorld } from "/src/stores/worldsStore";

    auth.onAuthStateChanged(async (u) => {
        if (u) {
            //logged in
            $user = u;
            $isLoggedIn = true;
            worlds.set(await GetWorldsFromDB($user));

            if (localStorage.getItem("selectedWorld")) {
                $selectedWorld = JSON.parse(
                    localStorage.getItem("selectedWorld")
                );
            } else {
                $selectedWorld = null;
                goto("/dm");
            }
        } else {
            //not logged in
            $user = null;
            $isLoggedIn = false;
            goto("/");
            $worlds = [];
        }
    });
</script>

<div>
    <slot />
</div>

<style>
    div {
        background-color: var(--col-dark-light);
        min-height: calc(100vh);
        box-sizing: border-box;
    }
</style>
