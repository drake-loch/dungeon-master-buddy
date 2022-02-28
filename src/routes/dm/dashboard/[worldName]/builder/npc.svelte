<script>
    import Breadcrumb from "/src/ui/components/Breadcrumb/Breadcrumb.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { onMount } from "svelte";
    import NpcBuilder from "/src/ui/components/Builder/NpcBuilder.svelte";
    import { createNewNPC } from "/src/utilities/charManager";

    onMount(async () => {
        if ($selectedWorld) {
            $breadcrumb.current = "NPC Creation";
            $breadcrumb.currentType = "Create & Edit";
            $breadcrumb.path = [
                {
                    url: `/dm/dashboard/${$selectedWorld.name}/builder`,
                    name: "Builder",
                },
                {
                    url: `/dm/dashboard/${$selectedWorld.name}`,
                    name: $selectedWorld.name,
                },
            ];
            newChar = createNewNPC($selectedWorld.allPCs.length);
        }
    });

    let newChar = null;
</script>

<Breadcrumb />
<NpcBuilder mode="create" bind:newChar />
