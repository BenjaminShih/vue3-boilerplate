<template>
  <div class="page-wrapper">
    <img src="../assets/logo.png" alt="logo">
    <p>
      {{ title }}
    </p>
    <button type="button" @click="myFn">
      apiTest
    </button>
    <br>
    <router-link to="error">
      to another page1
    </router-link>
  </div>
</template>

<script lang="ts">
import { ref, Ref } from "vue";
import { useStore } from "vuex";
import { logout } from '../utils/api/home'

export default {
  setup(): {
    title: Ref<string>;
    myFn: () => void;
  } {
    const title = ref("boilerplate for vue3 project!");
    const store = useStore();
    const myFn = () => {
      console.log(store.getters["moduleA/getterA"], "1127");
      logout().then((res: any) => {
        console.log('res', res);
      })
    };
    return { title, myFn };
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: #f2f2f2;
  text-align: center;
  >img {
    display: inline-block;
    transform: scale(0.9);
    width: 200px;
    height: 200px;
    user-select: none;
  }
}
</style>
