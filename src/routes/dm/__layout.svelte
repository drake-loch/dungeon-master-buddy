<script>
    import { showBreadcrumb } from "/src/utilities/breadCrumbStore";

    import { onMount } from "svelte";

    import Nav from "/src/ui/components/Nav/Nav.svelte";
    import { page } from "$app/stores";
    import Breadcrumb from "/src/ui/components/Breadcrumb/Breadcrumb.svelte";

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

<div class="layout">
    <Nav />
    <main class="content">
        {#if $showBreadcrumb}
            <Breadcrumb />
        {/if}

        <slot />
    </main>
</div>

<style>
    .content {
        padding: 0 0.75rem;
        padding-bottom: 1rem;
        /* box-sizing: border-box; */
        overflow-x: hidden;
    }
    @media only screen and (min-width: 1030px) {
        .layout {
            display: flex;
        }
        .content {
            width: 100%;
            max-height: 100vh;
            overflow-y: auto;
            padding: 0 0.5rem;
        }
    }
</style>
