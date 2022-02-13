<script>
    import LittleButton from "../../LittleButton/LittleButton.svelte";
    import TextInput from "../../TextInput/TextInput.svelte";
    import {
        CreateNewWorld,
        selectedWorld,
    } from "../../../../utilities/worldConfig";
    import { user } from "/src/stores";
    import { onDestroy } from "svelte";
    import { AddNewContinent } from "/src/utilities/continentsConfig";

    export let toggleMod;
    export let updateWorlds = () => {};

    let contName = "";

    async function submitHandler(e) {
        e.preventDefault();
        $selectedWorld = AddNewContinent($user, contName);
        toggleMod();
    }
</script>

<h1>Create Continent</h1>

<form on:submit={submitHandler}>
    <div>
        <LittleButton disabled={contName.length < 1} type="good"
            >Create Continent</LittleButton
        >
        <LittleButton func={toggleMod} type="warning">Cancel</LittleButton>
    </div>
    <TextInput
        label="Continent Name: "
        placeholder="Enter a name..."
        bind:val={contName}
    />
</form>

<style>
    div {
        width: 75%;
        display: flex;
        justify-content: space-between;
        margin-left: auto;
        margin-bottom: 1rem;
    }
    h1 {
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        font-size: 2rem;
        border-bottom: 4px solid rgba(0, 0, 0, 0.15);
    }

    @media only screen and (min-width: 1030px) {
        div {
            width: 40%;
            font-size: 4rem;
        }
    }
</style>
