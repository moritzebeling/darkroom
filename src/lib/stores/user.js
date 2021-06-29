import { writable } from 'svelte/store';

export const user = writable( false );

/*
definition
*/

export class User {

    constructor(){
        this.name = 'Anonymous';
        this.position = {
            x: 0,
            y: 0,
        };
    }

}
