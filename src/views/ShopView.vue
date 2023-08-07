<template>
  <div class="products">
    <div class="banner"></div>

    <form @submit.prevent="onSubmit" class="search">
      <input
        type="text"
        class="search-input"
        placeholder="Search..."
        v-model="search"
      />
      <button type="submit" class="search-btn">Search</button>
    </form>

    <div class="grid">
      <select
        class="combo-box__size"
        v-model="limit"
        @change="changePageLimit(limit)"
      >
        <option v-for="k in records" :key="k.key" :value="k.key">
          {{ k.value }}
        </option>
      </select>

      <div class="filter">
        <font-awesome-icon :icon="['fas', 'filter']" />
      </div>

      <div class="list-item">
        <div class="item" v-for="product in products" :key="product.id">
          <router-link
            class="item-link"
            :to="{ name: 'product', params: { id: product.id } }"
          >
            <img
              :src="require('../assets/images/products/' + product.imgURL)"
              alt=""
              class="item-img"
            />
            <div class="item-product">
              {{ product.productName }}
              <h3>{{ formatPrice(product.price) }}</h3>
            </div>
          </router-link>
          <button @click="addCart(product)">Add to cart</button>
        </div>
      </div>

      <div class="v-pagination__container">
        <div class="pagination__left">
          <span>Total: {{ totalItem }} </span>
        </div>

        <div class="pagination__right">
          <div class="pagination">
            <div class="pagination__prev" @click="changePage('prev')">&lt;</div>
            <div
              v-for="(page, index) in pages"
              :key="index"
              class="pagination__item"
              :class="{ 'pagination__item--active': page == pageNumber }"
              @click="changePage(page)"
            >
              {{ page }}
            </div>
            <div class="pagination__after" @click="changePage('after')">></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      url: "http://localhost:8081/product/list?",
      search: "",
      totalItem: 0,
      totalPage: 0,
      pageNumber: 1,
      limit: 4,
      shoppingCart: [],
    };
  },

  computed: {
    records() {
      return [
        { key: 4, value: "4 sản phẩm trên 1 trang" },
        { key: 8, value: "8 sản phẩm trên 1 trang" },
        { key: 12, value: "12 sản phẩm trên 1 trang" },
        { key: 16, value: "16 sản phẩm trên 1 trang" },
      ];
    },
    pages() {
      let pages = [];
      for (let i = 1; i <= this.totalPage; i++) {
        if (
          i == 1 ||
          i == this.totalPage ||
          Math.abs(i - this.pageNumber) <= 2
        ) {
          pages.push(i);
        } else if (Math.abs(i - this.pageNumber) == 3) {
          pages.push("...");
        }
      }
      return pages;
    },
  },
  created() {
    fetch(
      this.url +
        "limit=" +
        this.limit +
        "&page=" +
        this.pageNumber +
        "&sortby=none&sort=desc"
    )
      .then((response) => response.json())
      .then((data) => {
        this.products = data.listResult.content;
        this.totalPage = data.listResult.totalPages;
        this.totalItem = data.listResult.totalElements;
      });
  },
  methods: {
    formatPrice(number) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(number);
    },
    onSubmit() {
      if (this.search == "") {
        return;
      } else {
        this.url = "http://localhost:8081/product/search?query=";
        this.pageNumber = 1;
        fetch(
          this.url +
            this.search +
            "&limit=" +
            this.limit +
            "&page=" +
            this.pageNumber +
            "&sortby=none&sort=asc"
        )
          .then((response) => response.json())
          .then((data) => {
            this.products = data.listResult.content;
            this.totalPage = data.listResult.totalPages;
            this.totalItem = data.listResult.totalElements;
          });
      }
    },
    changePageLimit(k) {
      this.limit = k;
      fetch(
        this.url +
          "limit=" +
          this.limit +
          "&page=" +
          this.pageNumber +
          "&sortby=none&sort=asc"
      )
        .then((response) => response.json())
        .then((data) => {
          this.products = data.listResult.content;
          this.totalPage = data.listResult.totalPages;
          this.totalItem = data.listResult.totalElements;
        });
    },
    changePage(page) {
      if (page == "prev" && this.pageNumber > 1) {
        this.pageNumber--;
      } else if (page == "after" && this.pageNumber < this.totalPage) {
        this.pageNumber++;
      } else if (typeof page == "number") {
        this.pageNumber = page;
      }
      this.$emit("update:pageNumber", this.pageNumber);
      fetch(
        this.url +
          this.search +
          "&limit=" +
          this.limit +
          "&page=" +
          this.pageNumber +
          "&sortby=none&sort=desc"
      )
        .then((response) => response.json())
        .then((data) => {
          this.products = data.listResult.content;
        });
    },
    addCart(product) {
      this.shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
      if (this.shoppingCart == null) {
        this.shoppingCart = [];
        this.shoppingCart.push({
          product: product,
          quantity: 1,
        });
      } else {
        for (let i = 0; i < this.shoppingCart.length; i++) {
          if (this.shoppingCart[i].product.id == product.id) {
            this.shoppingCart[i].quantity++;
            localStorage.setItem(
              "shoppingCart",
              JSON.stringify(this.shoppingCart)
            );
            console.log(localStorage.getItem("shoppingCart"));
            return;
          }
        }
        this.shoppingCart.push({
          product: product,
          quantity: 1,
        });
        localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
        console.log(localStorage.getItem("shoppingCart"));
        return;
      }
      localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
      console.log(localStorage.getItem("shoppingCart"));
    },
  },
};
</script>

<style scoped>
.banner {
  background-image: url("../assets/images/banner/b1.jpg");
  width: 100%;
  height: 300px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
}

.combo-box__size {
  width: 230px;
  height: 30px;
  /* border-radius: 20px; */
  border: 1px solid #c0c0c0;
  background-color: #fff;
  color: black;
  font-size: 16px;
  margin-left: 10px;
  font-weight: 500;
  margin-bottom: 20px;
}

.search {
  margin-bottom: 20px;
}

.search-input {
  width: 40%;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #c0c0c0;
  padding: 0 20px;
  font-size: 16px;
}

.search-btn {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #c0c0c0;
  background-color: #fff;
  color: black;
  font-size: 16px;
  margin-left: 10px;
  font-weight: 500;
}

.search-btn:hover {
  background-color: #c0c0c0;
}

.list-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.item {
  border: 2px solid #c0c0c0;
  width: 300px;
  height: 400px;
  border-radius: 30px;
  margin: 15px;
}

.item:hover {
  transform: scale(1.05);
}

.item-product {
  margin-left: 15px;
  text-align: left;
}

.item-link {
  text-decoration: none;
  color: black;
  width: 100%;
}

.item-img {
  width: 100%;
  border-radius: 35px;
  padding: 15px;
}

.v-pagination__container {
  width: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
}

.pagination {
  display: flex;
}

.pagination__prev,
.pagination__after,
.pagination__item {
  width: 40px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 40px;
  border: 1px solid #c0c0c0;
  cursor: pointer;
}

.pagination__prev,
.pagination__after,
.pagination__item:hover {
  background-color: #c0c0c0;
}

.pagination__item--active {
  box-sizing: border-box;
  border: 3px solid #42b983;
  line-height: 36px;
}

.grid {
  width: 100%;
  max-width: 1440px;
  max-height: 100%;
  margin: 0 auto;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
}
</style>
