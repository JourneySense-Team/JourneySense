<template>
  <div class="auth-page">
    <Header />
    <div class="auth-form-container">
      <form @submit.prevent="handleRegister" class="auth-form">
        <h2>Create Your PeerGrade Pro Account</h2>
        <div class="form-group">
          <label for="username">Full Name / Display Name</label>
          <input type="text" id="username" v-model="name" required placeholder="Jane Doe" />
        </div>
        <div class="form-group">
          <label for="email">Email Address (Institutional or Personal)</label>
          <input type="email" id="email" v-model="email" required placeholder="name@university.edu" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required placeholder="Minimum 8 characters" minlength="8" />
        </div>
        <div class="form-group">
          <label for="role">Account Type</label>
          <select id="role" v-model="role" required>
            <option value="" disabled>Select your role</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Administrator (B2B)</option>
          </select>
        </div>

        <button type="submit" :disabled="isLoading" class="submit-btn">
          {{ isLoading ? 'Registering...' : 'Register Account' }}
        </button>

        <p class="footer-link">
          Already have an account? 
          <router-link to="/login">Log In here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const role = ref(''); // Added role selection
const isLoading = ref(false);

const handleRegister = () => {
  if (!name.value || !email.value || !password.value || !role.value) return;

  isLoading.value = true;
  
  // --- REPLACE with actual API call ---
  console.log('Attempting registration for:', email.value, 'as', role.value);

  // Simulate API call delay
  setTimeout(() => {
    isLoading.value = false;
    
    // On successful registration:
    alert('Registration successful! Please log in.');
    router.push({ name: 'login' }); // Redirect to login page
  }, 1500);
  // ------------------------------------
};
</script>

<style scoped>
/* Inherits shared styles from Login.vue for consistency */
@import url('./Login.vue'); /* Import common styles, or place them in a shared CSS file */

/* Specific styles for register form, if any */
.auth-form {
  max-width: 450px; /* Slightly wider for more fields */
}
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  appearance: none; /* Removes default dropdown arrow */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%234c51bf'%3e%3cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
}
</style>