<template>
  <router-view />
</template>

<script setup>
// This is the root component where global structure might live.
// Since we included TheHeader in Home.vue, Login.vue, etc., 
// App.vue is kept minimal here to just render the current page (view).
</script>

<style>
/* Optional: Global styles can be put here, 
   but it's better to manage them in main.css or a dedicated style file. 

   The styles from the individual components (Home, Login, Register) 
   will automatically apply when they are rendered in the <router-view>.
*/
</style>