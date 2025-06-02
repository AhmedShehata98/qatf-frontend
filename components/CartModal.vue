<template>
  <Modal :is-open="isOpen">
    <div
      class="flex items-start justify-start flex-col p-6 bg-background rounded-[10px] w-11/12 sm:w-10/12 md:w-7/12 lg:w-1/2"
    >
      <span class="flex items-center justify-between w-full mb-8">
        <h3 class="text-xl font-semibold">
          {{ cartContent.modalTitle }}
        </h3>
        <button
          type="button"
          class="items-center justify-center size-6"
          @click="emits('close-modal')"
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
          <label
            for="company-name"
            class="capitalize text-[14px] font-semibold"
            >{{ cartContent.modalCompanyNameLabel }}</label
          >
          <input
            id="company-name"
            v-model="form.companyName"
            type="text"
            name="company-name"
            class="border border-gray-300 rounded-lg p-2"
            @blur="touched.companyName = true"
          />
          <span
            v-if="!form.companyName && touched.companyName"
            class="text-red-500 text-xs"
            >{{
              cartContent.modalCompanyValidationMessage ||
              "يجب أن يكون اسم الشركة أو المؤسسة مكونًا من حرفًا واحدًا على الأقل"
            }}</span
          >
        </div>
        <div class="w-full flex flex-col gap-2">
          <label
            for="phone-number"
            class="text-[14px] font-semibold text-start capitalize"
          >
            {{ cartContent.modalPhoneNumberLabel }}
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
            >{{
              cartContent.modalPhoneValidationMessage ||
              "يجب أن يكون رقم الهاتف مكونًا من 10 أرقام"
            }}</span
          >
        </div>
        <div class="w-full flex flex-col gap-2">
          <label
            for="is-order-before"
            class="text-[14px] font-semibold capitalize"
          >
            {{ cartContent.modalOrderedBefore }}
          </label>
          <select
            id="is-order-before"
            v-model="form.isOrderedBefore"
            name="is-order-before"
            class="border border-gray-300 rounded-lg py-1 px-2 ltr:py-2.5"
            @blur="touched.isOrderedBefore = true"
          >
            <option
              v-for="option in cartContent.modalOrderedBeforeOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
          <span
            v-if="!form.isOrderedBefore && touched.isOrderedBefore"
            class="text-red-500 text-xs"
            >{{
              cartContent.modalOrderValidationMessage ||
              "يجب اختيار إجابة صالحة"
            }}</span
          >
        </div>
        <div class="w-full flex flex-col gap-2">
          <label for="activity" class="text-[14px] font-semibold capitalize">{{
            cartContent.modalActivityFormLabel
          }}</label>
          <input
            id="activity"
            v-model="form.activity"
            type="text"
            name="activity"
            class="border border-gray-300 rounded-lg p-2"
            @blur="touched.activity = true"
          />
          <span
            v-if="!form.activity && touched.activity"
            class="text-red-500 text-xs"
            >{{
              cartContent.modalActivityValidationMessage ||
              "يجب أن يكون النشاط مكونًا من حرفًا واحدًا على الأقل"
            }}</span
          >
        </div>
      </form>
      <ul
        class="grid grid-flow-row mt-6 gap-3.5 w-full max-h-52 overflow-y-auto py-3"
      >
        <cart-item
          v-for="item of cart"
          :key="item.id"
          :data="item"
          @increase-quantity="$emit('increase-quantity', $event)"
          @decrease-quantity="$emit('decrease-quantity', $event)"
          @remove-item="emits('remove-item', $event)"
        />
      </ul>
      <span
        class="w-full mt-4 flex items-center justify-between font-semibold text-lg text-black"
      >
        <p>{{ cartContent.modalTotalLabel }}</p>
        <span class="flex items-center justify-center gap-6">
          <p>
            {{
              Intl.NumberFormat(currentLocale, {
                style: "currency",
                currency: "SAR",
              }).format(totalPrice || 0)
            }}
          </p>
        </span>
      </span>
      <button
        v-if="!isSuccess && !isError"
        type="button"
        class="flex items-center justify-center gap-2.5 bg-secondary rounded-full py-2 px-5 w-full text-white mt-8 disabled:bg-slate-400"
        :disabled="isLoading || isError || !isValidForm"
        @click="handleSubmit"
      >
        <span
          v-if="isLoading"
          class="flex border-4 size-8 rounded-full border-slate-600 border-r-transparent animate-spin"
        />
        <p v-if="!isLoading">
          {{ cartContent.modalSubmitButton }}
        </p>
      </button>
      <button
        v-if="isSuccess"
        type="button"
        class="rounded-full py-2 px-5 w-full text-white mt-8 bg-emerald-600"
      >
        لقد تم إرسال الطلب بنجاح, تفقد بريدك الالكتروني
      </button>
      <button
        v-if="isError"
        type="button"
        class="rounded-full truncate overflow-hidden max-w-full py-2 px-5 w-full text-white mt-8 bg-red-600"
      >
        {{ errorMsg }}
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
const isError = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const isSuccess = ref<boolean>(false);
const errorMsg = ref<null | string>(null);

