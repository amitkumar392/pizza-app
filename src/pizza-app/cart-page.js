import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../node_modules/@polymer/paper-listbox/paper-listbox.js';
import '../../node_modules/@polymer/paper-item/paper-item.js';
import '../../node_modules/@polymer/paper-input/paper-input.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/iron-ajax/iron-ajax.js';
import '../../node_modules/@polymer/iron-form/iron-form.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-spinner/paper-spinner.js';

import './shared/shared-table.js';


/**
* Define an element class
* @customElement
* @polymer
*/
class CartPage extends PolymerElement {
  /**
    * Define the element's template
    */
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }            
        table, td, th {  
            border: 1px solid rgb(0, 0, 0);
            text-align: left;
            border-style: dashed;
          }
          
          table {
            border-collapse: collapse;
            margin-top:20px;
            margin-bottom:20px;
            width: 100%;
          }
          
          th, td {
            padding: 15px;
          }
         
          #buttons{
            position:absolute;
            top:50px;
            left:1100px;
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
      </style>
      <app-location route={{route}}></app-location>
      <h2> My Cart </h2>
      <div id="buttons">
      <paper-button raised class="custom indigo" id='home' on-click="_handleDashboard">Home</paper-button>
      <paper-button raised class="custom indigo" id='logout' on-click="_handleLogout"><a name="login-page" href="[[rootPath]]login-page">Logout</a></paper-button>
    </div>

    <shared-table headings={{headings}} rows={{userData}}></shared-table>

      <paper-button raised class="custom" on-click="_handleBuy">Buy Now</paper-button>
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
      },
      headings:{
        type: Array,
        value:['pizza Name','Unit Price','Rating','Size','Description','Quantity','Total Amount']
      },
    };
  }

/**
 * as soon as page load connected call back will execute
 */
  connectedCallback() {
    super.connectedCallback();
    this.userData = JSON.parse(sessionStorage.getItem('food'));
    let emailId = sessionStorage.getItem('emailId');
    this.postObj = { emailId, userData: this.userData }
    console.log(this.userData);
  }

    /**
  * it will clear session storage
  */
  _handleLogout() {
    sessionStorage.clear();
  }
  /**
   * it will post the data to database
   * it will route the page to dashboard page
   */
  _handleBuy() {
    alert('successfully buy');
    console.log(this.postObj);

    this._makeAjax(`${BaseUrl}/orders`, "post", this.postObj);
    this.set('route.path', './dashboard-page');
  }
  /**
  * it will route the page to dashboard page
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
    console.log(event.detail.response);
  }


}

window.customElements.define('cart-page', CartPage);
