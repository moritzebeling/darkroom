<script>

    import { alerts } from './stores/alerts.js';
    import { fly, fade } from 'svelte/transition';

    let list = [];
    alerts.subscribe(value => {
        list = value;
        hide();
    });

    function hide(){
        if( list.length > 0 ){
            setTimeout(() => {
                list.shift();
                list = list;
            }, 5000);
        }
    }

</script>

<!-- <aside> -->
    {#each list as item}
        <div class="bubble" in:fly={{ duration: 200, y: 0, x: 100 }} out:fade={{ duration: 200 }}>
            {item}
        </div>
    {/each}
<!-- </aside> -->

<style>

    aside {
		position: fixed;
		z-index: 200;
		top: 0;
		left: 0;
		width: 100%;
		padding: 0.8rem;
		color: #000;
		display: flex;
    }

</style>
