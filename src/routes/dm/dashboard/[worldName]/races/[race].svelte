<script context="module">
    export async function load({ params }) {
        let raceName = params.race;
        return {
            stuff: { raceName },
            props: { raceName },
        };
    }
</script>

<script lang="ts">
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { onMount } from "svelte";
    import type { Race } from "/src/utilities/charManager";
    import { createNewRace } from "/src/utilities/charManager";
    import BuilderInput from "/src/ui/components/TextInput/BuilderInput.svelte";
    import BuilderTextArea from "/src/ui/components/Tabs/components/BuilderTextArea.svelte";
    import BuilderButton from "/src/ui/components/Tabs/components/BuilderButton.svelte";
    import { user } from "/src/stores";
    import { addRaceToWorld } from "/src/utilities/charManager";
    import { goto } from "$app/navigation";

    export let raceName = "";

    let newRace = createNewRace();

    let selectedRace: Race | undefined = undefined;
    let mode = "view";

    $: if (raceName === "New Race") {
        mode = "edit";
    } else {
        mode = "view";
    }

    onMount(async () => {
        if ($selectedWorld) {
            //do stuff
            $breadcrumb.current = raceName;
            $breadcrumb.currentType = "Race";
            $breadcrumb.path = [
                {
                    url: `/dm/dashboard/${$selectedWorld.name}/races`,
                    name: "Races",
                },
                {
                    url: `/dm/dashboard/${$selectedWorld.name}`,
                    name: $selectedWorld.name,
                },
            ];
            selectedRace = $selectedWorld.races.find(
                (r) => r.name === raceName
            );
        }
    });

    function createRace() {
        if (newRace.name !== "" && newRace.name !== "New Race") {
            $selectedWorld = addRaceToWorld($user, newRace);
            goto(`/dm/dashboard/${$selectedWorld.name}/races`);
        }
    }
</script>

{#if mode === "view"}
    <h3>View</h3>
{:else if mode === "edit"}
    <div class="background">
        <BuilderButton type="good" func={createRace} nav={null}
            >Create Race</BuilderButton
        >
        <br />
        <BuilderInput
            bind:val={newRace.name}
            label="Name"
            placeholder="Name"
            width="100%"
            {mode}
        />
        <BuilderTextArea
            bind:val={newRace.info}
            placeholder="Human's are the most common"
            label="Info/Description"
            centerLabel={false}
            width="100%"
            {mode}
        />
    </div>
{/if}

<style>
    .background {
        background-color: var(--col-dark-lighter);
        height: 50vh;
        padding: 1rem;
        box-sizing: border-box;
    }

    @media only screen and (min-width: 1030px) {
        .background {
            width: 50%;
        }
    }
</style>
