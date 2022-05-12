<script>
    // @ts-ignore
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { page } from "$app/stores";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedContinent } from "/src/utilities/continentsConfig";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import { goto } from "$app/navigation";
    import { selectedProvince } from "/src/utilities/provinceConfig";
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import CreateProvince from "/src/ui/components/ModWindow/ModWindows/CreateProvince.svelte";

    $selectedProvince = undefined;

    $: if ($selectedWorld && $selectedContinent) {
        $breadcrumb.current = $selectedContinent.name;
        $breadcrumb.currentType = "continent";
        $breadcrumb.path = [
            {
                url: `/dm/worlds/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
        ];
    }

    let toggleMod;
</script>

<ModWindow bind:this={toggleMod}>
    <CreateProvince toggleMod={toggleMod.toggleMod} />
</ModWindow>

{#if $selectedWorld && $selectedContinent}
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
            title="Provinces"
            desc="View and edit Provinces."
        >
            <div class="select-list" slot="extra">
                <ListSelector
                    bind:selectedItem={$selectedProvince}
                    items={$selectedContinent.provinces}
                />
                <div class="button-list">
                    {#if $selectedProvince}
                        <LittleButton
                            type="tool pc"
                            func={() =>
                                goto(`${$page.url}/${$selectedProvince.name}`)}
                            >View</LittleButton
                        >
                    {/if}
                    <LittleButton
                        type="good pc"
                        func={() => toggleMod.toggleMod()}>New</LittleButton
                    >
                    {#if $selectedProvince}
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
