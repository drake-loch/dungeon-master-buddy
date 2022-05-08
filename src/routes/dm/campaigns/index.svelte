<script>
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import { onMount } from "svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import { CreateNewCampaign } from "/src/utilities/campaignManager";
    import { user } from "/src/stores";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import TextInput from "/src/ui/components/TextInput/TextInput.svelte";
    import { goto } from "$app/navigation";
    import { selectedCampaign } from "/src/utilities/campaignManager";
    import { campaigns } from "/src/utilities/campaignManager";
    import { getMyCampaigns } from "/src/utilities/firebase";
    import { DeleteCampaign } from "/src/utilities/campaignManager";

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
    $: camps = $campaigns;

    // let selectedCampaign = null;
    async function createNewCampaign() {
        $selectedCampaign = await CreateNewCampaign($user, $campaigns, name);
        camps = $campaigns;
        toggleMod.toggleMod();
    }
    async function deleteCampaign() {
        if ($selectedCampaign) {
            await DeleteCampaign($selectedCampaign, $user);
            camps = $campaigns;
        }
    }
</script>

<ModWindow bind:this={toggleMod}>
    <div class="mod">
        <TextInput
            label="World Name: "
            placeholder="Enter a name..."
            bind:val={name}
        />
        <LittleButton func={createNewCampaign} type="good"
            >Create World</LittleButton
        >
    </div>
</ModWindow>

<ListSelector items={camps} bind:selectedItem={$selectedCampaign} />

<VerticleList>
    <BigButton type="good" func={() => toggleMod.toggleMod()}
        >New Campaign</BigButton
    >
    {#if $selectedCampaign}
        <BigButton
            type="tool"
            func={() => goto(`/dm/campaigns/${$selectedCampaign.title}`)}
            >Select Campaign</BigButton
        >
        <BigButton type="warning" func={deleteCampaign}
            >Delete Campaign</BigButton
        >
    {/if}
</VerticleList>

<style>
    .mod {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>
