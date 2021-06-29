<script>

    import { socket } from './stores/socket.js';
    import { numUsers } from './stores/users.js';

    $socket.on("user joined", (data)=>{
		console.log('user joined', data);
		numUsers.set( data.numUsers );
	});

    $socket.on("user left", (data)=>{
		console.log('user left', data);
		numUsers.set( data.numUsers );
	});

</script>



<style>
</style>
