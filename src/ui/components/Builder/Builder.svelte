<script lang="ts">
    import { selectedWorld } from "/src/utilities/worldConfig";

    import Info from "../Tabs/Info.svelte";
    import { createNewChar } from "/src/utilities/charManager";
    import Skills from "../Tabs/Skills.svelte";

    export let tabs = [
        { name: "Info", isSelected: true, amountOfPages: 2 },
        { name: "Skills", isSelected: false, amountOfPages: 2 },
        { name: "Gear", isSelected: false, amountOfPages: 1 },
        { name: "Spells", isSelected: false, amountOfPages: 1 },
    ];
    $: currentSelectedTab = tabs.findIndex((tab) => tab.isSelected);

    function selectTab(tab) {
        if (currentSelectedTab !== tab) {
            tabs[currentSelectedTab].isSelected = false;
            tabs[tab].isSelected = true;
            currentSubPageIndex = 0;
        }
    }

    let currentSubPageIndex = 0;
    $: subPageMaxIndex = tabs[currentSelectedTab].amountOfPages - 1;

    function selectSubPage(num: number) {
        currentSubPageIndex += num;
    }

    let newChar = createNewChar($selectedWorld.allNPCs.length);
</script>

<section>
    <div class="paper">
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
        <div class="content">
            {#if currentSelectedTab === 0}
                <Info {currentSubPageIndex} bind:newChar />
            {:else if currentSelectedTab === 1}
                <Skills bind:newChar />
            {/if}
            <div class="nav2 {subPageMaxIndex === 0 ? 'hidden' : ''}">
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
        padding: 0 1rem 5rem 1rem;
        box-sizing: border-box;
    }
    .paper {
        position: relative;
        width: 100%;
        height: 75vh;
        background-color: var(--col-dark-lightest);
        border-radius: 15px;
        border-bottom: 2px solid rgba(0, 0, 0, 0.65);
        /* box-sizing: border-box; */
        overflow: hidden;
        padding-bottom: 2rem;
    }
    .tabs {
        width: 100%;
        height: 3.5rem;
        display: flex;
        color: white;
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
        border-top: 1px solid var(--col-dark-light);
    }
    .nav2 p {
        padding: 0 1rem;
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
    @media only screen and (min-width: 1030px) {
        section {
            display: flex;
            justify-content: center;
            padding: 2rem 0 0 0;
        }
        .paper {
            width: 50%;
        }
        .tabs {
            height: 4rem;
        }
        .nav2 {
            height: 3rem;
        }
    }
</style>
