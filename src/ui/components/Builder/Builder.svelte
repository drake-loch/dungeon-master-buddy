<script>
    import { selectedWorld } from "/src/utilities/worldConfig";

    import Info from "../Tabs/Info.svelte";
    import { createNewChar } from "/src/utilities/charManager";

    export let tabs = [
        { name: "Info", isSelected: true },
        { name: "Skills", isSelected: false },
        { name: "Gear", isSelected: false },
        { name: "Spells", isSelected: false },
    ];

    function selectTab(tab) {
        if (currentSelectedTab !== tab) {
            tabs[currentSelectedTab].isSelected = false;
            tabs[tab].isSelected = true;
        }
    }

    $: currentSelectedTab = tabs.findIndex((tab) => tab.isSelected);

    let newChar = createNewChar($selectedWorld.allNPCs.length);

    $: console.log(newChar);
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
                <Info bind:newChar />
            {/if}
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
        width: 100%;
        height: 75vh;
        background-color: var(--col-dark-lightest);
        border-radius: 15px;
        border-bottom: 2px solid rgba(0, 0, 0, 0.65);
        box-sizing: border-box;
        overflow: hidden;
        /* padding: 1rem; */
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
    }
</style>
