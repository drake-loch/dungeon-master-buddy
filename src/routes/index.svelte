<script>
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
</script>

<div>
    <h1>Welcome to <span>DM Buddy!</span></h1>
    <br />
    <h2>Are you a...</h2>

    <VerticleList>
        <BigButton nav="/dm">Dungeon Master</BigButton>
        <BigButton>Player</BigButton>
    </VerticleList>
</div>

<style>
    h1 {
        font-size: 3rem;
        text-align: center;
        margin-bottom: 1rem;
        font-weight: 400;
    }
    h2 {
        margin-bottom: 2rem;
        font-weight: 400;
    }
    span {
        color: var(--col-brand);
        font-weight: 700;
    }
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    @media only screen and (min-width: 1030px) {
        h1 {
            font-size: 4rem;
            margin-bottom: 5rem;
        }
        h2 {
            font-size: 1.5rem;
        }
        div {
            height: 60vh;
            align-items: flex-end;
            justify-content: center;
            padding-right: 10rem;
            box-sizing: border-box;
        }
    }
</style>
