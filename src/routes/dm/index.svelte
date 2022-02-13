<script lang="ts">
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import { onMount } from "svelte";
    import {
        DeleteWorld,
        GetWorldsFromDB,
        worlds,
        selectedWorld,
    } from "/src/utilities/worldConfig";
    import { user, isLoggedIn } from "../../stores/index";
    import CreateWorld from "/src/ui/components/ModWindow/ModWindows/CreateWorld.svelte";
    // import { worlds } from "src/utilities/worldConfig";
    // import { worlds, selectedWorld } from "/src/stores/worldsStore";

    let selectedW = null;
    let toggleMod;

    onMount(async () => {
        updateWorlds();
    });
    async function updateWorlds() {
        $worlds = await GetWorldsFromDB($user);
    }
    function deleteWorld() {
        DeleteWorld(selectedWorld, $user);
        $selectedWorld = null;
    }
    function selectWorld() {
        $selectedWorld = selectedW;
        localStorage.setItem("selectedWorld", JSON.stringify($selectedWorld));
    }
</script>

<ModWindow bind:this={toggleMod}>
    <CreateWorld {updateWorlds} toggleMod={toggleMod.toggleMod} />
</ModWindow>

<div class="page">
    <h1>Welcome, <br /><span>Dungeon Master!</span></h1>
    <h2>Please select a world</h2>
    <div class="content">
        <ListSelector bind:selectedItem={selectedW} items={$worlds} />
        <div class="margin">
            <VerticleList>
                {#if selectedW}
                    <BigButton
                        type="good"
                        func={selectWorld}
                        nav="/dm/dashboard/{selectedW.name}"
                        >Select World</BigButton
                    >
                    <BigButton type="warning" func={deleteWorld}
                        >Delete World</BigButton
                    >
                {/if}
                <BigButton func={() => toggleMod.toggleMod()}
                    >Create World</BigButton
                >
                <BigButton nav="/">Back</BigButton>
            </VerticleList>
        </div>
    </div>
</div>

<style>
    span {
        color: var(--col-brand);
        font-weight: 700;
        font-size: 2.5rem;
    }
    h1 {
        text-align: center;
        width: 100%;
        font-size: 1.5rem;
    }
    h2 {
        margin: 2rem 0 0 0;
        color: white;
        font-weight: 200;
    }
    .content {
        width: 100%;
    }
    .page {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    @media only screen and (min-width: 1030px) {
        h1,
        h2 {
            width: 100%;
            margin-right: 10rem;
            text-align: right;
        }
        h1 {
            margin-bottom: 4rem;
        }
        .page {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .content {
            display: flex;
            flex-direction: row-reverse;
            margin-right: 10rem;
        }
        .margin {
            width: 60%;
            height: fit-content;
            display: flex;
            justify-content: flex-end;
            margin-right: 4rem;
        }
    }
</style>
