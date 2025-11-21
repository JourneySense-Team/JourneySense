<template>
  <div class="auth-page">
    <div class="auth-form-container">
      <form @submit.prevent="handleLogin" class="auth-form">
        <h2>Log In to PeerGrade Pro</h2>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="email" required placeholder="name@university.edu" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required placeholder="********" />
        </div>

        <button type="submit" :disabled="isLoading" class="submit-btn">
          {{ isLoading ? 'Logging In...' : 'Log In' }}
        </button>

        <p class="footer-link">
          Don't have an account? 
          <router-link to="/register">Register here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const isLoading = ref(false);

const handleLogin = () => {
  if (!email.value || !password.value) return;

  isLoading.value = true;
  
  console.log('Attempting login with:', email.value);

  setTimeout(() => {
    isLoading.value = false;
    alert('Login successful! Redirecting to dashboard.');
    router.push({ name: 'dashboard' });
  }, 1500);
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background-color: #f8faff;
}

.auth-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
}

.auth-form {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-form h2 {
  text-align: center;
  color: #1a202c;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #4a5568;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #4c51bf;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #5a62d4;
}

.submit-btn:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.footer-link {
  text-align: center;
  margin-top: 20px;
  color: #4a5568;
}

.footer-link a {
  color: #4c51bf;
  text-decoration: none;
  font-weight: 600;
}
</style>