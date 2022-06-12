<script lang="ts">
    import LittleButton from "../../LittleButton/LittleButton.svelte";
    import { user } from "../../../../stores/index";
    import { newWeapon, newArmour } from "/src/utilities/combatConfig";
    import type { Weapon, Armour, Item } from "/src/utilities/charManager";
    import { addItemToWorld } from "/src/utilities/combatConfig";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { updateNPCInDB } from "/src/utilities/charManager";
    import { onMount } from "svelte";
    import { newSpell } from "/src/utilities/combatConfig";
    import type { Spell } from "/src/utilities/combatConfig";
    import { magicSchools } from "/src/utilities/combatConfig";
    import { addSpellToWorld } from "/src/utilities/combatConfig";

    export let toggleMod;
    export let itemType;

    let spell: Spell = newSpell();
    let selectedSpell: Spell | undefined = undefined;

    const componentTypes = ["verbal", "somatic", "material"];

    onMount(() => {});

    async function submitHandler(e) {
        e.preventDefault();
        // updateNPCInDB($user, $selectedWorld, char);
        // char = char;

        toggleMod();
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function componentToggle(compType: string, toggleValue: boolean) {
        console.log(toggleValue);

        //add a component to the spell
        if (compType === "verbal") {
            if (toggleValue) spell.components.push("verbal");
            else spell.components.splice(spell.components.indexOf("verbal"), 1);
        } else if (compType === "somatic") {
            if (toggleValue) spell.components.push("somatic");
            else
                spell.components.splice(spell.components.indexOf("somatic"), 1);
        } else if (compType === "material") {
            if (toggleValue) {
                spell.components.push("material");
                if (spell.materials === undefined) spell.materials = [];
                spell.materials.push("");
            } else {
                spell.components.splice(
                    spell.components.indexOf("material"),
                    1
                );
                spell.materials = [];
            }
        }
        console.log(spell);
    }

    function addMaterial() {
        spell.materials.push("");
        spell.materials = spell.materials;
    }
    function removeMaterial(index) {
        spell.materials.splice(index, 1);
    }

    function addSpell() {
        spell.id = $selectedWorld.spells.length;
        selectedSpell = spell;
        addSpellToWorld($user, spell);
        $selectedWorld.spells = $selectedWorld.spells;
        toggleMod();
    }
</script>

<form on:submit={submitHandler}>
    <h2>Add Spell</h2>
    <div class="text-input">
        <label for="text-input-name">Spell Name:</label>
        <input
            placeholder="Spell name..."
            bind:value={spell.name}
            type="text"
        />
    </div>
    <div class="text-input">
        <label for="text-input-name">Spell level:</label>
        <input
            step="0"
            placeholder="Spell level..."
            bind:value={spell.level}
            type="number"
        />
    </div>
    <div class="select-input">
        <label for="text-input-name">School:</label>
        <select bind:value={spell.school}>
            <option value={undefined}>Select a School...</option>
            {#each magicSchools as school}
                <option value={school}>{school}</option>
            {/each}
        </select>
    </div>
    <div class="text-input">
        <label for="text-input-name">Components:</label>
        <div>
            <label for="text-input-name">Verbal:</label>
            <input
                on:change={(e) => componentToggle("verbal", e.target.checked)}
                type="checkbox"
                name="typeOfForm"
            />
            <label for="text-input-name">Somatic:</label>
            <input
                on:change={(e) => componentToggle("somatic", e.target.checked)}
                type="checkbox"
                name="typeOfForm"
            />
            <label for="text-input-name">Material:</label>
            <input
                on:change={(e) => componentToggle("material", e.target.checked)}
                type="checkbox"
                name="typeOfForm"
            />
        </div>
    </div>
    {#if spell.components.includes("material")}
        <div class="text-input">
            <label for="text-input-name">Materials:</label>
            {#each spell.materials as material}
                <input
                    placeholder="Material name..."
                    bind:value={material}
                    type="text"
                />
            {/each}
            <button type="button" on:click={addMaterial}>+</button>
        </div>
    {/if}
    <div class="text-input">
        <label for="text-input-name">Description:</label>
        <input
            placeholder="Spell name..."
            bind:value={spell.description}
            type="text"
        />
    </div>
    <div class="text-input">
        <label for="text-input-name">Duration:</label>
        <input
            placeholder="Instantaneous / Concentration / 1 minute..."
            bind:value={spell.duration}
            type="text"
        />
    </div>
    <label for="text-input-name">Ritual:</label>
    <input
        on:change={(e) => (spell.isRitual = e.target.checked)}
        type="checkbox"
        name="typeOfForm"
        class="checkbox"
    />
    <div class="text-input">
        <label for="text-input-name">Range:</label>
        <input
            placeholder="120ft Cone..."
            bind:value={spell.range}
            type="text"
        />
    </div>
    <div class="button-list">
        <LittleButton func={addSpell} disabled={false} type="good"
            >Add Spell</LittleButton
        >
        <LittleButton func={toggleMod} type="">Cancel</LittleButton>
    </div>
</form>

<style>
    h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
        color: white;
    }
    form {
        background-color: rgba(0, 0, 0, 0.3);
        padding: 1rem 1rem 4rem 1rem;
        color: white;
        /* width: 90%; */
    }
    .checkbox {
        margin-bottom: 1rem;
    }
    .text-input {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 0.75rem;
        gap: 6px;
        color: white;
    }
    .select-input {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 1rem;
    }
    .text-input input {
        background-color: rgb(91, 91, 91);

        font-size: 1rem;
        border: 1px solid rgb(112, 112, 112);
        outline: none;
    }
    button:focus {
        outline: none;
        border: none;
    }

    select {
        background: none;
        background-color: rgba(255, 255, 255, 0.15);
        font-size: 1rem;
    }
    select {
        background: none;
        background-color: rgb(91, 91, 91);
        font-size: 1rem;
    }
    select:focus {
        outline: none;
        border: 1px solid rebeccapurple;
    }

    @media only screen and (min-width: 1030px) {
        .button-list {
            width: 100%;
            /* background-color: aqua; */
            display: flex;
            gap: 0.5rem;
        }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
