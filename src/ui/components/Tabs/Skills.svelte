<script>
    import SkillBox from "./components/SkillBox.svelte";
    import SubSkill from "./components/SubSkill.svelte";
    import Title from "./components/Title.svelte";

    export let newChar = null;
    export let mode = "view";

    $: if (newChar) {
        //update each subskill to match parentskill's value
        newChar.subSkills.forEach((subSkill) => {
            subSkill.mod = newChar.skills.find(
                (skill) => skill.name === subSkill.parentSkill
            ).mod;
        });
    }
</script>

<div class="skills">
    <Title title="Primary Skills" />
    {#each newChar.skills as skill}
        <SkillBox {mode} bind:skill>
            {#each newChar.subSkills.filter((subSkill) => subSkill.parentSkill === skill.name) as subSkill}
                <SubSkill bind:subSkill />
            {/each}
        </SkillBox>
    {/each}
</div>

<style>
    .skills {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 1.5rem 1rem 10rem 1rem;
        gap: 1.5rem;
        overflow-y: auto;
    }
    @media only screen and (min-width: 1030px) {
        .skills {
            padding: 1.5rem 2rem 10rem 2rem;
            justify-content: flex-start;
        }
    }
</style>
