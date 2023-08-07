<template>
  <div class="nav-bar" >
    <div class="grid">
      <div class="logo-place">
        <router-link to="/" class="logo-img">
          <img src="../assets/images/logo.png" alt="" />
        </router-link>
      </div>
      <nav>
        <div class="user">
          <div class="test"></div>
          <ul>
            <li @click="login()" v-if="!isLogin" >Login</li>
            <li @click="logOut()" v-if="isLogin">Log out</li>
          </ul>
        </div>
        <router-link to="/">Home</router-link>
        <router-link to="/shop">Shop</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/shopcart" class="shop-cart">
          <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: this.checkLogin(),
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    logOut() {
      localStorage.removeItem("token");
      this.isLogin = false;
      this.$router.push("/");
    },
    checkLogin() {
      if (localStorage.getItem("token")) {
        return true;
      }
      return false
    },
  },
};
</script>

<style>
.nav-bar {
  background: #fff;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 70px;
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

.logo-place {
  position: relative;
  margin-left: 15px;
}

.logo-place .logo-img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.nav-bar nav {
  padding: 15px;
  transform: translateY(-15px);
}

.nav-bar nav img {
  font-size: 18px;
  width: 20px;
  height: auto;
  margin-right: 15px;
  margin-left: 15px;
  cursor: pointer;
  transform: translateY(1px);
}

.nav-bar nav > a {
  text-decoration: none;
  margin-right: 20px;
  margin-left: 20px;
  height: 100%;
  font-size: 18px;
  font-weight: 700;
}

.nav-bar nav > a:hover {
  color: #42b983;
  border-bottom: 3px solid #42b983;
}

.shop-cart:hover {
  width: 20px;
  height: 20px;
  display: inline-block;
  box-sizing: border-box;
}

.user {
  width: 45px;
  height: 45px;
  margin-right: 20px;
  margin-left: 20px;
  background: #348b6b;
  border-radius: 25px;
  border: 2px solid #000;
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  transform: translateY(15px);
  position: relative;
}

.user:hover ul {
  display: block;
}

.test {
  width: 60px;
  height: 60px;
  transform: translateX(-2px);
}

.user ul {
  display: none;
  position: absolute;
  top: 53px;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
  width: 200px;
  list-style: none;
}

.user ul li {
  padding: 10px;
  padding-left: 20px;
  text-align: left;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  color: #000;
}

.user ul li a {
  text-decoration: none;
}

.user ul li:hover {
  background: #42b983;
}
</style>
