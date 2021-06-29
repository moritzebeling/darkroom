<script>

    export let user;

    // let x = user.position.x || -200;
    // let y = user.position.y || -200;

</script>

<article class="bubble" style="left:{user.position.x}px;top:{user.position.y}px;">
    {user.id}: {user.name} {user.position.x} {user.position.y}
</article>

<style>

    article {
        position: fixed;
        top: -200px;
        left: -200px;
        background-color: #000;
        color: #fff;
        transition-property: top, left;
        transition-duration: 100ms;
        transition-timing-function: ease;
        white-space: nowrap;
    }

</style>
