<script>
    // @ts-ignore
    import { selectedWorld } from "/src/utilities/worldConfig";
    import CoolPanel from "/src/ui/components/CoolPanel/CoolPanel.svelte";
    import PanelHolder from "/src/ui/components/PanelHolder/PanelHolder.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedContinent } from "/src/utilities/continentsConfig";
    import { selectedProvince } from "/src/utilities/provinceConfig";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { selectedSettlement } from "/src/utilities/settlementConfig";
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import CreateSettlement from "/src/ui/components/ModWindow/ModWindows/CreateSettlement.svelte";

    $selectedSettlement = undefined;

    $: if ($selectedWorld && $selectedContinent && $selectedProvince) {
        $breadcrumb.current = $selectedProvince.name;
        $breadcrumb.currentType = "Province";
        $breadcrumb.path = [
            {
                url: `/dm/worlds/${$selectedWorld.name}/${$selectedContinent.name}`,
                name: $selectedContinent.name,
            },
            {
                url: `/dm/worlds/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
        ];
    }
    let toggleMod;
</script>

<ModWindow bind:this={toggleMod}>
    <CreateSettlement toggleMod={toggleMod.toggleMod} />
</ModWindow>

{#if $selectedWorld && $selectedContinent && $selectedProvince}
    <section>
        <DashModule
            canEditTitle={true}
            canEditDesc={true}
            title="Description"
            desc="Province Description"
        />
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Settlements"
            desc="View and edit Settlements."
        >
            <div class="select-list" slot="extra">
                <ListSelector
                    bind:selectedItem={$selectedSettlement}
                    items={$selectedProvince.settlements}
                />
                <div class="button-list">
                    {#if $selectedSettlement}
                        <LittleButton
                            type="tool pc"
                            func={() =>
                                goto(
                                    `${$page.url}/${$selectedSettlement.name}`
                                )}>View</LittleButton
                        >
                    {/if}
                    <LittleButton
                        type="good pc"
                        func={() => toggleMod.toggleMod()}>New</LittleButton
                    >
                    {#if $selectedSettlement}
                        <LittleButton type="warning pc" func={() => {}}
                            >Delete</LittleButton
                        >
                    {/if}
                </div>
            </div>
        </DashModule>

        <DashModule title="NPC List" desc="View NPCs in this province." />
    </section>
{/if}

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    @media only screen and (min-width: 1030px) {
        :global(body) {
            overflow: hidden;
        }
        section {
            padding-bottom: 5rem;
        }
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
