<script>
</script>

<div>
    <slot />
</div>

<style>
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    @media only screen and (min-width: 768px) {
        div {
            width: 50%;
            flex-direction: column;
        }
    }
</style>
