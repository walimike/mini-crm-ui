<template>
  <v-container>
    <h1>Sign In</h1>
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="email"
        label="Email"
        required
        :rules="[rules.required, rules.email]"
      />
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
        :rules="[rules.required]"
      />
      <v-btn color="primary" :disabled="!valid || loading" @click="handleLogin">
        {{ loading ? "Signing In..." : "Sign In" }}
      </v-btn>
      <p v-if="error" class="error-message">{{ error }}</p>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const valid = ref(false);
const loading = ref(false);
const rules = {
  required: (v) => !!v || "This field is required",
  email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
};

const error = authStore.error;

const handleLogin = async () => {
  loading.value = true;
  await authStore.login(email.value, password.value);
  loading.value = false;
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
