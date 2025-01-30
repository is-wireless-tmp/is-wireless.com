<template>
  <div
    class="text-inherit relative z-10 flex flex-col tablet-wide:flex-row w-full"
  >
    <div class="tablet-wide:flex-[1_1_50%] tablet-wide:w-1/2 tablet-wide:mr-8">
      <section_content :data="data" />
    </div>
    <div
      class="tablet-wide:flex-[1_1_50%] tablet-wide:w-1/2 tablet-wide:ml-8 flex flex-col tablet:flex-row relative"
    >
      <div
        v-if="data"
        class="max-w-[820px] text-gray-darker mb-20 tablet:mb-10 tablet:mt-20 desktopWide:shrink-0 relative"
      >
        <form
          name="contactForm"
          method="post"
          enctype="multipart/form-data"
          class="flex flex-col"
          data-static-form-name="contact"
          @submit.prevent="sendForm()"
        >
        <input type="hidden" name="static-form-name" value="contact" />
          <ul class="flex flex-wrap gap-2.5 tablet:gap-5 justify-between mb-4">
            <li
              v-for="(item, index) in data.inputs"
              :key="index"
              :class="[
                item.fullWidth
                  ? 'basis-full'
                  : 'basis-full tablet:basis-[calc(50%_-_10px)]',
              ]"
            >
              <FormField :data="item" />
            </li>
            <li class="w-full flex items-start px-2.5" v-if="data.privacyText">
              <input
                type="checkbox"
                name="acceptance"
                id="acceptance"
                required="required"
                class="shrink-0 mx-2.5 mt-1 cursor-pointer"
              />
              <label
                for="acceptance"
                class="block text-xs desktop:text-sm text-gray-dark cursor-pointer"
                v-html="data.privacyText"
              >
              </label>
            </li>
          </ul>
          <div class="w-full">
            <button
              class="text-sm ml-auto w-auto block text-white uppercase px-10 py-3 rounded-full bg-blue-main hover:bg-gray-light hover:text-black duration-300 mt-3 mb-4 tablet:mb-3"
              ref="sendButton"
              v-html="data.buttonText ? data.buttonText : 'Send'"
            ></button>
          </div>
        </form>
        <Transition
          name="appear"
          @after-enter="onConfirmTransitionAfter()"
        >
          <div
            v-show="mailSent"
            class="absolute inset-0 flex flex-col justify-center items-center bg-white"
          >
            <div
              class="w-24 desktop:w-[175px] aspect-square flex justify-center items-center rounded-full border-4 border-blue-main mb-7 desktop:mb-[50px]"
            >
              <svg
                class="w-12 h-12 desktop:w-auto desktop:h-auto"
                width="74"
                height="51"
                viewBox="0 0 74 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  ref="svgPath"
                  class="svg-check stroke-blue-main"
                  d="M4 25.5L26 47L70 4"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3
              class="block text-3xl tablet:text-4xl desktop:text-5xl mb-5 desktop:mb-10 text-center font-semibold"
            >
              {{
                data.confirmText
                  ? data.confirmText
                  : "Thank you for sending your message"
              }}
            </h3>
            <h4
              class="block text-lg desktop:text-xl mb-7 desktop:mb-[50px] text-center font-semibold"
            >
              {{
                data.confirmSubText ? data.confirmSubText : "We will reply soon"
              }}
            </h4>
            <CustomLink
              class="block tablet-wide:mx-2.5 text-sm !text-white uppercase px-7 py-3 rounded-full bg-blue-main hover:bg-gray-light hover:!text-gray-darkest duration-300 tablet:mb-0 mb-6"
              :url="'/'"
              :title="
                data.buttonBackText ? data.buttonBackText : 'Back to Homepage'
              "
              :isExternal="false"
            ></CustomLink>
          </div>
        </Transition>
        <Transition name="appear">
          <div v-if="isError" class="bg-red-300/20 flex gap-2.5 p-2.5 rounded-md mt-5 [&_a]:transition [&_a]:underline [&_a]:font-medium hover:[&_a]:text-green-main max-w-[700px]">
            <svg class="shrink-0 mt-1 fill-red-500" width="24" height="24" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 511.999 463.377"><path d="M289.639 9.137c12.411 7.25 23.763 18.883 33.037 34.913l.97 1.813 1.118 1.941 174.174 302.48c33.712 56.407-1.203 113.774-66.174 112.973v.12H73.485c-.895 0-1.78-.04-2.657-.112-59.104-.799-86.277-54.995-61.909-106.852.842-1.805 1.816-3.475 2.816-5.201L189.482 43.959l-.053-.032c9.22-15.786 20.717-27.457 33.411-34.805C243.788-3 268.711-3.086 289.639 9.137zM255.7 339.203c13.04 0 23.612 10.571 23.612 23.612 0 13.041-10.572 23.613-23.612 23.613-13.041 0-23.613-10.572-23.613-23.613s10.572-23.612 23.613-23.612zm17.639-35.379c-.794 19.906-34.506 19.931-35.278-.006-3.41-34.108-12.129-111.541-11.853-143.591.284-9.874 8.469-15.724 18.939-17.955 3.231-.686 6.781-1.024 10.357-1.019 3.595.008 7.153.362 10.387 1.051 10.818 2.303 19.309 8.392 19.309 18.446l-.043 1.005-11.818 142.069zM37.596 369.821L216.864 59.942c21.738-37.211 56.225-38.289 78.376 0l176.298 306.166c17.177 28.285 10.04 66.236-38.774 65.488H73.485c-33.017.756-52.841-25.695-35.889-61.775z"/></svg>
            <p>
              Niestety mamy chwilowy problem z działaniem formularza. Wyślij wiadomość na adres <a href="mailo:info@is-wireless.com">info@is-wireless.com</a>
            </p>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import section_content from "./section_content.vue";

