<template>
  <div v-if="selfIndex === currentIndex" class="car-item-wrapper">
    <slot></slot>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, toRefs, watch } from "vue";

export default {
  name: "CarouselItem",
  props: {},
  setup() {
    const currentInstance = getCurrentInstance();

    const state = reactive({
      selfIndex: currentInstance.vnode.key,
      currentIndex: currentInstance.parent.ctx.currentIndex,
    });
    onMounted(() => {
      console.log(state.currentIndex);
    });
    watch(() => {
        return currentInstance.parent.ctx.currentIndex
    }, (value) => {
        state.currentIndex = value
    })
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss">
.car-item-wrapper {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
