<template>
    <div class="closest-holiday-container">
        <h1>Closest Holiday</h1>
        <div class="closest-holiday">
          <div>{{days[0].start}} - {{days[0].end}}</div>
          <v-sheet tile class="d-flex">
              <v-btn 
              icon
              class="ma-2"
              @click="$refs.calendar.prev()">
                  <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn 
              icon
              class="ma-2"
              @click="$refs.calendar.next()">
                  <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
          </v-sheet>
          <v-sheet>
              <v-calendar
              v-model="start"
              :events="events"
              ref="calendar"
              min-weeks="7"
              :show-month-on-first="false"/>
          </v-sheet>
            <!-- <span>{{ days.duration }} days holiday with {{ days.noOfDays }} days booked!</span>
            <ul>
                <li v-for="(item, i) in days.allDates" :key="i" :class="days.daysOff.includes(item) ? 'book' : days.holidays.includes(days.allDates[i]) ? 'public-holiday' : 'no-book'">
                    <span>{{ days.allDatesLong[i] }}</span>
                </li>
            </ul> -->
        </div>
  </div>
</template>

<script>
export default {
  name: "ClosestHoliday",
  components: {},
  props: {
    days: [],
  },
  data: () => ({
    events: [],
    colours: ['orange', 'green', 'cyan', 'red'],
    start: ""
  }),
  mounted() {
    this.start=this.days[0].date;
    for (let day of this.days) {
      let newEvent = {};

      day.allDates.forEach((event, index) => {
        if (newEvent.name != event.title) { //new event
          if (newEvent.name != null) {
            newEvent.color = this.getColour(newEvent.name);
            this.events.push(newEvent);
            newEvent = {};
          }

          newEvent.name = event.title;
          newEvent.start = event.date;
        }
        else if (newEvent.name == event.title &&
                index != day.allDates.length - 1) { //same event
          newEvent.end = event.date;
        }
        else if (index == day.allDates.length - 1){
          newEvent.end = event.date;
          newEvent.color = this.getColour(newEvent.name);
          this.events.push(newEvent);
        }
      });
          this.events.push({
              name: "Total: " + day.allDates.length + " days",
              start: day.allDates[0].date, 
              end: day.allDates[day.allDates.length - 1].date,
              color: this.colours[3]
              });
    }
  },
  methods: {
    rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
    },
    getColour(title) {
      return title.includes("Book") ? this.colours[0] : title.includes("Weekend") ? this.colours[1] : this.colours[2];
    }
  }
};
</script>

<style lang="scss">
$background-colour: #f7f7f7;
$book-colour: red;
$decoration-colour: green;
$decoration-text-colour: white;
$default-color: #f7f7f7;

body {
  background: $background-colour;
}

.closest-holiday-container {
  text-align: center;
}

.theme--light.v-calendar-weekly .v-calendar-weekly__day.v-outside{
  background: #ececec !important;
}
</style>