<script>
    import { onMount } from "svelte";

    import { showBreadcrumb } from "/src/utilities/breadCrumbStore";

    onMount(() => {
        $showBreadcrumb = true;
    });
</script>

<slot />;
