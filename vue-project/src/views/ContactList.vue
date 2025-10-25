<script setup>
import { ref, onMounted } from "vue";
import ContactService from "@/services/contact.service";

// Dữ liệu tạm (để test)
const contacts = ref([]);

onMounted(async () => {
  try {
    contacts.value = await ContactService.getAll();
  } catch (err) {
    console.error("Không thể tải dữ liệu:", err);
    // Nếu API chưa có, hiển thị dữ liệu tạm
    contacts.value = [
      { _id: 1, name: "Nguyễn Văn A", phone: "0909123456", email: "a@gmail.com" },
      { _id: 2, name: "Trần Thị B", phone: "0909876543", email: "b@gmail.com" },
    ];
  }
});
</script>

<template>
  <div class="page container mt-4">
    <h2 class="text-center mb-3 text-success">Danh sách liên hệ</h2>

    <ul class="list-group">
      <li class="list-group-item" v-for="contact in contacts" :key="contact._id">
        <b>{{ contact.name }}</b><br />
        📞 {{ contact.phone }}<br />
        📧 {{ contact.email }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page {
  max-width: 600px;
  margin: auto;
}
</style>
