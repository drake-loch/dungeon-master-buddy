<script>
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedContinent } from "/src/utilities/continentsConfig";
    import { selectedProvince } from "/src/utilities/provinceConfig";
    import CreateProvince from "/src/ui/components/ModWindow/ModWindows/CreateProvince.svelte";
    import { selectedWorld } from "/src/utilities/worldConfig";

    let toggleMod;

    $: if ($selectedWorld && $selectedContinent) {
        //do stuff
        $breadcrumb.current = "Provinces";
        $breadcrumb.currentType = "View & Create";
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
</script>

<ModWindow bind:this={toggleMod}>
    <CreateProvince toggleMod={toggleMod.toggleMod} />
</ModWindow>

{#if $selectedContinent && selectedProvince}
    <section>
        <h3>Provinces</h3>
        <div>
            <ListSelector
                items={$selectedContinent.provinces}
                bind:selectedItem={$selectedProvince}
            />
            <VerticleList>
                {#if $selectedProvince}
                    <BigButton
                        type="good"
                        func={null}
                        nav="/dm/worlds/{$selectedWorld.name}/{$selectedContinent.name}/{$selectedProvince.name}"
                    >
                        Select Province</BigButton
                    >
                    <BigButton type="warning" func={null}
                        >Delete Province</BigButton
                    >
                {/if}
                <BigButton func={() => toggleMod.toggleMod()}
                    >Create Province</BigButton
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
