<script lang="ts">
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import { onMount } from "svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import type { Campaign } from "/src/utilities/campaignManager";

    onMount(async () => {
        if ($selectedWorld) {
            $breadcrumb.current = "Campaign Builder";
            $breadcrumb.currentType = "Create";
            $breadcrumb.path = [
                {
                    url: `/dm/dashboard/${$selectedWorld.name}/campaigns`,
                    name: "Campaigns",
                },
                {
                    url: `/dm/dashboard/${$selectedWorld.name}`,
                    name: $selectedWorld.name,
                },
            ];
        }
    });

    let campaign: Campaign | null = null;
    let selectedQuest: string | null = null;
</script>

<div class="page">
    <h2>Hello there!</h2>
    <p>
        Welcome to the Campaign Builder. This is where you can create campaigns
        for your world.
    </p>
    <ListSelector
        items={$selectedWorld.allNPCs}
        bind:selectedItem={selectedQuest}
    />
</div>

<style>
    .page {
        padding: 1rem;
        background-color: var(--col-dark-dark);
        color: white;
        min-height: 600vh;
    }
</style>
