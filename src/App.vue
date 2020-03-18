<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background-color: #f2f2f2;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  font-size: 17px;
  color: #034a4a;
  padding: 10px;
}

#nav a.router-link-exact-active {
  color: #6abac9;
}
</style>
