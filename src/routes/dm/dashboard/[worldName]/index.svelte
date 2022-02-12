<script>
    import { page } from "$app/stores";
    import { selectedWorld, worlds } from "/src/stores/worldsStore";
    export let wName = $page.params.worldName;
</script>

<h1>{wName}</h1>
