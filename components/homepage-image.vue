<template>
  <div class="flex justify-center group h-full tablet-wide:pl-20">
    <div class="w-full h-full overflow-hidden">
      <nuxt-picture
        width="640"
        height="640"
        class="block transform h-full w-full transition duration-[1000ms]"
        :imgAttrs="{ class: 'h-full w-full object-cover' }"
        :src="url.replace('www.is-wireless.com',$config.public.API_DOMAIN).replace($config.public.API_URL,'/app')"
        :alt="alt"
        :title="title"
        sizes="sm:320px md:640px lg:720px"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomepageImage',
  props: {
    url: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
      default: 'IS-Wireless Image',
    },
    title: {
      type: String,
      required: false,
      default: 'IS-Wireless Image',
    },
    imageDecoration: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style></style>
