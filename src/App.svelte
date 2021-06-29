<script>

	import { onMount } from 'svelte';
	import { createSocket, socket } from './lib/stores/socket.js';
	import { User, user } from './lib/stores/user.js';
	import Position from './lib/Position.svelte';

	onMount(async () => {

		await createSocket;

		let newUser = new User;
		user.set( newUser );

		$socket.emit('connect user', $user);

    });

	function disconnect(){
		$socket.emit('disconnect user', $user);
	}

</script>

<svelte:window on:beforeunload={disconnect} />

<section>

	{#if $socket}
		<div class="bubble">
			Connected
		</div>
	{/if}

	<div class="bubble">
		<Position />
	</div>

</section>

<style>

	section {
		position: fixed;
		z-index: 100;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0.8rem;
		color: #000;
		display: flex;
	}
	section div {
		margin: 0.2rem;
		border-radius: 2rem;
		padding: 0.3em 0.7em;
		background-color: #fff;
	}

</style>
