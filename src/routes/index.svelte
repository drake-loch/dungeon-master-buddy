<script>
    import VerticleList from "/src/ui/components/VerticleList/VerticleList.svelte";
    import BigButton from "/src/ui/components/BigButton/BigButton.svelte";
    import { onMount } from "svelte";
    import { user, isLoggedIn } from "../stores/index";
    import TextInput from "/src/ui/components/TextInput/TextInput.svelte";
    import {
        CreateUser,
        LogOff,
        SignIn,
        initUserDataInDB,
    } from "/src/utilities/firebase";

    import LittleButton from "/src/ui/components/LittleButton/LittleButton.svelte";

    let email = "";
    let password = "";

    async function login(e) {
        e.preventDefault();
        let res = await SignIn(email, password);
        $user = res.user;
        $isLoggedIn = true;
    }
    async function createAcc(e) {
        e.preventDefault();
        let res = await CreateUser(email, password);
        $user = res.user;
        $isLoggedIn = true;
        initUserDataInDB($user);
    }
    function logoff() {
        LogOff();
        $user = null;
        $isLoggedIn = false;
    }
</script>

<div class="page">
    <h1>Welcome to <span>DM Buddy!</span></h1>
    <br />
    {#if $isLoggedIn}
        <h2>Are you a...</h2>

        <VerticleList>
            <BigButton nav="/dm">Dungeon Master</BigButton>
            <BigButton>Player</BigButton>
        </VerticleList>
        <LittleButton func={logoff} type="warning">Logout</LittleButton>
    {:else}
        <h2 class="login">Login</h2>
        <h3>
            **WARNING: THIS APP IS STILL UNDER DEVELOPMENT. USE AT YOUR OWN
            RISK. ACCOUNTS OR WORLDS MAY BE DELETED WITHOUT NOTICE. THIS WILL BE
            DIFFERENT ONCE IT IS OFFICALLY RELEASED**
        </h3>
        <form>
            <TextInput bind:val={email} fieldType="email" label="Email:" />
            <TextInput
                bind:val={password}
                fieldType="password"
                label="Password:"
            />
            <br />
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
        color: white;
    }
    h3 {
        width: 100%;
        text-align: center;
        color: red;
        font-size: 0.7rem;
        margin-bottom: 2rem;
    }
    .login {
        font-weight: bold;
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
        .login {
            font-size: 2rem;
        }
        .page {
            height: 60vh;
            align-items: flex-end;
            justify-content: center;
            padding-right: 10rem;
            box-sizing: border-box;
        }
        form {
            width: 30%;
            display: flex;
            flex-direction: column;
        }
    }
</style>
