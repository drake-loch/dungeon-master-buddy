<script>
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import NpcBuilder from "/src/ui/components/Builder/NpcBuilder.svelte";
    import { createNewNPC } from "/src/utilities/charManager";
    import BuilderInput from "/src/ui/components/TextInput/BuilderInput.svelte";

    let newChar = undefined;
    $: if ($selectedWorld) {
        $breadcrumb.current = "New NPC";
        $breadcrumb.currentType = "Create & Edit";
        $breadcrumb.path = [
            {
                url: `/dm/worlds/${$selectedWorld.name}/builder`,
                name: "Builder",
            },
            {
                url: `/dm/worlds/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
        ];
        newChar = createNewNPC($selectedWorld.allPCs.length);
    }

    let title;
</script>

<!-- <NpcBuilder mode="create" bind:newChar /> -->

<section>
    <!--  -->
    <div class="tabs">
        <button>Overview</button>
        <button>Info</button>
        <button>Skills</button>
        <button>Magic</button>
    </div>
    <!-- add toolbar here with settings and randomize button -->
    <div class="content">
        <!--  -->
        <div class="text-input">
            <label for="name">Name:</label>
            <input class="input" bind:value={title} type="text" />
        </div>
    </div>
</section>

<style>
    section {
        box-sizing: border-box;
        background-color: rgba(0, 0, 0, 0.45);
        width: 100%;
        height: 80vh;
    }
    .tabs {
        /* background-color: rgba(0, 0, 0, 0.45); */
        gap: 2px;
        display: flex;
        width: 100%;
        height: 10%;
    }
    button {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.45);
        color: white;
        border: none;
        outline: none;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        box-sizing: border-box;
        padding: 1rem;
    }

    .content {
        padding: 1rem;
        box-sizing: border-box;
    }

    .input {
        background: rgba(255, 255, 255, 0.05);
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
    label {
        color: white;
    }

    .text-input {
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    @media only screen and (min-width: 1030px) {
        /* .tabs {
            width: 10%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        button {
            width: 100%;
            height: 15%;
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        } */

        .text-input {
            width: 25%;
            height: 100%;
        }
    }
</style>
