import { Chart } from 'chart.js/auto';

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
            // si src n'est pas defini on ajoute une chaine vide 
            const current = element.getAttribute('src') || '';
            /* si current est egale a ACTIVE_SRC alors
                next prend la valeur INACTIVE_SRC sinon ACTIVE_SRC
            */ 
            const next = current === ACTIVE_SRC ? INACTIVE_SRC : ACTIVE_SRC;
            element.setAttribute('src', next);
            const links = document.querySelectorAll('a');
       
            links.forEach(link => {
                // D'abord, enlever la classe de tous les liens
                links.forEach(l => l.classList.remove('text-user-icon'));
                // Puis, ajouter la classe uniquement au lien cliqué
            });
            text.classList.add('text-user-icon')   
    });
    } else {
        console.warn("Element with id 'nav-img-home' not found.");
    }   
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('click', () => {
            // D'abord, enlever la classe de tous les liens
            links.forEach(l => l.classList.remove('text-user-icon'));

            // Puis, ajouter la classe uniquement au lien cliqué
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

    //  Réinitialiser toutes les images à leur état de base
    navItems.forEach(i => {
        //selectionne tout les image de navitems
      const img = i.querySelector('img');
      if (img) img.setAttribute('src', img.dataset.srcBase); // <- dataset sur img
    });

    // Changer l'image de l'élément cliqué
    const imgClicked = item.querySelector('img');
    if (imgClicked) imgClicked.setAttribute('src', imgClicked.dataset.srcActive); // <- dataset sur img
  });
});



// Récupère l'élément canvas
const ctx = document.getElementById('myChart');

// Crée un graphique à barres
new Chart(ctx, {
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


/* Modifier le graphe*/
modify.addEventListener('click', (e) => {
    e.preventDefault();
    modifyForm.style.display =
        /* Si le style d'affichage actuel est 'block', le changer en 'none', sinon en 'block' */
        modifyForm.style.display === 'block'
            ? 'none'
            : 'block';

    monthList.focus();
})
// Ajouter un mois
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
    monthList.appendChild(div);


    console.log('Ajouter un mois cliqué !');
});
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





    // Mettre à jour le graphique avec les nouvelles données
    const chart = Chart.getChart('myChart');
    chart.data.labels = newLabels;
    chart.data.datasets[0].data = newData;
    chart.update();
    BestSale();
    PireVentes();
    DynamiqueVentes();
    MoyenneVentes()

    // Cacher le formulaire après sauvegarde
    modifyForm.style.display = 'none';

    console.log('Données sauvegardées !');
})

function DynamiqueVentes(){
    const ventes = document.getElementById('ventes');
    const chart = Chart.getChart('myChart');
    const AllVentes = chart.data.datasets[0].data;
    const totalVentes = AllVentes.reduce((acc, val) => acc + val, 0);
    ventes.textContent = totalVentes + ' €';
    ventes.className = 'text-2xl font-bold text-green-600';
}
DynamiqueVentes();

function BestSale(){
    const bestVente = document.getElementById('bestSales');
    const chart = Chart.getChart('myChart');
    if (!chart) return;
    const AllVentes = chart.data.datasets[0].data || [];
    const AllMonth = chart.data.labels || [];
    // number convertir en nombre et filter filtre les valeurs qui seront peut Nan
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
BestSale();

function PireVentes(){
    const container = document.getElementById('worstSales');
    const chart = Chart.getChart('myChart');
    if (!chart) return;
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
PireVentes();

function MoyenneVentes(){
    const container = document.getElementById('moySales');
    const chart = Chart.getChart('myChart');
    if (!chart) return;
    const AllVentes = chart.data.datasets[0].data || [];
    const sum = AllVentes.length ? Math.round(AllVentes.reduce((acc, val) => acc + val, 0)) : 0;
    const moy = sum.toFixed(2);
    container.className = 'text-2xl font-bold text-green-600';
    if(container && moy) container.textContent =`${moy} €`
}
MoyenneVentes()





