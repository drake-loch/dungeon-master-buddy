<script>
    // @ts-ignore
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import { selectedContinent } from "/src/utilities/continentsConfig";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { campaigns } from "/src/utilities/campaignManager";

    $: if ($selectedWorld) {
        $breadcrumb.current = "Campaigns";
        $breadcrumb.currentType = "world";
        $breadcrumb.path = [
            {
                url: `/dm/worlds/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
        ];
    }
</script>

{#if $selectedWorld}
    <section>
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Campaigns"
            desc="View and edit Campaigns."
        >
            <div class="select-list" slot="extra">
                <ListSelector
                    bind:selectedItem={$selectedContinent}
                    items={$campaigns}
                />
                <div class="button-list">
                    <LittleButton type="good pc" func={() => {}}
                        >New</LittleButton
                    >
                    {#if $selectedContinent}
                        <LittleButton
                            type="tool pc"
                            func={() =>
                                goto(`${$page.url}/${$selectedContinent.name}`)}
                            >View</LittleButton
                        >
                        <LittleButton type="warning pc" func={() => {}}
                            >Delete</LittleButton
                        >
                    {/if}
                </div>
            </div>
        </DashModule>
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
