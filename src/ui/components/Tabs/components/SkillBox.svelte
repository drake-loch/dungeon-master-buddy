<script>
    import SubSkill from "./SubSkill.svelte";

    import { CheckForModChange } from "/src/utilities/skillsConfig";

    export let skill = null;
    export let subSkills = null;
    export let mode = "view";

    $: if (skill) {
        skill.mod = CheckForModChange(skill.baseValue);
    }
    $: modCol = () => {
        let mod = skill.mod;
        if (mod > 0) {
            return "green";
        } else if (mod < 0) {
            return "red";
        } else {
            return "";
        }
    };
</script>

<div class="skillbox">
    <div class="skill">
        {#if skill}
            <p class="title" for="this">
                {skill.name.toUpperCase()}
            </p>
            <p class="mod {modCol()}">
                {Math.sign(skill.mod) === 1 ? "+" : ""}{skill.mod}
            </p>
            {#if mode === "edit" || mode === "create"}
                <input
                    type="text"
                    placeholder={skill.name}
                    bind:value={skill.baseValue}
                />
            {:else if mode === "view"}
                <p class="view">{skill.baseValue}</p>
            {/if}
        {/if}
    </div>
    {#if subSkills}
        <div class="subskills" for="this">
            {#each subSkills.filter((subSkill) => subSkill.parentSkill === skill.name) as subSkill}
                <SubSkill bind:subSkill />
            {/each}
        </div>
    {/if}
</div>

<style>
    .skillbox {
        width: 100%;
        /* width: 16rem; */
        height: fit-content;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        /* align-items: center; */
        /* border: 1px solid rgba(0, 0, 0, 0.5);
         */
        border: 2px solid var(--col-dark-light);
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 10px;
        /* padding: 0rem 0.5rem 0 0; */
        margin: 0 6px;
        background-color: rgba(255, 255, 255, 0.05);
    }
    .skill {
        width: 50%;
        /* height: 100%; */
        border-right: 1px solid var(--col-dark-light);
        box-sizing: border-box;
    }
    .title {
        font-size: 0.75rem;
        align-items: center;
        padding-bottom: 0.25rem;
        margin-bottom: 0.25rem;
        width: 100%;
        text-align: center;
        color: white;
        border-bottom: 2px solid var(--col-dark-light);
    }
    .subskills {
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        width: 50%;
        font-size: 0.75rem;
        align-items: center;
        margin-bottom: 0.25rem;
        text-align: center;
        color: white;
        padding: 0.25rem 0;
    }
    input {
        text-align: center;
        width: 100%;
        font-size: 1rem;
        background-color: transparent;
        background-color: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
    }
    .view {
        text-align: center;
        width: 100%;
        font-size: 0.8rem;
        background-color: transparent;
        border: none;
        color: white;
        margin-bottom: 0.5rem;
    }
    input:focus {
        outline: none;
        border: 2px solid rebeccapurple;
    }
    .mod {
        text-align: center;
        margin: 0 0 0.25rem 0;
        background-color: transparent;
        font-size: 1.25rem;
        color: white;
        box-sizing: border-box;
        background-color: rgba(0, 0, 0, 0.1);
    }
    .red {
        color: var(--col-label-red);
    }
    .green {
        color: var(--col-label-green);
    }

    /* Desktop */
    @media only screen and (min-width: 1030px) {
        .title {
            margin: 0;
        }
        .view {
            font-size: 0.75rem;
        }
        input {
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 1rem;
        }
        .skillbox {
            width: 100%;
            margin: 0 6px;
        }
    }
</style>
