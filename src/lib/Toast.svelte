<script>

    import { slide } from 'svelte/transition';
    export let message = '';

    function hide(){
        setInterval(() => {
            message = '';
        }, 8000);
    }
    $: hide( message );

</script>

{#if message}
    {#key message}
        <div class="toast" transition:slide={{ duration: 300 }}>
            <div class="black padding">
                {message}
            </div>
        </div>
    {/key}
{/if}

<style lang="scss">

    .toast {
        margin: 0 0.5rem;
        overflow: hidden;
    }
    .padding {
        @include rounded;
    }

</style>
