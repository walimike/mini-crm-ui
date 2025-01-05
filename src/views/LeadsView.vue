<template>
  <v-container>
    <div class="d-flex align-items-center mb-3">
      <h3>Leads</h3>
      <v-btn class="ms-auto" color="primary" @click="showAddModal = true">Add Lead</v-btn>
    </div>

    <!-- Add Lead Dialog -->
    <v-dialog v-model="showAddModal" persistent max-width="500px">
      <v-card>
        <v-card-title>Add Lead</v-card-title>
        <v-card-text>
          <v-text-field v-model="newLead.contact.name" label="Name" :rules="[rules.required]" />
          <v-text-field v-model="newLead.email" label="Email" :rules="[rules.required, rules.email]" />
          <v-text-field v-model="newLead.phone" label="Phone" :rules="[rules.required]" />
          <v-text-field v-model="newLead.location" label="Location" :rules="[rules.required]" />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="showAddModal = false">Cancel</v-btn>
          <v-btn color="primary" @click="addNewLead">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Leads List -->
    <v-row>
      <v-col cols="12" md="6" v-for="lead in leadsList" :key="lead.id">
        <v-card>
          <v-card-title>{{ lead.name }}</v-card-title>
          <v-card-text>
            <p>Status: {{ lead.status }}</p>
            <p>Lead name: {{ lead.contact.name }}</p>
            <p>Email: {{ lead.contact.email }}</p>
            <p>Notes: {{ lead.notes.content }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="editLead(lead)">Edit</v-btn>
            <v-btn text color="error" @click="deleteLeadAction(lead.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useLeadsStore } from "@/stores/leads";

const store = useLeadsStore();
const { fetchLeads, addLead, updateLead, deleteLead } = store;

const showAddModal = ref(false);
const newLead = ref({ name: "", email: "", phone: "", location: "" });

const rules = {
  required: (v) => !!v || "This field is required",
  email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
};

const leadsList = computed(() => store.leads);

const addNewLead = async () => {
  if (newLead.value.name && newLead.value.email) {
    try {
      await addLead(newLead.value);
      newLead.value = { name: "", email: "", phone: "", location: "" };
      showAddModal.value = false;
    } catch (err) {
      console.error("Failed to add Lead:", err);
    }
  }
};

const editLead = async (lead) => {
  const updatedName = prompt("Update Name:", lead.name);
  if (updatedName) {
    try {
      await updateLead(lead.id, { name: updatedName });
    } catch (err) {
      console.error("Failed to update lead:", err);
    }
  }
};

const deleteLeadAction = async (id) => {
  if (confirm("Are you sure you want to delete this lead?")) {
    try {
      await deleteLead(id);
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  }
};

onMounted(() => {
  fetchLeads();
});
</script>
