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
import { useStore, mapGetters } from 'vuex'
export default {
  setup() {
    const title = ref("boilerplate for vue3 project!")
    const store = useStore()
    const myFn = () => {
        console.log(store)
    }
    return { title, myFn }
  },
  mounted() {
      console.log(this['moduleA/getterA'])
  },
  computed: {
      ...mapGetters([
          'moduleA/getterA',
          'moduleB/getterA'
      ])
  }
};
</script>
