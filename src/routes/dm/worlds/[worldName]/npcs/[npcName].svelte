<script lang="ts">
    import { selectedWorld } from "/src/utilities/worldConfig";

    import {
        genders,
        occupations,
        hairColours,
        eyeColours,
        NPC,
    } from "/src/utilities/charManager";
    import { page } from "$app/stores";
    import { breadcrumb } from "/src/utilities/breadCrumbStore";

    let npc: NPC;

    $: if ($selectedWorld) {
        $breadcrumb.current = $page.params.npcName;
        $breadcrumb.currentType = "NPC";
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
        npc = $selectedWorld.allNPCs.find(
            (npc) => npc.name === $page.params.npcName
        );
        console.log(npc);
    }
    let mode = "view";

    $: provinces = $selectedWorld?.continents.find(
        (continent) => continent.name === npc.location.continent
    )?.provinces;

    let settlements = null;

    $: if (provinces)
        settlements = provinces.find(
            (p) => p.name === npc.location.province
        )?.settlements;
</script>

{#if npc}
    <div class="page">
        <div class="info-box">
            <!--  -->
            <div class="picture" />
            <p class="name">{npc.name}</p>
            <div class="details">
                <!--  -->
                <p class="box-info">
                    <span class="label">Age:</span>
                    <span class="data">{npc.age}</span>
                </p>
                <p class="box-info">
                    <span class="label">Gender:</span>
                    <span class="data">{npc.gender}</span>
                </p>
                <p class="box-info">
                    <span class="label">Race:</span>
                    <span class="data">{npc.race.name}</span>
                </p>
                <p class="box-info">
                    <span class="label">Occupation:</span>
                    <span class="data">{npc.occupation}</span>
                </p>
                <p class="box-info">
                    <span class="label">Hair Colour:</span>
                    <span class="data">{npc.hairColour}</span>
                </p>
                <p class="box-info">
                    <span class="label">Eye Colour:</span>
                    <span class="data">{npc.eyeColour}</span>
                </p>
                <p class="box-info">
                    <span class="label">Languages:</span>
                    <span class="data">{npc.languages}</span>
                </p>
                <p class="label">Location</p>
                <p class="box-info">
                    <span class="label">Continent:</span>
                    <span class="data">{npc.location.continent}</span>
                </p>
                <p class="box-info">
                    <span class="label">Provinces:</span>
                    <span class="data">{npc.location.province}</span>
                </p>
                <p class="box-info">
                    <span class="label">Settlement:</span>
                    <span class="data">{npc.location.settlement}</span>
                </p>
                {#if npc.desc}
                    <span class="label">Physical Appearence:</span>
                    <p class="box-info">
                        <span class="data">{npc.desc}</span>
                    </p>
                {/if}
            </div>
        </div>

        <div class="content-box">
            <!--  -->
            <h2>About:</h2>
            <p class="box-info">
                <span class="label">Max Health:</span>
                <span class="data">{npc.maxHitPoints}</span>
            </p>
            <p class="box-info">
                <span class="label">Current Health:</span>
                <span class="data">{npc.currentHitPoints}</span>
            </p>
            <p class="box-info">
                <span class="label">Defence:</span>
                <span class="data">{npc.defence}</span>
            </p>
            <p class="box-info">
                <span class="label">Movement:</span>
                <span class="data">{npc.movement}</span>
            </p>
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
    }

    .info-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        border: 2px solid black;
        box-sizing: border-box;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.25);
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
        width: 100%;
        margin-bottom: 0.5rem;
    }
    .label {
        font-weight: bold;
        margin-right: 2rem;
    }
    .data {
        font-weight: 300;
    }
    .content-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* border: 1px solid black; */
        box-sizing: border-box;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.25);
    }
    @media only screen and (min-width: 1030px) {
        .page {
            display: flex;
            flex-direction: row;
            width: 100%;
            padding: 0.25rem;
        }
        .info-box {
            width: 25%;
            margin-bottom: 0;
            margin-right: 1rem;
        }
        .content-box {
            width: 75%;
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
