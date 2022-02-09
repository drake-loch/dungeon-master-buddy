<script>
    import { auth } from "../utilities/firebase";

    import "../global.css";
    import { user, isLoggedIn } from "../stores/index";
    import { goto } from "$app/navigation";

    auth.onAuthStateChanged((u) => {
        if (u) {
            //logged in
            $user = u;
            $isLoggedIn = true;
        } else {
            //not logged in
            $user = null;
            $isLoggedIn = false;
            // goto("/");
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
