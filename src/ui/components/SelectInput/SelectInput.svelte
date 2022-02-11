<script>
    export let label = "";
    export let val = "";
    export let placeholder = "";
</script>

<div>
    <label for="this">{label}</label>
    <select name={val} bind:value={val}>
        <option value="" disabled>{placeholder}</option>
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
        color: white;
    }
    select {
        font-size: 1.5rem;
        border: 2px solid rgb(170, 170, 170);
        border-radius: 5px;
        width: 100%;
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
            margin: 0;
            width: 25%;
        }
        select {
            width: 50%;
            align-items: center;
            font-size: 1.25rem;
        }
    }
</style>
