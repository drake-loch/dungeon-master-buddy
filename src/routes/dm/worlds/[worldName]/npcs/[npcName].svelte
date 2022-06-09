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
    import SkillBox from "/src/ui/components/Tabs/components/SkillBox.svelte";
    import SubSkill from "/src/ui/components/Tabs/components/SubSkill.svelte";
    import DashModule from "/src/ui/components/DashModule/DashModule.svelte";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";
    import ModWindow from "/src/ui/components/ModWindow/ModWindow.svelte";
    import AddWeaponMod from "/src/ui/components/ModWindow/ModWindows/AddWeaponMod.svelte";
    import type { Item, Weapon } from "/src/utilities/combatConfig";
    import WeaponSelectMod from "/src/ui/components/ModWindow/ModWindows/WeaponSelectMod.svelte";
    import { getItemById } from "/src/utilities/combatConfig";
    import type { Armour } from "src/utilities/combatConfig";

    let npc: NPC;

    let tabs = [
        {
            name: "Details",
            isSelected: true,
            onlyMob: false,
        },
        {
            name: "Skills",
            isSelected: false,
            onlyMob: true,
        },
        {
            name: "Quests",
            isSelected: false,
            onlyMob: false,
        },
        {
            name: "Gear/Spells",
            isSelected: false,
            onlyMob: false,
        },
    ];

    function selectTab(tabName: string) {
        tabs.forEach((tab) => {
            tab.isSelected = false;
        });
        tabs.find((tab) => tab.name === tabName).isSelected = true;
        tabs.forEach((tab) => (tab.isSelected ? (selectedTab = tab) : null));
    }

    let selectedTab = tabs[0];

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
        // console.log(npc);
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

    let showSettings = false;

    let toggleMod;
    $: weapons = npc?.combat?.weapons.map((weapon) => {
        return getItemById(weapon, $selectedWorld);
    });
    $: armour = npc?.combat?.armour?.map((armour) => {
        return getItemById(armour, $selectedWorld);
    });

    function weaponStat(weaponSkill: string) {
        let toReturn = 0;
        npc.skills.forEach((skill) => {
            if (skill.name === weaponSkill) {
                toReturn = skill.mod;
            }
        });
        return toReturn;
    }
    // let selectedWeapon: Weapon | undefined;
    let modToShow:
        | "Add Weapon Mod"
        | "Add Gear Mod"
        | "Select Weapon Mod"
        | undefined;
    function selectWeapon(weapon: Weapon) {
        selectedItem = weapon;
        modToShow = "Select Weapon Mod";
        toggleMod.toggleMod();
    }
    let selectedItem: Item | Weapon | Armour | undefined;
    let modCatergory: "item" | "weapon" | "armour" | undefined;
</script>

