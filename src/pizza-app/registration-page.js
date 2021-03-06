import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

import './shared/paper-spin.js';

/**
 * Define an element class
 * @customElement
 * @polymer
 */
class RegistrationPage extends PolymerElement {
  /**
     * Define the element's template
  */
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        #loginForm
        {
            width:30%;
            margin:0px auto;
            border:2px solid black;
            padding:10px;
            margin-top:70px;
            border-radius:20px;
        }
        #registration{
          background-color:#34abeb;
          color: white;
          text-align:center;
          width:100%;
          margin-top:20px;
        }

        h2{
          text-align:center;
        }     

      </style>

      <app-location route="{{route}}">
      </app-location>
      <iron-form id="loginForm">
      <form>

      <h2>Registration Page </h2>

      <paper-input type="text" label="Enter name" id="name" auto-validate required error-message="Enter Name" value={{name}}><iron-icon slot="suffix" icon="icons:account-circle"></iron-icon>
      </paper-input>
      <paper-input label="Phone No" id="phoneNo" type="text" name="phoneNo" auto-validate required maxlength="13" allowed-pattern=^[\-\+0-9]{1,15}$ value={{phoneNo}} ><iron-icon slot="suffix" icon="icons:settings-phone"></iron-icon> </paper-input>
      <paper-input type="email" label="Enter email" id="email" auto-validate required error-message="Enter Email" value={{email}}><iron-icon slot="suffix" icon="mail"></iron-icon>
      </paper-input>

      <paper-input label="Password" id="password" type="password" value={{password}} name="password" auto-validate required error-message="enter correct password" ><iron-icon slot="suffix" icon="lock"></iron-icon>
      </paper-input>

      <paper-button type="submit" id="registration" on-click="_handleRegister">Register</paper-button></div>
      <div id="horizontal"><sub> Exiting user ?<paper-button id="login" on-click="_handleLogin"><a name="login-page" href="[[rootPath]]login-page">Login</a></paper-button></sub><div>
      </form>
      <iron-form>
      <paper-toast text={{message}}  class="fit-bottom" id="toast"></paper-toast>
      <paper-spinr id="spin" waiting={{waiting}}></paper-spin>
      
      <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type='application/json'>
      </iron-ajax>
      
    `;
  }

  /**
   * Define public API properties
   */
  static get properties() {
    return {
      waiting:{
        type:Boolean
    }

    };
  }

  /**
   * posting user data into database
   */
  _handleRegister() {
    let userName = this.name;
    let email = this.email;
    let password = this.password;
    let phoneNo = parseInt(this.phoneNo);
    let postObj = { userName,email,password,phoneNo};
    console.log(postObj);
    this._makeAjax(`${BaseUrl}/users`,"post",postObj);
    this.waiting=true;
    console.log('dfd');
  }


  /**
   * getting response from server and storing user data and id in session storage
   * @param {*} event 
   */
  _handleResponse(event) {
    this.waiting=false;
    this.message = "Registration is successful";
    this.$.toast.open();
    confirm('Registration is successful');
    this.set('route.path', './login-page');

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


}

/**
 * Register the element with the browser
 */
window.customElements.define('registration-page', RegistrationPage);
