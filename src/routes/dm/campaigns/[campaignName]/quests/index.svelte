<script lang="ts">
    import { onMount } from "svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedCampaign } from "/src/utilities/campaignManager";
    import { page } from "$app/stores";
    import { user } from "/src/stores";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import { UpdateCampaign } from "/src/utilities/campaignManager";
    import { goto } from "$app/navigation";

    $: if ($selectedCampaign) {
        $breadcrumb.current = "Quests";
        $breadcrumb.currentType = "Quests";
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
        <DashModule
            save={saveCampaign}
            canEditTitle={false}
            canEditDesc={false}
            title="Quest Manager"
            desc="View and edit quests for your campaign."
        />
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
