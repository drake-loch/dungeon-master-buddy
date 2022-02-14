<script>
    import { goto } from "$app/navigation";

    export let title = "";
    export let options = [];
    export let nav = "";
    let showMenu = false;
</script>

<div
    on:mouseenter={() => (showMenu = true)}
    on:mouseleave={() => (showMenu = false)}
    on:click={() => (options.length === 0 && nav !== "" ? goto(nav) : null)}
    class={title === "" ? "empty" : "card"}
>
    <h3 class={title === "" ? "empty" : ""}>{title}</h3>
    {#if showMenu}
        <div class="holder">
            {#each options as option}
                <button on:click={() => goto(option.nav)}>
                    {option.name}
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    button {
        width: 100%;
        font-size: 1rem;
        padding: 0.25rem 0;
        background-color: rgba(0, 0, 0, 0.15);
        border: none;
        color: black;
    }
    button:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    .empty {
        background-color: rgba(0, 0, 0, 0);
        border: none;
    }
    .card {
        background-color: var(--col-dark-lighter);
        padding: 10px;
        width: 11rem;
        height: 15rem;
        border-radius: 10px;
        border-top: 1px solid var(--col-dark-main);
        border-left: 1px solid var(--col-dark-main);
        border-bottom: 2px solid var(--col-dark-lightest);
        border-right: 2px solid var(--col-dark-lightest);
        box-sizing: border-box;
        overflow: hidden;
    }
    .card:hover {
        background-color: var(--col-dark-lightest);
    }
    h3 {
        text-align: center;
        font-size: 1.5rem;
        font-weight: 200;
        padding-bottom: 0.5rem;
        background-color: rgba(0, 0, 0, 0.02);
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .holder {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        height: fit-content;
        padding-top: 0.25rem;
    }
    @media only screen and (min-width: 1030px) {
        .card {
            width: 15rem;
        }
        .empty {
            display: none;
        }
    }
</style>
