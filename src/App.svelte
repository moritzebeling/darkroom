<script>

	import { onMount } from 'svelte';
	import { createSocket, socket } from './lib/stores/socket.js';
	import { User, user } from './lib/stores/user.js';
	import Position from './lib/Position.svelte';

	onMount(async () => {

		await createSocket;

		let newUser = new User;
		user.set( newUser );
		console.log( $user );

		$socket.emit('connect user', $user);

    });

</script>

{#if $socket}
	<Position />
{/if}

<style>
</style>
