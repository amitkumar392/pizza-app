import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import './shared/shared-card.js';
/**
* Define an element class
* @customElement
* @polymer
*/
class DashboardPage extends PolymerElement {
  /**
    * Define the element's template
    */
  static get template() {
    return html`
<style>
    :host {
        display: block;
    }
   #dialog{
        width:50%;
        border-radius:20px;
      }
      
    h2{
        text-align:center;
    }
    
    #buttons{
        position:absolute;
        top:50px;
        left:73em;
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
</style>

<app-location route="{{route}}">
</app-location>

<div id="buttons">

<paper-button class="custom" id='myOrder' on-click="_handleMyorder">My Order</paper-button>


  <paper-button id='cart' on-click="_handleMycart">Cart</paper-button>
  <paper-button class="custom" id='login' on-click="_handleLogout"><a name="login-page"
href="[[rootPath]]login-page">Logout</a></paper-button>
</div>

<h2>Pizza Order list </h2>

<paper-dialog id="dialog">
<paper-dialog-scrollable>
<iron-icon icon="icons:clear" on-click="_handleCross" id='cross'></iron-icon>


<h1> Cart </h1>
Pizza Name: {{pizzaName}}<br>
 Quantity:<paper-icon-button id="addBtn" on-click="_handleAdd" data-set$={{index}} icon="add"></paper-icon-button>{{userQuantity}}<paper-icon-button id="removeBtn" data-set$={{index}} on-click="_handleRemove" icon="remove"></paper-icon-button><br>
 Total Price :{{totalPrice}}  </br></br>

 <paper-button type="submit" id="buyNow" on-click="_handleCart">Add to Cart</paper-button>

  <h3>  {{message}} </h3>
   
  </paper-dialog-scrollable>
  
</paper-dialog>




<iron-form id="form1">
<paper-tabs selected={{selected}}>
    <paper-tab>Veg Pizza</paper-tab>
    <paper-tab>NonVeg Pizza</paper-tab>
</paper-tabs>

<iron-pages selected={{selected}}>
    <div>      
        <shared-card piz="{{vegPizza}}">            
        </shared-card>  
    </div>
    <div>
    <shared-card piz="{{nonVeg}}">            
        </shared-card>    
  </div>
   
</iron-pages>
</iron-form>

        <paper-toast text={{message}}  class="fit-bottom" id="toast"></paper-toast>

        

        `;
  }
  /**
* Define public API properties
*/
  static get properties() {
    return {
      selected: {
        type: Object
      },
      action: {
        type: String,
        value: 'List'
      },
      cartProducts: {
        type: Array,
        value: []
      },
      selectedItem: {
        type: Object,
        value: {}
      },
      vegPizza: {
        type: Array,
        value: [{ "pizzaName": 'onion pizza', "price": '200 INR', "rating": '4.5', "size": '9 inch', "description": 'Veg' },
        { "pizzaName": 'Tomato pizza', "price": '400 INR', "rating": '3.5', "size": '8 inch', "description": 'Veg' }]
      },
      nonVeg: {
        type: Array,
        value: [{ "pizzaName": 'PEPPER BARBECUE CHICKEN', "price": '400 INR', "rating": '3.5', "size": '8 inch', "description": 'Non Veg' },
        { "pizzaName": 'Chicken Golden Delight', "price": '500 INR', "rating": '3.0', "size": '9 inch', "description": 'Non Veg' }]
      },

    };
  }

  /**
   * as soon as page load connected call back will execute
   */
  connectedCallback() {
    super.connectedCallback();
    this.selected = 0;
  }
  ready() {
    super.ready();
    this.addEventListener('handle-quantity',(e)=>this._handleQuantity(e))
  }
  /**
* it will clear session storage
*/
  _handleLogout() {
    sessionStorage.clear();
  }

  /**
* it will route to myOrder page
*/
  _handleMyorder() {
    this.set('route.path', './my-order')
  }
  /**
* it will close paper dialog
*/
  _handleCross() {
    this.$.dialog.close();
  }

  /**
* it will handle total price based on total quantity
*/
  _handleAdd() {

    if (this.userQuantity < 10)
      this.userQuantity += 1;
    this.totalPrice = parseInt(this.price) * this.userQuantity;
    console.log(this.totalPrice);
  }
  /**
* it will handle total price based on total quantity
*/
  _handleRemove() {
    if (this.userQuantity > 0)
      this.userQuantity -= 1;
    if (this.totalPrice > 0)
      this.totalPrice = this.totalPrice - parseInt(this.price);
  }
  /**
* it will set quantity zero and handle data 
*/
  _handleQuantity(event) {
    console.log(event.detail.data)
    this.userQuantity = 0;
    this.price=event.detail.data.price;
    this.selectedItem = event.detail.data;
    this.pizzaName=event.detail.data.pizzaName
    console.log(this.price)
    this.$.dialog.open();
    }
  /**
* it will push totalprice and total quantity to array
*/
  _handleCart(event) {
    this.selectedItem.quantity = this.userQuantity;
    this.selectedItem.totalAmount = this.totalPrice;
    this.cartProducts.push(this.selectedItem);
    console.log(this.cartProducts);
    sessionStorage.setItem('food', JSON.stringify(this.cartProducts));
    this.$.dialog.close();

  }


  /**
* it will route to cart page
*/
  _handleMycart() {
    this.set('route.path', './cart-page')
  }

  /**
* getting response from server and storing user data and id in session storage
* @param {*} event 
*/
  _handleResponse(event) {
    switch (this.action) {
      case 'List':
        console.log(event.detail.response);
        this.selected = event.detail.response;
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
}

window.customElements.define('dashboard-page', DashboardPage);