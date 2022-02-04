<script>
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import CreateWorld from "/src/ui/components/ModWindows/CreateWorld.svelte";
    import { onMount } from "svelte";

    let selectedWorld = undefined;
    let worlds = [];
    let toggleMod;

    onMount(async () => {
        if (localStorage.getItem("worlds")) {
            worlds = JSON.parse(localStorage.getItem("worlds"));
        }
    });
</script>

<ModWindow bind:this={toggleMod}>
    <CreateWorld toggleMod={toggleMod.toggleMod} />
</ModWindow>
<div>
    <h1>Welcome Dungeon Master!</h1>
    <h2>Please select a world</h2>
    <ListSelector bind:selectedItem={selectedWorld} items={worlds} />
    <VerticleList>
        {#if selectedWorld}
            <BigButton nav="/">Select World</BigButton>
        {/if}
        <BigButton func={() => toggleMod.toggleMod()}>Create World</BigButton>
        <BigButton nav="/">Back</BigButton>
    </VerticleList>
</div>

<style>
    h2 {
        margin: 2rem 0;
    }
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
