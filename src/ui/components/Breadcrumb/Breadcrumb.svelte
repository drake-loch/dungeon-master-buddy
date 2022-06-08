<script>
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
</script>

<div class="holder">
    <div class="title">
        <h2>{$breadcrumb.currentType}</h2>
        <h1>{$breadcrumb.current}</h1>
    </div>
    {#if $breadcrumb.path.length > 0}
        <div class="breadcrumb">
            <p>
                /
                {#each $breadcrumb.path as item}
                    <a href={item.url}>{item.name}</a>
                    /
                {/each}
            </p>
        </div>
    {/if}
</div>

<style>
    .holder {
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        flex-wrap: wrap;
        height: fit-content;
        margin: 1.5rem 0;
        box-sizing: border-box;
    }
    .breadcrumb {
        display: flex;
        align-items: center;
        margin-top: auto;
    }
    p {
        font-size: 1rem;
    }
    a {
        text-decoration: none;
        color: var(--shade-light);
        letter-spacing: 3px;
        font-size: 0.75rem;
        padding: 0 0.25rem;
    }
    .title {
        height: fit-content;
        width: fit-content;
    }
    h1 {
        color: var(--col-brand);
        font-weight: 700;
        line-height: 3.5rem;
        letter-spacing: 3px;
        width: fit-content;
        font-size: 2.25rem;
        margin: 0;
    }
    h2 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: var(--shade-light);
        font-weight: 100;
        font-size: 1rem;
        font-style: italic;
    }

    /* DESKTOP */
    @media only screen and (min-width: 1030px) {
        .holder {
        }
        .breadcrumb {
            margin-left: 0.5rem;
        }
        p {
            font-size: 1.5rem;
        }
        a {
            text-decoration: none;
            color: var(--shade-light);
            letter-spacing: 3px;
            font-size: 1.25rem;
            padding: 0 0.5rem;
        }
        h1 {
            font-size: 3.25rem;
            letter-spacing: 6px;
        }
    }
</style>
