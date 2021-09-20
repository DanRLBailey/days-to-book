<template>
  <div class="closest-holiday-container">
    <div class="holiday-container">
      <div class="holiday-selector">
        <v-sheet>
          <v-toolbar-title class="title">
            {{ this.calendarTitle }}
          </v-toolbar-title>
        </v-sheet>
        <v-sheet tile class="d-flex navigation">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
        <v-select
        :value="region"
        :items="regionOptions"
        label="Region"
        @change="getNewEvent">
        </v-select>
        <v-card>
          <p class="heading">
            National Holidays for UK
          </p>
          <p>
            Using national holidays, this calendar shoes how you can get the most consecutive days off in a row, while booking off the least amount of days.
          </p>
          <div></div>
            <ul>
              <li id="weekend">
                Weekend
              </li>
              <li id="national">
                National Holiday
              </li>
              <li id="holiday">
                Days to Book
              </li>
            </ul>
          </div>
        </v-card>
      </div>
      <div class="closest-holiday">
        <v-sheet>
          <v-calendar
            v-model="start"
            :events="events"
            ref="calendar"
            min-weeks="7"
            @change="setCalendarTitle"
          />
        </v-sheet>
        <!-- <span>{{ days.duration }} days holiday with {{ days.noOfDays }} days booked!</span>
              <ul>
                  <li v-for="(item, i) in days.allDates" :key="i" :class="days.daysOff.includes(item) ? 'book' : days.holidays.includes(days.allDates[i]) ? 'public-holiday' : 'no-book'">
                      <span>{{ days.allDatesLong[i] }}</span>
                  </li>
              </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClosestHoliday",
  props: {
    days: [],
    regions: Object,
    region: String
  },

  data: () => ({
    colours: ['#F7C164', '#5AC41C', '#7EBDC3', '#EF959D'],
    start: "",
    calendarTitle: ""
  }),

  watch: {
    days: {
      handler () {
        this.start = this.days[0].start;
      },
      immediate: true
    }
  },

  computed: {
    regionOptions() {
      const options = [];
      
      for (const region in this.regions) {
        options.push({
          value: region,
          text: this.regions[region]
        })
      }

      return options;
    },
    events() {
      let events = [];
      for (let day of this.days) {
      let newEvent = {};

      day.allDates.forEach((event, index) => {
        if (newEvent.name != event.title) { //new event
          if (newEvent.name != null) {
            newEvent.color = this.getColour(newEvent.name);
            events.push(newEvent);
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
          events.push(newEvent);
        }
      });
      // events.push({
      //     name: "Total: " + day.allDates.length + " days",
      //     start: day.allDates[0].date, 
      //     end: day.allDates[day.allDates.length - 1].date,
      //     color: this.colours[3]
      //     });
      }

      return events;
    }
  },

  methods: {
    getColour(title) {
      return title.includes("Book") ? this.colours[0] : title.includes("Weekend") ? this.colours[1] : this.colours[2];
    },
    getChosenRegion(region) {
      return region.includes("england") ? "England & Wales" : region.includes("scotland") ? "Scotland" : "Northern Ireland";
    },
    getNewEvent(e) {
      this.$emit('get:events', e)
    },
    setCalendarTitle() {
      this.calendarTitle = this.$refs.calendar.title;
    }
  }
};
</script>

<style lang="scss">
$background-colour: #f0f0f0;
$background-colour-accent: linear-gradient(145deg, rgba(239,149,157,1) 0%, rgba(234,113,123,1) 100%);
$background-colour-alt: #ffffff;
$weekend-colour: #5AC41C;
$national-colour: #7EBDC3;
$holiday-colour: #F7C164;

.v-application--wrap {
  background: $background-colour;
}

.closest-holiday-container {
  margin-top: 5rem;
  text-align: center;
  padding: 0 2rem;

  .v-sheet {
    background: none !important;
  }

  .holiday-container {
    display: flex;
    max-width: 1000px;
    margin: 0 auto;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

    .v-calendar-weekly__head {
      min-height: 43px;
    }

    .v-calendar-weekly__day {
      min-height: 86px;
    }

    .holiday-selector {
      padding: 1rem;
      background: $background-colour-accent;
      flex: .7;

      .title {
        font-size: 1.5rem !important;
      }

      .title,
      button,
      label,
      .v-select__selection--comma,
      .v-icon.v-icon {
        color: white !important;
      }

      .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
        border-color: white !important;
      }

      .d-flex {
        margin-bottom: 1rem;
      }

      .navigation {
        display: block !important;
      }

      .v-card {
        background: $background-colour-alt !important;
        padding: 1rem;
        text-align: left;

        .heading {
          font-weight: 500;
        }

        ul {
          padding: 0;
          text-align: center;
          color: white;

          li {
            margin: .5rem 0;
            display: block;
            padding: .2rem;
            background: black;
            border-radius: 5px;
          }

          #weekend {
            background: $weekend-colour;
          }

          #national {
            background: $national-colour;
          }

          #holiday {
            background: $holiday-colour;
          }
        }
      }
    }

    .closest-holiday {
      padding: 1rem;
      background: $background-colour-alt;
      flex: 1;

      .v-outside {
        .theme--light.v-btn.v-btn--has-bg {
          color: #a1a1a1;
        }
      }
    }
  }
}

.v-application .pl-1 {
  padding: 0 !important;
  margin: 0 !important;
}

.v-toolbar__title {
  margin: 8px;
}

.theme--light.v-calendar-weekly .v-calendar-weekly__day,
.theme--light.v-calendar-weekly .v-calendar-weekly__head-weekday,
.theme--light.v-calendar-weekly,
.theme--light.v-calendar-weekly .v-calendar-weekly__day.v-outside {
  border: none  !important;
  background: $background-colour-alt !important;
}

</style>