<template>
  <transition name="modal-fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      @click.self="closeModal"
    >
      <!-- Modal Content Slot -->
      <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watchEffect } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

// Prevent background scroll when modal is open
watchEffect(() => {
  if (import.meta.client)
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
});

// Optional: Close modal on Escape key press
onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && props.isOpen) {
      closeModal();
    }
  };
  document.addEventListener("keydown", handleEscape);
  // Cleanup listener on component unmount
  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
    // Ensure body scroll is restored if component is unmounted while open
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "";
    }
  });
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Ensure the modal content itself doesn't trigger the close on click */
.bg-white {
  /* Add any specific styling for the modal content box here */
}
</style>
