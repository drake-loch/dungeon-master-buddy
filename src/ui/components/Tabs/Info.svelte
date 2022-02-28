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
    import InfoSub from "./InfoSub.svelte";
    import Title from "./components/Title.svelte";

    export let newChar = null;
    export let mode = "view";
    export let currentSubPageIndex = 0;
</script>

<div class="info">
    {#if currentSubPageIndex === 0}
        <Title title="Overview" />
        <div class="paper_head">
            <BuilderInput
                bind:val={newChar.maxHitPoints}
                label="HP"
                placeholder="hp"
                width="20%"
                {mode}
            />
            <BuilderInput
                bind:val={newChar.level}
                label="Level"
                placeholder="level"
                width="20%"
                {mode}
            />
            <BuilderInput
                bind:val={newChar.defence}
                label="AC"
                placeholder="armour class"
                width="20%"
                {mode}
            />
        </div>
        <!-- <div class="picture" /> -->
        <div class="add-info">
            <BuilderInput
                label="Character Name:"
                bind:val={newChar.name}
                placeholder="Name"
                width="48%"
                centerLabel={false}
                {mode}
            />
            <BuilderInput
                label="Player Name:"
                bind:val={newChar.playerName}
                placeholder="Name"
                width="48%"
                centerLabel={false}
                {mode}
            />
            <Title title="Details" />

            <BuilderSelect
                bind:val={newChar.race}
                label="Race:"
                placeholder="Race"
                width="48%"
                {mode}
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
                {mode}
            >
                {#each genders as gender}
                    <option value={gender}>{gender}</option>
                {/each}
            </BuilderSelect>
            <BuilderInput
                bind:val={newChar.age}
                placeholder="age"
                label="Age:"
                centerLabel={false}
                width="48%"
                {mode}
            />
            <BuilderInput
                bind:val={newChar.occupation}
                label="Class:"
                centerLabel={false}
                placeholder="Class"
                width="48%"
                options={occupations}
                list="occ"
                {mode}
            />
            <BuilderInput
                bind:val={newChar.hairColour}
                label="Hair Colour:"
                centerLabel={false}
                placeholder="Hair Colour"
                width="48%"
                options={hairColours}
                list="hair"
                {mode}
            />
            <BuilderInput
                bind:val={newChar.eyeColour}
                label="Eye Colour:"
                centerLabel={false}
                placeholder="Eye Colour"
                width="48%"
                options={eyeColours}
                list="eye"
                {mode}
            />
        </div>
    {:else if currentSubPageIndex === 1}
        <InfoSub {mode} bind:newChar />
    {/if}
</div>

<style>
    .info {
        box-sizing: border-box;
        padding: 0.5rem 1rem;
        height: 90%;
    }
    .paper_head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 1rem;
    }
    /* 
    later feature
    .picture {
        background-color: var(--col-dark-lighter);
        width: 5rem;
        height: 5rem;
        border-radius: 100%;
        margin: 0.5rem auto;
    } 
    */
    .add-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        width: 100%;
        margin: 1rem 0;
    }
    @media only screen and (min-width: 1030px) {
        .info {
            padding: 0;
            width: 50%;
            margin: 0 auto;
        }
        /* 
        later feature
        .picture {
            width: 10rem;
            height: 10rem;
            margin: 2rem auto;
        } 
        */
    }
    /* Scroll Bar */
    ::-webkit-scrollbar {
        width: 2px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: red;
        border-radius: 10px;
    }
</style>
