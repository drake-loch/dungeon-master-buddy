<script>
    import Breadcrumb from "/src/ui/components/Breadcrumb/Breadcrumb.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";

    import { selectedWorld } from "/src/utilities/worldConfig";

    import { onMount } from "svelte";
    import Builder from "/src/ui/components/Builder/Builder.svelte";
    import { createNewChar } from "/src/utilities/charManager";
    import Info from "/src/ui/components/Tabs/Info.svelte";
    import Skills from "/src/ui/components/Tabs/Skills.svelte";

    onMount(async () => {
        if ($selectedWorld) {
            //do stuff
            $breadcrumb.current = "Character Sheet";
            $breadcrumb.currentType = "Create";
            $breadcrumb.path = [
                {
                    url: `/dm/dashboard/builder`,
                    name: "Builder",
                },
                {
                    url: `/dm/dashboard/${$selectedWorld.name}`,
                    name: $selectedWorld.name,
                },
            ];
        }
    });

    export let tabs = [
        { name: "Info", isSelected: true, amountOfPages: 2 },
        { name: "Skills", isSelected: false, amountOfPages: 1 },
        { name: "Gear", isSelected: false, amountOfPages: 1 },
        { name: "Spells", isSelected: false, amountOfPages: 1 },
    ];
    $: currentSelectedTab = tabs.findIndex((tab) => tab.isSelected);
    $: subPageMaxIndex = tabs[currentSelectedTab].amountOfPages - 1;
    let newChar = createNewChar($selectedWorld.allNPCs.length);
    let editMode = true;
    let currentSubPageIndex = 0;
</script>

<Breadcrumb />

<Builder
    bind:tabs
    {newChar}
    {editMode}
    bind:subPageMaxIndex
    bind:currentSelectedTab
    bind:currentSubPageIndex
>
    <span slot="tab-1">
        <Info {currentSubPageIndex} bind:currentSelectedTab bind:newChar />
    </span>
    <span slot="tab-2">
        <Skills bind:newChar />
    </span>
</Builder>
