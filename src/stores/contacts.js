import { defineStore } from "pinia";
import { ref } from "vue";

export const useContactsStore = defineStore("contacts", () => {
  const contacts = ref([]);
  const loading = ref(false);

  const fetchContacts = async () => {
    loading.value = true;
    
    try {
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              { id: 1, name: "John Doe", email: "john@example.com", phone: "123456789", location: "New York" },
              { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987654321", location: "California" },
            ]),
          1000
        )
      );
      contacts.value = response;
    } finally {
      loading.value = false;
    }
  };

  const addContact = (contact) => {
    const newContact = { ...contact, id: Date.now() };
    contacts.value.push(newContact);
  };

  const updateContact = (id, updatedContact) => {
    const index = contacts.value.findIndex((contact) => contact.id === id);
    if (index !== -1) {
      contacts.value[index] = { ...contacts.value[index], ...updatedContact };
    }
  };

  const deleteContact = (id) => {
    contacts.value = contacts.value.filter((contact) => contact.id !== id);
  };

  return { contacts, loading, fetchContacts, addContact, updateContact, deleteContact };
});
