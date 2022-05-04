<script>
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { onMount } from "svelte";
    import NpcBuilder from "/src/ui/components/Builder/NpcBuilder.svelte";
    import { createNewNPC } from "/src/utilities/charManager";

    let newChar = undefined;
    $: if ($selectedWorld) {
        $breadcrumb.current = "NPC Creation";
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
        newChar = createNewNPC($selectedWorld.allPCs.length);
    }
</script>

<NpcBuilder mode="create" bind:newChar />
