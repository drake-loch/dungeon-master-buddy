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
    export let selectedWeapon: Weapon | undefined;

    function equipWeapon(): void {
        console.log("equiping sword");
        if (selectedWeapon) {
            char.combat.currentWeapon = selectedWeapon;
            updateNPCInDB($user, $selectedWorld, char);
        }
        toggleMod();
    }
    function unequipWeapon() {
        char.combat.currentWeapon = {
            name: "Unarmed",
            id: 0,
            damage: "1",
            range: "melee",
            type: "unarmed",
            ammo: "",
            skill: "",
        };
        updateNPCInDB($user, $selectedWorld, char);
        toggleMod();
    }
</script>

<div>
    <a href={`/dm/world/${$selectedWorld}/items/${selectedWeapon.name}`}
        >{selectedWeapon.name}</a
    >

    <div class="button-list">
        <LittleButton disabled={false} type="warning"
            >Remove from Character</LittleButton
        >
        <LittleButton func={() => equipWeapon()} disabled={false} type="good"
            >Equip</LittleButton
        >
        <LittleButton func={unequipWeapon} disabled={false} type=""
            >Unequip</LittleButton
        >
        <LittleButton func={toggleMod} type="">Cancel</LittleButton>
    </div>
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