{#if npc}
    <ModWindow bind:this={toggleMod}>
        {#if modToShow === "Add Weapon Mod"}
            <AddWeaponMod
                bind:char={npc}
                toggleMod={toggleMod.toggleMod}
                itemType={modCatergory}
            />
        {:else if modToShow === "Select Weapon Mod"}
            <!--  -->
            <WeaponSelectMod
                bind:char={npc}
                toggleMod={toggleMod.toggleMod}
                {selectedItem}
            />
        {/if}
    </ModWindow>
    <div class="page">
        <div class="toolbar">
            {#if mode === "edit"}
                <LittleButton type="good" func={() => null}
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
        <div class="content">
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
                <div class="tabs">
                    {#each tabs as tab}
                        <button
                            class:selected={tab.name === selectedTab.name}
                            on:click={() => selectTab(tab.name)}
                            class="tab"
                        >
                            {tab.name}
                        </button>
                    {/each}
                </div>
                <div class="mobile-view">
                    {#if selectedTab.name === "Details"}
                        <div class="info">
                            <div class="group">
                                <p class="box">
                                    <span class="label">Health</span>
                                    <span class="data"
                                        >{npc.currentHitPoints} / {npc.maxHitPoints}</span
                                    >
                                </p>

                                <p class="box">
                                    <span class="label">Defence</span>
                                    <span class="data">{npc.defence}</span>
                                </p>
                                <p class="box">
                                    <span class="label">Movement</span>
                                    <span class="data">{npc.movement}</span>
                                </p>
                            </div>
                            <div class="items">
                                <h3>Weapons</h3>
                                <!--  -->
                                <p class="label small">
                                    Current Weapon: {npc.combat.currentWeapon
                                        .name}
                                </p>
                                <div class="weapons-header">
                                    <!--  -->
                                    <p class="header-title">Name</p>
                                    <p class="header-title">Bonus</p>
                                    <p class="header-title">Type</p>
                                    <p class="header-title">Damage</p>
                                </div>
                                {#each weapons as item}
                                    <button
                                        on:click={() => selectWeapon(item)}
                                        class="weapon"
                                    >
                                        <p class="header-title">{item.name}</p>
                                        <p class="header-title">
                                            {weaponStat(item.stat)}
                                        </p>
                                        <p class="header-title">
                                            {item.damageType}
                                        </p>
                                        <p class="header-title">
                                            {item.damage}
                                        </p>
                                    </button>
                                {/each}
                                <!-- </div> -->

                                <button
                                    on:click={() => {
                                        modToShow = "Add Weapon Mod";
                                        modCatergory = "weapon";
                                        toggleMod.toggleMod();
                                    }}>+</button
                                >
                            </div>
                            <div class="items">
                                <h3>Armour</h3>

                                <!--  -->
                                <p class="label small">
                                    Equipped Amrour: {npc.combat.currentWeapon
                                        .name}
                                </p>
                                <div class="weapons-header">
                                    <!--  -->
                                    <p class="header-title">Name</p>
                                    <p class="header-title">Defense</p>
                                    <p class="header-title">Type</p>
                                </div>
                                {#each armour as item}
                                    <button
                                        on:click={() => selectWeapon(item)}
                                        class="weapon"
                                    >
                                        <p class="header-title">{item.name}</p>
                                        <p class="header-title">
                                            {weaponStat(item.stat)}
                                        </p>
                                        <p class="header-title">
                                            {item.damageType}
                                        </p>
                                    </button>
                                {/each}
                                <!-- </div> -->

                                <button
                                    on:click={() => {
                                        modToShow = "Add Weapon Mod";
                                        modCatergory = "armour";
                                        toggleMod.toggleMod();
                                    }}>+</button
                                >
                            </div>
                        </div>
                    {/if}
                    {#if selectedTab.name === "Skills"}
                        <div class="skills">
                            <!--  -->

                            {#each npc.skills as skill}
                                <SkillBox {mode} bind:skill>
                                    {#each npc.subSkills.filter((subSkill) => subSkill.parentSkill === skill.name) as subSkill}
                                        <SubSkill bind:subSkill />
                                    {/each}
                                </SkillBox>
                            {/each}
                        </div>
                    {/if}
                </div>
                <div class="desktop">
                    <div class="skills">
                        <!--  -->

                        {#each npc.skills as skill}
                            <SkillBox {mode} bind:skill>
                                {#each npc.subSkills.filter((subSkill) => subSkill.parentSkill === skill.name) as subSkill}
                                    <SubSkill bind:subSkill />
                                {/each}
                            </SkillBox>
                        {/each}
                    </div>

                    <div class="info">
                        <p class="box">
                            <span class="label">Max Health</span>
                            <span class="data">{npc.maxHitPoints}</span>
                        </p>
                        <p class="box">
                            <span class="label">Current Health</span>
                            <span class="data">{npc.currentHitPoints}</span>
                        </p>
                        <p class="box">
                            <span class="label">Defence</span>
                            <span class="data">{npc.defence}</span>
                        </p>
                        <p class="box">
                            <span class="label">Movement</span>
                            <span class="data">{npc.movement}</span>
                        </p>
                    </div>
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
        background-color: rgba(0, 0, 0, 0.45);
        box-sizing: border-box;
        border: 1px solid black;
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
        width: 100%;
        margin-bottom: 0.5rem;
        /* border: 1px solid black; */
    }
    .content-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid black;
        box-sizing: border-box;
        /* padding: 0.25rem; */
        background-color: rgba(0, 0, 0, 0.45);
        min-height: 25rem;
    }
    .label {
        font-weight: bold;
        margin-right: 2rem;
        width: 50%;
        text-align: right;
    }
    .data {
        font-weight: 300;
        width: 50%;
    }
    .skills {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }
    .tabs {
        display: flex;
        width: 100%;
        gap: 0.15rem;
        margin-bottom: 1rem;
    }
    .tab {
        all: unset;
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.15);
        width: 100%;
        padding: 1rem 0;
        text-align: center;
        font-size: 0.9rem;
    }
    .tab:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    .selected,
    .selected:hover {
        background-color: rgba(0, 0, 0, 0.25);
    }
    .mobile-view {
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .desktop {
        display: none;
    }
    .box {
        display: flex;
        flex-direction: column;
        /* border: 1px solid black; */
    }
    .box .label {
        font-weight: bold;
        width: 100%;
        text-align: center;
    }
    .box .data {
        font-weight: 300;
        width: 100%;
        text-align: center;
    }
    .info {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
    }
    .group {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
    }
    .weapons-header {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        height: fit-content;
        /* margin-bottom: 1rem; */
        background-color: rgba(0, 0, 0, 0.25);
    }
    .header-title {
        padding: 0.2rem 0;
        width: 25%;
        text-align: center;
        margin: auto 0;
    }
    button .weapon {
    }
    .weapon {
        all: unset;
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        height: fit-content;
        padding: 0.2rem 0.1rem;
        /* margin-bottom: 1rem; */
        /* background-color: rgba(0, 0, 0, 0.05); */
    }
    .weapon:nth-child(even) {
        background-color: rgba(255, 255, 255, 0.2);
    }
    .weapon-item {
        width: 25%;
        text-align: center;
    }
    .small {
        margin: 1rem 0 0.5rem 0.5rem;
        width: 100%;
        text-align: left;
        font-size: 0.8rem;
    }
    @media only screen and (min-width: 1030px) {
        .info {
            display: flex;
            flex-direction: row;
        }
        .mobile-view {
            display: none;
        }
        .desktop {
            display: flex;
            width: 100%;
        }
        .skills {
            width: 15%;
            height: 100%;
            flex-direction: column;
        }
        .page {
            display: flex;
            gap: 0.5rem;
            width: 100%;
            padding: 0.25rem;
        }
        .content {
            display: flex;
        }
        .info-box {
            width: 25%;
            height: 50rem;
            margin-bottom: 0;
            margin-right: 1rem;
        }
        .content-box {
            width: 75%;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: flex-start;
            padding: 1rem;
        }
        .tabs {
            display: none;
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
