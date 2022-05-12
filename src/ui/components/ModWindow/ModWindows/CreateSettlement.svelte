<script>
    import { CreateNewSettlement } from "/src/utilities/settlementConfig";

    import LittleButton from "../../LittleButton/LittleButton.svelte";
    import TextInput from "../../TextInput/TextInput.svelte";
    import { user } from "/src/stores";
    import { selectedProvince } from "/src/utilities/provinceConfig";

    export let toggleMod;

    let settlementName = "";

    async function submitHandler(e) {
        e.preventDefault();
        $selectedProvince = CreateNewSettlement($user, settlementName);
        toggleMod();
    }
</script>

<form on:submit={submitHandler}>
    <h2>Create Settlement</h2>
    <div class="text-input">
        <label for="text-input-name">Settlement Name:</label>
        <input
            placeholder="Enter Settlement Name..."
            bind:value={settlementName}
            type="text"
        />
    </div>

    <div class="button-list">
        <LittleButton disabled={settlementName.length < 1} type="good"
            >Create Settlement</LittleButton
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
    .text-input input {
        background-color: rgb(91, 91, 91);

        font-size: 1rem;
        border: 1px solid rgb(112, 112, 112);
        outline: none;
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
