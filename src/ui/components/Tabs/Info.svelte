<script>
    import { selectedWorld } from "/src/utilities/worldConfig";

    import BuilderSelect from "../SelectInput/BuilderSelect.svelte";
    import BuilderInput from "../TextInput/BuilderInput.svelte";

    import {
        genders,
        occupations,
        hairColours,
        eyeColours,
    } from "/src/utilities/charManager";

    export let newChar = null;
</script>

<div class="info">
    <div class="paper_head">
        <BuilderInput
            bind:val={newChar.maxHitPoints}
            label="HP"
            placeholder="hp"
            width="20%"
        />
        <BuilderInput
            bind:val={newChar.level}
            label="Level"
            placeholder="level"
            width="20%"
        />
        <BuilderInput
            bind:val={newChar.defence}
            label="AC"
            placeholder="armour class"
            width="20%"
        />
    </div>
    <div class="picture" />
    <BuilderInput bind:val={newChar.name} placeholder="Name" width="100%" />
    <div class="add-info">
        <BuilderSelect
            bind:val={newChar.race}
            label="Race:"
            placeholder="Race"
            width="48%"
        >
            {#each $selectedWorld.races as race}
                <option value={race}>{race.name}</option>
            {/each}
        </BuilderSelect>

        <BuilderSelect
            bind:val={newChar.gender}
            label="Gender:"
            placeholder="Gender"
            width="48%"
        >
            {#each genders as gender}
                <option value={gender}>{gender}</option>
            {/each}
        </BuilderSelect>
        <BuilderInput
            bind:val={newChar.name}
            placeholder="age"
            label="Age:"
            centerLabel={false}
            width="48%"
        />
        <BuilderInput
            bind:val={newChar.occupation}
            label="Occupation:"
            centerLabel={false}
            placeholder="Occupation"
            width="48%"
            options={occupations}
            list="occ"
        />
        <BuilderInput
            bind:val={newChar.hairColour}
            label="Hair Colour:"
            centerLabel={false}
            placeholder="Hair Colour"
            width="48%"
            options={hairColours}
            list="hair"
        />
        <BuilderInput
            bind:val={newChar.eyeColour}
            label="Eye Colour:"
            centerLabel={false}
            placeholder="Eye Colour"
            width="48%"
            options={eyeColours}
            list="eye"
        />
    </div>
</div>

<style>
    .info {
        box-sizing: border-box;
        padding: 0.5rem 1rem;
    }
    .paper_head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 1rem;
    }
    .picture {
        background-color: var(--col-dark-lighter);
        width: 5rem;
        height: 5rem;
        border-radius: 100%;
        margin: 0.5rem auto;
    }
    .add-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        margin: 1rem 0;
    }
    @media only screen and (min-width: 1030px) {
        .picture {
            width: 10rem;
            height: 10rem;
            margin: 2rem auto;
        }
    }
</style>
