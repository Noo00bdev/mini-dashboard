import { Chart } from 'chart.js/auto';

// Envelopper tout le code dans DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const homeImg = document.getElementById('nav-img-home');
    const homeText = document.getElementById('home-text')
    const taskImg = document.getElementById('nav-img-task')
    const taskText = document.getElementById('task-text')
    const statImg = document.getElementById('nav-img-statistic')
    const statText = document.getElementById('statistic-text')
    const settImg = document.getElementById('nav-img-settings')
    const settText = document.getElementById('settings-text')
    const modify = document.getElementById('modify');
    const modifyForm = document.getElementById('modify-form');
    const addMonthBtn = document.getElementById('add-month-btn');
    const monthList = document.getElementById('values-container');
    const saveBtn = document.getElementById('save-btn');

    /**
     *
     * @param {HTMLElement} element
     * @param {HTMLElement} text
     * @param {String} paths1
     * @param {String} paths2
     */
    function active(element, text, paths1, paths2){
        if (element) {
            const ACTIVE_SRC = paths1;
            const INACTIVE_SRC = paths2;
            element.addEventListener('click', () => {
                const current = element.getAttribute('src') || '';
                const next = current === ACTIVE_SRC ? INACTIVE_SRC : ACTIVE_SRC;
                element.setAttribute('src', next);
                const links = document.querySelectorAll('a');

                links.forEach(link => {
                    links.forEach(l => l.classList.remove('text-user-icon'));
                });
                text.classList.add('text-user-icon')
            });
        } else {
            console.warn("Element not found.");
        }

        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                links.forEach(l => l.classList.remove('text-user-icon'));
                link.classList.add('text-user-icon');
            });
        });
    }

    active(homeImg, homeText, 'img/home-active.png', 'img/home.png')
    active(taskImg, taskText, 'img/task-active.png', 'img/task.png')
    active(statImg, statText, 'img/statistic-active.png', 'img/statistic.png')
    active(settImg, settText, 'img/settings-active.png', 'img/settings.png')

    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => {
                const img = i.querySelector('img');
                if (img) img.setAttribute('src', img.dataset.srcBase);
            });

            const imgClicked = item.querySelector('img');
            if (imgClicked) imgClicked.setAttribute('src', imgClicked.dataset.srcActive);
        });
    });

    // Graphique - vérifier que l'élément existe
    const ctx = document.getElementById('myChart');

    let myChart = null;

    if (ctx) {
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin','Juillet','Août','Septembre','Novembre','Decembre'],
                datasets: [{
                    label: 'Ventes (€)',
                    data: [120, 190, 300, 250, 200, 320,199, 390, 650, 500, 420],
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgb(59, 130, 246)',
                    borderWidth: 2,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    /* Modifier le graphe*/
    if (modify) {
        modify.addEventListener('click', (e) => {
            e.preventDefault();
            modifyForm.style.display = modifyForm.style.display === 'block' ? 'none' : 'block';
            if (monthList) monthList.focus();
        });
    }

    // Ajouter un mois
    if (addMonthBtn) {
        addMonthBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const div = document.createElement('div');
            div.className = 'month-entry flex gap-16 mb-2 ml-4 border-b-1 pb-2';
            div.innerHTML = `
                <select name="month" class="MonthName" >
                    <option value="Janvier">Janvier</option>
                    <option value="Février">Février</option>
                    <option value="Mars">Mars</option>
                    <option value="Avril">Avril</option>
                    <option value="Mai">Mai</option>
                    <option value="Juin">Juin</option>
                    <option value="Juillet">Juillet</option>
                    <option value="Août">Août</option>
                    <option value="Septembre">Septembre</option>
                    <option value="Octobre">Octobre</option>
                    <option value="Novembre">Novembre</option>
                    <option value="Décembre">Décembre</option>  
                </select>
                <input type="number" placeholder="Valeur (€)" class="month-value focus:outline-none border-2 p-2 border-black rounded-xl w-52 md:w-80" required>
            `;
            if (monthList) monthList.appendChild(div);
            console.log('Ajouter un mois cliqué !');
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const monthSelects = document.querySelectorAll('.MonthName');
            const monthValues = document.querySelectorAll('.month-value');

            const newLabels = [];
            const newData = [];

            monthSelects.forEach((select, index) => {
                newLabels.push(select.value);
                newData.push(parseFloat(monthValues[index].value));
            });

            const chart = Chart.getChart('myChart');
            if (chart) {
                chart.data.labels = newLabels;
                chart.data.datasets[0].data = newData;
                chart.update();
                DynamiqueVentes();
                PireVentes();
                BestSale();
                MoyenneVentes();
            }

            if (modifyForm) modifyForm.style.display = 'none';
            console.log('Données sauvegardées !');
        });
    }

    function DynamiqueVentes(){
        const ventes = document.getElementById('ventes');
        const chart = Chart.getChart('myChart');
        if (!chart || !ventes) return;
        const AllVentes = chart.data.datasets[0].data;
        const totalVentes = AllVentes.reduce((acc, val) => acc + val, 0);
        ventes.textContent = totalVentes + ' €';
        ventes.className = 'text-2xl font-bold text-green-600';
    }

    function BestSale(){
        const bestVente = document.getElementById('bestSales');
        const chart = Chart.getChart('myChart');
        if (!chart || !bestVente) return;
        const AllVentes = chart.data.datasets[0].data || [];
        const AllMonth = chart.data.labels || [];
        const nums = AllVentes.map(v => Number(v)).filter(n => !isNaN(n));
        const MaxVents = nums.length ? Math.max(...nums) : 0;
        let index = nums.indexOf(MaxVents);

        if (AllMonth[index] !== null && index !== -1){
            bestVente.className = 'text-2xl font-bold text-green-600';
            bestVente.textContent = `${AllMonth[index]} : ${MaxVents} €`;
        }else{
            bestVente.textContent = `Aucune donnée`;
        }
    }

    function PireVentes(){
        const container = document.getElementById('worstSales');
        const chart = Chart.getChart('myChart');
        if (!chart || !container) return;
        const AllVentes = chart.data.datasets[0].data || [];
        const AllMonth = chart.data.labels || [];
        const ventes = AllVentes.map(v => Number(v));
        const minVentes = ventes.length ? Math.min(...ventes) : 0;
        const index = ventes.indexOf(minVentes);

        if(AllMonth[index] !== null && index !== -1) {
            container.className = 'text-2xl font-bold text-green-600';
            container.textContent = ` ${AllMonth[index]} : ${minVentes} €`
        }else{
            container.textContent = 'Aucune donnée';
        }
    }

    function MoyenneVentes(){
        const container = document.getElementById('moySales');
        const chart = Chart.getChart('myChart');
        if (!chart || !container) return;
        const AllVentes = chart.data.datasets[0].data || [];
        const sum = AllVentes.length ? Math.round(AllVentes.reduce((acc, val) => acc + val, 0)) : 0;
        const moy = sum.toFixed(2);
        container.className = 'text-2xl font-bold text-green-600';
        container.textContent = `${moy} €`;
    }

    // Initialiser les statistiques si le graphique existe
    if (myChart) {
        DynamiqueVentes();
        BestSale();
        PireVentes();
        MoyenneVentes();
    }

    // GESTION DES TÂCHES
    const taskBtn = document.querySelector('#btnAddTask');
    if (taskBtn) {
        taskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'addTask.html';
        })
    }
    const taskCancelBtn = document.querySelector('#taskCancel');
    if (taskCancelBtn) {
        taskCancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'task.html';
        })
    }

    const priorityBtn = document.querySelectorAll('.btn-Priority');

    priorityBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            // Tous les boutons redeviennent blancs
            priorityBtn.forEach((b) => {
                b.classList.remove('bg-primary');
                b.classList.remove('border-white')
                b.classList.remove('border-4')
                b.classList.remove('border-double')
                b.classList.remove('text-text')
                b.classList.add('bg-white');
            });

            // Le bouton cliqué devient bleu
            btn.classList.remove('bg-white');
            btn.className = 'btn-Priority rounded-3xl text-text bg-primary p-4 flex-1 border-4 border-double border-white';
        });
    });

    const statusBtn = document.querySelectorAll('.btn-status');

    statusBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            // Tous les boutons redeviennent blancs
            statusBtn.forEach((b) => {
                b.classList.remove('bg-primary/40');
                b.classList.remove('border-white')
                b.classList.remove('border-4')
                b.classList.remove('border-double')
                b.classList.remove('text-text')
                b.classList.remove('font-bold')
                b.classList.add('bg-white');
            });

            // Le bouton cliqué devient bleu
            btn.classList.remove('bg-white');
            btn.className = 'btn-Priority rounded-3xl text-text font-bold bg-primary/40 p-4 flex-1 border-4 border-double border-white';
        });
    });

    const taskAddBtn = document.querySelector('#taskAdd');

    if (taskAddBtn) {
        taskAddBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const taskName = document.querySelector('#taskName');
            const taskDescription = document.querySelector('#taskDescription');

            if (!taskName || !taskDescription) {
                alert('Erreur: champs introuvables');
                return;
            }

            const name = taskName.value.trim();
            const desc = taskDescription.value.trim();

            if (!name || !desc) {
                alert('Veuillez remplir tous les champs');
                return;
            }

            // Récupérer les tâches existantes
            let tasks = localStorage.getItem('tasks');
            if (!tasks) {
                tasks = [];
            } else {
                tasks = JSON.parse(tasks);
            }

            // Ajouter la nouvelle tâche
            tasks.push({
                id: Date.now(),
                title: name,
                description: desc
            });

            // Sauvegarder
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // Rediriger
            window.location.href = "task.html";
        });
    }

