<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

#app {
  text-align: center;
  color: #2c3e50;
  background: rgb(250, 250, 250);
  font-family: "Montserrat", sans-serif, Arial;
  font-display: swap;
  min-height: 1300px;
  height: 100%;
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

/* routering transisiton */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.2s;
}
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.2s;
}
</style>
