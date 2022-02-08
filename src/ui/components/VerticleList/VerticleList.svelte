<script>
    export let width = "";
</script>

<div class={width}>
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
        }
        .full {
            width: 100%;
        }
    }
</style>
