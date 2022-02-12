<script>
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";

    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import CreateContinent from "/src/ui/components/ModWindow/ModWindows/CreateContinent.svelte";
    import { selectedWorld } from "/src/stores/worldsStore";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";

    let continents = [];
    let selectedContinent = null;

    let toggleMod;
</script>

<ModWindow bind:this={toggleMod}>
    <CreateContinent toggleMod={toggleMod.toggleMod} />
</ModWindow>

<section>
    <h1>Continents</h1>
    <div>
        <ListSelector
            items={$selectedWorld.continents}
            bind:selectedItem={selectedContinent}
        />
        <VerticleList>
            {#if selectedContinent}
                <BigButton
                    type="good"
                    func={null}
                    nav="/dm/dashboard/continents/{selectedContinent.id}"
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

<style>
    section {
        width: 100%;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h1 {
        margin-bottom: 1rem;
        display: block;
    }

    @media only screen and (min-width: 1030px) {
        div {
            flex-direction: row;
        }
    }
</style>
