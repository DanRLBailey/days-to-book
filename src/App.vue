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
      <ClosestHoliday v-if="days.length > 0" :days="days"/>
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
    days: []
  }),
  async mounted () {
    try {
      this.days = await getDaysToBook();
      console.log(this.days);
    } catch(err) {
      console.error(err);
    }
  }
};
</script>
