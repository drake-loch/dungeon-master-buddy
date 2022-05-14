<script context="module">
    export async function load({ params }) {
        let worldName = params.worldName;
        return {
            stuff: { worldName },
            props: { worldName },
        };
    }
</script>

<script lang="ts">
    import NavButton from "/src/ui/components/NavButton/NavButton.svelte";
    import { slide } from "svelte/transition";
    import { LogOff } from "/src/utilities/firebase";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { navExpanded } from "/src/stores/navbarStore";
    import { onMount } from "svelte";
    import NavTitle from "./NavTitle.svelte";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";

    export let worldName;
    let size = "";
    function toggleCollapse(type: string) {
        navExpanded.set(!$navExpanded);
        if (type === "mobile") {
            if ($navExpanded) {
                //nav is open
            }
        } else if (type === "desktop") {
            if ($navExpanded) {
                //nav is collapsed
            }
        }
    }
    $: size = $navExpanded ? "" : "col";

    onMount(() => {
        $selectedWorld = null;
    });
</script>

{#if $navExpanded}
    <div transition:slide class="nav-menu">
        <NavTitle title="Navigation" />
        <NavButton isMobile={true} nav="/dm" text="Home" />
        <NavButton isMobile={true} nav="/dm/worlds" text="Worlds" />
        <NavButton isMobile={true} nav="/dm/campaigns" text="Campaigns" />
        {#if $selectedWorld}
            <NavTitle title="Worlds" />

            <NavButton
                isMobile={true}
                text="Dashboard"
                nav="/dm/worlds/{$selectedWorld.name}"
            />
            <NavButton
                isMobile={true}
                text="Builder"
                nav="/dm/worlds/{$selectedWorld.name}/builder"
            />
        {/if}
        <NavButton
            isMobile={true}
            text="Logout"
            func={LogOff}
            type="warning end"
        />
    </div>
{/if}

<nav class={size + " deskNav"}>
    <NavButton
        type={"small"}
        func={() => toggleCollapse("desktop")}
        text="> Collapse <"
    />
    <NavTitle title="Navigation" />

    <NavButton nav="/dm" text="Home" />
    <NavButton
        func={() => ($selectedWorld = null)}
        nav="/dm/worlds"
        text="Worlds"
    />
    <NavButton
        func={() => ($selectedWorld = null)}
        nav="/dm/campaigns"
        text="Campaigns"
    />
    {#if $selectedWorld}
        <NavTitle title="Worlds" />

        <NavButton nav="/dm/worlds/{$selectedWorld.name}" text="Dashboard" />
        <NavButton
            nav="/dm/worlds/{$selectedWorld.name}/builder"
            text="Builder"
        />
    {/if}
    <NavButton func={LogOff} type="warning end" text="Logout" />
</nav>
<nav class="navMob">
    <div class="burg-icon" on:click={() => toggleCollapse("mobile")}>
        <div class="line" />
        <div class="line" />
        <div class="line" />
    </div>
</nav>
<slot />

<style>
    .nav-menu {
        position: fixed;
        width: 75vw;
        min-height: 100vh;
        background-color: rgb(24, 24, 24);
        display: flex;
        gap: 0.25rem;
        flex-direction: column;
        z-index: 1;
        border-right: 2px solid black;
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
        background-color: var(--col-brand);
    }
    .navMob {
        display: flex;
        justify-content: flex-end;
        width: 100vw;
        height: 4rem;
        background-color: var(--col-dark-dark);
    }
    .deskNav {
        display: none;
    }

    @media only screen and (min-width: 1030px) {
        .nav-menu {
            display: none;
        }
        .deskNav {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            width: 15%;
            height: 100vh;
            background-color: var(--col-dark-dark);
            border-right: 2px solid black;
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
