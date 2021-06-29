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

Position
<code>{positionX}</code>
<code>{positionY}</code>

<style>

    code {
        font-family: monospace;
    }

</style>
