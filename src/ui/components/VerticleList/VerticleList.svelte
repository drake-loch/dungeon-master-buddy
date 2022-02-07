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

    @media only screen and (min-width: 1030px) {
        div {
            width: 25%;
            flex-direction: column;
        }
    }
</style>
