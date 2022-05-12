<script>
    import LittleButton from "../../LittleButton/LittleButton.svelte";
    import { user } from "../../../../stores/index";
    import {
        selectedCampaign,
        CreateNewCampaign,
        campaigns,
    } from "/src/utilities/campaignManager";

    export let toggleMod;

    let name = "";
    async function createNewCampaign() {
        $selectedCampaign = await CreateNewCampaign($user, $campaigns, name);
        $campaigns.push($selectedCampaign);
        toggleMod();
    }

    async function submitHandler(e) {
        e.preventDefault();
        createNewCampaign();
        $campaigns = $campaigns;
    }
</script>

<form on:submit={submitHandler}>
    <h2>Create Campaign</h2>
    <div class="text-input">
        <label for="text-input-name">Campaign Name:</label>
        <input
            placeholder="Enter Campaign Name..."
            bind:value={name}
            type="text"
        />
    </div>

    <div class="button-list">
        <LittleButton disabled={name.length < 1} type="good"
            >Create Campaign</LittleButton
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
