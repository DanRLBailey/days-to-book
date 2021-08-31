<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <ClosestHoliday 
        v-if="days.length > 0" 
        :days="days" 
        :regions="regions" 
        :region="chosenRegion"
        @get:events="getNewRegion" />
    </v-main>
  </v-app>
</template>

<script>
import ClosestHoliday from './components/ClosestHoliday.vue'
import getDaysToBook from './logic/main'

export default {
  name: 'App',
  components: {
    ClosestHoliday
  },
  data: () => ({
    days: [],
    regions: {
      "england-and-wales": "England & Wales",
      "scotland": "Scotland", 
      "northern-ireland": "Northern Ireland"
    },
    chosenRegion: "england-and-wales"
  }),
  async mounted () {
    this.getNewRegion(this.chosenRegion);
  },
  methods: {
    async getNewRegion(region) {
      console.log('getting new region...', region)
      try {
        this.days = await getDaysToBook(region);
        console.log(this.days);
      } catch(err) {
        console.error(err);
      }
    }
  }
};
</script>
