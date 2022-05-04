<script>
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { onMount } from "svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";

    $: if ($selectedWorld) {
        $breadcrumb.current = "Builder";
        $breadcrumb.currentType = "Character, NPC & Creatures";
        $breadcrumb.path = [
            {
                url: `/dm/worlds/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
        ];
    }
    onMount(async () => {});
</script>

{#if $selectedWorld}
    <VerticleList title="What would you like to build?" width="">
        <BigButton
            type=""
            func={null}
            nav="/dm/worlds/{$selectedWorld.name}/character-sheet"
            >Character</BigButton
        >
        <BigButton
            type=""
            func={null}
            nav="/dm/worlds/{$selectedWorld.name}/builder/npc">NPCs</BigButton
        >
        <BigButton
            type=""
            func={null}
            nav="/dm/worlds/{$selectedWorld.name}/builder/creature"
            >Creature</BigButton
        >
    </VerticleList>
{/if}
