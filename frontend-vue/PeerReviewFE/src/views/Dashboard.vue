<template>
  <div class="dashboard">
    <h1>PeerGrade Pro Dashboard</h1>
    <p>Welcome! This is where you will manage your submissions and peer reviews.</p>
    <router-link to="/">
      <button class="home-btn">Go Back Home</button>
    </router-link>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  console.log('User is on the Dashboard.');
});
</script>

<style scoped>
.dashboard {
  padding: 50px;
  text-align: center;
}
.home-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4c51bf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>