<script lang="ts">
    import LittleButton from "../../LittleButton/LittleButton.svelte";
    import { user } from "../../../../stores/index";
    import { newWeapon, newArmour } from "/src/utilities/combatConfig";
    import type { Weapon, Armour, Item } from "/src/utilities/charManager";
    import { addItemToWorld } from "/src/utilities/combatConfig";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { updateNPCInDB } from "/src/utilities/charManager";
    import { onMount } from "svelte";

    export let toggleMod;
    export let char;
    export let itemType;

    //armour needs a value to calculate defence

    let customItem: Weapon | Armour | Item | undefined = undefined;
    let selectedItem: Weapon | Armour | Item | undefined;
    onMount(() => {
        console.log("item type", itemType);

        if (itemType === "weapon") {
            customItem = customItem as Weapon;
            customItem = newWeapon();
        } else if (itemType === "armour") {
            customItem = customItem as Armour;
            customItem = newArmour();
        } else if (itemType === "item") {
            customItem = customItem as Item;
        }
        console.log("custom item", customItem);
    });

    async function submitHandler(e) {
        e.preventDefault();
        if (itemFormType === "custom") {
            customItem.id = $selectedWorld?.items?.length
                ? $selectedWorld.items.length + 1
                : 1;
            if (itemType === "weapon") {
                char?.combat?.weapons.push(customItem.id);
            } else if (itemType === "armour") {
                //
                char?.combat?.armour.push(customItem.id);
            } else if (itemType === "item") {
                //
                char?.inventory?.items.push(customItem.id);
            }
            addItemToWorld($user, customItem, $selectedWorld);
        } else if (itemFormType === "list") {
            const existingItem = $selectedWorld.items.find(
                (item) => item.name === customItem
            );
            console.log(selectedItem);
            console.log(existingItem);

            char.combat.weapons.push(existingItem.id);
        }
        updateNPCInDB($user, $selectedWorld, char);

        console.log(char);
        char = char;
        toggleMod();
    }
    let itemFormType: "list" | "custom" | "" = "";
    function onRadioChange(type: string): void {
        console.log(customItem);

        if (type === "list") {
            itemFormType = "list";
        } else {
            itemFormType = "custom";
        }
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
</script>

<form on:submit={submitHandler}>
    <h2>Add {capitalizeFirstLetter(itemType)}</h2>
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
    {#if itemFormType === "custom"}
        <div class="text-input">
            <label for="text-input-name"
                >{capitalizeFirstLetter(itemType)} Name:</label
            >
            <input
                placeholder="{capitalizeFirstLetter(itemType)} name..."
                bind:value={customItem.name}
                type="text"
            />
        </div>
        <div class="select-input">
            <label for="text-input-name"
                >{capitalizeFirstLetter(itemType)} Stat:</label
            >
            <select bind:value={customItem.stat}>
                <option value={undefined}>Select a Stat...</option>
                {#each char.skills as skill}
                    <option value={skill.name}>{skill.name}</option>
                {/each}
            </select>
        </div>
        {#if itemType === "weapon"}
            <div class="text-input">
                <label for="text-input-name">Damage Type:</label>
                <input
                    placeholder="Slashing / Piercing / Ranged..."
                    bind:value={customItem.damageType}
                    type="text"
                />
            </div>
            <div class="text-input">
                <label for="text-input-name">Damage:</label>
                <input
                    placeholder="2d6"
                    bind:value={customItem.damage}
                    type="text"
                />
            </div>
            <div class="text-input">
                <label for="text-input-name">Range:</label>
                <input
                    placeholder="1m"
                    bind:value={customItem.range}
                    type="text"
                />
            </div>
        {:else if itemType === "armour"}
            <div class="text-input">
                <label for="text-input-name">Armour Type:</label>
                <input
                    placeholder="Light / Medium / Heavy..."
                    bind:value={customItem.damageType}
                    type="text"
                />
            </div>
        {/if}

        <div class="text-input">
            <label for="text-input-name">Value:</label>
            <input
                placeholder="100gp"
                bind:value={customItem.value}
                type="number"
            />
        </div>
        <div class="text-input">
            <label for="text-input-name">Unique?:</label>
            <input bind:value={customItem.unique} type="checkbox" />
        </div>
        <div class="text-input">
            <label for="text-input-name">Notes:</label>
            <input
                placeholder="A jagged blade with a jeweled hilt"
                bind:value={customItem.description}
                type="text"
            />
        </div>
    {:else if itemFormType === "list"}
        <div class="select-input">
            <label for="select-input-name">Weapon Name:</label>
            <select bind:value={selectedItem}>
                <option value={undefined}>Select a weapon...</option>
                {#each $selectedWorld.items
                    .filter((item) => !item.unique)
                    .filter((item) => item.type === itemType) as item}
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