const { clearCart } = useCart();
const { currentLocale, getLocaleObject } = useI18n();
const { data } = await useAsyncData(QUERY_KEYS.pages.cartContent, () =>
  $directus.query(
    `
      query {
        productsPricing {
          id
          translations {
            id
            languages_id
            modalTitle
            modalPhoneNumberLabel
            modalCompanyNameLabel
            modalOrderedBefore
            modalActivityFormLabel
            modalTotalLabel
            modalSubmitButton
            modalPhoneValidationMessage
            modalCompanyValidationMessage
            modalOrderValidationMessage
            modalActivityValidationMessage
            modalOrderedBeforeOptions
          }
        }
      }
    `
  )
);
const cartContent = computed(() => ({
  ...data.value?.productsPricing,
  ...data.value?.productsPricing.translations.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() ===
      getLocaleObject(currentLocale.value).id
  ),
}));
const form = reactive({
  companyName: "",
  phone: "",
  countryCode: "+966",
  activity: "",
  isOrderedBefore: cartContent.value.modalOrderedBeforeOptions?.[0],
});
const touched = reactive({
  companyName: false,
  phone: false,
  activity: false,
  isOrderedBefore: false,
});
const isValidForm = computed(() => {
  return (
    form.companyName &&
    form.phone &&
    form.countryCode &&
    form.activity &&
    form.isOrderedBefore
  );
});

const resetForm = () => {
  form.companyName = "";
  form.phone = "";
  form.countryCode = "+966";
  form.activity = "";
  form.isOrderedBefore = false;
  touched.companyName = false;
  touched.phone = false;
  touched.activity = false;
  touched.isOrderedBefore = false;
};

const handleSubmit = async () => {
  try {
    const items = props.cart;
    isLoading.value = true;

    // prepare cart body calculate total price and user info
    const totalPrice = calculateTotalPrice(props.cart);
    const userInfo = {
      companyName: form.companyName,
      phoneNumber: `${form.countryCode}${form.phone}`,
      activity: form.activity,
      isOrderedBefore: form.isOrderedBefore,
    };

    // create new cart to assign cart items to it
    const cart = await $fetch<{ id: number }>("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        form: userInfo,
        totalPrice,
      },
    });
    isLoading.value = false;
    if (!cart) {
      console.error("create cart failed");
      return;
    }

    // create cart items to cart with cart id
    items.forEach(async (item) => {
      isLoading.value = true;
      if (!item.id) {
        console.error("cart item has no id");
        return;
      }
      await $fetch("/api/cart-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          cartId: cart.id,
          productId: item.id,
          quantity: item.quantity,
        },
      });
    });
    isLoading.value = false;
    isSuccess.value = true;
    // TODO: send email to admin and user
    resetForm();
    clearCart();
  } catch (error: unknown) {
    isError.value = true;
    isSuccess.value = false;
    errorMsg.value = error instanceof Error ? error.message : "Unknown error";
    isLoading.value = false;
    if (import.meta.dev) {
      console.error(error);
    } else {
      console.error("create cart failed");
    }
  }
};

const calculateTotalPrice = (items: CartType[]) => {
  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  return totalPrice;
};

watch(isError, (val, oldVal, onCleanup) => {
  let timeoutRef: number;
  if (val) {
    timeoutRef = +setTimeout(() => {
      isError.value = false;
    }, 3000);
  }

  onCleanup(() => {
    if (timeoutRef) {
      clearTimeout(timeoutRef);
    }
  });
});

watch(isSuccess, (val, oldVal, onCleanup) => {
  let timeoutRef: number;
  if (val) {
    timeoutRef = +setTimeout(() => {
      isSuccess.value = false;
    }, 3000);
  }

  onCleanup(() => {
    if (timeoutRef) {
      clearTimeout(timeoutRef);
    }
  });
});
</script>
