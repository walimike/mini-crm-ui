import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useLeadsStore = defineStore("leads", () => {
  const leads = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const API_BASE_URL = "http://127.0.0.1:8000/api/leads/";

  const fetchLeads = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`, 
        },
      });
      
      leads.value = response.data; 
    } catch (err) {
      error.value = "Failed to fetch leads.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addLead = async (lead) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.post(API_BASE_URL, lead, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });
      leads.value.push(response.data); // Add the new lead to the list
    } catch (err) {
      error.value = "Failed to add lead.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const updateLead = async (id, updatedLead) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.put(`${API_BASE_URL}/${id}/`, updatedLead, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });
      const index = leads.value.findIndex((lead) => lead.id === id);
      if (index !== -1) {
        leads.value[index] = response.data; // Update the lead in the list
      }
    } catch (err) {
      error.value = "Failed to update lead.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const deleteLead = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      await axios.delete(`${API_BASE_URL}${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      });
      leads.value = leads.value.filter((lead) => lead.id !== id); // Remove the lead from the list
    } catch (err) {
      error.value = "Failed to delete lead.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    leads,
    loading,
    error,
    fetchLeads,
    addLead,
    updateLead,
    deleteLead,
  };
});
