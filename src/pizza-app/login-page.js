import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

import './shared/paper-spin.js';

/**
 * Define an element class
 * @customElement
 * @polymer
 */
class LoginPage extends PolymerElement {
    /**
     * Define the element's template
     */
    static get template() {
        return html`
        <style>
        :host {
          display: block;
        }
        #login{
         background-color: #34abeb;
         color: white;
         text-align:center;
         width:100%;
         margin-top:20px;
        }
        #loginForm
        {
            width:30%;
            margin:0px auto;
            border:1px solid black;
            padding:10px;
            margin-top:100px;
            border-radius:20px;
            background:light-pink;
        }
        h2{
            text-align:center;
        }     
       

      </style>
      <app-location route="{{route}}">
      </app-location>

      <iron-form id="loginForm">
        <form>
        <h2> User Login</h2>
                <paper-input  label="Email Id" id="emailId" type="email" value={{emailId}} name="email" auto-validate required error-message="enter valid email id"><iron-icon slot="suffix" icon="mail"></iron-icon> </paper-input>
                <paper-input type="password" label="Password" auto-validate required error-message="Enter the password" id="password" value={{password}}><iron-icon slot="suffix" icon="lock"></iron-icon></paper-input>
                <paper-button type="submit" id="login" class="btn btn-success" on-click="handleLogin">Login</paper-button>
               <sub> New user ?<paper-button id="register" on-click="_handleLogout"><a name="registration-page" href="[[rootPath]]registration-page">registration</a></paper-button></sub>

        </form>
      </iron-form>
      <paper-toast text={{message}}  class="fit-bottom" id="toast"></paper-toast>
      <paper-spin id="spin" waiting={{waiting}}></paper-spin>
      <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type='application/json'></iron-ajax>
    `;
    }

    /**
     * Define public API properties
     */

    static get properties() {
        return {

            selected: {
                type: Number,
                value: 0
            },
            action: {
                type: String,
                value: 'List'
            },
            users: {
                type: Array,
                value: []
            },
            waiting:{
                type:Boolean
            }
        };
    }
    /**
     * fetching the user data from database and validating the phone number and password
     */
    handleLogin() {
        if (this.$.loginForm.validate()) {
            this.email = this.emailId;
            let password = this.password;
            this._makeAjax(`${Window.BaseUrl}/users?email=${this.email}&&password=${password}`, "get", null);
            this.waiting = true;
            this.logout=true;
        }
        else {
            this.message = "Please enter valid Details";
            this.$.toast.open();
        }

    }

    /**
     * calling main ajax call method 
     * @param {String} url 
     * @param {String} method 
     * @param {Object} postObj 
     */
    _makeAjax(url, method, postObj) {
        const ajax = this.$.ajax;
        ajax.method = method;
        ajax.url = url;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }

    /**
     * handling error if encounter error from backend server
     */
    _handleError() {
        this.message = "Wrong Credentials";
        this.$.toast.open();
    }


    /**
     * getting response from server and storing user data and id in session storage
     * @param {*} event 
     */
    _handleResponse(event) {
        console.log(event.detail.response);
        if (event.detail.response != 0) {
            sessionStorage.setItem('emailId',this.email);
            this.waiting = false;
            this.set('route.path', './dashboard-page');


        }
        else {
            alert('user not found');
            this.waiting = false;


        }



    }

}
/**
 * Register the element with the browser
 */
window.customElements.define('login-page', LoginPage);