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
import { computed } from "vue";
import { useContactsStore } from "@/stores/contacts";

export default {
  name: "DashboardView",
  setup() {
    const contactStore = useContactsStore();

    const contactCount = computed(() => contactStore.contacts.length);

    const cards = [
      {
        title: "Contacts",
        subtitle: computed(() => `${contactCount.value} contacts available`),
        text: "Manage your contacts efficiently and keep track of important information.",
      },
      {
        title: "Leads",
        subtitle: "Card subtitle secondary text",
        text: "Keep track of your leads and stay updated with the latest opportunities.",
      },
      {
        title: "Notes",
        subtitle: "Card subtitle secondary text",
        text: "Organize your thoughts and maintain important records in one place.",
      },
      {
        title: "Reminders",
        subtitle: "Card subtitle secondary text",
        text: "Never miss a deadline or important event with timely reminders.",
      },
    ];

    return {
      cards,
    };
  },
};
</script>
