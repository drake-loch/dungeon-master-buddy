<script lang="ts">
    import LittleButton from "../LittleButton/LittleButton.svelte";

    import ModWindow from "../ModWindow/ModWindow.svelte";
    import SelectInput from "../SelectInput/SelectInput.svelte";
    import TextInput from "../TextInput/TextInput.svelte";
    import TimelineItem from "./TimelineItem.svelte";
    import { PROMPT_TYPES as promptTypes } from "/src/utilities/campaignManager";

    let testColor = "green";

    $: timeline = [];

    function addPrompt(promptTitle: string, promptType: string) {
        if (promptTitle !== "") {
            //prevent adding empty prompts
            let prompt = {
                title: promptTitle,
                id: timeline.length,
                type: promptType,
                desc: "",
                hasRead: false,
                questID: undefined,
            };
            timeline.push(prompt);
            timeline = timeline;
            toggleMod.toggleMod();
            newPrompt = { name: "", type: "" };
        }
    }
    let toggleMod;
    let newPrompt = { name: "", type: "" };
</script>

<ModWindow bind:this={toggleMod}>
    <div class="mod">
        <h2 class="title">New Prompt</h2>
        <TextInput
            label="Propt name: "
            placeholder="Enter a name..."
            bind:val={newPrompt.name}
        />

        <SelectInput
            bind:val={newPrompt.type}
            label="Prompt Type"
            placeholder="Select type"
        >
            <!--  -->
            {#each promptTypes as pt}
                <option value={pt}>{pt}</option>
            {/each}
        </SelectInput>
        <LittleButton
            disabled={newPrompt.name === "" || newPrompt.type === ""}
            func={() => addPrompt(newPrompt.name, newPrompt.type)}
            type="good">Create Prompt</LittleButton
        >
        <LittleButton func={() => toggleMod.toggleMod()} type="bad"
            >Cancel</LittleButton
        >
    </div>
</ModWindow>

<div class="box">
    <!-- <h3>Campaign Event Timeline</h3> -->
    <div class="flip">
        {#each timeline as item}
            <TimelineItem bind:item />
        {/each}
    </div>
    <button
        on:click={() => toggleMod.toggleMod()}
        style="background-color:{testColor}"
        class="item"
    >
        Add Item +</button
    >
</div>

<style>
    .box {
        border: 0px solid black;
        min-height: 50vh;
        margin: 1rem 0;
    }
    .flip {
        display: flex;
        flex-direction: column;
    }
    button {
        color: black;
        background-color: white;
    }
    .item {
        width: 100%;
        padding: 0.5rem 0;
        /* background-color: red; */
        font-size: 1.5rem;
        border: none;
        border-bottom: 1px solid black;
    }

    .title {
        color: black;
        font-size: 1.75rem;
        font-weight: bold;
    }

    h3 {
        text-align: center;
        margin: 0 0 0.5rem 0;
        padding: 0.25rem 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    @media only screen and (min-width: 1030px) {
        .box {
            width: 50%;
        }
    }

    /* prompt button colors */

    .npc {
        background-color: rgb(0, 0, 176);
    }
    .quest {
        background-color: rgb(255, 221, 0);
    }
    .encounter {
        color: white;
        background-color: rgb(165, 0, 0);
    }
    .lore {
        background-color: rgb(255, 204, 0);
    }
    .prompt {
        background-color: rgb(141, 146, 151);
    }

    /* states */
    .npc:hover {
        background-color: rgba(0, 0, 176, 0.75);
    }
    .quest:hover {
        background-color: rgba(255, 221, 0, 0.75);
    }
    .encounter:hover {
        color: white;
        background-color: rgba(165, 0, 0, 0.75);
    }
    .lore:hover {
        background-color: rgba(255, 204, 0, 0.75);
    }
    .prompt:hover {
        background-color: rgba(141, 146, 151, 0.75);
    }
</style>
