<script lang="ts">
    export let title: string | undefined = undefined;
    export let desc: string | undefined = undefined;
    export let buttons: { title: string; func(): any }[] | [] = [];

    export let canEditTitle = false;
    export let canEditDesc = false;
    export let canEditOther = false;
    export let showExtra = false;
    export let save = () => {};

    export let editMode = false;

    function toggleEditMode() {
        console.log("toggle edit mode");

        editMode = !editMode;
    }
</script>

<div class="module">
    {#if title !== undefined || canEditTitle || canEditDesc || canEditOther}
        <div class="header">
            {#if title !== undefined}
                {#if canEditTitle && editMode}
                    <input class="input" bind:value={title} type="text" />
                {:else}
                    <h2 class="title">{title}</h2>
                {/if}
            {/if}
            {#if canEditTitle || canEditDesc || canEditOther}
                <button on:click={toggleEditMode} class="edit-icon">✏</button>
            {/if}
        </div>
    {/if}
    <div class="content">
        {#if canEditDesc && editMode}
            <textarea rows="5" class="input" bind:value={desc} />
        {:else if desc !== undefined}
            <p class="desc">
                {desc}
            </p>
        {/if}
        <div class="extra">
            <!--  -->
            <slot name="extra" />
        </div>
        <div class="buttons">
            {#if editMode}
                <button
                    on:click={() => {
                        save();
                        toggleEditMode();
                    }}
                    class="button save">Save changes</button
                >
                <button on:click={toggleEditMode} class="button discard"
                    >Cancel Changes</button
                >
            {:else}
                {#each buttons as butt}
                    <button on:click={butt.func} class="button"
                        >{butt.title}</button
                    >
                {/each}
            {/if}
        </div>
    </div>
</div>

<style>
    .module {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 1rem 0.75rem;
        background-color: rgba(0, 0, 0, 0.45);
        box-sizing: border-box;
    }
    .header {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
    }
    .title {
        margin-right: 1rem;
        color: white;
    }
    .desc {
        margin-bottom: 0.8rem;
        line-height: 1.45rem;
        color: white;
    }

    .buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .button {
        border: none;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        background-color: rgba(255, 255, 255, 0.5);
    }
    .edit-icon {
        background: none;
        border: none;
        color: white;
    }

    .input {
        background: none;
        color: white;
        width: 100%;
        font-size: 1rem;
        height: auto;
        resize: none;
        border: 1px solid rgba(255, 255, 255, 0.5);
        padding: 0.25rem;
        box-sizing: border-box;
    }
    .input:focus {
        outline: none;
    }

    @media only screen and (min-width: 1030px) {
        .module {
            width: 50%;
        }
    }

    .save {
        background-color: rgb(0, 176, 0);
        color: white;
    }
    .discard {
        color: white;

        background-color: rgb(176, 0, 0);
    }
</style>
