<template>
  <div>
    <img src="../assets/logo.png" alt="logo" />
    <p>
      {{ title }}
    </p>
    <button type="button" @click="myFn">alert</button>
    <router-link to="error">to another page</router-link>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    const title = ref("boilerplate for vue3 project!");
    const myFn = () => {
        alert('yeah!');
    }
    return { title, myFn };
  },
};
</script>
