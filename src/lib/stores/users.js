import { writable } from 'svelte/store';

export const users = writable([]);

export const numUsers = writable( 0 );
