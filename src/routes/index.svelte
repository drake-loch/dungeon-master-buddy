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
    const lockCreate = false;
    let lockError =
        "Account Creation is Disabled. Please contact the DMB Admin for access.";
    let error = "";

    async function login(e) {
        e.preventDefault();
        let res = await SignIn(email, password);
        $user = res.user;
        $isLoggedIn = true;
        error = "";
    }
    // dm_tester_buddy_1@mailinator.com
    async function createAcc(e) {
        e.preventDefault();
        if (lockCreate) {
            error = "Account Creation is Disabled";
            return;
        }
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
        <div class="bg">
            <div class="half">
                <h3>
                    ** WARNING: THIS APP IS IN VERY EARLY STAGES OF DEVELOPMENT.
                    USE AT YOUR OWN RISK. ACCOUNTS OR WORLDS MAY BE DELETED
                    WITHOUT NOTICE. **
                </h3>
            </div>
            <div class="right">
                <h2 class="login">Login</h2>
                <h3 class="mob">
                    ** WARNING: THIS APP IS IN VERY EARLY STAGES OF DEVELOPMENT.
                    USE AT YOUR OWN RISK. ACCOUNTS OR WORLDS MAY BE DELETED
                    WITHOUT NOTICE. **
                </h3>
                <form>
                    <div class="iandl">
                        <label class="label" for="email">Email:</label>
                        <input
                            placeholder="Enter Email"
                            bind:value={email}
                            class="input"
                            type="text"
                        />
                    </div>
                    <div class="iandl">
                        <label class="label" for="password">Password:</label>
                        <input
                            placeholder="Enter Password"
                            bind:value={password}
                            class="input"
                            type="password"
                        />
                    </div>
                    {#if lockCreate}
                        <p class="error">{lockError}</p>
                    {/if}
                    <div class="list" width="full">
                        <LittleButton func={(e) => login(e)}>Login</LittleButton
                        >
                        <LittleButton
                            disabled={lockCreate}
                            tip
                            func={(e) => createAcc(e)}
                            >Create Account</LittleButton
                        >
                    </div>
                </form>
            </div>
        </div>
    {/if}
</div>

<style>
    .half {
        display: none;
    }
    .bg {
        background-color: rgba(0, 0, 0, 0.45);
        padding: 2rem 1.5rem 4rem 1.5rem;
    }
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
        letter-spacing: 1px;
    }
    .iandl {
        display: flex;
        flex-direction: column;
    }
    .label {
        color: white;
        font-weight: 200;
        letter-spacing: 1.5px;
    }
    .login {
        font-weight: bold;
    }
    span {
        color: var(--col-brand);
        font-weight: 700;
    }
    .list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .page {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 0 0 0;
    }
    .input {
        font-size: 1rem;
        background: none;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        color: white;
        padding: 0.25rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .error {
        color: red;
        font-size: 0.7rem;
    }
    @media only screen and (min-width: 1030px) {
        .mob {
            display: none;
        }
        .bg {
            width: 50%;
            display: flex;
        }
        h1 {
            font-size: 4rem;
            margin-bottom: 5rem;
        }
        h2 {
            text-align: right;
        }
        h3 {
            width: 40%;
            background-color: rgba(255, 255, 255, 0.1);
            padding: 1rem 2rem;
        }
        .login {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        .page {
            height: 100vh;
            align-items: flex-end;
            /* justify-content: center; */
            padding-right: 10rem;
            box-sizing: border-box;
        }
        form {
            width: 100%;
            display: flex;
            flex-direction: column;
        }
        .list {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }
        .iandl {
            margin-left: auto;
            align-items: flex-end;
            width: 100%;
        }
        .input {
            width: 80%;
        }
        .half {
            display: flex;
            width: 50%;
            box-sizing: border-box;
        }
        .right {
            width: 50%;
        }
        .error {
            color: red;
            font-size: 0.8rem;
            text-align: right;
        }
    }
</style>
