<script>
    let collapseMenu = false;
    let size = "";
    function toggleCollapse() {
        collapseMenu = !collapseMenu;
        size = collapseMenu ? "col" : "";
    }
</script>

<section>
    <nav class={size}>
        {#if collapseMenu}
            <button on:click={toggleCollapse}>{">"}</button>
            <button>D</button>
            <button>N</button>
        {:else}
            <button on:click={toggleCollapse}>collapse</button>
            <button>Dashboard</button>
            <button>NPC List</button>
        {/if}
    </nav>
    <div>
        <slot />
    </div>
</section>

<style>
    section {
        display: flex;
        overflow-y: hidden;
    }
    button {
        width: 100%;
        border: none;
        font-size: 3rem;
    }

    @media only screen and (min-width: 1030px) {
        nav {
            width: 25%;
            height: 100vh;
            background-color: aliceblue;
        }
        .col {
            width: 5%;
        }
    }
</style>
