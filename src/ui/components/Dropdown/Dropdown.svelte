<script lang="ts">
    export let label: string | undefined = undefined;
    export let value;
    export let displayValue: string | undefined = undefined;
    export let nav: string | undefined = undefined;
    export let change = () => {};
    export let placeholder = "Select Option";
    export let list: any[] = [];
    export let disabled = false;
    export let editMode = false;
</script>

{#if label !== undefined}
    <label for="world">{label}</label>
{/if}
{#if editMode}
    <select {disabled} on:change={change} bind:value name="world" id="">
        <option value={-1}>{placeholder}</option>
        {#each list as item}
            <option value={item.id}>{item.name}</option>
        {/each}
    </select>
{:else if displayValue === undefined}
    <p>{value}</p>
{:else if nav === undefined}
    <p>{displayValue}</p>
{:else}
    <a href={nav}>{displayValue}</a>
{/if}

<style>
    select {
        background: none;
        background-color: rgba(255, 255, 255, 0.15);
        font-size: 1rem;
    }
    select:focus {
        outline: none;
        border: 1px solid rebeccapurple;
    }

    a {
        /* text-decoration: none; */
        color: var(--col-brand);
    }

    label {
        font-size: 1rem;
        letter-spacing: 3px;
        font-weight: 100;
        font-style: italic;
        /* background-color: rgba(255, 255, 255, 0.025); */
    }
</style>
