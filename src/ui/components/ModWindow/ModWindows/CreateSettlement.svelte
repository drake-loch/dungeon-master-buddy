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

<h1>Create Settlement</h1>

<form on:submit={submitHandler}>
    <div>
        <LittleButton disabled={settlementName.length < 1} type="good"
            >Create Settlement</LittleButton
        >
        <LittleButton func={toggleMod} type="warning">Cancel</LittleButton>
    </div>
    <TextInput
        label="Settlement Name: "
        placeholder="Enter a name..."
        bind:val={settlementName}
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
