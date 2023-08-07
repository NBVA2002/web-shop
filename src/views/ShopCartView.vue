<template>
  <div class="shopcart">
    <div class="grid">
      <div claSs="shopping-cart">
        <div class="list-item">
          <div
            class="item"
            v-for="cartegoryItem in shoppingCart"
            :key="cartegoryItem.product.id"
          >
            <img
              :src="
                require('../assets/images/products/' +
                  cartegoryItem.product.imgURL)
              "
              alt=""
              class="item-img"
            />
            <div class="item-product">
              {{ cartegoryItem.product.productName }}
              <h3>{{ formatPrice(cartegoryItem.product.price) }}</h3>
              <h3>Số lượng {{ cartegoryItem.quantity }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="order-sumary">
        <h1>Order Summary</h1>
        <div class="total">
          <h3>Thành tiền: {{ formatPrice(amount) }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shoppingCart: [],
      amount: 0,
    };
  },
  computed: {},
  created() {
    this.shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    console.log(this.shoppingCart);
    this.shoppingCart.forEach((cartItem) => {
      this.amount += cartItem.product.price * cartItem.quantity;
    });
  },

  getAmount() {},

  methods: {
    formatPrice(number) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(number);
    },

    addCart(product) {
      this.shoppingCart.push(product);
      localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
      console.log(localStorage.getItem("shoppingCart"));
    },
  },
};
</script>

<style scoped>
.shopcart {
  margin-top: 50px;
}

.shopping-cart {
  width: 850px;
  height: 600px;
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #c0c0c0;
}

.order-sumary {
  width: 500px;
  text-align: left;
}

.total {
  height: 200px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #c0c0c0;
}

.list-item {
  width: 100%;
  height: 100%;
  background-color: #c0c0c0;
  overflow: auto;
  overflow-y: scroll;
  padding: 20px;
}

.item {
  width: 100%;
  height: 150px;
  background-color: #fff;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0 0 10px #c0c0c0;
  display: flex;
}

.item img {
  width: 100px;
  object-fit: cover;
  margin-left: 20px;
  border-radius: 20px;
}

.item-product {
  display: inline-block;
  margin-left: 30px;
}

.grid {
  width: 100%;
  max-width: 1440px;
  max-height: 100%;
  margin: 0 auto;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
}
</style>
