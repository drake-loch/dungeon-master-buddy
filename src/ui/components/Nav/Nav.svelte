<script context="module">
    export async function load({ params }) {
        let worldName = params.worldName;
        return {
            stuff: { worldName },
            props: { worldName },
        };
    }
</script>

<script>
    import NavButton from "/src/ui/components/NavButton/NavButton.svelte";
    import { slide } from "svelte/transition";
    import { LogOff } from "/src/utilities/firebase";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { navExpanded } from "/src/stores/navbarStore";
    import { onMount } from "svelte";
    import { user } from "/src/stores";
    import { GetWorldsFromDB } from "/src/utilities/worldConfig";
    import { worlds } from "/src/utilities/worldConfig";
    import Breadcrumb from "/src/ui/components/Breadcrumb/Breadcrumb.svelte";

    export let worldName;
    let size = "";
    function toggleCollapse() {
        navExpanded.set(!$navExpanded);
    }
    $: size = $navExpanded ? "col" : "";
</script>

{#if $navExpanded}
    <div transition:slide class="nav-menu">
        {#if $selectedWorld}
            <NavButton
                isMobile={true}
                text="Dashboard"
                nav="/dm/dashboard/{$selectedWorld.name}"
            />
            <NavButton
                isMobile={true}
                text="Builder"
                nav="/dm/dashboard/{$selectedWorld.name}/builder"
            />
        {/if}
        <NavButton isMobile={true} nav="/dm" text="Worlds" />
        <NavButton
            isMobile={true}
            text="Logout"
            func={LogOff}
            type="warning end"
        />
    </div>
{/if}

<section>
    <nav class={size + " deskNav"}>
        <NavButton func={toggleCollapse} text="> Collapse <" />
        <NavButton nav="/dm" text="Home" />
        {#if $selectedWorld}
            <NavButton
                nav="/dm/dashboard/{$selectedWorld.name}"
                text="Dashboard"
            />
            <NavButton
                nav="/dm/dashboard/{$selectedWorld.name}/builder"
                text="Builder"
            />
            <NavButton nav="/dm" text="Worlds" />
        {/if}
        <NavButton func={LogOff} type="warning end" text="Logout" />
    </nav>
    <nav class="navMob">
        <div class="burg-icon" on:click={() => toggleCollapse()}>
            <div class="line" />
            <div class="line" />
            <div class="line" />
        </div>
    </nav>
    <main class="content">
        <Breadcrumb />

        <slot />
    </main>
</section>

<style>
    .nav-menu {
        position: fixed;
        width: 75vw;
        height: 100vh;
        background-color: rgb(24, 24, 24);
        display: flex;
        gap: 0.25rem;
        flex-direction: column;
        z-index: 1;
    }
    .burg-icon {
        /* background-color: fuchsia; */
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }
    .line {
        width: 55%;
        height: 8px;
        background-color: white;
    }
    .navMob {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: 4rem;
        background-color: var(--col-dark-dark);
    }
    .deskNav {
        display: none;
    }
    .content {
        padding: 0 0.75rem;
        padding-bottom: 1rem;
    }

    @media only screen and (min-width: 1030px) {
        .nav-menu {
            display: none;
        }
        section {
            display: flex;
            overflow-y: auto;
        }
        .deskNav {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            width: 20%;
            height: 100vh;
            background-color: var(--col-dark-dark);
        }
        .navMob {
            display: none;
        }
        .col {
            width: 5%;
        }
        .content {
            width: 100%;
            padding: 0.5rem;
            overflow-y: auto;
            overflow-x: hidden;
        }
    }
    /* Scroll Bar */
    ::-webkit-scrollbar {
        width: 2px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: red;
        border-radius: 10px;
    }
</style>
