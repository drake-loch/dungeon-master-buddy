<script>
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedContinent } from "/src/utilities/continentsConfig";
    import { selectedProvince } from "/src/utilities/provinceConfig";
    import CreateSettlement from "/src/ui/components/ModWindow/ModWindows/CreateSettlement.svelte";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { selectedSettlement } from "/src/utilities/settlementConfig";

    let toggleMod;

    $: if ($selectedWorld && $selectedContinent && $selectedProvince) {
        $breadcrumb.current = "Settlements";
        $breadcrumb.currentType = "View & Create";
        $breadcrumb.path = [
            {
                url: `/dm/dashboard/${$selectedWorld.name}/${$selectedContinent.name}/${$selectedProvince.name}`,
                name: $selectedProvince.name,
            },
            {
                url: `/dm/dashboard/${$selectedWorld.name}/${$selectedContinent.name}`,
                name: $selectedContinent.name,
            },
            {
                url: `/dm/dashboard/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
        ];
    }
</script>

<ModWindow bind:this={toggleMod}>
    <CreateSettlement toggleMod={toggleMod.toggleMod} />
</ModWindow>

{#if $selectedProvince && $selectedContinent && $selectedWorld}
    <section>
        <h3>Settlements</h3>
        <div>
            <ListSelector
                items={$selectedProvince.settlements}
                bind:selectedItem={$selectedSettlement}
            />
            <VerticleList>
                {#if $selectedSettlement}
                    <BigButton
                        type="good"
                        func={null}
                        nav="/dm/dashboard/{$selectedWorld.name}/{$selectedContinent.name}/{$selectedProvince.name}/{$selectedSettlement.name}"
                    >
                        Select Settlements</BigButton
                    >
                    <BigButton type="warning" func={null}
                        >Delete Settlements</BigButton
                    >
                {/if}
                <BigButton func={() => toggleMod.toggleMod()}
                    >Create Settlements</BigButton
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
