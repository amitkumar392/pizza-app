import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';

import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-card/paper-card.js';



/**
 * @customElement
 * @polymer
 */
class MyOrder extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }                   
          #buttons{
            position:absolute;
            top:50px;
            left:80em;
          }
         
          paper-button {
            text-align: center;
            background-color:#34abeb;
            color:white;
          }

          a{
            text-decoration:none;
            color:white;
          }
          #spin{
            position:fixed;
            margin-left:50%;
            top:50%;
        }
        paper-card{
            width:100%;
            background-color: whitesmoke;
            border-radius:5px;
            margin-bottom:3em;
            margin-left:1em;
            padding-left:2em;
        }
        h2{
            text-align:center;
        }

    
      </style>
      <app-location route={{route}}></app-location>
      <div id="buttons">
      <paper-button raised  id='home' on-click="_handleDashboard">Home</paper-button>
      <paper-button raised class="custom indigo" id="logout" on-click="_handleLogout"><a name="login-page" href="[[rootPath]]login-page">Logout</a></paper-button>
    </div>

    <h2> My Order List </h2>


    <template is="dom-repeat" items="{{userData}}">
    <template is="dom-repeat" items="{{item.userData}}" as="data">
    <paper-card>
      <div id="left">
        <h3>Pizza Name: {{data.pizzaName}}</h3>
        <h3>price: {{data.price}}</h3>
        <h3>rating:{{data.rating}}</h3>
        <h3>size:{{data.size}}</h3>
        <h3>description:{{data.description}}</h3>
        <h3>Total Quantity:{{data.quantity}}</h3>
        <h3>Total Amount:{{data.totalAmount}} INR</h3>

      </div>
    </paper-card>  
    </template>   
    </template>   
   
 
      <paper-toast text={{message}}  class="fit-bottom" id="toast"></paper-toast>
      <paper-spinner id="spin" active={{waiting}}></paper-spinner>
      <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type='application/json'></iron-ajax>
    `;
  }
  /**
* Define public API properties
*/
  static get properties() {
    return {
      action: {
        type: String,
        value: 'List'
      },
      userData: {
        type: Array,
        value: []
      }
    };
  }

  
  /**
   * as soon as page ready to load this method will execute
   */
  ready() {
    super.ready();
    this.email = sessionStorage.getItem('emailId');
  }


  /**
   * as soon as page load connected call back will execute
   */
  connectedCallback() {
    super.connectedCallback();
    this._makeAjax(`${Window.BaseUrl}/orders?emailId=${this.email}`, "get", null);
  }
  
  /**
   * it will route to login page.
   * it will clear seesion storage.
   */
  _handleLogout(){
    sessionStorage.clear();
    this.set('route.path', './login-page');
  }

  /**
   * it will route to dashboard page
   */
  _handleDashboard() {
    this.set('route.path', './dashboard-page');
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
   * getting response from server and storing user data and id in session storage
   * @param {*} event 
   */
  _handleResponse(event) {

    switch (this.action) {

      case 'List':
        console.log(event);
        this.response=event.detail.response;
        console.log(this.response);
        this.userData = this.response;
        this.waiting = false;
        // console.log(this.userData);
    }


  }


}

window.customElements.define('my-order', MyOrder);
