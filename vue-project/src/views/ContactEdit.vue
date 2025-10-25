<template>
  <div v-if="contact" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>

    <!-- Form nhập liệu -->
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
  components: {
    ContactForm,
  },

  props: {
    id: { type: String, required: true },
  },

  data() {
    return {
      contact: null,
      message: "",
    };
  },

  methods: {
    // 🟩 Lấy thông tin liên hệ từ server theo id
    async getContact(id) {
      try {
        this.contact = await ContactService.get(id);
      } catch (error) {
        console.error(error);
        // Nếu lỗi (liên hệ không tồn tại), chuyển đến trang NotFound
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },

    // 🟩 Cập nhật thông tin liên hệ
    async updateContact(data) {
      try {
        await ContactService.update(this.contact._id, data);
        alert("Liên hệ được cập nhật thành công!");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.error(error);
      }
    },

    // 🟩 Xóa liên hệ
    async deleteContact() {
      if (confirm("Bạn muốn xóa Liên hệ này?")) {
        try {
          await ContactService.delete(this.contact._id);
          alert("Liên hệ đã bị xóa!");
          this.$router.push({ name: "contactbook" });
        } catch (error) {
          console.error(error);
        }
      }
    },
  },

  created() {
    this.getContact(this.id);
    this.message = "";
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
