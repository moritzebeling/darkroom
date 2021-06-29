<script>

    import throttle from 'just-throttle';

    let positionX = 0;
    let positionY = 0;

    function handleMouse( event ){

        positionX = event.clientX;
        positionY = event.clientY;

    }

    const handle = throttle(handleMouse, 30, {leading: true, trailing: true});

</script>

<svelte:window on:mousemove={handle} />

<div>
    {positionX} {positionY}
</div>

<style>

    div {
        position: fixed;
        z-index: 100;
        bottom: 1rem;
        left: 1rem;
        background-color: #fff;
        color: #000;
        border-radius: 2rem;
        padding: 0.3em 0.7em;
    }

</style>
