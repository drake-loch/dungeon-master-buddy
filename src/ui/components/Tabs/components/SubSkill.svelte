<script lang="ts">
    export let subSkill = null;

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    $: modCol = () => {
        let mod = subSkill.mod;
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
    <p class="title">{capitalizeFirstLetter(subSkill.name)}</p>
    <p class="mod {modCol()}">
        {Math.sign(subSkill.mod) === 1 ? "+" : ""}{subSkill.mod}
    </p>
</div>

<style>
    div {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0 0.5rem;
        box-sizing: border-box;
    }
    .title {
        color: black;
    }
    .mod {
        color: white;
    }
    .red {
        color: var(--col-label-red);
    }
    .green {
        color: var(--col-label-green);
    }
</style>
