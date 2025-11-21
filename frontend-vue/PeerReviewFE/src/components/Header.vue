<template>
  <header class="main-header">
    <div class="header-container">
      <router-link to="/" class="logo">
        PeerGrade <span class="accent">Pro</span>
      </router-link>
      <nav class="nav-links">
        <router-link to="/features">Features</router-link>
        <router-link to="/pricing">Pricing (B2B)</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
      <div class="auth-links">
        <router-link to="/login" class="nav-btn login-btn">Login</router-link>
        <router-link to="/register" class="nav-btn register-btn">Sign Up</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
// No script logic needed for a basic header
</script>

<style scoped>
.main-header {
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  color: #1a202c;
}

.accent {
  color: #4c51bf; /* Indigo Accent */
}

.nav-links a {
  margin-left: 25px;
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #4c51bf;
}

.auth-links {
  display: flex;
  gap: 10px;
}

.nav-btn {
  padding: 8px 15px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.login-btn {
  color: #4c51bf;
  border: 1px solid #4c51bf;
}

.login-btn:hover {
  background-color: #e9ecfe;
}

.register-btn {
  background-color: #4c51bf;
  color: white;
  border: 1px solid #4c51bf;
}

.register-btn:hover {
  background-color: #5a62d4;
}
</style>