<script>
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";

    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import CreateContinent from "/src/ui/components/ModWindow/ModWindows/CreateContinent.svelte";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import { onMount } from "svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedContinent } from "/src/utilities/continentsConfig";
    import { selectedWorld } from "/src/utilities/worldConfig";

    let toggleMod;
    $: if ($selectedWorld) {
        $breadcrumb.current = "Continents";
        $breadcrumb.currentType = "View & Create";
        $breadcrumb.path = [
            {
                url: `/dm/worlds/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
        ];
    }
    onMount(async () => {
        $selectedContinent = null;
    });
</script>

<ModWindow bind:this={toggleMod}>
    <CreateContinent toggleMod={toggleMod.toggleMod} />
</ModWindow>

{#if $selectedWorld}
    <section>
        <h3>Continents</h3>
        <div>
            <ListSelector
                items={$selectedWorld.continents}
                bind:selectedItem={$selectedContinent}
            />
            <VerticleList>
                {#if $selectedContinent}
                    <BigButton
                        type="good"
                        func={null}
                        nav="/dm/worlds/{$selectedWorld.name}/{$selectedContinent.name}"
                    >
                        Select Continent</BigButton
                    >
                    <BigButton type="warning" func={null}
                        >Delete Continents</BigButton
                    >
                {/if}
                <BigButton func={() => toggleMod.toggleMod()}
                    >Create Continent</BigButton
                >
            </VerticleList>
        </div>
    </section>
{/if}

<style>
    section {
        width: 100%;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h3 {
        margin-bottom: 1rem;
        display: block;
        font-weight: 400;
        font-size: 1.5rem;
    }

    @media only screen and (min-width: 1030px) {
        div {
            flex-direction: row;
        }
    }
</style>
