<template>
  <div>
    <Header />
    <main class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1>
            <span class="highlight">Collaborative Peer-Review</span> Grading Network
          </h1>
          <p class="tagline">
            Automate high-volume, quality-controlled peer assessment. Improve student **programming** and **critical review skills** to boost employment success.
          </p>

          <AuthButtons />
        </div>

        <div class="hero-image">
          
        </div>
      </div>
    </main>

    <section class="value-props">
      <h2>Why PeerGrade Pro?</h2>
      <div class="prop-grid">
        <div class="prop-card">
          <h3>✅ Fixed Rubric Quality</h3>
          <p>Every review is guided by a fixed, consistent rubric, ensuring high-quality, actionable feedback across all submissions.</p>
        </div>
        <div class="prop-card">
          <h3>🏆 Gamified Skill Building</h3>
          <p>Students earn points and badges for the quality and consistency of their reviews, fostering engagement and critical thinking.</p>
        </div>
        <div class="prop-card">
          <h3>🏛️ B2B Scale & Control</h3>
          <p>Perfect for Universities/High Schools needing to manage high-volume assessment workflows with complete instructor oversight.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import AuthButtons from '@/components/AuthButtons.vue'; 
import Header from '@/components/Header.vue';
</script>

<style scoped>
.hero-section {
  padding: 100px 20px;
  background-color: #f8faff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.hero-content {
  max-width: 550px;
}

h1 {
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 20px;
  color: #1a202c;
}

.highlight {
  color: #4c51bf;
}

.tagline {
  font-size: 1.3rem;
  color: #4a5568;
  margin-bottom: 30px;
}

.hero-image {
  flex-shrink: 0;
  width: 500px;
  height: 350px;
  background-color: #e9ecfe; 
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(76, 81, 191, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4c51bf;
  font-weight: 600;
  text-align: center;
}

.value-props {
  padding: 60px 20px;
  text-align: center;
  background-color: #ffffff;
}

.value-props h2 {
  font-size: 2rem;
  color: #1a202c;
  margin-bottom: 40px;
}

.prop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.prop-card {
  padding: 30px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  text-align: left;
  transition: transform 0.3s, box-shadow 0.3s;
}

.prop-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.prop-card h3 {
  color: #4c51bf;
  margin-bottom: 15px;
}
</style>