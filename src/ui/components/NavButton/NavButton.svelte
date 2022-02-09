<script>
    import { goto } from "$app/navigation";

    export let func = undefined;
    export let nav = undefined;
    export let type = "";
    export let collapseMenu = false;
    export let text = "";
    export let isEnd = false;
    let formattedText = "";

    $: if (collapseMenu) {
        formattedText = text[0];
    } else {
        formattedText = text;
    }

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
        {formattedText}
    </button>
{:else if func}
    <button class={type} on:click={func}>
        {formattedText}
    </button>
{:else if nav}
    <button class={type} on:click={navHandler}>
        {formattedText}
    </button>
{:else}
    <button class={type}>
        {formattedText}
    </button>
{/if}

<style>
    .end {
        margin-top: auto;
    }
    button {
        border: none;
        padding: 0.75rem 0;
        font-size: 2rem;
        background-color: var(--col-dark-darker);
        color: white;
        /* margin-bottom: 0.25rem; */
    }
    .warning {
        background-color: var(--button-warning);
        color: white;
    }
    .warning:hover {
        background-color: var(--button-warning-highlight);
    }
    .good {
        background-color: var(--button-good);
        color: white;
    }

    button:hover {
        background-color: var(--col-dark-lighter);
    }
    @media only screen and (min-width: 1030px) {
        button {
            padding: 1rem 0;
            font-size: 1.5rem;
        }
    }
</style>
