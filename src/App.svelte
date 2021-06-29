<script>

	import { onMount } from 'svelte';
	import { createSocket, socket } from './lib/stores/socket.js';
	import { User, user } from './lib/stores/user.js';
	import { numUsers } from './lib/stores/users.js';
	import { addAlert } from './lib/stores/alerts.js';
	import Connected from './lib/Connected.svelte';
	import Position from './lib/Position.svelte';
	import Alerts from './lib/Alerts.svelte';
	import Textarea from './lib/Textarea.svelte';

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
			addAlert('Connected');
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

<aside class="bubbles">

	<div>
		<Position />
	</div>

	{#if connected}

		{#if $numUsers > 1}
			<div>{$numUsers} users online</div>
		{:else}
			<div>You are alone. Copy the URL to invite some friends...</div>
		{/if}

	{:else}
		<div>Connecting...</div>
	{/if}

	<Alerts />

</aside>

<!-- <Textarea /> -->

<style>

	aside {
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		width: 100%;
		padding: 0.8rem;
		color: #000;
		display: flex;
	}

</style>
