<script>
    export let label = "";
    export let val = "";
    export let placeholder = "";
    export let fieldType = "text";
</script>

<div>
    <label for="this">{label}</label>
    {#if fieldType === "text"}
        <input type="text" {placeholder} bind:value={val} />
    {:else if fieldType === "email"}
        <input type="email" {placeholder} bind:value={val} />
    {:else if fieldType === "password"}
        <input type="password" {placeholder} bind:value={val} />
    {/if}
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
    input {
        font-size: 1.5rem;
    }
    input:focus {
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
        input {
            display: flex;
            align-items: center;
            font-size: 1.25rem;
        }
    }
</style>
