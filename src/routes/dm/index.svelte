<script lang="ts">
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { clearBreadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import { worlds } from "/src/utilities/worldConfig";
    import { page } from "$app/stores";

    onMount(async () => {
        clearBreadcrumb();
        $selectedWorld = undefined;
    });
</script>

<div class="page">
    <h1>Welcome, <br /><span>Dungeon Master!</span></h1>
    <h2>Please Select a Service</h2>
    <!-- <div class="mod"> -->
    <DashModule
        canEditTitle={false}
        canEditDesc={false}
        title="Worlds"
        desc="View and edit worlds."
    >
        <div class="select-list" slot="extra">
            <ListSelector bind:selectedItem={$selectedWorld} items={$worlds} />
            <div class="button-list">
                <LittleButton type="good pc" func={() => {}}>New</LittleButton>
                {#if $selectedWorld}
                    <LittleButton
                        type="tool pc"
                        func={() =>
                            goto(`${$page.url}/worlds/${$selectedWorld.name}`)}
                        >View</LittleButton
                    >
                    <LittleButton type="warning pc" func={() => {}}
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
    .content {
        width: 100%;
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
        }
    }
</style>
