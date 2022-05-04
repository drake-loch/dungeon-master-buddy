<script lang="ts">
    import { navExpanded } from "/src/stores/navbarStore";

    export let title = "";
</script>

<h3 class="title {$navExpanded ? 'col' : ''}">{title}</h3>

<style>
    .title {
        margin: 0.5rem 0 0.1rem 0;
        padding: 0;
        color: white;
        text-align: center;
        font-size: 1rem;
        font-weight: 300;
        font-style: italic;
        letter-spacing: 2px;
    }
    @media only screen and (min-width: 1030px) {
        .title {
            margin: 0.5rem 0 0.1rem 0;
            font-size: 1rem;
        }
        .col {
            font-size: 0.5rem;
        }
    }
</style>
