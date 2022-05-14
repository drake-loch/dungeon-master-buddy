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
    import NpcBuilder from "/src/ui/components/Builder/NpcBuilder.svelte";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    $: if ($selectedWorld) {
        $breadcrumb.current = "NPCs";
        $breadcrumb.currentType = "View";
        $breadcrumb.path = [
            {
                url: `/dm/worlds/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
        ];
    }
    onMount(async () => {});

    let selectedChar = null;
    let toggleMod;
</script>

<ModWindow customWindow={true} bind:this={toggleMod}>
    <span slot="custom">
        <NpcBuilder mode="view" bind:newChar={selectedChar}>
            <span slot="extra-buttons">
                <BuilderButton func={toggleMod.toggleMod}
                    >Close Mod</BuilderButton
                >
            </span>
        </NpcBuilder>
    </span>
</ModWindow>

<!-- {#if $selectedWorld}
    <ListSelector
        items={$selectedWorld.allNPCs}
        bind:selectedItem={selectedChar}
    />

    <VerticleList>
        {#if selectedChar}
            <BigButton type="good" func={toggleMod.toggleMod}
                >Select Character</BigButton
            >
            <BigButton type="warning" func={null}>Delete NPC</BigButton>
        {/if}
    </VerticleList>
{/if} -->

{#if $selectedWorld}
    <div class="content">
        <DashModule
            canEditTitle={false}
            canEditDesc={false}
            title="NPCs"
            desc="View and edit NPCs."
        >
            <div class="select-list" slot="extra">
                <ListSelector
                    bind:selectedItem={selectedChar}
                    items={$selectedWorld.allNPCs}
                />
                <div class="button-list">
                    {#if selectedChar}
                        <LittleButton
                            type="tool pc"
                            func={() =>
                                goto(`${$page.url}/${selectedChar.name}`)}
                            >View</LittleButton
                        >
                    {/if}
                    <LittleButton
                        type="good pc"
                        func={() => toggleMod.toggleMod()}
                    >
                        New</LittleButton
                    >
                    {#if selectedChar}
                        <LittleButton type="warning pc" func={null}
                            >Delete</LittleButton
                        >
                    {/if}
                </div>
            </div>
        </DashModule>
    </div>
{/if}

<style>
    span {
        color: var(--col-brand);
        font-weight: 700;
        font-size: 2.5rem;
    }
    h1 {
        text-align: center;
        width: 100%;
        font-size: 1.5rem;
    }
    h2 {
        margin: 2rem 0 0 0;
        color: white;
        font-weight: 200;
    }
    .content {
        width: 100%;
    }
    .page {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    @media only screen and (min-width: 1030px) {
        h1,
        h2 {
            width: 100%;
            text-align: left;
        }
        h1 {
            margin-bottom: 0rem;
        }
        .page {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .content {
            display: flex;
        }
        .button-list {
            margin-left: 1rem;
            display: flex;
            flex-direction: column;
            width: 50%;
            gap: 0.5rem;
        }
        .select-list {
            display: flex;
        }
    }
</style>
