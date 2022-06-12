<script>
    import { goto } from "$app/navigation";

    export let func = undefined;
    export let nav = undefined;
    export let type = "";
    export let disabled = false;
    export let buttonType = "button";

    function navHandler() {
        goto(nav);
    }
</script>

{#if func}
    <button type={buttonType} {disabled} class={type} on:click={func}>
        <slot />
    </button>
{:else if nav}
    <button type={buttonType} {disabled} class={type} on:click={navHandler}>
        <slot />
    </button>
{:else}
    <button type={buttonType} {disabled} class={type}>
        <slot />
    </button>
{/if}

<style>
    button {
        border: 1px solid rgba(0, 0, 0, 1);
        padding: 0.5rem 2rem;
        font-size: 1rem;
        background-color: var(--col-dark-lighter);
        border-radius: 0.15rem;
    }
    @media only screen and (min-width: 1030px) {
        button {
            padding: 0.25rem 0.5rem;
            font-size: 1rem;
            /* width: fit-content; */
        }
        .pc {
            padding: 0.6rem 1rem;
            width: 12rem;
        }
    }
    button:hover {
        background-color: var(--col-dark-lightest);
        cursor: pointer;
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
    .tool {
        background-color: var(--button-tool);
        color: white;
    }
    .tool:disabled {
        background-color: var(--button-tool-disabled);
        color: var(--col-dark-light);
    }
</style>
