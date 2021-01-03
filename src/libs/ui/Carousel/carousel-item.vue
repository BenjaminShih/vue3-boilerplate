<template>
  <transition>
    <div v-if="selfIndex === currentIndex" class="ui-carousel-item-wrapper">
      <slot></slot>
    </div>
  </transition>
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
    watch(
      () => {
        return currentInstance.parent.ctx.currentIndex;
      },
      (value) => {
        state.currentIndex = value;
      }
    );
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.ui-carousel-item-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  transition: all .3s ease;
}

.v-enter-active {
    transform: translateX(100%);
}

.v-enter-to{
    transform: translateX(0);
}

.v-leave-active {
    transform: translateX(0);
}

.v-leave-to {
    transform: translateX(-100%);
}

</style>
