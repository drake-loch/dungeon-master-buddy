<script lang="ts">
    import { goto } from "$app/navigation";

    import { page } from "$app/stores";
    import { newSpell } from "/src/utilities/combatConfig";
    import type { Spell } from "/src/utilities/combatConfig";

    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import CreateSpellMod from "/src/ui/components/ModWindow/ModWindows/CreateSpellMod.svelte";
    import { onMount } from "svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";

    let selectedSpell: Spell | undefined = undefined;
    let spells: Spell[] = [];
    $: if ($selectedWorld) {
        spells = $selectedWorld.spells;
    }

    let toggleMod;
    $: if ($selectedWorld) {
        $breadcrumb.current = "Spells";
        $breadcrumb.currentType = "world";
        $breadcrumb.path = [
            {
                url: `/dm/worlds/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
        ];
    }
</script>

<ModWindow bind:this={toggleMod}>
    <!--  -->
    <CreateSpellMod toggleMod={toggleMod.toggleMod} />
</ModWindow>
{#if $selectedWorld}
    <section>
        <!-- <DashModule
            canEditTitle={false}
            canEditDesc={true}
            title="Description"
            desc="World Description"
        /> -->
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="Spells"
            desc="View and edit continents."
        >
            <div class="select-list" slot="extra">
                <ListSelector
                    bind:selectedItem={selectedSpell}
                    items={spells}
                />
                <div class="button-list">
                    {#if selectedSpell}
                        <LittleButton
                            type="tool pc"
                            func={() =>
                                goto(`${$page.url}/${selectedSpell.name}`)}
                            >View</LittleButton
                        >
                    {/if}
                    <LittleButton
                        type="good pc"
                        func={() => toggleMod.toggleMod()}>New</LittleButton
                    >
                    {#if selectedSpell}
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
        section {
            padding-bottom: 5rem;
            align-items: center;
        }
    }
</style>
