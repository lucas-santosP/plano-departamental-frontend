export default {
  methods: {
    showNotification(type, text, title) {
      if (title === undefined)
        title = type === "success" ? "Sucesso!" : "Erro!";

      this.$notify({
        group: "general",
        title: title,
        text: text,
        type: type,
      });
    },
  },
};
