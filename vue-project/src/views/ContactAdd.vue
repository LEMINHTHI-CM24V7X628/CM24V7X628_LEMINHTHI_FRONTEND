<template>
  <div class="page">
    <h4>Thêm Liên hệ</h4>

    <ContactForm :contact="contact" @submit:contact="addContact" />
    <p v-if="message" class="alert alert-info mt-3">{{ message }}</p>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactForm,
  },

  data() {
    return {
      contact: {
        name: "",
        email: "",
        address: "",
        phone: "",
        favorite: false,
      },
      message: "",
    };
  },

  methods: {
    async addContact(data) {
      try {
        await ContactService.create(data);
        alert("Thêm liên hệ mới thành công!");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.error("Lỗi khi thêm liên hệ:", error);
        this.message = "Không thể thêm liên hệ. Vui lòng thử lại.";
      }
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: auto;
  text-align: left;
}
</style>
