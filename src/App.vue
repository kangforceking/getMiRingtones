<template>
  <div id="app">
    <p>没那么多</p>
    <p>{{ message }}</p>
    <div id="nav"></div>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
        message: 'message，你出来了吗？'
      }
    }
  }
</script>