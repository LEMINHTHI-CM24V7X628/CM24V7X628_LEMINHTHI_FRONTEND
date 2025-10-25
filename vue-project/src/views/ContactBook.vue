<template>
  <div class="page row">
    <!-- Ô tìm kiếm -->
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>

    <!-- Danh sách liên hệ -->
    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>

      <ContactList
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có liên hệ nào.</p>

      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>

    <!-- Chi tiết liên hệ -->
    <div class="mt-3 col-md-6" v-if="activeContact">
      <h4>
        Chi tiết Liên hệ
        <i class="fas fa-address-card"></i>
      </h4>
      <ContactCard :contact="activeContact" />
    </div>
  </div>
</template>

<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },

  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },

  watch: {
    // reset phần tử được chọn mỗi khi người dùng gõ tìm kiếm mới
    searchText() {
      this.activeIndex = -1;
    },
  },

  computed: {
    // tạo chuỗi kết hợp name, email, address, phone để tìm kiếm linh hoạt
    contactStrings() {
      return this.contacts.map(({ name, email, address, phone }) =>
        [name, email, address, phone].join("").toLowerCase()
      );
    },
    // lọc danh sách theo từ khóa tìm kiếm
    filteredContacts() {
      if (!this.searchText.trim()) return this.contacts;
      return this.contacts.filter((_contact, index) =>
        this.contactStrings[index].includes(this.searchText.toLowerCase())
      );
    },
    activeContact() {
      return this.activeIndex >= 0
        ? this.filteredContacts[this.activeIndex]
        : null;
    },
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },

  methods: {
    // tải danh bạ từ server
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (error) {
        console.error("Lỗi khi tải danh bạ:", error);
      }
    },

    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },

    // xóa toàn bộ danh bạ
    async removeAllContacts() {
      if (confirm("Bạn có chắc muốn xóa tất cả Liên hệ?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.error("Lỗi khi xóa tất cả:", error);
        }
      }
    },

    // chuyển sang trang thêm mới
    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },

  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
