<script lang="ts">
    import { selectedWorld } from "/src/utilities/worldConfig";
    import { page } from "$app/stores";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import type { Spell } from "/src/utilities/combatConfig";
    import { updateSpellToWorld } from "/src/utilities/combatConfig";

    $: if ($selectedWorld) {
        console.log($page.params.spellName);

        $breadcrumb.current = $page.params.spellName;
        $breadcrumb.currentType = "Spells";
        $breadcrumb.path = [
            {
                url: `/dm/worlds/${$selectedWorld.name}`,
                name: $selectedWorld.name,
            },
            {
                url: `/dm/worlds/${$selectedWorld.name}/spellbook`,
                name: "Spellbook",
            },
        ];
    }

    let spell: Spell;
    $: if ($selectedWorld) {
        spell = $selectedWorld.spells.find(
            (spell) => spell.name === $page.params.spellName
        );
        console.log(spell);
    }
    let mode = "view";
    let showSettings = false;

    let toggleMod;
</script>

{#if spell}
    <div class="page">
        <div class="content">
            <div class="info-box">
                <div class="toolbar">
                    {#if mode === "edit"}
                        <LittleButton
                            type="good"
                            func={() => updateSpellToWorld(spell)}
                            >💾 Save</LittleButton
                        >
                        <LittleButton type="warning" func={() => null}
                            >❌ Delete</LittleButton
                        >
                        <LittleButton type="none" func={() => (mode = "view")}
                            >Cancel</LittleButton
                        >
                    {:else}
                        <LittleButton
                            type="tool"
                            func={() => {
                                if (mode === "view") {
                                    mode = "edit";
                                } else {
                                    mode = "view";
                                }
                            }}
                        >
                            ⚙ Edit
                        </LittleButton>
                    {/if}
                </div>
                <!--  -->
                <div class="picture" />
                <p class="name">{spell.name}</p>
                <p class="name">Level {spell.level} {spell.school}</p>
                <div class="details">
                    <p class="box-info">
                        <span class="label">Components:</span>
                        {#each spell.components as component}
                            <span class="value">{component},</span>
                        {/each}
                    </p>
                    {#if spell.materials}
                        <p class="box-info">
                            <span class="label">Materials:</span>
                            {#each spell.materials as material}
                                <span class="value">{material},</span>
                            {/each}
                        </p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .page {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 80vh;
        color: white;
        /* background-color: rgba(0, 0, 0, 0.3); */
        box-sizing: border-box;
        padding: 0.5rem;
        gap: 0.5rem;
    }
    .toolbar {
        width: 100%;
        padding: 0.5rem 1rem;
        /* background-color: rgba(0, 0, 0, 0.45); */
        box-sizing: border-box;
        /* border: 1px solid black; */
        margin-bottom: 1rem;
    }

    .info-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        border: 2px solid black;
        box-sizing: border-box;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.45);

        margin-bottom: 1rem;
    }
    .picture {
        width: 8rem;
        height: 8rem;
        /* background-image: url(${npc.image}); */
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border: 1px solid black;
        margin-bottom: 0.5rem;
    }
    .name {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }
    .details {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 95%;
        /* border: 1px solid black; */
        box-sizing: border-box;
        padding: 1rem;
        /* background-color: rgba(0, 0, 0, 0.25); */
    }
    .box-info {
        display: flex;
        justify-content: center;
        gap: 0.5-+rem;
        width: 100%;
        margin-bottom: 0.5rem;
        /* border: 1px solid black; */
    }
    .label {
        font-weight: bold;
        /* margin-right: 2rem; */
        width: 50%;
        text-align: right;
    }
    @media only screen and (min-width: 1030px) {
        .page {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            width: 100%;
            padding: 2rem;
        }
        .content {
            display: flex;
            justify-content: center;
            width: 100%;
        }
        .info-box {
            width: 25%;
            min-height: 40rem;
            margin-bottom: 0;
            margin-right: 1rem;
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
