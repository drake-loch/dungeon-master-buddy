<script>
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";

    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import CreateContinent from "/src/ui/components/ModWindow/ModWindows/CreateContinent.svelte";
    import { selectedWorld } from "/src/stores/worldsStore";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import Breadcrumb from "/src/ui/components/Breadcrumb/Breadcrumb.svelte";
    import { onMount } from "svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedContinent } from "/src/utilities/continentsConfig";
    import { selectedProvince } from "/src/utilities/provinceConfig";
    import CreateProvince from "/src/ui/components/ModWindow/ModWindows/CreateProvince.svelte";

    let toggleMod;

    onMount(async () => {
        if ($selectedWorld && $selectedContinent) {
            //do stuff
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
        $selectedProvince = null;
    });
</script>

<ModWindow bind:this={toggleMod}>
    <CreateProvince toggleMod={toggleMod.toggleMod} />
</ModWindow>

<section>
    <Breadcrumb />
    <h3>Settlements</h3>
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
                    nav="/dm/dashboard/{$selectedWorld.name}/{$selectedContinent.name}/{$selectedProvince.name}"
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
