<script lang="ts">
    export let tabs = [];
    export let currentSelectedTab = 0;

    function selectTab(tab) {
        if (currentSelectedTab !== tab) {
            tabs[currentSelectedTab].isSelected = false;
            tabs[tab].isSelected = true;
            currentSubPageIndex = 0;
        }
    }

    export let currentSubPageIndex = 0;
    export let subPageMaxIndex = 0;

    function selectSubPage(num: number) {
        currentSubPageIndex += num;
    }
</script>

<section>
    <div class="tabs">
        {#each tabs as tab, index}
            <p
                class={`tab ${tab.isSelected ? "selected" : ""}`}
                on:click={() => selectTab(index)}
            >
                {tab.name}
            </p>
        {/each}
    </div>
    <div class="paper">
        <div class="buttons">
            <slot name="buttons" />
        </div>
        <div class="content">
            {#if currentSelectedTab === 0}
                <slot name="tab-1" />
            {:else if currentSelectedTab === 1}
                <slot name="tab-2" />
            {:else if currentSelectedTab === 2}
                <slot name="tab-3" />
            {:else if currentSelectedTab === 3}
                <slot name="tab-4" />
            {/if}
            <div class="nav2">
                <button
                    hidden={currentSubPageIndex === 0}
                    on:click={() => selectSubPage(-1)}>{"<"}</button
                >
                <p>Page Number: {currentSubPageIndex + 1}</p>
                <button
                    hidden={currentSubPageIndex === subPageMaxIndex}
                    on:click={() => selectSubPage(1)}>{">"}</button
                >
            </div>
        </div>
    </div>
</section>

<style>
    section {
        width: 100%;
        box-sizing: border-box;
        /* padding: 0 1rem 5rem 1rem; */
        box-sizing: border-box;
    }
    .paper {
        position: relative;
        width: 100%;
        height: 75vh;
        background-color: var(--col-dark-lightest);
        /* border-radius: 15px; */
        border-bottom: 2px solid rgba(0, 0, 0, 0.65);
        /* box-sizing: border-box; */
        overflow: hidden;
        /* padding-bottom: 2rem; */
    }
    .tabs {
        width: 100%;
        height: 3.5rem;
        display: flex;
        color: white;
        background-color: #2f2f2f;
    }
    .tab:hover {
        background-color: var(--shade-light-min);
    }
    .tab {
        background-color: #2f2f2f;
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-right: 1px solid var(--col-dark-light);
        box-sizing: border-box;
    }

    .stat {
        text-align: center;
    }
    .selected {
        background-color: var(--col-dark-lightest);
    }
    .selected:hover {
        background-color: var(--col-dark-lightest);
    }
    .content {
        /* background-color: var(--col-dark-dark); */
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
    .name {
        width: fit-content;
        margin: 0 auto;
    }
    .center {
        margin-bottom: 2rem;
    }
    .nav2 {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 1rem;
        box-sizing: border-box;
        border-top: 1px solid var(--col-dark-light);
        background-color: var(--col-dark-lightest);
    }
    .nav2 p {
        padding: 0 1rem;
        font-size: 0.75rem;
        cursor: default;
    }
    button {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 5px;
        text-align: center;
        background-color: var(--col-dark-light);
        color: white;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .hidden {
        display: none;
    }
    .buttons {
        width: 100%;
        height: 3rem;
        display: flex;
        padding: 0 1rem;
        align-items: center;
        box-sizing: border-box;
        /* border-bottom: 1px solid var(--col-dark-light); */

        background-color: var(--col-dark-lightest);
    }
    @media only screen and (min-width: 1030px) {
        section {
            padding: 0;
        }
        .paper {
            width: 100%;
            height: 80vh;
            border-radius: 0;
            border: none;
        }
        .tabs {
            height: 3rem;
            background-color: none;
            font-size: 1.5rem;
        }
        .tab:last-child {
            border-right: 1px solid var(--col-dark-light);
        }

        .nav2 {
            height: 3rem;
        }
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
