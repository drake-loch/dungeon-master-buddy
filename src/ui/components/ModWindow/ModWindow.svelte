<script>
    export let showMod = false;
    export const toggleMod = () => {
        showMod = !showMod;
    };
    export let size = "small";
</script>

{#if showMod}
    <section>
        <div class={size}>
            <slot />
        </div>
    </section>
{/if}

<style>
    section {
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.75);
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 2rem;
    }
    div {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: rgb(148, 148, 148);
        box-sizing: border-box;
        padding: 1rem;
    }

    @media only screen and (min-width: 1030px) {
        div {
            margin: 0 auto;
        }
        .small {
            min-width: 30%;
            max-width: 35%;
        }
        .large {
            min-width: 50%;
        }
    }
</style>
