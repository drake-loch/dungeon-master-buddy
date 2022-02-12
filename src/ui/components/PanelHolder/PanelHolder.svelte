<div>
    <slot />
</div>

<style>
    div {
        display: inline-flex;
        flex-wrap: wrap;
        width: 100%;
        height: fit-content;
        box-sizing: border-box;
        padding: 0.5rem;
        gap: 1rem;
    }
    @media only screen and (min-width: 1030px) {
        div {
            padding: 1.5rem;
        }
    }
</style>
