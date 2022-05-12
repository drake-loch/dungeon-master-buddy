<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { clearBreadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import { worlds } from "/src/utilities/worldConfig";
    import { page } from "$app/stores";
    import {
        campaigns,
        selectedCampaign,
    } from "/src/utilities/campaignManager";
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import CreateWorld from "/src/ui/components/ModWindow/ModWindows/CreateWorld.svelte";
    import { user } from "/src/stores";
    import { getUserData } from "/src/utilities/firebase";
    import { userData } from "/src/utilities/userData";
    import { DeleteWorld } from "/src/utilities/worldConfig";
    import {
        CreateNewCampaign,
        DeleteCampaign,
    } from "/src/utilities/campaignManager";
    import CreateCampaignMod from "/src/ui/components/ModWindow/ModWindows/CreateCampaignMod.svelte";

    let mod: "campaign" | "world" | "" = "";

    let toggleMod;
    onMount(async () => {
        clearBreadcrumb();
        $selectedWorld = undefined;
        $selectedCampaign = undefined;
    });

    async function updateWorlds() {
        console.log($userData);
        let data = await getUserData($user);
        $userData = { ...data };
        $worlds = data.worlds;
    }
    function deleteWorld() {
        DeleteWorld(selectedWorld, $user);
        $selectedWorld = null;
    }

    function openMod(modToOpen: string) {
        if (modToOpen === "campaign") mod = "campaign";
        else if (modToOpen === "world") mod = "world";
        toggleMod.toggleMod();
    }

    async function deleteCampaign() {
        if ($selectedCampaign) {
            await DeleteCampaign($selectedCampaign, $user);
            $selectedCampaign = undefined;
        }
    }
</script>

<ModWindow bind:this={toggleMod}>
    {#if mod === "campaign"}
        <!-- content here -->
        <CreateCampaignMod toggleMod={toggleMod.toggleMod} />
    {:else if mod === "world"}
        <!-- else content here -->
        <CreateWorld {updateWorlds} toggleMod={toggleMod.toggleMod} />
    {/if}
</ModWindow>

<div class="page">
    <h1>Welcome, <br /><span>Dungeon Master!</span></h1>
    <h2>Please Select a Service</h2>
    <!-- <div class="mod"> -->
    <div class="mods">
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
                                goto(
                                    `${$page.url}/worlds/${$selectedWorld.name}`
                                )}>View</LittleButton
                        >
                    {/if}
                    <LittleButton type="good pc" func={() => openMod("world")}>
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

        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Campaigns"
            desc="View and edit campaigns."
        >
            <div class="select-list" slot="extra">
                <ListSelector
                    bind:selectedItem={$selectedCampaign}
                    items={$campaigns}
                />
                <div class="button-list">
                    {#if $selectedCampaign}
                        <LittleButton
                            type="tool pc"
                            func={() =>
                                goto(
                                    `${$page.url}/campaigns/${$selectedCampaign.title}`
                                )}>View</LittleButton
                        >
                    {/if}
                    <LittleButton
                        type="good pc"
                        func={() => openMod("campaign")}>New</LittleButton
                    >
                    {#if $selectedCampaign}
                        <LittleButton type="warning pc" func={deleteCampaign}
                            >Delete</LittleButton
                        >
                    {/if}
                </div>
            </div>
        </DashModule>
        <!-- </div> -->
        <!-- <div class="content">
        <div class="margin">
            <VerticleList>
                <BigButton func={() => goto(`/dm/worlds`)}>Worlds</BigButton>
                <BigButton func={() => goto(`/dm/campaigns`)}
                    >Campaigns</BigButton
                >
            </VerticleList>
        </div>
    </div> -->
    </div>
</div>

<style>
    .mod {
        width: 75%;
        margin-left: auto;
    }
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
        width: 100%;
        margin: 2rem 0 0 0;
        color: white;
        font-weight: 200;
    }
    .mods {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
    .mod {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .page {
        width: 100%;
        /* display: flex; */
        flex-direction: column;
        align-items: center;
        padding: 2rem 1rem 0 1rem;
        box-sizing: border-box;
    }
    @media only screen and (min-width: 1030px) {
        h1,
        h2 {
            width: 100%;
            margin-right: 10rem;
            text-align: left;
        }
        h1 {
            margin-bottom: 4rem;
        }
        .page {
            width: 100%;
            /* display: flex; */
            /* flex-direction: column; */
            /* align-items: center; */
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
