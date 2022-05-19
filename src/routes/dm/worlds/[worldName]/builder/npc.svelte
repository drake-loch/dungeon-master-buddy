<script>
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import NpcBuilder from "/src/ui/components/Builder/NpcBuilder.svelte";
    import { createNewNPC } from "/src/utilities/charManager";

    let newChar = undefined;
    $: if ($selectedWorld) {
        $breadcrumb.current = "New NPC";
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

    let title;
</script>

<NpcBuilder mode="create" bind:newChar />
