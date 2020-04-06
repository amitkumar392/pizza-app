import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';


class SharedCard extends PolymerElement{

    static get template(){
        return html `
        <style>
        paper-card{
            background:whitesmoke;
            margin-right:2em;
            border-radius:1em;
            padding:1em;
        }
        paper-button{
            background-color:#34abeb;
        }
        
        
        </style>
        <template is="dom-repeat" items="{{piz}}">
        <paper-card>
        <h3>Pizza Name: {{item.pizzaName}}</h3>
            <h3>Price: {{item.price}}</h3>
            <h3>Rating:{{item.rating}}</h3>
            <h3>Size:{{item.size}}</h3>
            <h3>Description:{{item.description}}</h3>
            <paper-button id="cart" raised on-click="_handleQuantity">Add</paper-button>
        </paper-card>
        </template>
        `;
    }
    static get properties(){
        return {

        }
    }
    _handleQuantity(event){
        let data=event.model.item
        this.dispatchEvent(new CustomEvent('handle-quantity',{bubble:true,composed:true,detail:{data}}))
    }
}
window.customElements.define('shared-card', SharedCard);
