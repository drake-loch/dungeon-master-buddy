<script lang="ts">
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import { onMount } from "svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import type { Campaign } from "/src/utilities/campaignManager";
    import { selectedCampaign } from "/src/utilities/campaignManager";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import Timeline from "/src/ui/components/Timeline/Timeline.svelte";
    import { page } from "$app/stores";
    import { user } from "/src/stores";
    import { getMyCampaigns } from "/src/utilities/firebase";
    import { campaigns } from "/src/utilities/campaignManager";

    $: if ($selectedCampaign) {
        $breadcrumb.current = "Campaign Builder";
        $breadcrumb.currentType = "Create";
        $breadcrumb.path = [
            {
                url: `/dm/campaign/`,
                name: "Campaigns",
            },
        ];
    }
    onMount(async () => {});

    let campaign: Campaign | null = null;
    let selectedQuest: string | null = null;
    const campaignTitle = $page.params.campaignName;
</script>

<div class="page">
    <h1>{campaignTitle}</h1>
    <p>
        Welcome to the Campaign Builder. This is where you can create campaigns
        for your world.
    </p>
    <p>
        Quests are the main way to progress through your campaign. Some
        Campaigns have only one quest, while others have multiple quests.
    </p>
    {#if $selectedCampaign && $selectedCampaign.timeline.length > 1}
        <ListSelector items={null} bind:selectedItem={selectedQuest} />
    {:else}
        <Timeline />
    {/if}
</div>

<style>
    .page {
        padding: 1rem;
        /* background-color: var(--col-dark-dark); */
        color: white;
        min-height: 60vh;
    }

    h1 {
        margin: 0 0 1rem 0;
    }
</style>
