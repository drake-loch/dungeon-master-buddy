<script>
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { onMount } from "svelte";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";

    $: if ($selectedWorld) {
        $breadcrumb.current = "Character Sheet";
        $breadcrumb.currentType = "Create & Edit";
        $breadcrumb.path = [
            {
                url: `/dm/worlds/${$selectedWorld.name}/builder`,
                name: "Builder",
            },
            {
                url: `/dm/worlds/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
        ];
    }
    onMount(async () => {});
</script>

{#if $selectedWorld}
    <div>
        <VerticleList title="What would you like to do?">
            <BigButton
                type=""
                func={null}
                nav="/dm/worlds/{$selectedWorld.name}/character-sheet/create"
                >Create Character</BigButton
            >
            <BigButton
                type=""
                func={null}
                nav="/dm/worlds/{$selectedWorld.name}/builder/npc/edit"
                >Edit Sheet Format</BigButton
            >
        </VerticleList>
    </div>
{/if}

<style>
    div {
        padding: 0 1rem;
    }
    @media only screen and (min-width: 1030px) {
        div {
            width: 100%;
            padding: 0.5rem 1.5rem;
            box-sizing: border-box;
        }
    }
</style>
