
class Order {
  orderDetails;
  user;
  paymentMethod;

  constructor() {
    this.orderDetails = [];
  }

  get total() {
    return (this.subTotal + this.shipping) ;
  }

  get subTotal() {
    return this.orderDetails.map((x) => x.total).reduce((a, v) => (a += v), 0);
  }

  get shipping() {
    return (
      (this.orderDetails.length) * 2
    );
  }


  addProductById(id) {
    let orderDetail = this.orderDetails.find((x) => x.product.id === id);
    if (orderDetail) {
      orderDetail.increaseQuantity(1);
    }
    return orderDetail;
  }

  addProduct(product) {
    let orderDetail = this.addProductById(product.id);
    if (!orderDetail) {
      orderDetail = new OrderDetail(product);
      this.orderDetails.push(orderDetail);
    }
  }
 
  
  deleteProduct(id) {
    let orderDetail = this.orderDetails.find((x) => x.product.id == id);
    if (orderDetail) {
      if (orderDetail.quantity == 1) this.removeDetail(orderDetail.id);
      else {
        orderDetail.decreaseQuantity(1);
      }
    }
  }

  removeDetail(id) {
    const index = this.orderDetails.findIndex((x) => x.id === id);
    this.orderDetails.splice(index, 1);
  }

  render() {
    this.renderTotal();
    this.renderTable();
  }

  renderTotal() {
    document.getElementById("total").innerHTML = `$${this.total}`
    document.getElementById("sub-total").innerHTML = `$${this.subTotal}`
    document.getElementById("shipping").innerHTML = `$${this.shipping}`
  }

  renderTable() {
    document.getElementById("products").innerHTML = "";
    this.orderDetails.forEach((x) => {
      document.getElementById("products").innerHTML += x.getHtmlRow();
    });
  }

  saveChanges() {
    const products = [];
    this.orderDetails.forEach((d) => {
      for (let i = 0; i < d.quantity; i++) {
        products.push(d.product);
      }
    });
    localStorage.setItem("products", JSON.stringify(products));
  }
}

class OrderDetail {
  id;
  product;
  quantity;
  price;

  get total() {
    return this.price * this.quantity;
  }

  constructor(product) {
    this.product = product;
    this.quantity = product.num;
    this.price = product.price;
  }

  increaseQuantity(q) {
    this.quantity += q;
  }

  decreaseQuantity(q) {
    if (this.quantity > q) this.quantity -= q;
  }

  getHtmlRow() {
    return `  <tr>
    <td class="align-middle">
     
      ${this.product.name}
    </td>
    <td class="align-middle">$${this.product.price}</td>
    <td class="align-middle">
      <div
        class="input-group quantity mx-auto"
        style="width: 100px"
      >
        <div class="input-group-btn">
          <button
            onclick="order.deleteProduct(${this.product.id});order.saveChanges();order.render();"
            type="button"
            class="decBtn btn btn-sm btn-primary btn-minus"
          >
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <input
          type="text"
          class="quantityVal form-control form-control-sm bg-secondary border-0 text-center"
          value="${this.quantity}"
        />
        <div class="input-group-btn">
          <button
          onclick="order.addProductById(${this.product.id});order.saveChanges();order.render();"
            type="button"
            class="incBtn btn btn-sm btn-primary btn-plus"
          >
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </td>
    <td class="align-middle">$${this.total}</td>
    <td class="align-middle">
      <button class="btn btn-sm btn-danger" type="button" onclick="order.removeDetail(${this.id});order.saveChanges();order.render();">
        <i class="fa fa-times"></i>
      </button>
    </td>
  </tr>`;
  }
}

class Product {
  id;
  name;
  price;
  num;
  constructor(product) {
    this.id = product.id;
    this.name = product.productName;
    this.price = product.productPrice;
    this.num=product.productNumber;
  }
}

  
const product = JSON.parse(localStorage.getItem("products") || "[]")
let order = new Order();
product.forEach((x) => {
  order.addProduct(new Product(x));
});

order.render();