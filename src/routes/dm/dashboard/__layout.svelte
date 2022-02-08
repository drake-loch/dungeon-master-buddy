<script>
    let collapseMenu = false;
    let size = "";
    function toggleCollapse() {
        collapseMenu = !collapseMenu;
        size = collapseMenu ? "col" : "";
    }
</script>

{#if collapseMenu}
    <div class="nav-menu">
        <button>Dashboard</button>
        <button>NPC List</button>
    </div>
{/if}

<section>
    <nav class={size + " deskNav"}>
        {#if collapseMenu}
            <button on:click={toggleCollapse}>{">"}</button>
            <button>D</button>
            <button>N</button>
        {:else}
            <button on:click={toggleCollapse}>{"< "}collapse</button>
            <button>Dashboard</button>
            <button>NPC List</button>
        {/if}
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
    button {
        border: none;
        font-size: 1.5rem;
        background-color: var(--col-dark-main);
        color: white;
        margin-bottom: 0.5rem;
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
            display: block;
            width: 25%;
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
