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
    import { UpdateCampaign } from "/src/utilities/campaignManager";
    import { goto } from "$app/navigation";

    $: if ($selectedCampaign) {
        $breadcrumb.current = $selectedCampaign.title;
        $breadcrumb.currentType = "Campaign Builder";
        $breadcrumb.path = [
            {
                url: `/dm/campaigns/`,
                name: "Campaigns",
            },
        ];
    }
    onMount(async () => {});

    let campaign: Campaign | null = null;
    let selectedQuest: string | null = null;
    const campaignTitle = $page.params.campaignName;

    function saveCampaign() {
        console.log("saving campaign", $selectedCampaign);

        UpdateCampaign($user, $selectedCampaign);
    }
</script>

{#if $selectedCampaign}
    <div class="page">
        <!-- <Timeline /> -->
        <DashModule
            save={saveCampaign}
            canEditTitle={false}
            canEditDesc={true}
            title={"Description"}
            bind:desc={$selectedCampaign.desc}
        />
        <div class="mod-holder">
            <DashModule
                title="Quests"
                desc="View and edit quests for your campaign."
                buttons={[
                    {
                        title: "View Quests",
                        func: () => {
                            goto(`${$page.url}/quests`);
                        },
                    },
                ]}
            />
            <DashModule
                title="Timeline"
                desc="Timeline is a tool that allows you to easily manage your campaign's progression through the creation of prompts."
                buttons={[
                    {
                        title: "Edit Timeline",
                        func: () => {
                            goto(`${$page.url}/timeline`);
                        },
                    },
                ]}
            />
        </div>
    </div>
{/if}

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
