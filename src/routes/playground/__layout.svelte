<div class="layout">
    <nav>
        <h4>Nav Header</h4>
        <button>nav item</button>
    </nav>
    <main>
        <slot />
    </main>
</div>

<style>
    .layout {
        display: flex;
    }
    nav {
        background-color: rgb(24, 24, 24);
        width: 15vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    h4 {
        color: white;
        font-size: 1.5rem;
        background-color: rgba(255, 255, 255, 0.15);
    }

    button {
        width: 100%;
        border: none;
        font-size: 1.25rem;
        padding: 0.5rem 0;
    }

    main {
        width: 85vw;
        max-height: 100vh;
        overflow-y: auto;
    }
</style>
