<script>
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    function test() {
        console.log("PING");
    }
</script>

<div>
    <h1>Welcome to DM Buddy!</h1>
    <br />
    <h2>Are you a...</h2>

    <VerticleList>
        <BigButton nav="/dm">Dungeon Master</BigButton>
        <BigButton>Player</BigButton>
    </VerticleList>
</div>

<style>
    h2 {
        margin-bottom: 2rem;
    }
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
