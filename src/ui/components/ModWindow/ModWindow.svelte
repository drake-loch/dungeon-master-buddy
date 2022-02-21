<script>
    export let showMod = false;
    export const toggleMod = () => {
        showMod = !showMod;
    };
    export let size = "small";
    export let customWindow = false;
</script>

{#if showMod}
    <section>
        {#if !customWindow}
            <div class="default {size}">
                <slot />
            </div>
        {:else}
            <div class="custom">
                <slot name="custom" />
            </div>
        {/if}
    </section>
{/if}

<style>
    section {
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.65);
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .default {
        position: relative;
        height: fit-content;
        max-height: 100%;
        background-color: rgb(148, 148, 148);
        border-top: 1px solid var(--col-dark-main);
        border-left: 1px solid var(--col-dark-main);
        border-bottom: 2px solid var(--col-dark-lightest);
        border-right: 2px solid var(--col-dark-lightest);
        box-sizing: border-box;
        padding: 1rem 1rem 6rem 1rem;
    }

    @media only screen and (min-width: 1030px) {
        .default {
            padding: 1rem 1rem 16rem 1rem;
        }
        .small {
            min-width: 30%;
            max-width: 35%;
        }
        .large {
            min-width: 50%;
        }
        .custom {
            width: 70%;
        }
    }
</style>
