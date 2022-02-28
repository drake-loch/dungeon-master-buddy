<script>
    import Breadcrumb from "/src/ui/components/Breadcrumb/Breadcrumb.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";

    import { selectedWorld } from "/src/utilities/worldConfig";
    import { onMount } from "svelte";

    import CharBuilder from "/src/ui/components/Builder/CharBuilder.svelte";
    import { createNewChar } from "/src/utilities/charManager";

    let newChar = null;

    onMount(async () => {
        if ($selectedWorld) {
            //do stuff
            $breadcrumb.current = "Character";
            $breadcrumb.currentType = "Create";
            $breadcrumb.path = [
                {
                    url: `/dm/dashboard/${$selectedWorld.name}/character-sheet`,
                    name: "Character Sheet",
                },
                {
                    url: `/dm/dashboard/${$selectedWorld.name}/builder`,
                    name: "Builder",
                },
                {
                    url: `/dm/dashboard/${$selectedWorld.name}/builder`,
                    name: $selectedWorld.name,
                },
            ];
        }
        newChar = createNewChar($selectedWorld.allPCs.length);
    });
</script>

<CharBuilder mode="create" bind:newChar />
