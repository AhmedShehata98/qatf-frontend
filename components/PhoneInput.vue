<template>
  <div
    class="flex flex-1 items-stretch border border-gray-300 rounded-md overflow-hidden focus-within:border-black"
  >
    <!-- Country Code Selector -->
    <div class="relative flex items-center bg-background-500 pl-3">
      <!-- Display Selected Country Flag -->
      <img
        v-if="selectedCountry"
        :src="selectedCountry.flag"
        :alt="selectedCountry.name"
        width="32"
        height="32"
        class="w-8 h-auto mr-2 flex-shrink-0"
      />
      <div class="custom-select">
        <select
          v-model="selectedCountryCode"
          aria-label="Country Code"
          :name="selectElementName"
          :id="selectElementId"
          class="appearance-none bg-transparent h-full pr-8 text-zinc-700 focus:outline-none cursor-pointer py-2 text-sm"
        >
          <option
            v-for="country in countries"
            :key="country.iso"
            :value="country.code"
            class="text-zinc-900 p-2 text-sm"
          >
            {{ country.code }}
          </option>
        </select>
      </div>

      <div
        class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>

    <!-- Phone Number Input -->
    <input
      v-model="phoneNumberInput"
      type="tel"
      placeholder="Phone Number"
      aria-label="Phone Number"
      pattern="[0-9]*"
      maxlength="10"
      :id="$attrs.id  as string | undefined"
      :name="$attrs.name as string | undefined"
      class="flex-grow p-2 text-zinc-900 focus:outline-none text-sm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"; // Import computed
interface Country {
  name: string;
  code: string; // Dialing code e.g. +966
  iso: string; // ISO 3166-1 alpha-2 e.g. SA
  flag: string;
}

// Define models for country code and phone number
// These will be bound to v-model:countryCode and v-model:phoneNumber in the parent
const selectedCountryCode = defineModel<string>("countryCode");
const phoneNumberInput = defineModel<string>("phoneNumber");
defineProps<{
  selectElementId: string;
  selectElementName: string;
}>();

// Data for Arabian countries (add more as needed)
const countries = ref<Country[]>([
  {
    name: "Saudi Arabia",
    code: "+966",
    iso: "SA",
    flag: "https://flagcdn.com/w20/sa.png", // Using PNG for potentially better rendering consistency in <img>
  },
  {
    name: "United Arab Emirates",
    code: "+971",
    iso: "AE",
    flag: "https://flagcdn.com/w20/ae.png",
  },
  {
    name: "Egypt",
    code: "+20",
    iso: "EG",
    flag: "https://flagcdn.com/w20/eg.png",
  },
  {
    name: "Jordan",
    code: "+962",
    iso: "JO",
    flag: "https://flagcdn.com/w20/jo.png",
  },
  {
    name: "Kuwait",
    code: "+965",
    iso: "KW",
    flag: "https://flagcdn.com/w20/kw.png",
  },
  {
    name: "Qatar",
    code: "+974",
    iso: "QA",
    flag: "https://flagcdn.com/w20/qa.png",
  },
  {
    name: "Bahrain",
    code: "+973",
    iso: "BH",
    flag: "https://flagcdn.com/w20/bh.png",
  },
  {
    name: "Oman",
    code: "+968",
    iso: "OM",
    flag: "https://flagcdn.com/w20/om.png",
  },
  {
    name: "Lebanon",
    code: "+961",
    iso: "LB",
    flag: "https://flagcdn.com/w20/lb.png",
  },
]);

// Initialize with default if no v-model value is provided initially
if (selectedCountryCode.value === undefined && countries.value.length > 0) {
  selectedCountryCode.value = countries.value[0].code;
}
if (phoneNumberInput.value === undefined) {
  phoneNumberInput.value = "";
}

// Computed property to get the currently selected country object
const selectedCountry = computed(() => {
  return countries.value.find(
    (country) => country.code === selectedCountryCode.value
  );
});
</script>

<style scoped>
/* select {
 
  min-width: 4rem;
  width: 100%;
  position: relative;
} */

.custom-select {
  min-width: 4rem;
  position: relative;
}

.custom-select select {
  appearance: none;
  width: 100%;
  font-size: 0.95rem;
  padding: 0.3em 2.5em 0.3em 0.5em;
  background-color: var(--background-color-500);
  border-inline-end: 2px solid var(--background-color-600);
  border-color: transparent;
  border-radius: 0.25rem;
  color: var(--text-color-default);
  cursor: pointer;
}
.custom-select::before,
.custom-select::after {
  --size: 0.3rem;
  position: absolute;
  content: "";
  right: 1rem;
  pointer-events: none;
}

.custom-select::before {
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
  border-bottom: var(--size) solid var(--background-color-600);
  top: 40%;
}

.custom-select::after {
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
  border-top: var(--size) solid var(--background-color-600);
  top: 55%;
}

select option:hover {
  background-color: var(--primary-color, #ef4444); /* Use CSS var or fallback */
  color: white;
}

input[type="tel"] {
  -moz-appearance: textfield;
}
input[type="tel"]::-webkit-outer-spin-button,
input[type="tel"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
