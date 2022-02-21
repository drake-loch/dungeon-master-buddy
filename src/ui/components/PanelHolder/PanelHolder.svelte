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
        padding: 0.5rem 0;
        gap: 1rem;
    }
    @media only screen and (min-width: 1030px) {
        div {
            padding: 1.5rem 0;
        }
    }
</style>
