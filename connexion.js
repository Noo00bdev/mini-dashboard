const errorMessage = document.querySelector('#errorMessage');


export function login(e){
    e.preventDefault();
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    if (email.value.trim() ==='' && password.value.trim() === '') {
        email.style.border = '1px solid red';
        password.style.border = '1px solid red';
        return;
    }


    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();


    const users = JSON.parse(localStorage.getItem('user')) || [];

    const matchingUser = users.find(u =>
        u.email.trim() === emailVal &&
        u.password.trim() === passwordVal
    );

    if(matchingUser){
        window.location.href = 'main.html';
        errorMessage.innerHTML = "";
        errorMessage.className = ''
    }else {
        errorMessage.innerHTML = `Donnés mal saisie ou Utilisateur non inscrit`;
        errorMessage.className = 'm-1 p-2 bg-error/70 ';
    }

}
export function loginForm(e){
    e.preventDefault();
    const form = document.querySelector('#loginForm');
    form.innerHTML = '';
    form.innerHTML = `<label for="email">Email</label>
                <input type="email" name="" id="email" placeholder="@  email@gmail.com..." class="border border-b-black rounded p-2">
                <label for="password">Mot de passe</label>
                <input type="password" name="" id="password" placeholder="🔒 ************" class="border border-b-black rounded p-2">
                <div class="flex justify-between gap-2">
                    <div class="flex flex-row items-center gap-2 ">
                        <input type="checkbox" name="" id="rememberMe">
                        <label for="rememberMe" class="text-xs">Se souvenir de moi</label>
                    </div>
                    <p class="text-xs text-primary font-bold">Mot de passe oublié ?</p>
                </div>
                <input type="submit" value="Se connecter" class="text-xs text-foreground rounded bg-primary p-2 duration-700 hover:bg-background hover:text-primary " id="connexion">
                <div class="flex items-center gap-2 ">
                    <hr class="flex-1">
                        <p>Ou continuer avec</p>
                    <hr class="flex-1">
                </div>
                <div class="flex items-center justify-center gap-2">
                    <button class="p-2 flex-1 border rounded"><i class="fa-brands fa-github"></i></button>
                    <button class="p-2 flex-1 border rounded"><i class="fa-brands fa-google"></i></button>
                </div>`;

}

export function signup(e){
    e.preventDefault();
    const form = document.querySelector('#loginForm');
    form.innerHTML = '';
    form.innerHTML =
        `<label for="email">Email</label>
                <input type="email" name="" id="email" placeholder="@  email@gmail.com..." class="border border-b-black rounded p-2">
                <label for="password">Mot de passe</label>
                <input type="password" name="" id="password" placeholder="🔒 ************" class="border border-b-black rounded p-2">
                <label for="password">Confirmer le mot de passe</label>
                <input type="password" name="" id="Copassword" placeholder="🔒 ************" class="border border-b-black rounded p-2">
                <div class="flex justify-between gap-2">
                    <div class="flex flex-row items-center gap-2 ">
                        <label for="rememberMe" class="text-xs">J'ai lu et accepté <span class="text-primary">les conditions d'utilisation</span></label>
                        <input type="checkbox" name="" id="rememberMe">
                    </div>
                </div>
                <input type="submit" value="Se connecter" class="text-xs text-foreground rounded bg-primary p-2 duration-700 hover:bg-background hover:text-primary " id="SignUp">
                <div class="flex items-center gap-2 ">
                    <hr class="flex-1">
                        <p>Ou continuer avec</p>
                    <hr class="flex-1">
                </div>
                <div class="flex items-center justify-center gap-2">
                    <button class="p-2 flex-1 border rounded"><i class="fa-brands fa-github"></i></button>
                    <button class="p-2 flex-1 border rounded"><i class="fa-brands fa-google"></i></button>
                </div>
`;


}

export function SingnUp(e){
    e.preventDefault();

    // récupérer tableau
    let users = localStorage.getItem('user');
    users = users ? JSON.parse(users) : [];

    // sélectionner champs
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const copassword = document.querySelector('#Copassword');

    // validation simple
    if(email.value.trim() === '' ||
        password.value.trim() === '' ||
        copassword.value.trim() === ''){
        email.style.border = '1px solid red';
        password.style.border = '1px solid red';
        copassword.style.border = '1px solid red';

        return;
    }

    // passwords identiques ?
    if(password.value.trim() !== copassword.value.trim()){
        errorMessage.innerHTML = "Mot de passe different";
        errorMessage.className = 'm-1 p-2 bg-error/70 ';
        password.style.border = '1px solid red';
        copassword.style.border = '1px solid red';
        return;
    }

    // email existe déjà ?
    const exists = users.find(u =>
        u.email.trim().toLowerCase() === email.value.trim().toLowerCase()
    );

    if(exists){
        errorMessage.innerHTML = "Cet utilisateur existe deja viellez vous connecter";
        errorMessage.className = 'm-1 p-2 bg-error/70 ';
        return; // à toi d'afficher une erreur si tu veux
    }

    // ajouter utilisateur
    users.push({
        id: Date.now(),
        email: email.value.trim(),
        password: password.value.trim(),
    });

    // sauvegarder tableau
    localStorage.setItem('user', JSON.stringify(users));

    // go main
    window.location.href = 'main.html';
}


