<script>
    import LittleButton from "../LittleButton/LittleButton.svelte";
    import SelectInput from "../SelectInput/SelectInput.svelte";
    import TextInput from "../TextInput/TextInput.svelte";
    import { CreateNewWorld } from "../../../utilities/worldConfig";
    import { AddDefaultSkills } from "/src/utilities/skillsConfig";

    export let toggleMod;

    let worldName = "";
    let skillType;

    function submitHandler(e) {
        e.preventDefault();
        CreateNewWorld(worldName, skillType);
        toggleMod();
    }
</script>

<h1>Create World</h1>

<form on:submit={submitHandler}>
    <LittleButton
        disabled={worldName.length < 1 || !skillType?.name}
        type="good">Create World</LittleButton
    >
    <LittleButton func={toggleMod} type="warning">Cancel</LittleButton>
    <TextInput
        label="World Name: "
        placeholder="Enter a name..."
        bind:val={worldName}
    />
    <SelectInput label="Skill Format: " bind:val={skillType}>
        {#each AddDefaultSkills() as skillset}
            <option value={skillset}>{skillset.name}</option>
        {/each}
    </SelectInput>
</form>

<style>
    h1 {
        margin-bottom: 2rem;
    }
</style>
