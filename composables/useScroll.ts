import { ref, onMounted, onUnmounted } from "vue";

export const useScroll = () => {
  const scrollX = ref(0);
  const scrollY = ref(0);

  const handleScroll = () => {
    if (import.meta.client) {
      scrollX.value = window.scrollX;
      scrollY.value = window.scrollY;
    }
  };

  onMounted(() => {
    if (import.meta.client) {
      window.addEventListener("scroll", handleScroll);
      // تهيئة القيم الأولية
      handleScroll();
    }
  });

  onUnmounted(() => {
    if (import.meta.client) {
      window.removeEventListener("scroll", handleScroll);
    }
  });

  return {
    scrollX,
    scrollY,
  };
};
