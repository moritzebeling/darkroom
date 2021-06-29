import { writable } from 'svelte/store';

export const alerts = writable([]);

export function addAlert( message ){
    alerts.update( l => [ ...l, message ] );
};
