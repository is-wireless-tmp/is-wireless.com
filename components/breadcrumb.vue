<template>
  <div class="w-full">
    <div class="w-4/5 mx-auto container">
      <ul class="tablet:flex flex-row my-4">
        <li
          v-for="(route, index) in routesComputed"
          :key="index"
          class="breadcrumb-item"
        >
          <div v-if="route.item">
            <nuxt-link
              :to="
                route.item
                  .replace($config.public.API_URL, '')
                  .replace('https://www.is-wireless.com', '')
                  .replace('/category', '')
              "
            >
            {{ route.name }}
            </nuxt-link>
          </div>

          <div
            v-else
            class="text-base text-gray-dark"
            v-html="route.name"
          ></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { isSamePath } from 'ufo'
import { useGeneralStore } from '~/store/general'

export default {
  name: 'Breadcrumb',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    routesComputed() {
      let routes = []
      if (this.data) {
        for (let i = 0; i < this.data.itemListElement.length; i++) {
          routes[i] = this.data.itemListElement[i]
        }
      }

      // let routes = []
      // let routesSplitted = this.$route.fullPath.split('/')
      // routes[0] = '/' + routesSplitted[1]
      // for (let i = 1; i < routesSplitted.length - 2; i++) {
      //   routes[i] = routes[i - 1] + '/' + routesSplitted[i + 1]
      // }
      return routes
    },

    routesNames() {
      let routesNames = useRoute().path.slice(1, -1).split('/')
      routesNames.pop()
      return routesNames
    },

    currentRoute() {
      return useRoute().path
    },

    pagesData() {
      return useGeneralStore().data
    },

    postsData() {
      return useGeneralStore().getPostsData
    },
  },
  methods: {
    getTitleByRoute(link) {
      if (isSamePath('/news', link)) {
        return 'News'
      }
      if (isSamePath('/search', link)) {
        return 'Search'
      }
      if (this.routesNames[0] !== 'news') {
        const pagesArray = Object.values(this.pagesData)
        for (let i = 0; i < pagesArray.length; i++) {
          let pageFullPath = pagesArray[i].link.replace(
            'https://www.is-wireless.com',
            ''
          )
          if (isSamePath(pageFullPath, link)) {
            return pagesArray[i].title.rendered
          }
        }
      } else {
        const postsArray = Object.values(this.postsData)
        for (let i = 0; i < postsArray.length; i++) {
          let pageFullPath = postsArray[i].link.replace(
            'https://www.is-wireless.com',
            ''
          )
          if (isSamePath(pageFullPath, link)) {
            return postsArray[i].title.rendered
          }
        }
      }
      return link
    },
  },
}
</script>

<style lang="postcss">
.breadcrumb-item {
  @apply inline tablet:block mr-2;
}

.breadcrumb-item div{
  @apply inline tablet:block;
}

.breadcrumb-item a {
  @apply text-base capitalize inline tablet:flex items-center text-blue-main hover:text-blue-main-hover transition;
}
.breadcrumb-item a::after {
  content: '';
  height: 15px;
  width: 1px;
  @apply inline-block tablet:block bg-gray-dark ml-2;
}
</style>
