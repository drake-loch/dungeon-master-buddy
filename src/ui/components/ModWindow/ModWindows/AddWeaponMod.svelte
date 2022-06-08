<script lang="ts">
    import LittleButton from "../../LittleButton/LittleButton.svelte";
    import { user } from "../../../../stores/index";
    import { newWeapon } from "/src/utilities/combatConfig";
    import type { Weapon } from "/src/utilities/charManager";
    import { addItemToWorld } from "/src/utilities/combatConfig";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { updateNPCInDB } from "/src/utilities/charManager";

    export let toggleMod;
    export let char;
    const customWeapon: Weapon = newWeapon();
    let selectedWeapon: Weapon | undefined;

    async function submitHandler(e) {
        e.preventDefault();
        if (weaponFormType === "custom") {
            console.log(customWeapon);
            customWeapon.id = $selectedWorld?.items?.length
                ? $selectedWorld.items.length + 1
                : 1;
            char?.inventory?.items.push(customWeapon);
            addItemToWorld($user, customWeapon, $selectedWorld);
        } else if (weaponFormType === "list") {
            char.inventory.items.push(selectedWeapon);
        }
        updateNPCInDB($user, $selectedWorld, char);

        console.log(char);
        toggleMod();
    }
    let weaponFormType = "";
    function onRadioChange(type: string): void {
        if (type === "list") {
            weaponFormType = "list";
        } else {
            weaponFormType = "custom";
        }
    }
</script>

<form on:submit={submitHandler}>
    <h2>Add Weapon</h2>
    <div class="radios">
        <label for="list">List</label>
        <input
            on:change={() => onRadioChange("list")}
            type="radio"
            name="list"
            value="list"
        />
        <label for="custom">Custom</label>
        <input
            on:change={() => onRadioChange("custom")}
            type="radio"
            name="custom"
            value="custom"
        />
    </div>
    {#if weaponFormType === "custom"}
        <div class="text-input">
            <label for="text-input-name">Weapon Name:</label>
            <input
                placeholder="Weapon name..."
                bind:value={customWeapon.name}
                type="text"
            />
        </div>
        <div class="select-input">
            <label for="text-input-name">Weapon Stat:</label>
            <select bind:value={customWeapon.stat}>
                <option value={undefined}>Select a Stat...</option>
                {#each char.skills as skill}
                    <option value={skill.name}>{skill.name}</option>
                {/each}
            </select>
        </div>
        <div class="text-input">
            <label for="text-input-name">Damage Type:</label>
            <input
                placeholder="Slashing / Piercing / Ranged..."
                bind:value={customWeapon.damageType}
                type="text"
            />
        </div>
        <div class="text-input">
            <label for="text-input-name">Damage:</label>
            <input
                placeholder="2d6"
                bind:value={customWeapon.damage}
                type="text"
            />
        </div>
        <div class="text-input">
            <label for="text-input-name">Range:</label>
            <input
                placeholder="1m"
                bind:value={customWeapon.range}
                type="text"
            />
        </div>
        <div class="text-input">
            <label for="text-input-name">Notes:</label>
            <input
                placeholder="A jagged blade with a jeweled hilt"
                bind:value={customWeapon.description}
                type="text"
            />
        </div>
    {:else if weaponFormType === "list"}
        <div class="select-input">
            <label for="select-input-name">Weapon Name:</label>
            <select bind:value={selectedWeapon}>
                <option value={undefined}>Select a weapon...</option>
                {#each $selectedWorld.items as item}
                    <option value={item.name}>{item.name}</option>
                {/each}
            </select>
        </div>
    {/if}

    <div class="button-list">
        <LittleButton disabled={false} type="good">Add Weapon</LittleButton>
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
    }
    .radios {
        margin-bottom: 2rem;
    }
    .text-input {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
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
</style>
