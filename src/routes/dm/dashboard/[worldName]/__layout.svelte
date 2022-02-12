<script>
    import NavButton from "/src/ui/components/NavButton/NavButton.svelte";
    import { slide } from "svelte/transition";
    import { LogOff } from "/src/utilities/firebase";
    import { selectedWorld } from "/src/stores/worldsStore";
    import { navExpanded } from "/src/stores/navbarStore";

    // let collapseMenu = false;
    let size = "";
    function toggleCollapse() {
        $navExpanded = !$navExpanded;
    }
    $: size = $navExpanded ? "col" : "";
</script>

{#if $navExpanded}
    <div transition:slide class="nav-menu">
        <NavButton text="Dashboard" nav="/dm/dashboard/{$selectedWorld.name}" />
        <NavButton
            text="Character Bulder"
            nav="/dm/dashboard/{$selectedWorld.name}/builder"
        />
        <NavButton nav="/dm" text="World List" />
        <NavButton text="Logout" func={LogOff} type="warning end" />
    </div>
{/if}

<section>
    <nav class={size + " deskNav"}>
        <NavButton func={toggleCollapse} text="> Collapse <" />
        <NavButton nav="/dm/dashboard/{$selectedWorld.name}" text="Dashboard" />
        <NavButton
            nav="/dm/dashboard/{$selectedWorld.name}/builder"
            text="Character Bulder"
        />
        <NavButton nav="/dm" text="World List" />
        <NavButton func={null} type="warning end" text="Logout" />
    </nav>
    <nav class="navMob">
        <div class="burg-icon" on:click={() => toggleCollapse()}>
            <div class="line" />
            <div class="line" />
            <div class="line" />
        </div>
    </nav>
    <div class="content">
        <slot />
    </div>
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

    @media only screen and (min-width: 1030px) {
        .nav-menu {
            display: none;
        }
        section {
            display: flex;
            overflow-y: hidden;
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
        }
    }
</style>