export default {
  name: "section_two_column_contact",
  props: {
    data: Object,
  },
  data() {
    return {
      mailSent: false,
      isError: false
    };
  },
  methods: {
    isEmailValid(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        ? true
        : false;
    },
    checkRequired(form) {
      const formData = new FormData(form);
      const requiredInputs = form.querySelectorAll("[required]");
      let validityArray = [];
      for (const input of requiredInputs.values()) {
        validityArray.push(input.checkValidity());
      }
      return validityArray.every((el) => el === true);
    },
    sendForm() {
      const formContainer = document.forms.contactForm;
      const formData = new FormData(formContainer);
      const sendBtn = this.$refs["sendButton"];

      if (
        formData.get("mail") &&
        this.checkRequired(formContainer) &&
        this.isEmailValid(formData.get("mail"))
      ) {
        sendBtn?.setAttribute("disabled", "");
        this.formRequest(formData)
          .then((result) => {
            console.log(result)
            if (result.ok) {
              this.mailSent = true;
            }
            sendBtn?.removeAttribute("disabled");
          })
          .catch((error) => {
            console.error("Contact form could not be send", error);
            this.isError = true;
            sendBtn?.removeAttribute("disabled");
          });
      } else {
        console.log("Fulfill required fields correctly");
      }
    },
    async formRequest(data) {
      return await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
    },
    onConfirmTransitionAfter() {
      this.$refs["svgPath"].classList.add("svg-check-animation");
    },
  },
  components: { section_content },
};
</script>

<style scoped>
.appear-enter-active,
.appear-leave-active {
  transition: opacity 0.2s ease;
}

.appear-enter-from,
.appear-leave-to {
  opacity: 0;
}

.svg-check {
  transition: all 0.4s ease-in-out;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}

.svg-check.svg-check-animation {
  stroke-dashoffset: 0;
}

button[disabled] {
  @apply opacity-30 pointer-events-none;
}
</style>
