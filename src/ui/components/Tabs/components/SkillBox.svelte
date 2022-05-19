<script>
    import { CheckForModChange } from "/src/utilities/skillsConfig";

    export let skill = null;
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

<div>
    {#if skill}
        <p class="title" for="this">
            {skill.name.toUpperCase()}
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
        <p class="mod {modCol()}">
            {Math.sign(skill.mod) === 1 ? "+" : ""}{skill.mod}
        </p>
        <p class="title" for="this">
            <slot />
        </p>
    {/if}
</div>

<style>
    div {
        width: 8rem;
        /* height: fit-content; */
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid white;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 10px;
        padding: 0.3rem 0;
        background-color: rgba(255, 255, 255, 0.05);
    }
    .title {
        font-size: 0.75rem;
        align-items: center;
        margin-bottom: 0.25rem;
        width: 100%;
        text-align: center;
        color: white;
    }
    input {
        text-align: center;
        width: 100%;
        font-size: 1.2rem;
        background-color: var(--col-light-darkgrey);
        border: none;
        border-top: 2px solid var(--col-dark-light);
        border-radius: 5px;
        color: white;
        /* text-align: center; */
    }
    .view {
        text-align: center;
        width: 100%;
        font-size: 1.2rem;
        background-color: var(--col-light-darkgrey);
        border: none;
        border-top: 2px solid var(--col-dark-light);
        color: white;
    }
    input:focus {
        outline: none;
        border: 2px solid rebeccapurple;
    }
    .mod {
        border: 1px solid black;
        border-radius: 50%;
        padding: 0.5rem 0.8rem;
        margin: 0.25rem 0;
        background-color: var(--col-light-darkgrey);
        font-size: 0.8rem;
        color: white;
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
        input {
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 1.5rem;
        }
    }
</style>
