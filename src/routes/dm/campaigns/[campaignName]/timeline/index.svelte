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
        $breadcrumb.current = "Timeline";
        $breadcrumb.currentType = "Campaign Builder";
        $breadcrumb.path = [
            {
                url: `/dm/campaigns/${$selectedCampaign.title}`,
                name: $selectedCampaign.title,
            },
            {
                url: `/dm/campaigns/`,
                name: "Campaigns",
            },
        ];
    }
    onMount(async () => {});

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
            canEditDesc={false}
            desc={"The timeline is used to keep track of your campaign's progress."}
        />
        <div class="mod-holder" />
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title={"Event Timeline"}
        >
            <span slot="extra">
                <Timeline />
            </span>
        </DashModule>
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
