const useI18n = () => {
  const { i18n } = useRuntimeConfig().public;

  const localeCookie = useCookie<string>("locale");
  if (!localeCookie.value) {
    localeCookie.value = i18n.defaultLocale.code;
  }
  const route = useRoute();

  const getLocaleObject = (locale: string) => {
    return i18n.locales[locale as keyof typeof i18n.locales];
  };

  const getLocaleFromRoute = computed(() => {
    const locale = route.path.split("/")[1];
    return locale;
  });

  const setLocale = (locale: string) => {
    localeCookie.value = locale;
    const path = route.fullPath.replace(getLocaleFromRoute.value, locale);
    navigateTo(path);
  };

  const getLocale = computed(() => {
    return localeCookie.value || i18n.locales.ar.code;
  });

  const getIso = computed(() => {
    return getLocale.value?.split("-")[0];
  });

  const getDir = computed(() => {
    return getLocaleObject(getLocale.value).dir;
  });

  const getLocales = computed(() => {
    return i18n.locales;
  });

  const navigateWithLocale = (path: string) => {
    return navigateTo(`/${localeCookie.value}${path}`);
  };

  const pathWithLocale = (path: string) => {
    return `/${localeCookie.value}${path}`;
  };

  useHead({
    htmlAttrs: {
      lang: getIso.value,
      dir: getDir.value as "ltr" | "rtl" | "auto",
      style:
        getLocale.value === "ar"
          ? "font-family: var(--font-cairo)"
          : "font-family: var(--font-inter)",
    },
  });

  return {
    currentLocale: getLocale,
    currentLocaleFromRoute: getLocaleFromRoute,
    setLocale,
    navigateWithLocale,
    getLocaleObject,
    locales: getLocales,
    iso: getIso,
    pathWithLocale,
  };
};

export default useI18n;
