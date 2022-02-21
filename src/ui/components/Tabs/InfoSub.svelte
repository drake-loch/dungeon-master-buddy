<script>
    import { selectedWorld } from "/src/utilities/worldConfig";

    import BuilderSelect from "../SelectInput/BuilderSelect.svelte";
    import BuilderInput from "../TextInput/BuilderInput.svelte";
    import Title from "./components/Title.svelte";
    import BuilderTextArea from "./components/BuilderTextArea.svelte";

    export let newChar = null;
    export let mode = "view";
    $: provinces = $selectedWorld.continents.find(
        (continent) => continent.name === newChar.location.continent
    )?.provinces;

    let settlements = null;

    $: if (provinces)
        settlements = provinces.find(
            (p) => p.name === newChar.location.province
        )?.settlements;
</script>

<div class="sub">
    <Title title="Location" />
    <BuilderSelect
        bind:val={newChar.location.continent}
        label="Continent:"
        placeholder="Continent"
        width="48%"
        {mode}
    >
        {#each $selectedWorld.continents as continent}
            <option value={continent.name}>{continent.name}</option>
        {/each}
    </BuilderSelect>
    <BuilderSelect
        bind:val={newChar.location.province}
        label="Province:"
        placeholder="Province"
        width="48%"
        {mode}
    >
        {#if provinces}
            {#each provinces as province}
                <option value={province.name}>{province.name}</option>
            {/each}
        {/if}
    </BuilderSelect>
    <BuilderSelect
        bind:val={newChar.location.settlement}
        label="Settlement:"
        placeholder="Settlement"
        width="48%"
        {mode}
    >
        {#if settlements}
            {#each settlements as settlement}
                <option value={settlement.name}>{settlement.name}</option>
            {/each}
        {/if}
    </BuilderSelect>

    <Title title="Additional Details" />

    <BuilderTextArea
        bind:val={newChar.desc}
        placeholder=" 6'5 tall, 5'10 wide, and a little short."
        label="Physical Appearence:"
        centerLabel={false}
        width="100%"
        {mode}
    />
    <BuilderInput
        bind:val={newChar.languages}
        placeholder="Common, Dwarven, Elven, etc."
        label="Languages:"
        centerLabel={false}
        width="48%"
        {mode}
    />
</div>

<style>
    .sub {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    @media only screen and (min-width: 1030px) {
        .sub {
            gap: 1rem;
        }
    }
</style>
