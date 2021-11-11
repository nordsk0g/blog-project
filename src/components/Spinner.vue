<template>
  <div class="spin"></div>
</template>

<script>
export default {

}
</script>

<style>
  .spin {
    display: block;
    width: 2.5em;
    height: 2.5em;
    margin: 1.75em auto;
    border: 3px solid transparent;
    border-radius: 50%;
    border-top-color: #00697E;
    animation: spin 1s ease infinite;
  }

  @keyframes spin {
    to { transform: rotateZ(360deg) }
  }

</style>