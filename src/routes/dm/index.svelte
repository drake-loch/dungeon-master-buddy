<script lang="ts">
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { clearBreadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedWorld } from "/src/utilities/worldConfig";

    onMount(async () => {
        clearBreadcrumb();
        $selectedWorld = undefined;
    });
</script>

<div class="page">
    <h1>Welcome, <br /><span>Dungeon Master!</span></h1>
    <h2>Pleasae Select a Service</h2>
    <div class="content">
        <div class="margin">
            <VerticleList>
                <BigButton func={() => goto(`/dm/worlds`)}>Worlds</BigButton>
                <BigButton func={() => goto(`/dm/campaigns`)}
                    >Campaigns</BigButton
                >
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
