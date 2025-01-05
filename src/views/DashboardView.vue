<template>
  <v-container>
    <v-row class="mx-0" dense>
      <v-col
        cols="12"
        md="6"
        class="d-flex justify-center"
        v-for="(card, index) in cards"
        :key="index"
      >
        <v-card
          class="mx-2 my-4"
          elevation="16"
          max-width="344"
        >
          <v-card-item>
            <v-card-title>
              {{ card.title }}
            </v-card-title>
            <v-card-subtitle>
              {{ card.subtitle }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            {{ card.text }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardView",
  data() {
    return {
      cards: [
        {
          title: "Contacts",
          subtitle: "Card subtitle secondary text",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          title: "Leads",
          subtitle: "Card subtitle secondary text",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          title: "Notes",
          subtitle: "Card subtitle secondary text",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          title: "Reminders",
          subtitle: "Card subtitle secondary text",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      ],
    };
  },
};
</script>
