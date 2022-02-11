<script>
    import { goto } from "$app/navigation";

    export let func = undefined;
    export let nav = undefined;
    export let type = "";
    export let disabled = false;

    function navHandler() {
        goto(nav);
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
        border: 1px solid rgba(0, 0, 0, 1);
        padding: 0.5rem 0.85rem;
        font-size: 1rem;
        background-color: var(--col-dark-lighter);
        margin-bottom: 1rem;
        border-radius: 0.15rem;
    }
    @media only screen and (min-width: 1030px) {
        button {
            padding: 0.25rem 0.5rem;
            font-size: 1rem;
            margin-bottom: 1rem;
            width: fit-content;
        }
    }
    button:hover {
        background-color: var(--col-dark-lightest);
    }

    .warning {
        background-color: var(--button-warning);
        color: white;
    }
    .good {
        background-color: var(--button-good);
        color: white;
    }
    .good:disabled {
        background-color: var(--button-good-disabled);
        color: var(--col-dark-light);
    }
</style>
