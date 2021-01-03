<template>
  <div class="carousel-wrapper">
    <carousel :duration="3000" :start-index="1">
      <carousel-item v-for="(item, index) in data" :key="index">
        <img :src="item" />
      </carousel-item>
    </carousel>
  </div>
  <!-- <router-view></router-view> -->
</template>

<script>
import { onMounted } from "vue";

const data = [
  'https://img.alicdn.com/simba/img/TB134ZgeqL7gK0jSZFBxKNZZpXa.jpeg',
  'https://aecpm.alicdn.com/imgextra/i4/143584903/O1CN01quRzdz1m5cXM0oX3V_!!143584903-0-alimamazszw.jpg',
  'https://gw.alicdn.com/imgextra/i4/1725301/O1CN018heFDY1p1uCCPez3J_!!1725301-0-lubanu.jpg',
  'https://aecpm.alicdn.com/tps/i2/TB10vPXKpXXXXacXXXXvKyzTVXX-520-280.jpg',
];

export default {
  name: "App",
  setup() {
    return { data };
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.carousel-wrapper {
  width: 520px;
  height: 280px;
}
</style>
