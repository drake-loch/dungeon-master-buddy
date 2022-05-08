<script lang="ts">
    import { onMount } from "svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedCampaign } from "/src/utilities/campaignManager";
    import { user } from "/src/stores";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import { UpdateCampaign } from "/src/utilities/campaignManager";
    import { goto } from "$app/navigation";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import { selectedQuest } from "/src/utilities/campaignManager";
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import TextInput from "/src/ui/components/TextInput/TextInput.svelte";
    import { page } from "$app/stores";

    let toggleMod;

    let name = "";

    $: if ($selectedCampaign) {
        $breadcrumb.current = $page.params.questName;
        $breadcrumb.currentType = "Quest";
        $breadcrumb.path = [
            {
                url: `/dm/campaigns/${$selectedCampaign.title}/quests`,
                name: "Quests",
            },
            {
                url: `/dm/campaigns/${$selectedCampaign.title}`,
                name: $selectedCampaign.title,
            },
            {
                url: `/dm/campaigns/`,
                name: "Campaigns",
            },
        ];

        if (!$selectedQuest)
            $selectedQuest = $selectedCampaign.quests.find(
                (quest) => quest.title === $page.params.questName
            );
    }
    onMount(async () => {});
    function saveCampaign() {
        console.log("saving campaign", $selectedCampaign);

        UpdateCampaign($user, $selectedCampaign);
    }

    // $: $quests = $selectedCampaign.quests;

    function updateSelectedQuest() {
        $selectedCampaign.quests[$selectedQuest.id] = $selectedQuest;

        saveCampaign();
    }
</script>

{#if $selectedCampaign}
    <div class="page">
        <DashModule
            save={updateSelectedQuest}
            canEditTitle={false}
            canEditDesc={true}
            title="Description"
            bind:desc={$selectedQuest.desc}
        />
    </div>
{/if}

<style>
    .page {
        /* padding: 1rem; */
        /* background-color: var(--col-dark-dark); */
        box-sizing: border-box;
        color: white;
        display: flex;
        flex-direction: column;
        gap: 2rem;
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
