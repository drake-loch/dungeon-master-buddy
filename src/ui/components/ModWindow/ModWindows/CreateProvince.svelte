<script>
    import LittleButton from "../../LittleButton/LittleButton.svelte";
    import SelectInput from "../../SelectInput/SelectInput.svelte";
    import TextInput from "../../TextInput/TextInput.svelte";
    import {
        AddNewContinent,
        AddNewProvince,
        CreateNewWorld,
    } from "../../../../utilities/worldConfig";
    import { user } from "/src/stores";
    import { selectedWorld } from "../../../../stores/worldsStore";
    import { selectedContinent } from "/src/utilities/continentsConfig";

    export let toggleMod;

    let provName = "";

    async function submitHandler(e) {
        e.preventDefault();
        $selectedContinent = AddNewProvince($user, provName);
        toggleMod();
    }
</script>

<h1>Create Province</h1>

<form on:submit={submitHandler}>
    <div>
        <LittleButton disabled={provName.length < 1} type="good"
            >Create Province</LittleButton
        >
        <LittleButton func={toggleMod} type="warning">Cancel</LittleButton>
    </div>
    <TextInput
        label="Province Name: "
        placeholder="Enter a name..."
        bind:val={provName}
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
