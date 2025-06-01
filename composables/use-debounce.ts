import { ref, watch } from "vue";

/**
 * Creates a debounced version of a ref value
 * @param value - The reactive value to debounce
 * @param delay - The delay in milliseconds
 * @returns A ref containing the debounced value
 */
export const useDebounce = <T>(value: Ref<T>, delay: number = 300) => {
  const debouncedValue = ref<T>(value.value);
  let timeoutId: NodeJS.Timeout | null = null;

  watch(value, (newValue) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  });

  return debouncedValue;
};
