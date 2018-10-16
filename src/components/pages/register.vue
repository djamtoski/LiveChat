<template>
  <div>
    <top-header></top-header>
    <h2 class="signup-title">Register Account</h2>
    <form class="s-form">
      <div class="field">
        <input
          type="text"
          class="full-name"
          placeholder="Full Name"
          v-model="fullName"/>
      </div>
      <div class="field">
        <div class="file-input">
          <i class="fas fa-cloud-upload-alt"></i>
          <input
            type="file"
            class="profile-img"
            v-on:change="uploadProfileImage($event)"/>
          <div class="image-holder" v-show="profileImage">
            <img :src="profileImage"/>
          </div>
        </div>
      </div>
      <div class="field">
        <input
          type="text"
          class="username"
          placeholder="Username"
          v-model="username"/>
      </div>
      <div class="field">
        <input
          type="text"
          class="email"
          placeholder="Email"
          v-model="email"/>
      </div>
      <div class="field">
        <input
          type="password"
          class="password"
          placeholder="Password"
          v-model="password"/>
      </div>
      <div class="field">
        <input
          type="password"
          class="confirm-password"
          placeholder="Confirm Password"
          v-model="confirmPassword"/>
      </div>
      <div class="field">
        <input type="submit" value="Register Account" v-on:click.prevent="registerAccount"/>
      </div>
      <div class="field">
        <router-link to="/login" class="register-link">Already have account?</router-link>
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
    name: "register",
    data() {
      return {
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: '',
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
      /**
       * Register new account
       */
      registerAccount() {
        this.validator.addRule('fullName', {
          value: this.fullName,
          rule: 'empty',
          message: 'Name is required!',
        });
        this.validator.addRule('username', {
          value: this.username,
          rule: 'empty',
          message: 'Username is required!',
        });
        this.validator.addRule('email', {
          value: this.email,
          rule: 'email',
          message: 'Invalid email!',
        });
        this.validator.addRule('password', {
          value: this.password,
          rule: 'empty',
          message: 'Password is required!',
        });
        this.validator.addRule('confirmPassword', {
          value: this.password,
          rule: 'empty',
          message: 'Passwords don\'t match!',
        });

        this.validator.processRules();

        if (Object.keys(this.validator.errors).length > 0) {
          // return;
        }

        RequestService.axios.post('/users/add', {
          fullName: this.fullName,
          username: this.username,
          email: this.email,
          profileImage: this.profileImage,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
          .then((resp) => {
            if (Number.parseInt(resp.data, 10) === 1) {
              this.$router.push('/login');
            }
          })
          .catch((err) => {

          });
      },
      /**
       * Upload profile image
       * @param event
       */
      uploadProfileImage(event) {
        if (window.File && window.FileList && window.FileReader && window.Blob) {
          let file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            canvas.width = 200;
            canvas.height = 200;

            let img = document.createElement("img");
            img.src = e.target.result;
            img.onload = () => {
              this.drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height, 0.5, 0.5);
              this.profileImage = canvas.toDataURL(file.type, 0.4);
            };
          };
          reader.readAsDataURL(file);
        }
      },
      /**
       * Draw image on canvas proportionally taking into account aspect ratio
       * @param ctx
       * @param img
       * @param x
       * @param y
       * @param w
       * @param h
       * @param offsetX
       * @param offsetY
       */
      drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
        if (arguments.length === 2) {
          x = y = 0;
          w = ctx.canvas.width;
          h = ctx.canvas.height;
        }
        // default offset is center
        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;
        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;
        var iw = img.width,
          ih = img.height,
          r = Math.min(w / iw, h / ih),
          nw = iw * r,   // new prop. width
          nh = ih * r,   // new prop. height
          cx, cy, cw, ch, ar = 1;
        // decide which gap to fill
        if (nw < w) ar = w / nw;
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
        nw *= ar;
        nh *= ar;
        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);
        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;
        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;
        // fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
      }
    },
    components: {
      TopHeader,
    }
  }
</script>

<style scoped>
</style>