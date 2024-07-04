const columnDefs = [
	{ field: 'title', headerName: 'Título', filter: 'agTextColumnFilter', filterParams: { filterOptions: ['contains'] }, flex: 1 },
	{ field: 'description', headerName: 'Descripción', filter: 'agTextColumnFilter', filterParams: { filterOptions: ['contains'] }, flex: 1},
	{ field: 'date_expired', headerName: 'Fecha vencimiento', sortable: false, filter: false, flex: 1},
	{ field: 'task_completed', headerName: 'Estado', sortable: false, filter: false, flex: 1 },
];

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('columnDefs', columnDefs);
});