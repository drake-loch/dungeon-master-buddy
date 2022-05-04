<script>
    import { goto } from "$app/navigation";
    import { navExpanded } from "/src/stores/navbarStore";

    export let func = undefined;
    export let nav = undefined;
    export let type = "";
    export let text = "";
    export let isEnd = false;
    export let isMobile = false;
    let formattedText = "";

    $: if ($navExpanded && !isMobile) {
        formattedText = text[0];
    } else {
        formattedText = text;
    }
    $: if ($navExpanded && isMobile) {
        formattedText = text;
    }

    function navHandler() {
        goto(nav);
        if (isMobile) {
            $navExpanded = false;
        }
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
        {#if $navExpanded && !isMobile}
            <p class="sub-text">{text}</p>
        {/if}
    </button>
{:else if func}
    <button class={type} on:click={func}>
        {formattedText}
        {#if $navExpanded && !isMobile}
            <p class="sub-text">{text}</p>
        {/if}
    </button>
{:else if nav}
    <button class={type} on:click={navHandler}>
        {formattedText}
        {#if $navExpanded && !isMobile}
            <p class="sub-text">{text}</p>
        {/if}
    </button>
{:else}
    <button class={type}>
        {formattedText}
        {#if $navExpanded && !isMobile}
            <p class="sub-text">{text}</p>
        {/if}
    </button>
{/if}

<style>
    .end {
        margin-top: auto;
    }
    button {
        border: none;
        padding: 0.75rem 0;
        font-size: 1.25rem;
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
    .sub-text {
        display: hidden;
    }
    @media only screen and (min-width: 1030px) {
        button {
            padding: 1rem 0;
            font-size: 1.5rem;
        }
    }
    .small {
        padding: 0.35rem 0;
        font-size: 1.05rem;
    }
    .sub-text {
        font-size: 0.5rem;
    }
</style>
