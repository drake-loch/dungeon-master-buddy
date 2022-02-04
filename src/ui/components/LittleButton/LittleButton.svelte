<script>
    export let func = undefined;
    export let nav = undefined;
    export let type = "";
    export let disabled = false;

    function navHandler() {
        window.location = nav;
    }
</script>

{#if func}
    <button {disabled} class={type} on:click={func}>
        <slot />
    </button>
{:else if nav}
    <button {disabled} class={type} on:click={navHandler}>
        <slot />
    </button>
{:else}
    <button {disabled} class={type}>
        <slot />
    </button>
{/if}

<style>
    button {
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 0.5rem 0.5rem;
        font-size: 1rem;
        background-color: var(--col-dark-lighter);
        margin-bottom: 1rem;
    }
    @media only screen and (min-width: 768px) {
        button {
            padding: 0.25rem 0.5rem;
            font-size: 0.8rem;
            margin-bottom: 1rem;
        }
    }

    .warning {
        background-color: var(--button-warning);
        color: white;
    }
    .good {
        background-color: var(--button-good);
        color: black;
    }
    .good:disabled {
        background-color: var(--button-good-disabled);
    }
</style>
