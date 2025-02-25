import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

export const useContactsStore = defineStore("contacts", () => {
  const contacts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const API_BASE_URL = "http://127.0.0.1:8000/api/contacts/";
  const authStore = useAuthStore();

  const fetchContacts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`, 
        },
      });
      
      contacts.value = response.data; 
    } catch (err) {
      error.value = "Failed to fetch contacts.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addContact = async (contact) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.post(API_BASE_URL, contact, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });
      contacts.value.push(response.data); // Add the new contact to the list
    } catch (err) {
      error.value = "Failed to add contact.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const updateContact = async (id, updatedContact) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.put(`${API_BASE_URL}/${id}/`, updatedContact, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });
      const index = contacts.value.findIndex((contact) => contact.id === id);
      if (index !== -1) {
        contacts.value[index] = response.data; // Update the contact in the list
      }
    } catch (err) {
      error.value = "Failed to update contact.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const deleteContact = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      await axios.delete(`${API_BASE_URL}${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });
      contacts.value = contacts.value.filter((contact) => contact.id !== id); // Remove the contact from the list
    } catch (err) {
      error.value = "Failed to delete contact.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    addContact,
    updateContact,
    deleteContact,
  };
});
