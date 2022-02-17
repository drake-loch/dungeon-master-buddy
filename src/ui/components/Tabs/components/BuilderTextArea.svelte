<script>
    export let label = "";
    export let val = "";
    export let placeholder = "";
    export let width = "100%";
    export let centerLabel = true;
    export let list = "";
    export let options = [];

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
    <textarea
        style="text-align: {labelStyle};"
        type="text"
        {placeholder}
        bind:value={val}
        {list}
    />
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    label {
        font-size: 1rem;
        align-items: center;
        margin-bottom: 0.25rem;
        color: white;
        width: 100%;
    }
    textarea {
        width: 100%;
        font-size: 1rem;
        background-color: var(--col-dark-lightest);
        border: none;
        border-bottom: 1px solid var(--col-dark-light);
        border-radius: 5px;
        /* text-align: center; */
    }
    textarea:focus {
        outline: none;
        border: 2px solid rebeccapurple;
    }

    /* Desktop */
    @media only screen and (min-width: 1030px) {
        label {
            margin-bottom: 0.5rem;
        }
        textarea {
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 1rem;
        }
    }
</style>
