<script lang="ts">
    export let title = "";
</script>

<h3>{title}</h3>

<style>
    h3 {
        width: 100%;
        font-size: 1.5rem;
        font-weight: 500;
        letter-spacing: 4px;
        font-style: italic;
        color: hsl(0, 0%, 30%);
        background-image: linear-gradient(
            rgba(0, 0, 0, 0.01),
            rgba(0, 0, 0, 0.02)
        );
        /* border-radius: 10px; */
    }
    @media only screen and (min-width: 1030px) {
        h3 {
            padding: 0.25rem 0;
        }
    }
</style>
