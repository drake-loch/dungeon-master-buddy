<script lang="ts">
    export let title = "";
</script>

<h3>{title}</h3>

<style>
    h3 {
        width: 100%;
        font-size: 1.25rem;
        margin: 0.5rem 0;
        font-weight: 500;
        letter-spacing: 4px;
        font-style: italic;
        color: white;
        /* border-radius: 10px; */
    }
    @media only screen and (min-width: 1030px) {
        h3 {
            padding: 0.25rem 0;
            font-size: 1.5rem;
        }
    }
</style>
