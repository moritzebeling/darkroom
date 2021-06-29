import { writable } from 'svelte/store';

export const user = writable( false );

/*
definition
*/

export class User {

    constructor( options = {} ){
        this.name = options.name || 'Anonymous';
        this.id = options.id || false;
        this.position = options.position || {
            x: 0,
            y: 0,
        };
    }

    setPosition( position ){
        this.position = position;
    }

    setId( id = false ){
        this.id = id;
    }

}
