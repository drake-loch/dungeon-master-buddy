<script>
    import { goto } from "$app/navigation";
    import LittleButton from "../LittleButton/LittleButton.svelte";
    import VerticleList from "../VerticleList/VerticleList.svelte";

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
        <VerticleList width="full space">
            {#each options as option}
                <LittleButton nav={option?.nav}>
                    {option.name}
                </LittleButton>
            {/each}
        </VerticleList>
    {/if}
</div>

<style>
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
    @media only screen and (min-width: 1030px) {
        .card {
            width: 15rem;
        }
        .empty {
            display: none;
        }
    }
</style>
