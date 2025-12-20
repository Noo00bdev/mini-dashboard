import {loginForm} from "./connexion.js";
import {Chart} from "chart.js/auto";

/**
 *
 * @param element {HTMLElement}
 */
export function clearContent(element) {
    element.innerHTML = "";
}

/**
 *
 * @param element {HTMLElement}
 */
export function resetClass(element) {
    element.className = "";
}

/**
 *
 * @param  value1 {string}
 * @param value2 {string}
 * @returns {boolean}
 */
export function areEquals(value1 , value2){
    return value1.trim === value2.trim;
}

/**
 *
 * @param table {Object}
 * @returns {*}
 */
export function emailExists(table){
    return table.find(u => u.email.trim().toLowerCase() === table.email.trim().toLowerCase())
}

/**
 *
 * @param table {Object}
 * @param email {string}
 * @param password {string}
 * @returns {*}
 */
export function isAccountExists(table, email, password){
    return table.find(u => u.email.trim() === email && u.password.trim() === password);
}

/**
 *
 * @param value1 {HTMLElement}
 * @param value2 {HTMLElement}
 * @returns {boolean}
 */
export function isSame(value1, value2){
    return value1 === value2;
}

/**
 *
 * @param email {HTMLElement}
 * @param password {HTMLElement}
 * @param passwordConfirm {HTMLElement}
 * @returns {boolean}
 */
export function canSignUp(email, password, passwordConfirm) {
    return email === '' ||
        password === '' ||
        passwordConfirm  === ''
}

/**
 *
 * @param element {Object}
 * @param style1 {string}
 * @param style2  {string}
 */
export function isActive(element, style1, style2){
    element.forEach((l) => {
        l.addEventListener('click', () => {
            element.forEach((b) => {
                b.classList.remove(style1, style2);
            })
            l.classList.add(style1, style2);
        })
    })
}

/**
 *
* @param element {HTMLElement}
 * @param message {HTMLElement}
 */
export function changeState(element, message){

    element.addEventListener('click', ()=>{
        element.classList.add('text-user-icon', 'border-b-primary');
        if(message){
            clearContent(message)
            resetClass(message)
        }

        loginForm()
    } );
}

export function getChart(element){
    return element.getChart('myChart');
}