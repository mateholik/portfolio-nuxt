import { ref } from "vue";

export const useDarkMode = () => {
  const isDark = ref(false);

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle("dark", isDark.value);
  };

  return {
    isDark,
    toggleDarkMode,
  };
};
