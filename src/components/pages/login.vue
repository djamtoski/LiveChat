<template>
  <div>
    <top-header></top-header>
    <h2 class="signup-title">Sign in</h2>
    <form class="s-form">
      <div class="field">
        <input
          type="text"
          :class="['username']"
          v-model="username"
          placeholder="Username"
        />
        <span class="error" v-if="validator.errors.username">{{validator.errors.username}}</span>
      </div>
      <div class="field">
        <input
          type="password"
          :class="['password']"
          v-model="password"
          placeholder="Password"/>
        <span class="error" v-if="validator.errors.password">{{validator.errors.password}}</span>
      </div>
      <div class="field">
        <input type="submit" value="Next" v-on:click.prevent="login"/>
      </div>
      <div class="field" v-if="serverError">
        <span class="error">{{serverError}}</span>
      </div>
      <div class="field">
        <router-link to="/register" class="register-link">Create an account</router-link>
      </div>
    </form>
  </div>
</template>

<script>
  import TopHeader from '../../components/layout/top-header';
  import RequestService from '../../services/request-service';
  import UserService from '../../services/user-service';
  import ValidatorService from '../../services/validator-service';

  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: '',
        serverError: '',
        validator: new ValidatorService()
      }
    },
    beforeRouteEnter(to, from, next) {
      if (UserService.userLoggedIn()) {
        next('/');
        return;
      }
      next();
    },
    methods: {
      login() {
        this.validator.addRule('username', {
          value: this.username,
          rule: 'empty',
          message: 'Username is required!',
        });

        this.validator.addRule('password', {
          value: this.password,
          rule: 'empty',
          message: 'Password is required!',
        });
        this.validator.processRules();
        if(Object.keys(this.validator.errors).length > 0){
          return;
        }
        this.serverError = '';

        RequestService.axios.post('/login', {
          username: this.username,
          password: this.password,
        })
          .then((resp) => {
            if (typeof resp.data.SSID !== 'undefined') {
              localStorage.setItem('ssid', resp.data.SSID);
              localStorage.setItem('user', JSON.stringify(resp.data));
              this.$chat.connect(resp.data);
              this.$router.replace('/');
            }
          })
          .catch(() => {
          });
      }
    },
    components: {
      TopHeader,
    }
  }
</script>

<style>
  h2.signup-title {
    width: 100%;
    margin: 15px auto;
    text-align: center;
    font-weight: 300;
    font-size: 28px;
  }

  form.s-form {
    width: 500px;
    max-width: 100%;
    margin: 0 auto;
  }

  form.s-form div.field {
    width: 100%;
    margin: 0 0 10px 0;
  }

  form.s-form div.field div.file-input {
    width: 100%;
    min-height: 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 15px;
    border: 1px #b3d5f1 solid;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    color: #333;
    outline: none;
    line-height: 40px;
  }

  form.s-form div.field input[type="text"], form div.field input[type="password"] {
    width: 100%;
    height: 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 15px;
    border: 1px #b3d5f1 solid;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    color: #333;
    outline: none;
  }

  form.s-form div.field input[type="submit"] {
    width: 100%;
    border: none;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background: #077db4;
    color: #fff;
    height: 40px;
    margin: 15px 0 15px 0;
  }

  .register-link {
    width: 100%;
    text-align: center;
    color: #077db4;
    display: block;
    text-decoration: none;
  }

  div.file-input {
    position: relative;
  }

  div.file-input input.profile-img {
    opacity: 0;
    z-index: 10;
    position: absolute;
    left: 0;
    top: 0;
  }

  div.file-input i {
    font-size: 30px;
    margin-top: 5px;
  }

  form.s-form div.field input[type="text"].is-error, form.s-form div.field input[type="password"].is-error {
    border: 1px #b10007 solid;
  }

  span.error {
    display: block;
    margin: 5px 0 0 0;
    color: #b10007;
    font-weight: 600;
    font-size: 12px;
  }
</style>