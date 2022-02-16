<script>
    import Breadcrumb from "/src/ui/components/Breadcrumb/Breadcrumb.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";

    import { selectedWorld } from "/src/utilities/worldConfig";

    import { onMount } from "svelte";
    import Builder from "/src/ui/components/Builder/Builder.svelte";

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
</script>

<Breadcrumb />

<Builder />
