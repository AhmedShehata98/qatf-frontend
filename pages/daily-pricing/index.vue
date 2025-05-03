<template>
  <section class="app-container my-16">
    <span class="w-full flex flex-col gap-2 items-start">
      <p
        class="relative w-fit text-secondary text-base md:text-xs font-bold text-start before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
      >
        منتجاتنا الطازجة
      </p>
      <h3
        class="text-[32px] md:text-[44px] font-semibold text-black leading-snug"
      >
        يشرفنا عرض منتجاتنا الطازة لتسهيل الطلب على العميل ومعرفة الأسعار
        والكميات المتاحة والعروض الخاصة
      </h3>
    </span>
    <form
      action=""
      class="flex items-center justify-between max-md:flex-col gap-5 mt-6"
    >
      <span
        for="search-input"
        class="max-md:w-full flex items-center justify-start gap-1 border border-slate-400 rounded-full p-1 ps-3"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.58268 17.4993C13.9549 17.4993 17.4993 13.9549 17.4993 9.58268C17.4993 5.21043 13.9549 1.66602 9.58268 1.66602C5.21043 1.66602 1.66602 5.21043 1.66602 9.58268C1.66602 13.9549 5.21043 17.4993 9.58268 17.4993Z"
            stroke="#B0AEAE"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.3327 18.3327L16.666 16.666"
            stroke="#B0AEAE"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <input
          type="search"
          name="search-input"
          id="search-input"
          placeholder="بحث"
          class="w-full focus:outline-none bg-inherit text-black px-3 h-full"
        />
      </span>
      <div
        class="max-md:w-full grid grid-cols-3 items-center justify-end gap-4"
      >
        <select
          name="quantity"
          id="quantity"
          class="bg-black text-white px-5 py-2 rounded-full"
        >
          <option value="كمية محدودة">كمية محدودة</option>
        </select>
        <select
          name="unit"
          id="unit"
          class="bg-black text-white px-5 py-2 rounded-full"
        >
          <option value="بالكيلو">بالكيلو</option>
        </select>
        <select
          name="state"
          id="state"
          class="bg-black text-white px-5 py-2 rounded-full"
        >
          <option value="ظازة اليوم">ظازة اليوم</option>
        </select>
      </div>
    </form>
    <div class="flex items-center justify-start mt-6 relative w-full">
      <span
        style="height: 1px; width: 100%"
        class="inline-block absolute left-0 top-1/2 bg-secondary"
      ></span>
      <p class="text-secondary font-semibold bg-background px-6 z-10">طماطم</p>
    </div>
    <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <product-card
        v-for="(product, idx) of HOME_PRODUCTS.filter((i) =>
          i.name.includes('طماطم')
        )"
        :key="idx"
        :data="product"
      />
    </ul>
    <div class="flex items-center justify-start mt-6 relative w-full">
      <span
        style="height: 1px; width: 100%"
        class="inline-block absolute left-0 top-1/2 bg-secondary"
      ></span>
      <p class="text-secondary font-semibold bg-background px-6 z-10">
        خضار استوائية
      </p>
    </div>
    <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <product-card
        v-for="(product, idx) of HOME_PRODUCTS"
        :key="idx"
        :data="product"
      />
    </ul>
    <Modal :is-open="isOpenModal">
      <div
        class="flex items-start justify-start flex-col p-6 bg-background rounded-[10px] w-11/12 sm:w-10/12 md:w-7/12 lg:w-1/2"
      >
        <span class="flex items-center justify-between w-full">
          <h3>طلبية جديدة</h3>
          <button
            type="button"
            @click="isOpenModal = !isOpenModal"
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
          class="w-full grid grid-cols-1 items-end justify-start sm:grid-cols-2 gap-4"
        >
          <div class="w-full flex flex-col gap-2">
            <label for="company-name" class="text-[14px] font-semibold"
              >اسم الشركة او المؤسسة</label
            >
            <input
              type="text"
              id="company-name"
              name="company-name"
              class="border border-gray-300 rounded-lg p-2"
              v-model="form.companyName"
            />
            <span v-if="form.companyName" class="text-red-500 text-xs">{{
              "يجب أن يكون اسم الشركة أو المؤسسة مكونًا من حرفًا واحدًا على الأقل"
            }}</span>
          </div>
          <div class="w-full flex flex-col items-start justify-start gap-2">
            <label
              for="phone-number"
              class="text-[14px] font-semibold text-start"
            >
              رقم الهاتف للتواصل
            </label>
            <phone-input
              v-model:country-code="form.countryCode"
              v-model:phone-number="form.phone"
              class="py-0.5"
            />
            <span v-if="form.phone" class="text-red-500 text-xs">{{
              "يجب أن يكون رقم الهاتف مكونًا من 10 أرقام"
            }}</span>
          </div>
          <div class="w-full flex flex-col gap-2">
            <label for="is-order-before" class="text-[14px] font-semibold">
              هل طلبت لدينا من قبل؟
            </label>
            <select
              id="is-order-before"
              name="is-order-before"
              class="border border-gray-300 rounded-lg py-1 px-2"
              v-model="form.isOrderedBefore"
            >
              <option value="false">لا</option>
              <option value="true">نعم</option>
            </select>
            <span v-if="form.isOrderedBefore" class="text-red-500 text-xs">{{
              "يجب اختيار إجابة صالحة"
            }}</span>
          </div>
          <div class="w-full flex flex-col gap-2">
            <label for="activity" class="text-[14px] font-semibold"
              >النشاط</label
            >
            <input
              type="text"
              id="activity"
              name="activity"
              class="border border-gray-300 rounded-lg p-2"
              v-model="form.activity"
            />
            <span v-if="form.activity" class="text-red-500 text-xs">{{
              "يجب أن يكون النشاط مكونًا من حرفًا واحدًا على الأقل"
            }}</span>
          </div>
        </form>
        <ul class="grid grid-flow-row mt-6 gap-3.5 w-full">
          <cart-item
            :data="{
              id: 1,
              name: 'طماطم',
              price: 100,
              image: 'https://picsum.photos/400/400',
              initialQuantity: 1,
              units: ['كيلو', 'قطعة'],
            }"
            @update:quantity="(e) => console.log('update quantity', e)"
            @update:unit="(e) => console.log('update unit', e)"
          />
        </ul>
        <span
          class="w-full mt-4 flex items-center justify-between font-semibold text-lg text-black"
        >
          <p>الاجمالي</p>
          <span class="flex items-center justify-center gap-6">
            <p>1 طن + 5 كيلو</p>
            <p>340.00 ر.س</p>
          </span>
        </span>
        <button
          type="button"
          class="bg-secondary rounded-full py-2 px-5 w-full text-white mt-8"
        >
          إرسال
        </button>
      </div>
    </Modal>
  </section>
</template>
<script setup lang="ts">
import { HOME_PRODUCTS } from "~/data/data";
const isOpenModal = shallowRef(false);
const form = reactive({
  companyName: "",
  phone: "",
  countryCode: "+966",
  activity: "",
  isOrderedBefore: false,
});
</script>
