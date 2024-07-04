<template>
  <div
    class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    style="position: relative"
  >
        <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Task Page</h5>
        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            This is our Tasks to do
        </p>
        <div class="content-btn-create">
            <ButtonSecondary @click="openingModal()">
                Crear Task
            </ButtonSecondary>
        </div>
        <div class="ag-theme-alpine" style="height: 500px; width: 100%">
            <AgGridVue
                class="ag-theme-alpine"
                style="height: 500px; width: 100%"
                :rowData="rowData"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :pagination="true"
                :paginationPageSize="pageSize"
                :paginationPageSizeSelector="false"
                :getRowStyle="getRowStyle"
                @cellClicked="openingModal(false, $event)"
                @filterChanged="onFilterChanged"
            />
        </div>

        <FormModal v-if="isModalOpen" :title="titleModal" @hide-modal="toggleModal()">
            <AlertSuccess v-show="showNotificacion">
                <span class="font-medium" v-text="messageNotificacion"></span>
            </AlertSuccess>
            <form @submit.prevent="save" method="post" v-show="!showNotificacion">
                <div v-if="!execCreate" style="display: flex; justify-content: end;">
                    <ButtonWarning @click="deleteTask()">
                        Delete Tarea
                    </ButtonWarning>
                </div>
                <FormLabel style="text-align: left;" for="title">Titulo</FormLabel>
                <FormTextInput id="title" v-model="dataForm.title" type="text" required="required" placeholder="Titulo" />
                <FormLabel style="text-align: left;" for="description">Descripción</FormLabel>
                <FormTextArea id="description" placeholder="Descripción..." v-model="dataForm.description"/>
                <FormLabel style="text-align: left;" for="date_expired" required="required">Fecha vencimiento</FormLabel>
                <FormTextInput id="date_expired" v-model="dataForm.date_expired" type="date" placeholder="Fecha vencimiento" />
                <template v-if="!execCreate">
                    <div class="flex items-center h-5 mt-5">
                        <input
                            id="completed"
                            type="checkbox"
                            :checked="dataForm.completed"
                            @change="dataForm.completed = $event.target.checked"
                            class="w-4 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        />
                        <FormLabel class="ml-4 mt-2" for="completed">Tarea Completada</FormLabel>
                    </div>
                </template>
                <div style="margin-top: 3vh;">
                    <ButtonPrimary style="margin-right: 2vh;">
                        Guardar
                    </ButtonPrimary>
                    <ButtonSecondary @click="toggleModal()">
                        Cancelar
                    </ButtonSecondary>
                </div>
            </form>
        </FormModal>

    </div>
</template>

<script setup>
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

definePageMeta({
    middleware: ["auth"],
});

const { $columnDefs } = useNuxtApp();
const task = useTaskStore();
const pageSize = ref(4);
const rowData = ref([]);
const dataForm = ref({
    title: '',
    description: '',
    date_expired: '',
    completed: '',
});
const isModalOpen = ref(false);
const messageNotificacion = ref('');
const titleModal = ref('');
const task_id = ref('');
const execCreate = ref(false);
const showNotificacion = ref(false);
const columnDefs = ref($columnDefs);
const defaultColDef = ref({
  sortable: false,
  filter: true,
});

const deleteTask = async () => {
    if (confirm("¿Está seguro de eliminar esta tarea?.")){
        execDeleteTask();
    }
};

const getTasks = async () => {
  const { data } = await task.getAllTasks({});
  rowData.value = data;
};

const onFilterChanged = async (event) => {
  const allFilterModels = event.api.getFilterModel();
  const { data } = await task.getAllTasks({ search: allFilterModels });
  rowData.value = data;
};

const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value; // Abre el modal
}

const openingModal = (isCreate = true, event = {}) => {
    if (isCreate){
        dataForm.value = {
            title: '',
            description: '',
            date_expired: '',
            completed: '',
        };
        titleModal.value = 'Create Task';
        execCreate.value = isCreate;
    } else {
        task_id.value = event.data.id;
        dataForm.value = {
            title: event.data.title,
            description: event.data.description,
            date_expired: event.data.date_expired,
            completed: event.data.completed,
        };
        titleModal.value = 'Edit Task';
        execCreate.value = isCreate;
    }

    toggleModal();
}

const save = async (event) => {
    const data = dataForm.value;

    if (execCreate.value) {
        // Agrega una nueva fila vacía
        await task.create({
            title: data.title,
            description: data.description,
            date_expired: data.date_expired,
        });
    } else {
        await task.update(task_id.value, {
            title: data.title,
            description: data.description,
            date_expired: data.date_expired,
            completed: data.completed,
        });
    }

    await getTasks();
    showNotificacion.value = true;
    messageNotificacion.value = 'Registro guardado correctamente!';

    setTimeout(() => {
        toggleModal();
        showNotificacion.value = false;
    }, 2500);
};

const execDeleteTask = async () => {
    await task.delete(task_id.value);
    await getTasks();
    showNotificacion.value = true;
    messageNotificacion.value = 'Registro eliminado correctamente!';

    setTimeout(() => {
        toggleModal();
        showNotificacion.value = false;
    }, 2500);
};

const getRowStyle = (event) => {
    const { data } = event;
    if (data.completed){
        return {
            cursor: "pointer",
            backgroundColor: '#00800073'
        };
    }

    return { cursor: "pointer" };
};

getTasks();

</script>

<style>
.content-module {
  justify-content: center;
  align-items: center;
}

.title {
  margin-top: 10px;
  margin-bottom: 10px;
}

.container-form {
  margin-top: 5vh;
}

.register-row {
  cursor: pointer;
}

.content-btn-create{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: end;
}
</style>
