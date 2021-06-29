/*
config
*/

const API = 'http://localhost:5000';

/*
store
*/

import { writable } from 'svelte/store';

export const socket = writable( false );

/*
init
*/

export const createSocket = new Promise((resolve, reject ) => {

  const script = document.createElement("script");
  script.src = "/socket.io/socket.io.js";
  document.head.appendChild(script);

  script.onload = () => {
    const client = io( API );
    socket.set( client );
    console.info('Socket.io connected');
    resolve('done');
  }

});
