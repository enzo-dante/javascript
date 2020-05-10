<!-- component w/ template and parent element -->
<template>
  <div class="navbar">
    <nav class="nav-extended pink">
      <div class="nav-content">
        <router-link :to="{ name: 'Index'}">
          <title class="nav-title">Snapshot</title>
        </router-link>
        <a href class="btn-floating btn-large halfway-fab yellow darken-2">
          <router-link :to="{ name: 'AddTrip' }">
            <!-- google font library: i tag = icon class="material-icons" -->
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<!-- script that exports component obj w/ props -->
<script>
export default {
  name: "Navbar",
  date() {}
};
</script>

<style>
.navbar nav {
  padding: 0 20px;
}
</style>
