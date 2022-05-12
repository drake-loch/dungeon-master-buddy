<script>
    import LittleButton from "../../LittleButton/LittleButton.svelte";
    import SelectInput from "../../SelectInput/SelectInput.svelte";
    import TextInput from "../../TextInput/TextInput.svelte";
    import { CreateNewWorld, worlds } from "../../../../utilities/worldConfig";
    import { AddDefaultSkills } from "/src/utilities/skillsConfig";
    import { user } from "../../../../stores/index";
    import Dropdown from "../../Dropdown/Dropdown.svelte";

    export let toggleMod;
    export let updateWorlds = () => {};

    let worldName = "";
    let skillType;

    async function submitHandler(e) {
        e.preventDefault();
        CreateNewWorld(worldName, $user, skillType);
        updateWorlds();
        toggleMod();
        $worlds = $worlds;
    }
</script>

<form on:submit={submitHandler}>
    <h2>Create World</h2>
    <div class="text-input">
        <label for="text-input-name">World Name:</label>
        <input
            placeholder="Enter World Name..."
            bind:value={worldName}
            type="text"
        />
    </div>

    <div class="select-input">
        <label for="text-input-name">World Name:</label>
        <select bind:value={skillType} name="world" id="">
            <option disabled value={-1}>Select Type</option>
            {#each AddDefaultSkills() as skillset}
                <option value={skillset}>{skillset.name}</option>
            {/each}
        </select>
    </div>
    <!-- <TextInput
        label="World Name: "
        placeholder="Enter a name..."
        bind:val={worldName}
    />
    <SelectInput label="Skill Format: " bind:val={skillType}>
        {#each AddDefaultSkills() as skillset}
            <option value={skillset}>{skillset.name}</option>
        {/each}
    </SelectInput> -->
    <div class="button-list">
        <LittleButton
            disabled={worldName.length < 1 || !skillType?.name}
            type="good">Create World</LittleButton
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
