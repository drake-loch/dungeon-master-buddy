<script lang="ts">
    import LittleButton from "../../LittleButton/LittleButton.svelte";
    import { user } from "../../../../stores/index";
    import { newWeapon } from "/src/utilities/combatConfig";
    import type { Weapon } from "/src/utilities/charManager";
    import { addItemToWorld } from "/src/utilities/combatConfig";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { updateNPCInDB } from "/src/utilities/charManager";
    import type { Armour, Item } from "src/utilities/combatConfig";
    import type { NPC, PC } from "src/utilities/charManager";

    export let toggleMod;
    export let char: NPC | PC | undefined;
    export let selectedItem: Item | Weapon | Armour | undefined;

    function equipItem(): void {
        console.log("equiping sword");
        if (selectedItem && selectedItem.type === "weapon") {
            char.combat.currentWeapon = selectedItem;
            updateNPCInDB($user, $selectedWorld, char);
        }
        toggleMod();
    }
    function unequipItem() {
        char.combat.currentWeapon = undefined;
        updateNPCInDB($user, $selectedWorld, char);
        toggleMod();
    }
</script>

<div>
    {#if selectedItem}
        <a href={`/dm/world/${$selectedWorld}/items/${selectedItem.name}`}
            >{selectedItem.name}</a
        >

        <div class="button-list">
            <LittleButton disabled={false} type="warning"
                >Remove from Character</LittleButton
            >
            {#if selectedItem.type === "weapon" || selectedItem.type === "armour"}
                {#if char.combat.currentWeapon.id === selectedItem.id}
                    <LittleButton func={unequipItem} disabled={false} type=""
                        >Unequip</LittleButton
                    >
                {:else}
                    <LittleButton
                        func={() => equipItem()}
                        disabled={false}
                        type="good">Equip</LittleButton
                    >
                {/if}
            {/if}
            <LittleButton func={toggleMod} type="">Close</LittleButton>
        </div>
    {/if}
</div>

<style>
    a {
        all: unset;
        font-size: 2rem;
        margin-bottom: 2rem;
        color: white;
        padding-bottom: 2rem;
    }
    div {
        background-color: rgba(0, 0, 0, 0.3);
        padding: 1rem 1rem 4rem 1rem;
        color: white;
        box-sizing: border-box;
    }

    .button-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    @media only screen and (min-width: 1030px) {
        .button-list {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            gap: 0.5rem;
        }
    }
</style>
