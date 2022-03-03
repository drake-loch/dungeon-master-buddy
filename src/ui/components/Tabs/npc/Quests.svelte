<script>
    import ListSelector from "../../ListSelector/ListSelector.svelte";
    import BuilderButton from "../components/BuilderButton.svelte";
    import Title from "../components/Title.svelte";
    export let newChar = null;
    export let mode = "view";
    export let currentSubPageIndex = 0;

    let selectedQuest = null;
    let showQB = false;

    function toggleQuestBuilder() {
        showQB = !showQB;
        console.log("ping!");
    }
</script>

<div class="quest">
    {#if currentSubPageIndex === 0}
        <Title title="Quests" />
        {#if mode === "create"}
            <p>Add quests once npc is created</p>
        {:else if !showQB}
            <BuilderButton type="good" func={toggleQuestBuilder} nav={null}
                >Add Quest</BuilderButton
            >
            <div class="gap" />
            <ListSelector
                items={newChar.quests}
                bind:selectedItem={selectedQuest}
            />
        {:else if showQB}
            <BuilderButton type="good" func={toggleQuestBuilder} nav={null}
                >Create Quest</BuilderButton
            >
        {/if}
    {/if}
</div>

<style>
    .quest {
        box-sizing: border-box;
        padding: 0.5rem 1rem;
        width: 22rem;
        height: 90%;
    }
    .gap {
        margin: 1rem;
    }
    @media only screen and (min-width: 1030px) {
    }
    /* Scroll Bar */
    ::-webkit-scrollbar {
        width: 2px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: red;
        border-radius: 10px;
    }
</style>