// Afficher les tâches sur task.html
    const taskContainer = document.getElementById('taskAddContainer');
    if (taskContainer) {
        // Récupérer les tâches
        let tasks = localStorage.getItem('tasks');

        if (!tasks || tasks === '[]') {
            taskContainer.innerHTML = '<p class="text-center text-gray-500 p-4">Aucune tâche. Cliquez sur "Nouvelle Tâche" pour commencer.</p>';
        } else {
            tasks = JSON.parse(tasks);
            taskContainer.innerHTML = '';

            tasks.forEach(task => {
                const div = document.createElement('div');
                div.className = 'bg-white p-4 rounded-xl mb-3 shadow-sm border border-gray-200';

                div.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="font-bold text-lg mb-2 text-text-primary">${task.title}</h3>
                        <p class="text-gray-600">${task.description}</p>
                    </div>
                    <button class="delete-task text-red-500 hover:text-red-700 ml-4" data-id="${task.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;

                taskContainer.appendChild(div);
            });

            // Ajouter les événements de suppression
            document.querySelectorAll('.delete-task').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const taskId = parseInt(e.currentTarget.dataset.id);

                    if (confirm('Supprimer cette tâche ?')) {
                        let tasks = JSON.parse(localStorage.getItem('tasks'));
                        tasks = tasks.filter(t => t.id !== taskId);
                        localStorage.setItem('tasks', JSON.stringify(tasks));

                        // Recharger la page
                        window.location.reload();
                    }
                });
            });
        }
    }

});