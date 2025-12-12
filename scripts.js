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
            console.log('Bouton Nouvelle Tâche cliqué !');

            const container = document.getElementById('taskContainer');
            container.classList.remove('hidden');
            if (!container) {
                console.error('taskContainer introuvable');
                return;
            }

            const div = document.createElement('div');
            div.className = 'flex flex-col gap-2 p-4 border-none rounded-lg bg-white shadow-md w-fit ml-28 lg:ml-32 mt-4 relative';

            // Bouton fermer
            let btnClose = document.createElement('button');
            btnClose.textContent = '✕';
            btnClose.className = 'absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl w-8 h-8 flex items-center justify-center';

            // Titre
            let title = document.createElement('h2');
            title.textContent = 'Ajout de Tâches';
            title.className = 'font-bold text-lg mt-6';

            // Input titre
            let taskTitle = document.createElement('input');
            taskTitle.type = 'text';
            taskTitle.placeholder = "Titre de la tâche";
            taskTitle.className = "border p-2 rounded w-full focus:outline-none border-gray-300 bg-white shadow-sm";

            // Textarea description
            let description = document.createElement('textarea');
            description.placeholder = "Description de la tâche";
            description.className = "p-2 rounded w-full h-20 resize-none focus:outline-none border border-gray-300 bg-white shadow-sm";

            // Ajouter les éléments au div
            div.appendChild(btnClose);
            div.appendChild(title);
            div.appendChild(taskTitle);
            div.appendChild(description);

            // Ajouter le div au container
            container.appendChild(div);

            // Event listener pour fermer (directement sur le bouton créé)
            btnClose.addEventListener('click', (e) => {
                e.preventDefault();
                div.remove();
                container.classList.add('hidden')// Supprime complètement le div
                console.log('Tâche fermée !');
            })
        });
    } else {
        console.error('Bouton #btnAddTask introuvable');
    }

});