export default defineNuxtRouteMiddleware((to, from) => {
  const { i18n } = useRuntimeConfig().public;

  if (to.path === "/") {
    return navigateTo(`/${i18n.defaultLocale.code}${to.fullPath}`);
  }

  // const { currentTranslation, translations } = useTranslations();
  // const cookies = useCookie("language");
  // const localeCookies = cookies.value;

  // const translation = translations.value.find(
  //   (translation) => translation.code === localeCookies
  // );
  // if (currentTranslation.value.code !== localeCookies) {
  //   if (!translation) {
  //     currentTranslation.value = translations.value[0];
  //   } else {
  //     currentTranslation.value = translation;
  //   }
  // }
});
