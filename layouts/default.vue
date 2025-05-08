<template>
  <main>
    <layouts-app-header />
    <NuxtPage />
    <layouts-app-footer />
    <cart-modal
      :is-open="isOpenModal"
      :cart="cart"
      :total-price="totalPrice"
      @close-modal="closeModal"
      @increase-quantity="increaseItemQuantity"
      @decrease-quantity="decreaseItemQuantity"
      @remove-item="removeFromCart"
    />
  </main>
</template>
<script setup lang="ts">
const { closeModal, isOpenModal } = useShowCartModal();
const {
  cart,
  totalPrice,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeFromCart,
} = useCart();
</script>
