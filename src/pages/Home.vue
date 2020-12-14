<template>
  <div>
    <img src="../assets/logo.png" alt="logo" />
    <p>
      {{ title }}
    </p>
    <button type="button" @click="myFn">alert8</button>
    <router-link to="error">to another page1</router-link>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useStore, mapGetters } from "vuex";
export default {
  setup() {
    const title = ref("boilerplate for vue3 project!")
    const store = useStore()
    const myFn = () => {
      console.log(store.getters['moduleA/getterA'], '1127')
    };
    return { title, myFn }
  },
};
</script>
