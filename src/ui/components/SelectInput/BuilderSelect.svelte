<script>
    export let label = "";
    export let val = "";
    export let placeholder = "";
    export let width = "100%";
</script>

<div style="width: {width};">
    <label for="this">{label}</label>
    <select {placeholder} name={val} bind:value={val}>
        <option value="" disabled>{placeholder}</option>
        <slot />
    </select>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    label {
        font-size: 1.2rem;
        margin-bottom: 0.25rem;
        color: white;
    }
    select {
        font-size: 1rem;
        background-color: var(--col-dark-lightest);
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

    /* Desktop */
    @media only screen and (min-width: 1030px) {
        select {
            font-size: 1.5rem;
        }
    }
</style>
