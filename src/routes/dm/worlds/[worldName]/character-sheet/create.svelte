<script>
    import { breadcrumb } from "/src/utilities/breadCrumbStore";

    import { selectedWorld } from "/src/utilities/worldConfig";
    import { onMount } from "svelte";

    import CharBuilder from "/src/ui/components/Builder/CharBuilder.svelte";
    import { createNewChar } from "/src/utilities/charManager";

    let newChar = undefined;
    $: if ($selectedWorld && !newChar) {
        newChar = createNewChar($selectedWorld.allPCs.length);
    }

    $: if ($selectedWorld) {
        $breadcrumb.current = "Character";
        $breadcrumb.currentType = "Create";
        $breadcrumb.path = [
            {
                url: `/dm/worlds/${$selectedWorld.name}/character-sheet`,
                name: "Character Sheet",
            },
            {
                url: `/dm/worlds/${$selectedWorld.name}/builder`,
                name: "Builder",
            },
            {
                url: `/dm/worlds/${$selectedWorld.name}/builder`,
                name: $selectedWorld.name,
            },
        ];
    }
    onMount(async () => {});
</script>

<CharBuilder mode="create" bind:newChar />
