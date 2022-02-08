<script>
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import { onMount } from "svelte";
    import authStore from "../stores/index";
    import TextInput from "/src/ui/components/TextInput/TextInput.svelte";
    import { CreateUser, LogOff, SignIn, auth } from "/src/utilities/firebase";
    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";

    let loggedUser = null;

    let email = "";
    let password = "";

    onMount(async () => {
        authStore.subscribe(
            async ({ isLoggedIn, firebaseControlled, user }) => {
                if (isLoggedIn && firebaseControlled) {
                    loggedUser = user;
                    // console.log(loggedUser);
                }
            }
        );
        auth.onAuthStateChanged((user) => {
            authStore.set({
                isLoggedIn: user !== null,
                user,
                firebaseControlled: true,
            });
        });
    });

    function login(e) {
        e.preventDefault();
        SignIn(email, password);
    }
    function createAcc(e) {
        e.preventDefault();
        CreateUser(email, password);
    }
    function logoff() {
        LogOff();
    }
</script>

<div class="page">
    <h1>Welcome to <span>DM Buddy!</span></h1>
    <br />
    {#if loggedUser}
        <h2>Are you a...</h2>

        <VerticleList>
            <BigButton nav="/dm">Dungeon Master</BigButton>
            <BigButton>Player</BigButton>
        </VerticleList>
        <LittleButton func={logoff} type="warning">Logout</LittleButton>
    {:else}
        <h2>Login</h2>
        <form>
            <TextInput bind:val={email} fieldType="email" label="email" />
            <TextInput
                bind:val={password}
                fieldType="password"
                label="password"
            />
            <VerticleList width="full">
                <BigButton func={(e) => login(e)}>Login</BigButton>
                <BigButton func={(e) => createAcc(e)}>Create Account</BigButton>
            </VerticleList>
        </form>
    {/if}
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
    .page {
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
        .page {
            height: 60vh;
            align-items: flex-end;
            justify-content: center;
            padding-right: 10rem;
            box-sizing: border-box;
        }
        form {
            width: 25%;
            display: flex;
            flex-direction: column;
        }
    }
</style>
