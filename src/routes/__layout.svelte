<script lang="ts">
    import "../global.css";
    import { user, isLoggedIn } from "../stores/index";
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
