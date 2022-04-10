<script>
    import ListSelector from "/src/ui/components/ListSelector/ListSelector.svelte";
    import { onMount } from "svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import CharBuilder from "/src/ui/components/Builder/CharBuilder.svelte";
    import BuilderButton from "/src/ui/components/Tabs/components/BuilderButton.svelte";

    onMount(async () => {
        if ($selectedWorld) {
            $breadcrumb.current = "Characters";
            $breadcrumb.currentType = "View";
            $breadcrumb.path = [
                {
                    url: `/dm/dashboard/${$selectedWorld.name}`,
                    name: $selectedWorld.name,
                },
            ];
        }
    });

    let selectedChar = null;
    let toggleMod;
</script>

<ModWindow customWindow={true} bind:this={toggleMod}>
    <span slot="custom">
        <CharBuilder mode="view" bind:newChar={selectedChar}>
            <span slot="extra-buttons">
                <BuilderButton func={toggleMod.toggleMod}
                    >Close Mod</BuilderButton
                >
            </span>
        </CharBuilder>
    </span>
</ModWindow>

<ListSelector items={$selectedWorld.allPCs} bind:selectedItem={selectedChar} />

<VerticleList>
    {#if selectedChar}
        <BigButton type="good" func={toggleMod.toggleMod}
            >Select Character</BigButton
        >
        <BigButton type="warning" func={null}>Delete Character</BigButton>
    {/if}
</VerticleList>
