<template>
  <main>
    <layouts-app-header />
    <NuxtPage />
    <layouts-app-footer />
    <cart-modal
      :is-open="isOpenModal"
      :cart="cart"
      :totalPrice="getCartTotalPrice()"
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
  increaseItemQuantity,
  decreaseItemQuantity,
  removeFromCart,
  getCartTotalPrice,
} = useCart();
</script>
