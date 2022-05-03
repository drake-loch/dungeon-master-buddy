<script>
    import { showBreadcrumb } from "/src/utilities/breadCrumbStore";

    import { onMount } from "svelte";

    import Nav from "/src/ui/components/Nav/Nav.svelte";
    import { page } from "$app/stores";

    onMount(() => {
        if (
            $page.params.worldName ||
            $page.url.pathname.includes("/campaigns")
        ) {
            $showBreadcrumb = true;
        } else {
            $showBreadcrumb = false;
        }
    });
</script>

<Nav>
    <slot />
</Nav>
