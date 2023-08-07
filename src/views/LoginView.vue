<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-4 mt-5">
        <form>
          <div class="form-group">
            <label for="email">username</label>
            <input type="text" class="form-control" v-model="username" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" v-model="password" />
          </div>
        </form>

        <button type="submit" class="btn btn-dark" @click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isLogin: true,
      username: "",
      password: "",
      token: "",
    };
  },
  methods: {
    async login() {
      const response = await axios.post("http://localhost:8081/api/login", {
        username: this.username,
        password: this.password,
      });
      this.token = response.data.jwt;
      localStorage.setItem("token", this.token);
      console.log(this.token);
      this.$emit("data-received", this.isLogin);
      window.location.replace("http://localhost:8080/");
    },
    async getRandom() {
      try {
        const response = await axios.get("http://localhost:8081/api/random", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
