<script>

    import { onMount } from 'svelte';
    let textarea;
    function focus(){
        textarea.focus();
    }
    onMount( focus );

</script>

<svelte:window on:keydown={focus} on:click={focus} />

<div>
    <textarea bind:this={textarea} rows="1" maxlength="100" placeholder="Your message"></textarea>
</div>

<style>
    div {
        padding: 0.8rem;
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    textarea {
        background-color: blue;
        color: #fff;
        margin: 0.2rem;
	    border-radius: 2rem;
	    padding: 0.3em 0.7em;
        width: 100%;
        display: block;
        resize: none;
    }
</style>
