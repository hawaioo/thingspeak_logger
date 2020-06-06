<template>
  <div class="modal">
    <!-- Backdrop -->
    <transition
      name="modal-backdrop"
      enter-class="modal__backdrop--show"
      enter-active-class="modal__backdrop--shown"
      leave-active-class="modal__backdrop--hide"
      leave-to-class="modal__backdrop--hidden"
    >
      <div
        @click="hide"
        class="modal__backdrop"
        ref="backdrop"
        v-if="isVisible"
      ></div>
    </transition>

    <!-- Content -->
    <transition
      name="modal-container"
      enter-class="modal__container--show"
      enter-active-class="modal__container--shown"
      leave-active-class="modal__container--hide"
      leave-to-class="modal__container--hidden"
      @after-enter="onShown"
      @after-leave="onHidden"
    >
      <div class="modal__container" ref="container" v-if="isVisible">
        <div class="modal__header">
          <h3 class="modal__title" v-if="title">{{ title }}</h3>

          <button @click="hide" class="modal__close-handle" ref="closeButton">
            &times;
          </button>
        </div>

        <div class="modal__content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: String
  },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    show() {
      this.isVisible = true;
      this.$emit("show");
    },
    hide() {
      this.isVisible = false;
      this.$emit("hide");
    },
    onShown() {
      const { closeButton } = this.$refs;
      if (closeButton) closeButton.focus();
      this.$emit("shown");
    },
    onHidden() {
      this.$emit("hidden");
    }
  }
};
</script>

<style lang="scss">
$width: 80%;
$height: 500;
$header-size: 3rem;
$transition-duration: 200ms;

.modal {
  &__backdrop {
    background: rgba(0, 0, 0, 0.5);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;

    &--show,
    &--hidden {
      opacity: 0;
    }

    &--shown,
    &--hide {
      transition: opacity $transition-duration ease;
    }
  }

  &__close-handle {
    font-size: 2rem;
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    width: $header-size;
    height: $header-size;
  }

  &__container {
    background: #fff;
    box-sizing: border-box;
    height: #{$height}px;
    position: fixed;
    top: 0%;
    width: 100%;
    z-index: 2;

    @media screen and (min-width: 1024px) {
      top: 50%;
      left: 50%;
      margin-left: -#{$width / 2};
      margin-top: -#{$height / 2}px;
      width: 80%;
    }

    &--show,
    &--hidden {
      transform: scale(0.75) translateY(25%);
      opacity: 0;
    }

    &--shown,
    &--hide {
      transition: all $transition-duration ease;
    }
  }

  &__content {
    overflow: auto;
    position: absolute;
    padding: 1.5rem;
    bottom: 0;
    left: 0;
    top: $header-size;
    right: 0;
  }

  &__header {
    box-sizing: border-box;
    height: $header-size;
    border-bottom: 1px solid #eee;
    padding: 1rem;
  }

  &__title {
    padding: 0;
    margin: 0;
  }
}
</style>
