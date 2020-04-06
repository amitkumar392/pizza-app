import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class SharedTable extends PolymerElement {
static get template() {
return html`
<style>
    :host {
        display: block;
        padding: 10px 20px;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    th,
    td {
        padding: 10px;
    }
    tr {
        font-weight: bolder;
    }
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    th {
        color: white;
        font-weight: bolder;
        text-align: left;
        background-color: #34abeb;
    }
</style>
<div class="container">
    <table>
        <template is="dom-repeat" items={{headings}}>
        <th>{{item}}</th>
        </template>
        <template is="dom-repeat" items={{rows}}>
        <tr>
            <td>{{item.pizzaName}}</td>
            <td>{{item.price}}</td>
            <td>{{item.rating}}</td>
            <td>{{item.size}}</td>
            <td>{{item.description}}</td>
            <td>{{item.quantity}}</td>
            
            <td>{{item.totalAmount}} INR</td>
        </tr>
    </template>
</div>
`;
}
}

window.customElements.define('shared-table', SharedTable);