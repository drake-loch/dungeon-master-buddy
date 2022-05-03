<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    export let item = {
        title: "",
        id: 0,
        type: "",
        desc: "",
        hasRead: false,
        questID: undefined,
    };

    let isOpen = false;
    $: console.log(item.type);
</script>

<div class="item {item.type}" class:opened={isOpen}>
    {#if isOpen}
        <div class="content">
            <h3 on:click={() => (isOpen = !isOpen)}>{item.title}</h3>
            <label class="label" for="desc">description</label>
            <textarea type="text" class="input textarea" name="desc" />
            {#if item.type === "quest"}
                {#if item.questID}
                    <button
                        on:click={() => goto(`${$page.url}/${item.questID}`)}
                        >Goto Quest</button
                    >
                {:else}
                    <button
                        on:click={() => goto(`${$page.url}/${item.questID}`)}
                        >Create Quest</button
                    >
                {/if}
            {/if}
        </div>
    {:else}
        <h3 on:click={() => (isOpen = !isOpen)}>{item.title}</h3>
    {/if}
</div>

<style>
    .item {
        box-sizing: border-box;
        width: 100%;
        /* background-color: red; */
        font-size: 1.5rem;
        border: none;
        color: black;
        border-bottom: 1px solid black;
        display: flex;
        flex-direction: column;
    }
    h3 {
        font-size: 1.75rem;
        font-weight: normal;
        text-align: center;
        cursor: pointer;
    }
    .desc {
        padding: 0 0.5rem;
    }
    .opened {
        min-height: 25vh;
    }
    .content {
        width: 100%;
        box-sizing: border-box;
        padding: 0.25rem;
    }
    .input {
        width: 100%;
        min-height: 5rem;
        border: 1px solid black;
        font-size: 1.1rem;
        background: none;
        /* padding: 0.5rem; */
    }
    .input.textarea {
        width: 98%;
    }
    .label {
        font-size: 1rem;
        font-weight: normal;
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
