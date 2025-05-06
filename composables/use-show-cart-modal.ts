export const useShowCartModal = () => {
  const isOpenModal = useState("cart-modal", () => shallowRef(false));

  const showModal = () => {
    isOpenModal.value = true;
  };

  const closeModal = () => {
    isOpenModal.value = false;
  };

  const toggleModal = () => {
    isOpenModal.value = !isOpenModal.value;
  };

  return {
    isOpenModal,
    showModal,
    closeModal,
  };
};
