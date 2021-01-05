<template>
  <transition :name="isForward ? 'forward' : 'backward'">
    <div v-if="selfIndex === currentIndex" class="ui-carousel-item-wrapper">
      <slot></slot>
    </div>
  </transition>
</template>
<script lang="ts">
import { getCurrentInstance, reactive, toRefs, watch } from "vue";

export default {
  name: "CarouselItem",
  props: {},
  setup() {
    const currentInstance = getCurrentInstance();
    let _prev = currentInstance.parent.ctx.currentIndex;

    const state = reactive({
      isForward: true,
      selfIndex: currentInstance.vnode.key,
      currentIndex: currentInstance.parent.ctx.currentIndex,
    });

    const itemLength = currentInstance.parent.slots.default()[0].children.length;
    watch(
      () => {
        return currentInstance.parent.ctx.currentIndex;
      },
      (value) => {
        _prev = state.currentIndex;
        state.currentIndex = value;
        state.isForward =
          (_prev < state.currentIndex && !(_prev === 0 && value === itemLength - 1)) ||
          (_prev === itemLength - 1 && value === 0);
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
  transition: all 0.3s ease;
}

.forward-enter-active {
  transform: translateX(100%);
}

.forward-enter-to {
  transform: translateX(0);
}

.forward-leave-active {
  transform: translateX(0);
}

.forward-leave-to {
  transform: translateX(-100%);
}

.backward-enter-active {
  transform: translateX(-100%);
}

.backward-enter-to {
  transform: translateX(0);
}

.backward-leave-active {
  transform: translateX(0);
}

.backward-leave-to {
  transform: translateX(100%);
}
</style>
