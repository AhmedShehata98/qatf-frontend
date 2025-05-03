<template>
  <li
    class="w-full flex items-center justify-between p-4 bg-[#F4F6F9] rounded-lg shadow-sm"
  >
    <div class="flex items-center gap-4">
      <img
        :src="data.image"
        :alt="data.name"
        class="w-20 h-20 object-cover rounded-md"
      />
      <div class="flex flex-col items-start gap-3">
        <h4 class="text-lg font-semibold text-black">{{ data.name }}</h4>
        <select
          name="unit"
          id="unit"
          class="bg-black text-white px-5 py-1 rounded-md text-sm"
          v-model="selectedUnit"
        >
          <option v-for="unit in data.units" :key="unit" :value="unit">
            {{ unit }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-5 mt-2">
        <button
          @click="decrementQuantity"
          class="px-3 py-1 border border-gray-300 rounded-xl text-sm hover:bg-gray-100 disabled:opacity-50"
          :disabled="quantity <= 1"
        >
          -
        </button>
        <span class="font-semibold text-lg">{{ quantity }}</span>
        <button
          @click="incrementQuantity"
          class="px-3 py-1 border border-gray-300 rounded-xl text-sm hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <p class="text-green-600 font-bold px-5">{{ data.price }} ر.س</p>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

// Define the props the component accepts
const props = defineProps({
  data: {
    type: Object as () => {
      id: number;
      name: string;
      price: number;
      image: string;
      initialQuantity: number;
      units: string[];
    },
    required: true,
  },
});

// Define emits for updating quantity or unit
const emit = defineEmits(["update:quantity", "update:unit"]);

// Reactive state for quantity
const quantity = ref(props.data.initialQuantity || 1);
const selectedUnit = ref(props.data.units?.[0] || "كيلو"); // Default to first unit or 'كيلو'

// Methods to handle quantity changes
const incrementQuantity = () => {
  quantity.value++;
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// Watch for changes in quantity and emit update
watch(quantity, (newQuantity) => {
  emit("update:quantity", { id: props.data.id, quantity: newQuantity });
});

// Watch for changes in selected unit and emit update
watch(selectedUnit, (newUnit) => {
  emit("update:unit", { id: props.data.id, unit: newUnit });
});
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
