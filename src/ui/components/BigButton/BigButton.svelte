<script>
    import { goto } from "$app/navigation";

    export let func = undefined;
    export let nav = undefined;
    export let type = "";

    function navHandler() {
        goto(nav);
    }
</script>

{#if func && nav}
    <button
        class={type}
        on:click={() => {
            func();
            navHandler();
        }}
    >
        <slot />
    </button>
{:else if func}
    <button class={type} on:click={func}>
        <slot />
    </button>
{:else if nav}
    <button class={type} on:click={navHandler}>
        <slot />
    </button>
{:else}
    <button class={type}>
        <slot />
    </button>
{/if}

<style>
    button {
        border: none;
        padding: 1rem 0.5rem;
        font-size: 2rem;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.75);
        background-color: var(--col-dark-lighter);
        margin-bottom: 1rem;
        border-radius: 0.25rem;
    }
    .warning {
        background-color: var(--button-warning);
        color: white;
    }
    .good {
        background-color: var(--button-good);
        color: white;
    }

    button:hover {
        background-color: var(--col-dark-lightest);
    }
    @media only screen and (min-width: 1030px) {
        button {
            padding: 1rem 0.5rem;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
    }
</style>
