<script lang="ts">
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import Breadcrumb from "/src/ui/components/Breadcrumb/Breadcrumb.svelte";

    import { onMount } from "svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";

    onMount(async () => {
        if ($selectedWorld) {
            //do stuff
            $breadcrumb.current = "Races";
            $breadcrumb.currentType = "world";
            $breadcrumb.path = [
                {
                    url: `/dm/dashboard/${$selectedWorld.name}`,
                    name: $selectedWorld.name,
                },
            ];
        }
    });

    let selectedRace: undefined | string = undefined;
    let toggleMod;
</script>

<ModWindow bind:this={toggleMod} />

<ListSelector items={$selectedWorld.races} bind:selectedItem={selectedRace} />

<VerticleList>
    {#if selectedRace}
        <BigButton type="good" func={null}>Select Race</BigButton>
        <BigButton type="warning" func={null}>Delete Race</BigButton>
    {/if}
    <BigButton func={() => toggleMod.toggleMod()}>Create Race</BigButton>
</VerticleList>
