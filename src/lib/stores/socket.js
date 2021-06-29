/*
config
*/

const API = `${window.location.protocol}//${window.location.host}`;

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
