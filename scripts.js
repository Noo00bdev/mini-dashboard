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
})