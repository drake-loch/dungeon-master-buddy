<script>
    import Title from "./components/Title.svelte";
    import SkillBox from "./components/SkillBox.svelte";

    export let newChar = null;
</script>

<div class="sub">
    <Title title="Secondary Skills" />
    {#each newChar.subSkills as skill}
        <SkillBox
            bind:val={skill.baseValue}
            label={skill.name}
            placeholder={skill.name}
            width="20%"
        />
    {/each}
</div>

<style>
    .sub {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    @media only screen and (min-width: 1030px) {
        .sub {
            gap: 1rem;
        }
    }
</style>
