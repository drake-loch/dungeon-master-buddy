<script>
    import LittleButton from "../../LittleButton/LittleButton.svelte";
    import SelectInput from "../../SelectInput/SelectInput.svelte";
    import TextInput from "../../TextInput/TextInput.svelte";
    import { CreateNewWorld } from "../../../../utilities/worldConfig";
    import { AddDefaultSkills } from "/src/utilities/skillsConfig";
    import { user } from "../../../../stores/index";

    export let toggleMod;
    export let updateWorlds = () => {};

    let worldName = "";
    let skillType;

    async function submitHandler(e) {
        e.preventDefault();
        CreateNewWorld(worldName, $user, skillType);
        updateWorlds();
        toggleMod();
    }
</script>

<h1>Create World</h1>

<form on:submit={submitHandler}>
    <div>
        <LittleButton
            disabled={worldName.length < 1 || !skillType?.name}
            type="good">Create World</LittleButton
        >
        <LittleButton func={toggleMod} type="warning">Cancel</LittleButton>
    </div>
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

    @media only screen and (min-width: 1030px) {
        div {
            width: 30%;
            display: flex;
            justify-content: space-between;
            margin-left: auto;
        }
    }
</style>
