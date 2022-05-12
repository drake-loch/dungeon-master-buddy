<script lang="ts">
    import { onMount } from "svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedCampaign } from "/src/utilities/campaignManager";
    import { user } from "/src/stores";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import { UpdateCampaign } from "/src/utilities/campaignManager";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import { selectedQuest } from "/src/utilities/campaignManager";
    import { page } from "$app/stores";
    import Dropdown from "/src/ui/components/Dropdown/Dropdown.svelte";
    import { worlds } from "/src/utilities/worldConfig";
    import type { World } from "/src/utilities/worldConfig";
    import type { Continent } from "/src/utilities/continentsConfig";
    import type { Province } from "/src/utilities/provinceConfig";
    import type { Settlement } from "/src/utilities/settlementConfig";
    import Timeline from "/src/ui/components/Timeline/Timeline.svelte";

    let showSettings = false;

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
        UpdateCampaign($user, $selectedCampaign);
    }

    function updateSelectedQuest() {
        $selectedCampaign.quests[$selectedQuest.id] = $selectedQuest;
        saveCampaign();
    }
    function addLoreToQuest() {
        const lore = {
            id: $selectedQuest.lore.length,
            title: "Title",
            desc: "description....",
        };
        $selectedQuest.lore.push(lore);
        $selectedCampaign.quests[$selectedQuest.id] = $selectedQuest;
        $selectedQuest.lore = $selectedQuest.lore;
        console.log("added lore", $selectedQuest);

        saveCampaign();
    }

    let editLocationMode = false;
    let world: World;
    let continents = [];
    let continent: Continent;
    let provinces = [];
    let province: Province;
    let settlements = [];
    let settlement: Settlement;

    function updateContinents() {
        world = $worlds.find((w) => {
            if (w.id === $selectedQuest.location.world) {
                return w;
            }
        });
        if (world === undefined) world = [];
        continents = world.continents;
    }
    $: if ($worlds.length > 0 && $selectedQuest.location.world !== -1) {
        updateContinents();
    }

    function updateProvinces() {
        continent = continents.find(
            (c) => c.id === $selectedQuest.location.continent
        );
        provinces = continent.provinces;
    }

    $: if (
        $worlds.length > 0 &&
        $selectedQuest.location.world !== -1 &&
        $selectedQuest.location.continent !== -1
    ) {
        updateProvinces();
    }

    function updateSettlements() {
        province = provinces.find((p) => p.id === $selectedQuest.location.prov);
        settlements = province.settlements;
    }
    $: if (
        $worlds.length > 0 &&
        $selectedQuest.location.world !== -1 &&
        $selectedQuest.location.continent !== -1 &&
        $selectedQuest.location.prov !== -1
    ) {
        updateSettlements();
    }
    // set settlement
    $: if (
        $worlds.length > 0 &&
        $selectedQuest.location.world !== -1 &&
        $selectedQuest.location.continent !== -1 &&
        $selectedQuest.location.prov !== -1 &&
        $selectedQuest.location.settlement !== -1
    ) {
        settlement = province.settlements.find(
            (s) => s.id === $selectedQuest.location.settlement
        );
    }
</script>

{#if $selectedCampaign}
    <div class="page">
        <DashModule canEditTitle={false} canEditDesc={false}>
            <div slot="extra" class="buttons">
                <LittleButton func={addLoreToQuest}>Add Lore</LittleButton>
                <LittleButton
                    type="tool"
                    func={() => (showSettings = !showSettings)}
                >
                    ⚙</LittleButton
                >
            </div>
        </DashModule>
        {#if showSettings}
            <DashModule
                canEditTitle={false}
                canEditDesc={false}
                title="Settings"
                desc="Edit Quest Settings"
            >
                <div slot="extra" class="">
                    <LittleButton func={saveCampaign}>Save</LittleButton>
                </div>
            </DashModule>
        {/if}
        <DashModule
            save={updateSelectedQuest}
            canEditTitle={false}
            canEditDesc={true}
            title="Description"
            bind:desc={$selectedQuest.desc}
        />
        <DashModule
            save={saveCampaign}
            canEditOther={true}
            title="Location"
            desc="Quest Location"
            bind:editMode={editLocationMode}
        >
            <div slot="extra" class="">
                <h5>Assign a location for this quest</h5>
                <div class="dropdowns">
                    <Dropdown
                        label="World:"
                        bind:value={$selectedQuest.location.world}
                        list={$worlds}
                        displayValue={world ? world.name : ""}
                        editMode={editLocationMode}
                        nav={`/dm/worlds/${world?.name}`}
                    />
                    {#if world}
                        <Dropdown
                            label="Continent:"
                            disabled={$selectedQuest.location.world === -1}
                            bind:value={$selectedQuest.location.continent}
                            list={continents}
                            displayValue={continent.name}
                            editMode={editLocationMode}
                            nav={`/dm/worlds/${world.name}/${continent.name}`}
                        />
                        <Dropdown
                            label="Province:"
                            disabled={$selectedQuest.location.continent === -1}
                            bind:value={$selectedQuest.location.prov}
                            list={provinces}
                            displayValue={province.name}
                            editMode={editLocationMode}
                            nav={`/dm/worlds/${world.name}/${continent.name}/${province.name}`}
                        />
                        <Dropdown
                            label="Settlement:"
                            disabled={$selectedQuest.location.prov === -1}
                            bind:value={$selectedQuest.location.settlement}
                            list={settlements}
                            displayValue={$selectedQuest.location.settlement ===
                            -1
                                ? ""
                                : settlement.name}
                            editMode={editLocationMode}
                            nav={`/dm/worlds/${world.name}/${continent.name}/${province.name}/${settlement.name}`}
                        />
                    {/if}
                </div>
                <!-- <LittleButton func={saveCampaign}>Save</LittleButton> -->
            </div>
        </DashModule>
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title={"Event Timeline"}
        >
            <span slot="extra">
                <Timeline isQuest={true} />
            </span>
        </DashModule>

        {#if $selectedQuest?.lore}
            {#each $selectedQuest.lore as lore}
                <DashModule
                    save={updateSelectedQuest}
                    canEditTitle={true}
                    canEditDesc={true}
                    bind:title={lore.title}
                    bind:desc={lore.desc}
                />
            {/each}
        {/if}
    </div>
{/if}

<style>
    .page {
        /* background-color: var(--col-dark-dark); */
        box-sizing: border-box;
        color: white;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .dropdowns {
        display: flex;
        flex-direction: column;
        margin: 1rem 0;
        width: 50%;
        gap: 0.5rem;
    }
    @media only screen and (min-width: 1030px) {
        .page {
            padding-bottom: 4rem;
        }
        .dropdowns {
            margin: 1rem 0;
            width: 25%;
        }
    }
</style>
