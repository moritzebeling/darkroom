<script>

    import { socket } from './stores/socket.js';
    import { user } from './stores/user.js';
    import throttle from 'just-throttle';

    let positionX = 0;
    let positionY = 0;

    function handleMouse( event ){

        positionX = event.clientX || 0;
        positionY = event.clientY || 0;

        if( $user ){
            $user.setPosition({
                x: positionX,
                y: positionY
            });

            $socket.emit('update user', $user);
        }

    }

    const handle = throttle(handleMouse, 30, {leading: true, trailing: true});

</script>

<svelte:window on:mousemove={handle} />

Position
<code>{positionX}</code>•<code>{positionY}</code>

<style>

    code {
        font-family: monospace;
    }

</style>
