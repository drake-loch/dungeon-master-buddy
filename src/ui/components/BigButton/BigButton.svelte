<script>
    export let func = undefined;
    export let nav = undefined;

    function navHandler() {
        window.location = nav;
    }
</script>

{#if func}
    <button on:click={func}>
        <slot />
    </button>
{:else if nav}
    <button on:click={navHandler}>
        <slot />
    </button>
{:else}
    <button>
        <slot />
    </button>
{/if}

<style>
    button {
        border: none;
        padding: 1.5rem 0.5rem;
        font-size: 2rem;
        box-shadow: 10px 6px 8px rgba(0, 0, 0, 0.75);
        background-color: var(--col-dark-lighter);
        margin-bottom: 1rem;
    }
    @media only screen and (min-width: 768px) {
        button {
            padding: 1rem 0.5rem;
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }
    }
</style>
