<script>
    import { selectedWorld } from "/src/utilities/worldConfig";

    import { onMount } from "svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import Breadcrumb from "/src/ui/components/Breadcrumb/Breadcrumb.svelte";
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";

    onMount(async () => {
        if ($selectedWorld) {
            //do stuff
            $breadcrumb.current = "Builder";
            $breadcrumb.currentType = "Character, NPC & Creatures";
            $breadcrumb.path = [
                {
                    url: `/dm/dashboard/${$selectedWorld.name}`,
                    name: $selectedWorld.name,
                },
            ];
        }
    });
</script>

<Breadcrumb />

<div>
    <VerticleList title="What would you like to build?" width="">
        <BigButton
            type=""
            func={null}
            nav="/dm/dashboard/{$selectedWorld.name}/character-sheet"
            >Character</BigButton
        >
        <BigButton
            type=""
            func={null}
            nav="/dm/dashboard/{$selectedWorld.name}/builder/npc"
            >NPCs</BigButton
        >
        <BigButton
            type=""
            func={null}
            nav="/dm/dashboard/{$selectedWorld.name}/builder/creature"
            >Creature</BigButton
        >
    </VerticleList>
</div>

<style>
    div {
        padding: 0 1rem;
    }
    @media only screen and (min-width: 1030px) {
        div {
            width: 100%;
            padding: 0.5rem 1.5rem;
        }
    }
</style>
