<template>
    <div class="closest-holiday-container">
        <h1>Closest Holiday</h1>
        <div class="closest-holiday">
            <v-sheet tile height="54" class="d-flex">
                <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </v-sheet>
            <v-sheet>
                <v-calendar :events="events" ref="calendar" :start="Date.parse(days[0].start)" min-weeks="8"/>
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
  }),
  mounted() {
    for (let day of this.days) {
        this.events.push({
            name: day.titles.join(", "),
            start: day.start, 
            end: day.end
            });

        this.events.push({
            name: "Book",
            start: day.daysOff[0], 
            end: day.daysOff[day.daysOff.length - 1],
            color: "red"
            });
    }
  },
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

  ul {
    li {
      display: inline-block;
      padding: 1rem 1.5rem 3rem 1.5rem;
      border: 1px solid black;
      position: relative;
      color: black;

      &:after {
        position: absolute;
        left: 0;
        bottom: 0;
        background: $decoration-colour;
        color: $decoration-text-colour;
        width: 100%;
        height: auto;
        padding: 0.2rem 0;
      }
    }

    .book {
      span {
        background: $book-colour;
      }

      &:after {
        content: "Book";
      }
    }

    .no-book {
      span {
        background: $default-color;
      }
    }

    .public-holiday {
      span {
        background: $default-color;
      }

      &:after {
        content: "Public Holiday";
      }
    }
  }
}
</style>