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
    import CreateWorld from "/src/ui/components/ModWindow/ModWindows/CreateWorld.svelte";
    import { user } from "/src/stores";
    import { userData } from "/src/utilities/userData";
    import { getUserData } from "/src/utilities/firebase";
    import { clearBreadcrumb } from "/src/utilities/breadCrumbStore";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    let selectedW = null;
    let toggleMod;

    onMount(async () => {
        clearBreadcrumb();
    });
    async function updateWorlds() {
        console.log($userData);
        let data = await getUserData($user);
        $userData = { ...data[0] };
        $worlds = data[0].worlds;
    }
    function deleteWorld() {
        DeleteWorld(selectedWorld, $user);
        $selectedWorld = null;
        selectedW = null;
    }
    function selectWorld() {
        $selectedWorld = selectedW;
    }
</script>

<ModWindow bind:this={toggleMod}>
    <CreateWorld {updateWorlds} toggleMod={toggleMod.toggleMod} />
</ModWindow>

<div class="page">
    <h1>Welcome, <br /><span>Dungeon Master!</span></h1>
    <h2>Please select a world</h2>
    <div class="content">
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Worlds"
            desc="View and edit worlds."
        >
            <div class="select-list" slot="extra">
                <ListSelector
                    bind:selectedItem={$selectedWorld}
                    items={$worlds}
                />
                <div class="button-list">
                    {#if $selectedWorld}
                        <LittleButton
                            type="tool pc"
                            func={() =>
                                goto(`${$page.url}/${$selectedWorld.name}`)}
                            >View</LittleButton
                        >
                    {/if}
                    <LittleButton
                        type="good pc"
                        func={() => toggleMod.toggleMod()}
                    >
                        New</LittleButton
                    >
                    {#if $selectedWorld}
                        <LittleButton type="warning pc" func={deleteWorld}
                            >Delete</LittleButton
                        >
                    {/if}
                </div>
            </div>
        </DashModule>
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
            text-align: left;
        }
        h1 {
            margin-bottom: 0rem;
        }
        .page {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .content {
            display: flex;
        }
        .button-list {
            margin-left: 1rem;
            display: flex;
            flex-direction: column;
            width: 50%;
            gap: 0.5rem;
        }
        .select-list {
            display: flex;
        }
    }
</style>
