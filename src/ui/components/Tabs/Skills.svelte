<script>
    import BuilderInput from "../TextInput/BuilderInput.svelte";

    export let newChar = null;
</script>

<div class="skills">
    {#each newChar.skills as skill}
        <BuilderInput
            bind:val={skill.baseValue}
            label={skill.name}
            placeholder={skill.name}
            width="20%"
        />
    {/each}
</div>

<style>
    .skills {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 1.5rem 1rem;
        gap: 1.5rem;
    }
    @media only screen and (min-width: 1030px) {
        .skills {
            padding: 1.5rem 2rem;
        }
    }
</style>
