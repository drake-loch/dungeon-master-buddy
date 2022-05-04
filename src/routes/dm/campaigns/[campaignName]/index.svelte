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
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";

    $: if ($selectedCampaign) {
        $breadcrumb.current = $selectedCampaign.title;
        $breadcrumb.currentType = "Campaign Builder";
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
    <!-- <Timeline /> -->
    <DashModule
        canEditTitle={true}
        canEditDesc={true}
        title="Description"
        desc="Welcome to the Campaign Builder. This is where you can create campaigns for your world. Quests are the main way to progress through your campaign. Some Campaigns have only one quest, while others have multiple quests."
    />
    <div class="mod-holder">
        <DashModule
            title="Quests"
            desc="View and edit quests for your campaign."
            buttons={[
                { title: "View Quests", func: () => {} },
                { title: "Create Quest", func: () => {} },
            ]}
        />
        <DashModule
            title="Timeline"
            desc="Timeline is a tool that allows you to easily manage your campaign's progression through the creation of prompts."
            buttons={[{ title: "Edit Timeline", func: () => {} }]}
        />
    </div>
</div>

<style>
    .page {
        /* padding: 1rem; */
        /* background-color: var(--col-dark-dark); */
        box-sizing: border-box;
        color: white;
    }

    .mod-holder {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    p {
        margin: 0 0 1rem 0;
    }
</style>
