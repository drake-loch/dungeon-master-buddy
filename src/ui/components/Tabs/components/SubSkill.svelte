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
        /* justify-content: space-between; */
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        height: fit-content;
        /* padding: 0 0.5rem; */
        box-sizing: border-box;
        margin-bottom: 0.25rem;
    }
    div:nth-child(odd) {
        background-color: rgba(0, 0, 0, 0.05);
    }
    .title {
        color: white;
        width: 80%;
        text-align: right;
    }
    .mod {
        color: white;
        width: 20%;
        text-align: left;
    }
    @media only screen and (min-width: 1030px) {
        .title {
            font-size: 0.65rem;
        }
    }
    .red {
        color: var(--col-label-red);
    }
    .green {
        color: var(--col-label-green);
    }
</style>
