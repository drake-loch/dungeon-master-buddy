<script>
    import NavButton from "/src/ui/components/NavButton/NavButton.svelte";
    import { slide } from "svelte/transition";

    let collapseMenu = false;
    let size = "";
    function toggleCollapse() {
        collapseMenu = !collapseMenu;
        size = collapseMenu ? "col" : "";
    }
</script>

{#if collapseMenu}
    <div transition:slide class="nav-menu">
        <NavButton
            nav="/dm/dashboard"
            text="Dashboard"
            collapseMenu={!collapseMenu}
        />
        <NavButton
            nav="/dm/dashboard/builder"
            text="Character Bulder"
            collapseMenu={!collapseMenu}
        />
        <NavButton nav="/dm" text="World List" collapseMenu={!collapseMenu} />
        <NavButton
            func={null}
            type="warning end"
            text="Logout"
            collapseMenu={!collapseMenu}
        />
    </div>
{/if}

<section>
    <nav class={size + " deskNav"}>
        <NavButton func={toggleCollapse} text="> Collapse <" {collapseMenu} />
        <NavButton nav="/dm/dashboard" text="Dashboard" {collapseMenu} />
        <NavButton
            nav="/dm/dashboard/builder"
            text="Character Bulder"
            {collapseMenu}
        />
        <NavButton nav="/dm" text="World List" {collapseMenu} />
        <NavButton
            func={null}
            type="warning end"
            text="Logout"
            {collapseMenu}
        />
    </nav>
    <nav class="navMob">
        <div class="burg-icon" on:click={() => toggleCollapse()}>
            <div class="line" />
            <div class="line" />
            <div class="line" />
        </div>
    </nav>
    <slot />
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
        button {
            width: 100%;
            font-size: 3rem;
        }
    }
</style>
