<template>
  <Modal :is-open="isOpen">
    <div
      class="flex items-start justify-start flex-col p-6 bg-background rounded-[10px] w-11/12 sm:w-10/12 md:w-7/12 lg:w-1/2"
    >
      <span class="flex items-center justify-between w-full mb-8">
        <h3 class="text-xl font-semibold">
          {{ data?.productsPricing.modalTitle }}
        </h3>
        <button
          type="button"
          @click="emits('close-modal')"
          class="items-center justify-center size-6"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.6673 2.48086L21.3173 0.130859L12.0007 9.44753L2.68398 0.130859L0.333984 2.48086L9.65065 11.7975L0.333984 21.1142L2.68398 23.4642L12.0007 14.1475L21.3173 23.4642L23.6673 21.1142L14.3507 11.7975L23.6673 2.48086Z"
              fill="black"
            />
          </svg>
        </button>
      </span>
      <form
        action=""
        class="w-full grid grid-cols-1 items-start justify-start sm:grid-cols-2 gap-4"
      >
        <div class="w-full flex flex-col gap-2">
          <label for="company-name" class="text-[14px] font-semibold">{{
            data?.productsPricing.modalCompanyNameLabel
          }}</label>
          <input
            type="text"
            id="company-name"
            name="company-name"
            class="border border-gray-300 rounded-lg p-2"
            v-model="form.companyName"
            @blur="touched.companyName = true"
          />
          <span
            v-if="!form.companyName && touched.companyName"
            class="text-red-500 text-xs"
            >{{
              "يجب أن يكون اسم الشركة أو المؤسسة مكونًا من حرفًا واحدًا على الأقل"
            }}</span
          >
        </div>
        <div class="w-full flex flex-col gap-2">
          <label
            for="phone-number"
            class="text-[14px] font-semibold text-start"
          >
            {{ data?.productsPricing.modalPhoneNumberLabel }}
          </label>
          <phone-input
            id="phone-number"
            v-model:country-code="form.countryCode"
            v-model:phone-number="form.phone"
            name="phone-number"
            select-element-id="country-code"
            select-element-name="country-code"
            class="py-0.5 w-full"
            @blur="touched.phone = true"
          />
          <span
            v-if="!form.phone && touched.phone"
            class="text-red-500 text-xs"
            >{{ "يجب أن يكون رقم الهاتف مكونًا من 10 أرقام" }}</span
          >
        </div>
        <div class="w-full flex flex-col gap-2">
          <label for="is-order-before" class="text-[14px] font-semibold">
            {{ data?.productsPricing.modalAskedBeforeFormLabel }}
          </label>
          <select
            id="is-order-before"
            name="is-order-before"
            class="border border-gray-300 rounded-lg py-1 px-2"
            v-model="form.isOrderedBefore"
            @blur="touched.isOrderedBefore = true"
          >
            <option value="false">لا</option>
            <option value="true">نعم</option>
          </select>
          <span
            v-if="!form.isOrderedBefore && touched.isOrderedBefore"
            class="text-red-500 text-xs"
            >{{ "يجب اختيار إجابة صالحة" }}</span
          >
        </div>
        <div class="w-full flex flex-col gap-2">
          <label for="activity" class="text-[14px] font-semibold">{{
            data?.productsPricing.modalActivityFormLabel
          }}</label>
          <input
            type="text"
            id="activity"
            name="activity"
            class="border border-gray-300 rounded-lg p-2"
            v-model="form.activity"
            @blur="touched.activity = true"
          />
          <span
            v-if="!form.activity && touched.activity"
            class="text-red-500 text-xs"
            >{{ "يجب أن يكون النشاط مكونًا من حرفًا واحدًا على الأقل" }}</span
          >
        </div>
      </form>
      <ul
        class="grid grid-flow-row mt-6 gap-3.5 w-full max-h-52 overflow-y-auto"
      >
        <cart-item
          v-for="item of cart"
          :data="item"
          :key="item.id"
          @increase-quantity="$emit('increase-quantity', $event)"
          @decrease-quantity="$emit('decrease-quantity', $event)"
          @remove-item="emits('remove-item', $event)"
        />
      </ul>
      <span
        class="w-full mt-4 flex items-center justify-between font-semibold text-lg text-black"
      >
        <p>{{ data?.productsPricing.modalTotalLabel }}</p>
        <span class="flex items-center justify-center gap-6">
          <p>
            {{
              Intl.NumberFormat("ar-SA", {
                style: "currency",
                currency: "SAR",
              }).format(totalPrice || 0)
            }}
          </p>
        </span>
      </span>
      <button
        type="button"
        @click="handleSubmit"
        class="bg-secondary rounded-full py-2 px-5 w-full text-white mt-8"
      >
        {{ data?.productsPricing.modalSubmitButton }}
      </button>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";
import type { CartType } from "~/types/cart";

const emits = defineEmits<{
  (e: "close-modal"): void;
  (e: "increase-quantity", product: CartType): void;
  (e: "decrease-quantity", product: CartType): void;
  (e: "remove-item", product: CartType): void;
}>();
const props = defineProps<{
  isOpen: boolean;
  cart: CartType[];
  totalPrice: number;
}>();

const { $directus } = useNuxtApp();
const form = reactive({
  companyName: "",
  phone: "",
  countryCode: "+966",
  activity: "",
  isOrderedBefore: false,
});
const touched = reactive({
  companyName: false,
  phone: false,
  activity: false,
  isOrderedBefore: false,
});
const { data, error } = await useAsyncData(QUERY_KEYS.pages.cartContent, () =>
  $directus.query(
    `
      query {
        productsPricing {
          modalTitle
          modalPhoneNumberLabel
          modalCompanyNameLabel
          modalAskedBeforeFormLabel
          modalActivityFormLabel
          modalTotalLabel
          modalSubmitButton
        }
      }
    `
  )
);

const handleSubmit = () => {
  console.log({ form, cart: props.cart });

  // Directus steps
  // 1. create cart collection
  // 2. cart collection fields will be (id, orderId[uuid], items[relation=> product] + quantity[number]
  //    totalPrice[number], status[in-process,in-the-way ,shipped , completed], isPaid[bool],
  //  companyName[string], phoneNumber[string], isOrderedBefore[bool], activity[string] )

  // Front-end steps
  // 1. collect form data ,schema will be ( companyName[string], phoneNumber[string],
  //    isOrderedBefore[bool], activity[string] )
  // 2. collect product ids data ,schema will be ( [{productId: number, quantity: number}])
  // 3. send data to back-end (directus) ,schema will be (
  //    orderId[uuid],
  //    items: [{productId: number, quantity: number}]
  //    totalPrice: number,
  //    status : "in-process",
  //    isPaid: false,
  //    companyName: string ,
  //    phoneNumber : string ,
  //    isOrderedBefore: bool,
  //    activity: string
  // )
  // 3. send post request to to api [:/products] to decrement (stock) field
  // for each product with (product id) based on cart item quantity ( current product stock - quantity )
};
</script>
