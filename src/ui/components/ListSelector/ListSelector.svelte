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

<div>
    {#if items}
        {#each items as item}
            <p
                on:click={() => selectItem(item)}
                class={selectedItem === item ? "selected" : ""}
            >
                {item.name}
            </p>
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
        background-color: var(--col-input);
        border: 2px solid black;
        margin-bottom: 1rem;
        padding: 0.5rem 0;
        box-sizing: border-box;
        flex-direction: column;
        align-items: center;
    }
    p {
        width: 100%;
        height: 2rem;
        padding: 0 1rem;
        font-size: 1.5rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }
    p:hover {
        cursor: pointer;
    }
    .selected {
        background-color: var(--col-highlight);
    }

    @media only screen and (min-width: 1030px) {
        div {
            width: 30%;
        }
    }
</style>
