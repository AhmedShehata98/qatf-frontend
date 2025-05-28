export type TranslationCode = "ar-SA" | "en-US";
export type Translation = {
  id: string;
  code: TranslationCode;
  name: string;
  direction: "rtl" | "ltr";
};

export const useTranslations = () => {
  const translations = ref<Translation[]>([
    {
      id: "1",
      code: "ar-SA",
      name: "العربية",
      direction: "rtl",
    },
    {
      id: "2",
      code: "en-US",
      name: "English",
      direction: "ltr",
    },
  ]);

  const currentTranslation = useState<Translation>(
    "currentTranslation",
    () => translations.value[0]
  );

  const languageCookie = useCookie<TranslationCode>("language");

  const headAttrs = computed(() => ({
    dir: currentTranslation.value.direction,
    lang: currentTranslation.value.code.split("-")[0],
  }));

  onMounted(() => {
    const cookieLanguage = languageCookie.value;
    if (cookieLanguage) {
      const translation = translations.value.find(
        (t) => t.code === cookieLanguage
      );
      if (translation) {
        currentTranslation.value = translation;
      }
    } else {
      languageCookie.value = currentTranslation.value.code;
    }
  });

  useHead({
    htmlAttrs: {
      dir: () => headAttrs.value.dir,
      lang: () => headAttrs.value.lang,
    },
  });

  watch(currentTranslation, (newValue) => {
    languageCookie.value = newValue.code;
  });

  const getTranslation = (key: string) => {
    return translations.value.find((translation) => translation.code === key);
  };

  return {
    translations,
    currentTranslation,
    getTranslation,
  };
};
