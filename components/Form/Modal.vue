<template>
  <div class="modal w-full">
    <div class="modal-dialog w-full">
      <div class="modal-content w-full">
        <div class="modal-header">
          <h3 class="modal-title" v-text="title"></h3>
        </div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["title"]);
const emit = defineEmits(["update:hideModal"]);
</script>

<style scoped>
.modal {
  /* Estilos para hacer que el modal aparezca sobre el contenido */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  /* Estilos para el contenedor del modal */
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  max-width: 40%;
  max-height: 80%;
  overflow: auto;
}

@media screen and (min-width: 1025px) {
  .modal-dialog {
    max-width: 500px;
  }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .modal-dialog {
    max-width: 300px;
  }
}

@media screen and (max-width: 767px) {
  .modal-dialog {
    max-width: 90%;
  }
}

.modal-content {
  /* Estilos para el contenido del modal */
  position: relative;
}

.modal-header {
  /* Estilos para la cabecera del modal */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.modal-title {
  /* Estilos para el título del modal */
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.modal-body {
  /* Estilos para el cuerpo del modal */
  padding: 10px 0;
}
</style>
