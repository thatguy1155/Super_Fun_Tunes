<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-success">
      <div class="container">
        <nuxt-link to="/" class="navbar-brand">SUPER FUN TUNES</nuxt-link>
      
        <div v-if="$auth.loggedIn" class="text-light">hello {{$auth.user.userId}}</div>

        
      </div>
    </nav>
  </header>
</template>
<style scoped>
.navbar-brand {
  color: #ffff !important;
}
.container{
    display:flex;
    justify-content: space-between;
}
</style>