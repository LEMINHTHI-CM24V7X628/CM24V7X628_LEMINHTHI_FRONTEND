<template>
  <div v-if="contact" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>

    <ContactForm
      :contact="contact"
      @submit:contact="updateContact"
      @delete:contact="deleteContact"
    />

    <p v-if="message" class="alert alert-info mt-3">{{ message }}</p>
  </div>

  <div v-else class="page text-center mt-5">
    <p>Đang tải thông tin liên hệ...</p>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: { ContactForm },
  props: { id: { type: String, required: true } },
  data() {
    return {
      contact: null,
      message: "",
    };
  },
  methods: {
    async getContact(id) {
      try {
        this.contact = await ContactService.get(id);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        this.$router.push({
          name: "notfound",
          params: { pathMatch: this.$route.path.split("/").slice(1) },
        });
      }
    },
    async updateContact(data) {
      try {
        await ContactService.update(this.contact._id, data);
        alert("Cập nhật thành công!");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.error("Lỗi cập nhật:", error);
      }
    },
    async deleteContact() {
      if (confirm("Bạn muốn xóa liên hệ này?")) {
        try {
          await ContactService.delete(this.contact._id);
          alert("Đã xóa thành công!");
          this.$router.push({ name: "contactbook" });
        } catch (error) {
          console.error("Lỗi xóa:", error);
        }
      }
    },
  },
  created() {
    this.getContact(this.id);
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
