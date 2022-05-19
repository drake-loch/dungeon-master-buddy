<script>
    import { selectedWorld } from "/src/utilities/worldConfig";

    import {
        genders,
        occupations,
        hairColours,
        eyeColours,
    } from "/src/utilities/charManager";
    import Title from "../components/Title.svelte";
    import BuilderInput from "../../TextInput/BuilderInput.svelte";
    import BuilderSelect from "../../SelectInput/BuilderSelect.svelte";
    import BuilderTextArea from "../components/BuilderTextArea.svelte";
    import Skills from "../Skills.svelte";

    export let newChar = null;
    export let mode = "view";
    export let currentSubPageIndex = 0;

    $: provinces = $selectedWorld.continents.find(
        (continent) => continent.name === newChar.location.continent
    )?.provinces;

    let settlements = null;

    $: if (provinces)
        settlements = provinces.find(
            (p) => p.name === newChar.location.province
        )?.settlements;
</script>

<div class="overview">
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
                    width="100%"
                    centerLabel={false}
                    {mode}
                />
                <Title title="Details" />

                <BuilderSelect
                    bind:val={newChar.race}
                    label="Race:"
                    placeholder="Select a Race"
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
                    placeholder="Select a Gender"
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
                    label="Occupation:"
                    centerLabel={false}
                    placeholder="Occupation"
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
                <!-- {:else if currentSubPageIndex === 1} -->
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
                            <option value={province.name}
                                >{province.name}</option
                            >
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
                            <option value={settlement.name}
                                >{settlement.name}</option
                            >
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
                <BuilderTextArea
                    bind:val={newChar.extraNotes}
                    placeholder=" 6'5 tall, 5'10 wide, and a little short."
                    label="Extra Notes:"
                    centerLabel={false}
                    width="100%"
                    {mode}
                />
            </div>
        {/if}
    </div>
    <div class="skills">
        <Skills {mode} bind:newChar />
    </div>
</div>

<!-- 
{#if $selectedWorld && npc}
    <div class="overview">
        <div class="info">
            <Title title="Overview" />
            <div class="paper_head">
                <BuilderInput
                    bind:val={npc.maxHitPoints}
                    label="HP"
                    placeholder="hp"
                    width="20%"
                    {mode}
                />
                <BuilderInput
                    bind:val={npc.defence}
                    label="AC"
                    placeholder="armour class"
                    width="20%"
                    {mode}
                />
            </div>
            <div class="add-info">
                <BuilderInput
                    label="Character Name:"
                    bind:val={npc.name}
                    placeholder="Name"
                    width="100%"
                    centerLabel={false}
                    {mode}
                />
                <Title title="Details" />

                <BuilderSelect
                    bind:val={npc.race}
                    label="Race:"
                    placeholder="Select a Race"
                    width="48%"
                    {mode}
                >
                    {#each $selectedWorld.races as race}
                        <option value={race}>{race.name}</option>
                    {/each}
                </BuilderSelect>

                <BuilderSelect
                    bind:val={npc.gender}
                    label="Gender:"
                    placeholder="Select a Gender"
                    width="48%"
                    {mode}
                >
                    {#each genders as gender}
                        <option value={gender}>{gender}</option>
                    {/each}
                </BuilderSelect>
                <BuilderInput
                    bind:val={npc.age}
                    placeholder="age"
                    label="Age:"
                    centerLabel={false}
                    width="48%"
                    {mode}
                />
                <BuilderInput
                    bind:val={npc.occupation}
                    label="Occupation:"
                    centerLabel={false}
                    placeholder="Occupation"
                    width="48%"
                    options={occupations}
                    list="occ"
                    {mode}
                />
                <BuilderInput
                    bind:val={npc.hairColour}
                    label="Hair Colour:"
                    centerLabel={false}
                    placeholder="Hair Colour"
                    width="48%"
                    options={hairColours}
                    list="hair"
                    {mode}
                />
                <BuilderInput
                    bind:val={npc.eyeColour}
                    label="Eye Colour:"
                    centerLabel={false}
                    placeholder="Eye Colour"
                    width="48%"
                    options={eyeColours}
                    list="eye"
                    {mode}
                />
                <Title title="Location" />
                <BuilderSelect
                    bind:val={npc.location.continent}
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
                    bind:val={npc.location.province}
                    label="Province:"
                    placeholder="Province"
                    width="48%"
                    {mode}
                >
                    {#if provinces}
                        {#each provinces as province}
                            <option value={province.name}
                                >{province.name}</option
                            >
                        {/each}
                    {/if}
                </BuilderSelect>
                <BuilderSelect
                    bind:val={npc.location.settlement}
                    label="Settlement:"
                    placeholder="Settlement"
                    width="48%"
                    {mode}
                >
                    {#if settlements}
                        {#each settlements as settlement}
                            <option value={settlement.name}
                                >{settlement.name}</option
                            >
                        {/each}
                    {/if}
                </BuilderSelect>

                <Title title="Additional Details" />

                <BuilderTextArea
                    bind:val={npc.desc}
                    placeholder=" 6'5 tall, 5'10 wide, and a little short."
                    label="Physical Appearence:"
                    centerLabel={false}
                    width="100%"
                    {mode}
                />
                <BuilderInput
                    bind:val={npc.languages}
                    placeholder="Common, Dwarven, Elven, etc."
                    label="Languages:"
                    centerLabel={false}
                    width="48%"
                    {mode}
                />
                <BuilderTextArea
                    bind:val={npc.extraNotes}
                    placeholder=" 6'5 tall, 5'10 wide, and a little short."
                    label="Extra Notes:"
                    centerLabel={false}
                    width="100%"
                    {mode}
                />
            </div>
        </div>
        <div class="skills">
            <Skills {mode} bind:newChar={npc} />
        </div>
    </div>
{/if} -->
<style>
    .info {
        box-sizing: border-box;
        padding: 0.5rem 1rem;
        height: 100%;
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
        gap: 0.5rem;
        width: 100%;
        margin: 1rem 0;
        padding-bottom: 5rem;
    }
    option {
        background-color: rgba(0, 0, 0, 0.5);
        color: black;
    }

    .skills {
        display: none;
    }
    @media only screen and (min-width: 1030px) {
        .info {
            padding: 1rem 1rem;
            width: 50%;
            margin: 0 0;
        }
        .picture {
            width: 10rem;
            height: 10rem;
            margin: 2rem auto;
        }
        .skills {
            display: block;
            margin-right: 5rem;
        }
        .overview {
            display: flex;
            flex-direction: row-reverse;
            justify-content: flex-end;
        }
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
