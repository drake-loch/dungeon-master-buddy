<script lang="ts">
    export let label = "";
    export let val = "";
    export let placeholder = "";
    export let width: string = "100%";
    export let mode = "view";
</script>

<div style="width: {width};">
    <label for="this">{label}</label>
    {#if mode == "view"}
        <p>
            {#if val.name}
                {val.name}
            {:else}
                {val}
            {/if}
        </p>
    {:else if mode === "create" || mode === "edit"}
        <select {placeholder} name={val} bind:value={val}>
            <option class="options" value="" disabled>{placeholder}</option>
            <slot />
        </select>
    {/if}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    label {
        font-size: 0.8rem;
        margin-bottom: 0.25rem;
        color: white;
    }
    select {
        font-size: 1rem;
        background: rgba(255, 255, 255, 0.05);
        color: white;
        border: none;
        border-right: 1px solid var(--col-dark-light);
        border-bottom: 1px solid var(--col-dark-light);
        border-radius: 5px;
        width: 100%;
        /* color: white; */
    }
    select:focus {
        outline: none;
        border: 2px solid rebeccapurple;
    }
    p {
        width: 100%;
        font-size: 1rem;
    }

    .options {
        background-color: rgba(0, 0, 0, 0.5);
        color: black;
    }

    /* Desktop */
    @media only screen and (min-width: 1030px) {
        label {
            font-size: 1.25rem;
        }
        select {
            font-size: 1.5rem;
        }
        p {
            font-size: 1.5rem;
        }
    }
</style>
