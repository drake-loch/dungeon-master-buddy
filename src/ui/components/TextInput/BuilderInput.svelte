<script>
    export let label = "";
    export let val = "";
    export let placeholder = "";
    export let width = "100%";
    export let centerLabel = true;
    export let list = "";
    export let options = [];
    export let mode = "view";

    let labelStyle = "";
    $: if (centerLabel) {
        labelStyle = "center";
    } else {
        labelStyle = "left";
    }
</script>

<div style="width:{width};" class={""}>
    {#if label !== ""}
        <label style="text-align:{labelStyle};" for="this">{label}</label>
    {/if}
    {#if mode === "edit" || mode === "create"}
        <input
            style="text-align: {labelStyle};"
            type="text"
            {placeholder}
            bind:value={val}
            {list}
        />
        {#if options.length > 0}
            <datalist id={list}>
                {#each options as item}
                    <option value={item}>{item}</option>
                {/each}
            </datalist>
        {/if}
    {:else if mode === "view"}
        <p style="text-align: {labelStyle};">{val}</p>
    {:else}
        <p>cuck</p>
    {/if}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    label {
        font-size: 0.8rem;
        align-items: center;
        margin-bottom: 0.25rem;
        color: white;
        width: 100%;
    }
    input {
        width: 100%;
        font-size: 1rem;
        background-color: var(--col-dark-lightest);
        border: none;
        border-right: 1px solid var(--col-dark-light);
        border-bottom: 1px solid var(--col-dark-light);
        border-radius: 5px;
        /* text-align: center; */
    }
    input:focus {
        outline: none;
        border: 2px solid rebeccapurple;
    }

    p {
        width: 100%;
        font-size: 1rem;
    }

    /* Desktop */
    @media only screen and (min-width: 1030px) {
        label {
            margin: 0;
            font-size: 1.25rem;
        }
        input {
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 1.5rem;
        }
        p {
            font-size: 1.5rem;
        }
    }
</style>
