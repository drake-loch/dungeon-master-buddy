<script>
    export let label = "";
    export let val = "";
    export let placeholder = "";
</script>

<div>
    <label for="this">{label}</label>
    <select name={val} {placeholder} bind:value={val}>
        <slot />
    </select>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }
    label {
        font-size: 1.2rem;
        margin-bottom: 0.25rem;
    }
    select {
        font-size: 1.5rem;
    }
    select:focus {
        outline: none;
        border: 2px solid rebeccapurple;
    }

    /* Desktop */
    @media only screen and (min-width: 1030px) {
        div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        label {
            font-size: 1rem;
        }
        select {
            display: flex;
            align-items: center;
            font-size: 1.25rem;
        }
    }
</style>
