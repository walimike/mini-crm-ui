<template>
  <v-container>
    <div class="d-flex align-items-center mb-3">
      <h3>Contacts</h3>
      <v-btn class="ms-auto" color="primary" @click="showAddModal = true">Add Contact</v-btn>
    </div>

    <!-- Add Contact Dialog -->
    <v-dialog v-model="showAddModal" persistent max-width="500px">
      <v-card>
        <v-card-title>Add Contact</v-card-title>
        <v-card-text>
          <v-text-field v-model="newContact.name" label="Name" :rules="[rules.required]" />
          <v-text-field v-model="newContact.email" label="Email" :rules="[rules.required, rules.email]" />
          <v-text-field v-model="newContact.phone" label="Phone" :rules="[rules.required]" />
          <v-text-field v-model="newContact.location" label="Location" :rules="[rules.required]" />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="showAddModal = false">Cancel</v-btn>
          <v-btn color="primary" @click="addNewContact">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Contacts List -->
    <v-row>
      <v-col cols="12" md="6" v-for="contact in contactsList" :key="contact.id">
        <v-card>
          <v-card-title>{{ contact.name }}</v-card-title>
          <v-card-text>
            <p>Email: {{ contact.email }}</p>
            <p>Phone: {{ contact.phone }}</p>
            <p>Location: {{ contact.location }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="editContact(contact)">Edit</v-btn>
            <v-btn text color="error" @click="deleteContactAction(contact.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useContactsStore } from "@/stores/contacts";

const store = useContactsStore();
const { fetchContacts, addContact, updateContact, deleteContact } = store;

const showAddModal = ref(false);
const newContact = ref({ name: "", email: "", phone: "", location: "" });

const rules = {
  required: (v) => !!v || "This field is required",
  email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
};

// Computed property to get contacts from the store
const contactsList = computed(() => store.contacts);

// Add a new contact
const addNewContact = async () => {
  if (newContact.value.name && newContact.value.email) {
    try {
      await addContact(newContact.value);
      newContact.value = { name: "", email: "", phone: "", location: "" };
      showAddModal.value = false;
    } catch (err) {
      console.error("Failed to add contact:", err);
    }
  }
};

// Edit an existing contact
const editContact = async (contact) => {
  const updatedName = prompt("Update Name:", contact.name);
  if (updatedName) {
    try {
      await updateContact(contact.id, { name: updatedName });
    } catch (err) {
      console.error("Failed to update contact:", err);
    }
  }
};

// Delete a contact
const deleteContactAction = async (id) => {
  if (confirm("Are you sure you want to delete this contact?")) {
    try {
      await deleteContact(id);
    } catch (err) {
      console.error("Failed to delete contact:", err);
    }
  }
};

// Fetch contacts on mount
onMounted(() => {
  fetchContacts();
});
</script>
