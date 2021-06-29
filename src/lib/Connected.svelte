<script>

    import { socket } from './stores/socket.js';
    import { User } from './stores/user.js';
    import { numUsers } from './stores/users.js';
	import Neelde from './Needle.svelte';

	let users = {};

    $socket.on("user joined", (data)=>{
		console.log('user joined', data);
		users[data.user.id] = new User(data.user);
		numUsers.set( data.numUsers );
	});

    $socket.on("user left", (data)=>{
		console.log('user left', data);
		delete users[data.user.id];
		numUsers.set( data.numUsers );
	});

	$socket.on("user updated", (data)=>{
		if( users.hasOwnProperty(data.user.id) ){
			users[data.user.id].setPosition( data.user.position );
		} else {
			users[data.user.id] = new User(data.user);
		}
		users = users;
	});

</script>

<ul class="bubbles">
	{#each Object.values(users) as user}
		<li><Neelde {user} /></li>
	{/each}
</ul>

<style>
</style>
