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
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.45);
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 1rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .default {
        position: relative;
        height: fit-content;
        max-height: 100%;
        background-color: rgb(88, 88, 88);
        /* border-top: 1px solid var(--col-dark-main);
        border-left: 1px solid var(--col-dark-main);
        border-bottom: 2px solid var(--col-dark-lightest);
        border-right: 2px solid var(--col-dark-lightest); */
        border: 2px solid black;
        box-sizing: border-box;
        padding: 0.75rem;
        overflow-y: auto;
    }

    @media only screen and (min-width: 1030px) {
        .default {
            padding: 1rem 1rem 1rem 1rem;
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
