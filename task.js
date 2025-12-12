// Attendez que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    const taskBtn = document.querySelector('#btnAddTask');

    if (taskBtn) {
        taskBtn.addEventListener('click', () => {
            const div = document.createElement('div');
            const container = document.getElementById('taskContainer');
            div.className = 'flex flex-col gap-2 p-4 border-none rounded-lg bg-white shadow-md w-fit ml-28 lg:ml-32 mt-4';
            let title = document.createElement('h2');
            title.textContent = 'Ajout de Tâches';
            let taskTitle = document.createElement('input');
            taskTitle.type = 'text';
            taskTitle.placeholder = "Titre de la tâche";
            taskTitle.className = "border p-2 rounded w-full focus:outline-none border-none bg-white shadow-md w-full";

            let description = document.createElement('textarea');
            description.placeholder = "Description de la tâche";
            description.className = "p-2 rounded w-full h-20 resize-none focus:outline-none border-none bg-white shadow-md w-full";


            div.appendChild(title);
            div.appendChild(taskTitle);
            div.appendChild(description);

            container.appendChild(div);
        });
    } else {
        console.error('Bouton #btnAddTask introuvable');
    }
});