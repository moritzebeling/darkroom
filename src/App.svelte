<script>

	import { onMount } from 'svelte';
	import { createSocket, socket } from './lib/stores/socket.js';
	import { User, user } from './lib/stores/user.js';
	import { users, numUsers } from './lib/stores/users.js';
	import Connected from './lib/Connected.svelte';
	import Position from './lib/Position.svelte';

	let newUser = new User;
	let connected = false;

	onMount(() => {
		connect();
    });

	async function connect(){

		await createSocket;

		user.set( newUser );

		$socket.emit('connect user', $user);
		$socket.on('connected', (data)=>{
			console.log('connected', data);
			connected = true;
			$user.setId( data.user.id );
			numUsers.set( data.numUsers );
		});

	}

	function disconnect(){
		$socket.emit('disconnect user', $user);
	}

</script>

<svelte:window on:beforeunload={disconnect} />

{#if $socket}

	<Connected />

{/if}

<section class="bubbles">

	<div>
		<Position />
	</div>

	{#if connected}

		<div>{$user.id}</div>

		<div>Connected</div>

		{#if $numUsers > 1}
			<div>{$numUsers} users online</div>
		{:else}
			<div>You are alone. Copy the URL to invite some friends...</div>
		{/if}

	{:else}
		<div>Connecting...</div>
	{/if}

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

</style>
