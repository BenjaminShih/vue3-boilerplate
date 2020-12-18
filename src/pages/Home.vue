<template>
  <div>
    <img src="../assets/logo.png" alt="logo">
    <p>
      {{ title }}
    </p>
    <button type="button" @click="myFn">
      alert8
    </button>
    <router-link to="error">
      to another page1
    </router-link>
  </div>
</template>

<script lang="ts">
import { ref, Ref } from "vue";
import { useStore } from "vuex";
import { getPersonalInfo } from '../utils/api/home'

export default {
  setup(): {
    title: Ref<string>;
    myFn: () => void;
  } {
    const title = ref("boilerplate for vue3 project!");
    const store = useStore();
    const myFn = () => {
      console.log(store.getters["moduleA/getterA"], "1127");
      getPersonalInfo().then((res: any) => {
        console.log('res', res);
      })
    };
    return { title, myFn };
  },
};
</script>
