<script>
    import { selectedCampaign } from "/src/utilities/campaignManager";

    import { onMount } from "svelte";

    import { showBreadcrumb } from "/src/utilities/breadCrumbStore";
    import { userData } from "/src/utilities/userData";
    import { user } from "/src/stores";
    import { page } from "$app/stores";

    $: if (
        $user?.uid &&
        $userData?.campaigns.length > 0 &&
        !$selectedCampaign
    ) {
        console.log("No campaign selected");
        // $worlds = await GetWorldsFromDB($user);
        console.log($userData);
        $selectedCampaign = $userData.campaigns.find(
            (c) => c.title === $page.params.campaignName
        );
    }
    onMount(() => {
        $showBreadcrumb = true;
    });
</script>

<slot />;
