<template>
  <v-container>
    <h1>Contacts</h1>
    <v-btn color="primary" @click="showAddModal = true">Add Contact</v-btn>

    <v-dialog v-model="showAddModal" persistent max-width="500px">
      <v-card>
        <v-card-title>Add Contact</v-card-title>
        <v-card-text>
          <v-text-field v-model="newContact.name" label="Name"></v-text-field>
          <v-text-field v-model="newContact.email" label="Email"></v-text-field>
          <v-text-field v-model="newContact.phone" label="Phone"></v-text-field>
          <v-text-field v-model="newContact.location" label="Location"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="showAddModal = false">Cancel</v-btn>
          <v-btn color="primary" @click="addNewContact">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col cols="12" md="6" v-for="contact in contacts" :key="contact.id">
        <v-card>
          <v-card-title>{{ contact.name }}</v-card-title>
          <v-card-text>
            <p>Email: {{ contact.email }}</p>
            <p>Phone: {{ contact.phone }}</p>
            <p>Location: {{ contact.location }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="editContact(contact)">Edit</v-btn>
            <v-btn text color="error" @click="deleteContact(contact.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useContactsStore } from "@/stores/contacts";

const store = useContactsStore();
const { contacts, fetchContacts, addContact, updateContact, deleteContact } = store;

const showAddModal = ref(false);
const newContact = ref({ name: "", email: "", phone: "", location: "" });

const addNewContact = () => {
  if (newContact.value.name && newContact.value.email) {
    addContact(newContact.value);
    newContact.value = { name: "", email: "", phone: "", location: "" };
    showAddModal.value = false;
  }
};

const editContact = (contact) => {
  const updatedName = prompt("Update Name:", contact.name);
  if (updatedName) {
    updateContact(contact.id, { name: updatedName });
  }
};

onMounted(() => {
  fetchContacts();
});
</script>
