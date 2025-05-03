<template>
  <footer class="bg-primary text-white pt-10">
    <div class="flex items-center justify-center flex-col">
      <!-- Main Footer Content -->
      <div
        class="app-container w-full flex items-start justify-between gap-8 border-white/30 max-lg:flex-wrap"
      >
        <!-- Description & Logo -->
        <div
          class="flex flex-col items-start md:col-span-2 space-y-4 text-right w-full md:w-1/3"
        >
          <NuxtImg
            src="/icons/shared/logo-secondary.svg"
            alt="Qatf Farm Logo White"
            class="h-15 mb-4 ml-auto"
          />
          <p class="text-sm leading-relaxed">
            لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي
            الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان لوريم
            إيبسوم هو النص الشكلي القياسي في الصناعة منذ القرن الخامس عشر
            الميلادي...
          </p>
          <!-- Social Media Icons -->
          <div class="flex justify-end gap-4 pt-4">
            <a href="#" aria-label="Facebook" class="hover:opacity-80">
              <!-- Placeholder for Facebook Icon -->
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                />
              </svg>
            </a>
            <a href="#" aria-label="Snapchat" class="hover:opacity-80">
              <!-- Placeholder for Snapchat Icon -->
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_4035_2931)">
                  <path
                    d="M17.1884 1.26335L0.67249 7.7477C0.358282 7.87108 0.34687 8.31154 0.654238 8.451L4.30543 10.1079C4.40432 10.1528 4.47942 10.2376 4.51196 10.3412L6.07847 15.3264C6.1576 15.5781 6.46194 15.6757 6.67265 15.517L9.39932 13.4627C9.52953 13.3646 9.70763 13.36 9.84277 13.4511L14.4158 16.5363C14.6439 16.6901 14.955 16.5596 15.005 16.2891L17.7035 1.68826C17.758 1.39356 17.4673 1.15384 17.1884 1.26335ZM7.18017 10.8149L6.68748 13.6158L5.41564 9.60548L14.1352 4.1935L7.18017 10.8149ZM2.92264 11.5464C2.78202 11.4058 2.55421 11.4058 2.41356 11.5464L0.396478 13.5633C0.255862 13.7039 0.255862 13.9317 0.396478 14.0724C0.537094 14.213 0.764902 14.213 0.905557 14.0724L2.92264 12.0554C3.06325 11.9148 3.06325 11.687 2.92264 11.5464ZM3.95781 15.9265L1.94092 17.9434C1.80026 18.084 1.80026 18.3119 1.94092 18.4525C2.08153 18.5931 2.30934 18.5931 2.44996 18.4525L4.46689 16.4355C4.60751 16.2949 4.60751 16.0671 4.46689 15.9265C4.32624 15.7859 4.09843 15.7859 3.95781 15.9265Z"
                    fill="white"
                  />
                  <path
                    d="M9.82374 15.9268L7.80666 17.9437C7.66601 18.0843 7.66601 18.3121 7.80666 18.4527C7.94728 18.5933 8.17508 18.5933 8.3157 18.4527L10.3328 16.4358C10.4734 16.2952 10.4734 16.0674 10.3328 15.9268C10.1922 15.7861 9.96436 15.7861 9.82374 15.9268Z"
                    fill="white"
                  />
                  <path
                    d="M17.1864 1.26432L0.670537 7.74868C0.356329 7.87205 0.344916 8.31251 0.652284 8.45198L4.30348 10.1088C4.40237 10.1538 4.47746 10.2386 4.51001 10.3422L6.07651 15.3274C6.15564 15.5791 6.45998 15.6767 6.67069 15.5179L9.39737 13.4637C9.52758 13.3656 9.70567 13.361 9.84082 13.4521L14.4139 16.5373C14.642 16.6911 14.953 16.5606 15.003 16.29L17.7016 1.68923C17.756 1.39454 17.4654 1.15481 17.1864 1.26432ZM7.17822 10.8159L6.68552 13.6168L5.41368 9.60646L14.1332 4.19447L7.17822 10.8159ZM2.92068 11.5474C2.78006 11.4067 2.55226 11.4067 2.4116 11.5474L0.394524 13.5643C0.253909 13.7049 0.253909 13.9327 0.394524 14.0733C0.53514 14.214 0.762948 14.214 0.903604 14.0733L2.92068 12.0564C3.0613 11.9158 3.0613 11.688 2.92068 11.5474ZM3.95586 15.9275L1.93896 17.9444C1.79831 18.085 1.79831 18.3128 1.93896 18.4535C2.07958 18.5941 2.30738 18.5941 2.448 18.4535L4.46494 16.4365C4.60555 16.2959 4.60555 16.0681 4.46494 15.9275C4.32428 15.7869 4.09648 15.7869 3.95586 15.9275Z"
                    fill="white"
                  />
                  <path
                    d="M9.82179 15.9277L7.80471 17.9446C7.66406 18.0852 7.66406 18.3131 7.80471 18.4537C7.94532 18.5943 8.17313 18.5943 8.31375 18.4537L10.3309 16.4368C10.4715 16.2962 10.4715 16.0683 10.3309 15.9277C10.1902 15.7871 9.9624 15.7871 9.82179 15.9277Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4035_2931">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="translate(0 0.897461)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a href="#" aria-label="Twitter / X" class="hover:opacity-80">
              <!-- Placeholder for Twitter/X Icon -->
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.617l-5.36-6.97-6.042 6.97h-3.308l7.73-8.96-8.338-10.54h6.817l4.97 6.47 5.63-6.47zm-1.42 17.54h2.24l-10.6-14.04h-2.4l10.76 14.04z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav
          class="w-full md:w-1/2 flex max-lg:flex-wrap gap-x-6 gapy-3 items-center justify-center h-fit self-center"
        >
          <NuxtLink to="/" class="block hover:underline">الرئيسية</NuxtLink>
          <NuxtLink to="/about" class="block hover:underline">من نحن</NuxtLink>
          <NuxtLink to="/daily-pricing" class="block hover:underline"
            >تسعيرة اليوم</NuxtLink
          >
          <NuxtLink to="/cart" class="block hover:underline">السلة</NuxtLink>
          <NuxtLink to="/contact-us" class="block hover:underline"
            >تواصل معنا</NuxtLink
          >
        </nav>

        <!-- Contact Info -->
        <div class="w-full md:w-1/4 space-y-4">
          <h3 class="text-xl font-semibold mb-4">للتواصل معنا</h3>
          <address class="not-italic space-y-4 rtl:text-end">
            <span
              class="block p-2 bg-gradient-to-r from-gray-[#008145] to-[#FFFFFF] rounded-lg before:rounded-lg relative before:absolute before:content-[''] before:inset-[1px] before:bg-primary"
            >
              <a
                dir="ltr"
                href="tel:+966163622777"
                class="block hover:underline isolate"
                >+966 163 622 777</a
              >
              <a
                href="mailto:Info@Qatf.Sa"
                class="block hover:underline text-start isolate"
                >Info@Qatf.Sa</a
              >
            </span>
            <span
              class="block p-2 bg-gradient-to-l from-gray-[#008145] to-[#FFFFFF] rounded-lg before:rounded-lg relative before:absolute before:content-[''] before:inset-[1px] before:bg-primary"
            >
              <p class="isolate p-3">Address, Address, Address</p>
            </span>
          </address>
        </div>
      </div>

      <!-- Copyright & Policy -->
      <div
        class="w-full flex flex-col md:flex-row justify-between items-center text-sm text-white/80 bg-primary brightness-125 py-6 mt-6"
      >
        <span
          class="w-full app-container max-md:flex-wrap flex items-center justify-between"
        >
          <p class="max-md:w-full text-center">
            &copy; {{ copyRightYear }} جميع الحقوق محفوظة
          </p>
          <NuxtLink
            to="/privacy-and-terms"
            class="hover:underline mt-2 md:mt-0 max-md:w-full text-center"
            >سياسة الخصوصية و شروط الإستخدام</NuxtLink
          >
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
const copyRightYear = shallowRef(new Date().getFullYear());
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
