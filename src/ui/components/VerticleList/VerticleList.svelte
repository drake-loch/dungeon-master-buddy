<script>
    export let width = "";
    export let title = "";
</script>

<div class={width}>
    {#if title !== ""}
        <h3>{title}</h3>
    {/if}
    <slot />
</div>

<style>
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .space {
        padding: 0.5rem 0;
    }
    h3 {
        font-size: 1.75rem;
        color: white;
        border-bottom: 2px solid var(--col-dark-lightest);
        margin-bottom: 1rem;
        padding-bottom: 1rem;
    }

    @media only screen and (min-width: 1030px) {
        div {
            width: 25%;
            padding: 0.5rem 1.5rem;
        }
        .full {
            width: 100%;
        }
    }
</style>
