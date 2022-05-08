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

    // $: $quests = $selectedCampaign.quests;

    function createNewQuest() {
        const newQuest = {
            id: $selectedCampaign.quests.length,
            title: name,
            desc: "",
            prompts: [],
        };
        $selectedCampaign.quests.push(newQuest);
        saveCampaign();
        // $quests = $selectedCampaign.quests;
        $selectedQuest = newQuest;
        toggleMod.toggleMod();
    }

    function deleteQuest() {
        $selectedCampaign.quests.splice($selectedQuest.id, 1);
        //update all quests with new id based on their position in the array
        $selectedCampaign.quests.forEach((quest, index) => {
            quest.id = index;
        });
        console.log($selectedCampaign.quests);

        saveCampaign();
        $selectedCampaign.quests = $selectedCampaign.quests;
        $selectedQuest = undefined;
    }
</script>

<ModWindow bind:this={toggleMod}>
    <div class="">
        <h2>Create Quest</h2>
        <TextInput
            label="Quest Name: "
            placeholder="Enter a name..."
            bind:val={name}
        />
        <LittleButton func={() => createNewQuest()} type="good"
            >Create Quest</LittleButton
        >
    </div>
</ModWindow>

{#if $selectedCampaign}
    <div class="page">
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Quest Manager"
            desc="View and edit quests for your campaign."
        />
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Quest Manager"
        >
            <span slot="extra">
                <ListSelector
                    bind:selectedItem={$selectedQuest}
                    items={$selectedCampaign.quests}
                />
                <div>
                    <LittleButton type="good" func={() => toggleMod.toggleMod()}
                        >New</LittleButton
                    >
                    {#if $selectedQuest}
                        <LittleButton
                            func={() =>
                                goto(`${$page.url}/${$selectedQuest.title}`)}
                            >View</LittleButton
                        >
                        <LittleButton func={deleteQuest} type="warning"
                            >Delete</LittleButton
                        >
                    {/if}
                </div>
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
