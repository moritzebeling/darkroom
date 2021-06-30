<script>

    import { position } from './stores/position.js';

    let x = 0;
    let y = 0;

    position.subscribe( value => {
        x = value.x;
        y = value.y;
    });

</script>

Position <code>{x}</code> <code>{y}</code>

<style>

    code {
        font-family: monospace;
    }

</style>
