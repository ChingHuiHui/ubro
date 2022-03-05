<template>
  <aside class="w-56 bg-primary-light">
    <nav class="h-full">
      <ul class="h-full p-10 flex flex-col items-center">
        <li class="logo mb-5" />
        <li>集點卡</li>
        <li>兌換</li>
        <li class="mt-auto">
          <!-- TODO: for logout -->
          <button
            class="px-2 py-3 bg-primary text-white rounded-full w-40 transitable hover:bg-primary-dark"
          >
            完成
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
  aside {
    nav ul {
      .logo {
        @apply w-32 h-32 bg-cover rounded-full;

        background-image: url('@/assets/images/logo.jpg');
      }

      li:not(.logo) {
        @apply py-2 text-lg lg:text-xl hover:text-gray-100;
        @apply cursor-pointer transitable;
      }
    }
  }
</style>
