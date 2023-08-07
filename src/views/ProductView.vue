<template>
  <div class="product-view-page">
    <div v-if="products.imgURL" class="product-view grid">
      <img
        :src="require('../assets/images/products/' + products.imgURL)"
        alt=""
        class="img-product"
      />
      <div class="product-info">
        <h2 class="products-name">{{ products.productName }}</h2>
        <h1 class="products-price">{{ formatPrice(products.price) }}</h1>
        <select id="size" class="size-select">
          <option selected>Select</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="2XL">2XL</option>
        </select>
        <button class="btn-buy">Add to cart</button>
        <h3>{{ products.id }}</h3>
      </div>
    </div>
    <div v-else>
      <h1>Loading...</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: {},
    };
  },
  props: {},
  created() {
    fetch("http://localhost:8081/product/list/" + this.$route.params.id)
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
        console.log(this.products.imgURL);
      });
  },
  methods: {
    formatPrice(number) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(number);
    },
  },
};
</script>

<style>
.product-view-page {
  margin-top: 50px;
}

.product-view {
  display: flex;
}

.product-info {
  width: calc(100% - 550px);
  text-align: left;
}

.img-product {
  width: 500px;
}

.products-name {
  font-size: 30px;
  margin-bottom: 20px;
}

.products-price {
  font-size: 30px;
  margin-bottom: 20px;
}

.size-select {
  width: 100px;
  height: 30px;
  font-size: 15px;
  margin-bottom: 20px;
}

.btn-buy {
  size: 20px;
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
px