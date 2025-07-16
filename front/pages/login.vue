<template>
  <!-- From Uiverse.io by R1SH4BH81 --> 
<form class="form">
  <div class="flex-column">
    <label>Name </label>
  </div>
  <div class="inputForm">
    <svg
      height="60"
      viewBox="0 -9 32 32"
      width="40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Layer_3" data-name="Layer 3">
        <path
          d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"
        ></path>
      </g>
    </svg>
    <input type="text" class="input" placeholder="Enter your Name" v-model="Data.login"/>
  </div>
  

  <div class="flex-column">
    <label>Password </label>
  </div>
  <div class="inputForm">
    <svg
      height="20"
      viewBox="-64 0 512 512"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"
      ></path>
      <path
        d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"
      ></path>
    </svg>
    <input type="password" class="input" placeholder="Enter your Password" v-model="Data.password"/>
  </div>

  <button class="button-submit" @click.prevent="Login()">Login</button>
  <NuxtLink class="p" to="/">Already not have a account? <span class="span">register</span></NuxtLink>

</form>

</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import '/assets/css/style.css'
import { useRouter } from 'vue-router';
import { NuxtLink } from '#components';


let Data = ref({
  login: '',
  password: '',
});
let router = useRouter();
function Login() {

  axios.post('https://localhost:7273/api/Auth/login', {
    login: Data.value.login,
    password: Data.value.password
  }).then(function (res) {
    localStorage.clear();
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    router.push('/coach-page');
    console.log("ok");

  })
}

</script>

<style>

.form {
  margin:0 auto;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  padding: 30px;
  width: 450px;
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

::placeholder {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.form button {
  align-self: flex-end;
}

.flex-column > label {
  color: #151717;
  font-weight: 600;
}

.inputForm {
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: 0.2s ease-in-out;
}

.input {
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  width: 85%;
  height: 100%;
}

.input:focus {
  outline: none;
}

.inputForm:focus-within {
  border: 1.5px solid #2d79f3;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.flex-row > div > label {
  font-size: 14px;
  color: black;
  font-weight: 400;
}

.span {
  font-size: 14px;
  margin-left: 5px;
  color: #2d79f3;
  font-weight: 500;
  cursor: pointer;
}

.button-submit {
  margin: 20px 0 10px 0;
  background-color: #151717;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: pointer;
}

.button-submit:hover {
  background-color: #252727;
}

.p {
  text-align: center;
  color: black;
  font-size: 14px;
  margin: 5px 0;
}

.btn {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 10px;
  border: 1px solid #ededef;
  background-color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.btn:hover {
  border: 1px solid #2d79f3;
}

</style>
