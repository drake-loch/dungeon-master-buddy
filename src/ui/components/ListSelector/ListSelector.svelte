<script>
    import { onMount } from "svelte";

    export let items = [];
    export let selectedItem = undefined;

    function selectItem(item) {
        selectedItem = item;
    }

    $: {
        items = items;
    }
</script>

<div on:click={() => {}}>
    {#if items}
        {#each items as item}
            <button
                on:click={() => selectItem(item)}
                class={selectedItem === item ? "selected" : ""}
            >
                {item.name ? item.name : ""}
                {item.title ? item.title : ""}
            </button>
        {/each}
    {:else}
        <p>No Items</p>
    {/if}
</div>

<style>
    div {
        width: 100%;
        height: 30vh;
        display: flex;
        background-color: rgba(255, 255, 255, 0.35);
        border: 2px solid rgb(37, 37, 37);
        margin-bottom: 1rem;
        padding: 0.5rem 0;
        box-sizing: border-box;
        flex-direction: column;
        align-items: center;
        color: black;
        overflow-y: auto;
    }
    button {
        width: 100%;
        min-height: 2rem;
        padding: 0 1rem;
        font-size: 1.35rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border: none;
        background: none;
    }
    button:hover {
        cursor: pointer;
    }
    .selected {
        background-color: var(--col-highlight);
    }

    @media only screen and (min-width: 1030px) {
        div {
            width: 40%;
            height: 20vh;
        }
        button {
            font-size: 1.25rem;
        }
    }
</style>
