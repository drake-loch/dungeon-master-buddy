<script>
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import { onMount } from "svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import { CreateNewCampaign } from "/src/utilities/campaignManager";
    import { user } from "/src/stores";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import TextInput from "/src/ui/components/TextInput/TextInput.svelte";
    import { goto } from "$app/navigation";
    import { selectedCampaign } from "/src/utilities/campaignManager";
    import { campaigns } from "/src/utilities/campaignManager";
    import { DeleteCampaign } from "/src/utilities/campaignManager";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import { page } from "$app/stores";

    $breadcrumb.current = "Campaigns";
    $breadcrumb.currentType = "View";
    $breadcrumb.path = [
        {
            url: `/dm/campaigns`,
            name: "Campaigns",
        },
    ];
    onMount(() => {});
    let toggleMod;

    let name = "";

    async function createNewCampaign() {
        $selectedCampaign = await CreateNewCampaign($user, $campaigns, name);
        $campaigns.push($selectedCampaign);
        toggleMod.toggleMod();
    }
    async function deleteCampaign() {
        if ($selectedCampaign) {
            await DeleteCampaign($selectedCampaign, $user);
            $selectedCampaign = undefined;
        }
    }
</script>

<ModWindow bind:this={toggleMod}>
    <div class="mod">
        <h3>Create Campaign</h3>
        <TextInput
            label="Campaign Name: "
            placeholder="Enter a name..."
            bind:val={name}
        />
        <LittleButton func={createNewCampaign} type="good"
            >Create Campaign</LittleButton
        >
        <LittleButton func={() => toggleMod.toggleMod()} type=""
            >Cancel</LittleButton
        >
    </div>
</ModWindow>
<DashModule
    canEditTitle={false}
    canEditDesc={false}
    title="Campaigns"
    desc="View and edit Campaigns."
>
    <div class="select-list" slot="extra">
        <ListSelector
            bind:selectedItem={$selectedCampaign}
            items={$campaigns}
        />
        <div class="button-list">
            <LittleButton
                type="good pc"
                func={() => {
                    $selectedCampaign = undefined;
                    toggleMod.toggleMod();
                }}>New</LittleButton
            >
            {#if $selectedCampaign}
                <LittleButton
                    type="tool pc"
                    func={() => goto(`${$page.url}/${$selectedCampaign.title}`)}
                    >View</LittleButton
                >
                <LittleButton type="warning pc" func={deleteCampaign}
                    >Delete</LittleButton
                >
            {/if}
        </div>
    </div>
</DashModule>

<style>
    .mod {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    @media only screen and (min-width: 1030px) {
        .select-list {
            display: flex;
            /* background-color: red; */
        }
        .button-list {
            margin-left: 1rem;
            display: flex;
            flex-direction: column;
            width: 50%;
            gap: 0.5rem;
        }
    }
</style>
