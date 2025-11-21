<template>
  <div class="auth-actions">
    <router-link to="/register" class="btn primary-btn">
      Get Started - Free Registration
    </router-link>
    <router-link to="/login" class="btn secondary-btn">
      Log In
    </router-link>
  </div>
</template>

<script setup>
// Uses router-link for built-in navigation
</script>

<style scoped>
.auth-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 12px 25px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none; /* Important for router-link */
  transition: all 0.2s;
  display: inline-block;
}

.primary-btn {
  background-color: #4c51bf; /* Indigo */
  color: white;
  border: 2px solid #4c51bf;
}

.primary-btn:hover {
  background-color: #5a62d4;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(76, 81, 191, 0.3);
}

.secondary-btn {
  background-color: transparent;
  color: #4c51bf;
  border: 2px solid #4c51bf;
}

.secondary-btn:hover {
  background-color: #e9ecfe;
}
</style>