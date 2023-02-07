
import orderStore from "../pinia/orderStore.js";
const { mapState, mapActions } = Pinia;

Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('../../json/zh_TW.json');

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

export default {
    data() {
        return {
            orderInfo: {
                "data": {
                    "user": {
                        "name": "",
                        "email": "",
                        "tel": "",
                        "address": ""
                    },
                    "message": ""
                }
            }
        }
    },
    template: `
    <div class="my-5 row justify-content-center">
    <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="sendOrder(orderInfo)">
      <div class="mb-3">
          <label for="email" class="form-label"> Email</label>
          <v-field id="email" name="email" type="email" class="form-control" :class="{'is-invalid': errors['email']}" placeholder="請輸入 Email" rules="email|required"
          v-model="orderInfo.data.user.email"></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field id="name" name="姓名" type="text" class="form-control" placeholder="請輸入姓名" :class="{'is-invalid': errors['姓名']}" rules="required"
          v-model="orderInfo.data.user.name"></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field id="tel" name="電話" type="text" class="form-control" placeholder="請輸入電話" :class="{'is-invalid': errors['電話']}" :rules="phoneValidate" rules="required" 
          oninput="value=value.replace(/[^\\d]/g,'')" v-model="orderInfo.data.user.tel"></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field id="address" name="地址" type="text" class="form-control" placeholder="請輸入地址" :class="{'is-invalid': errors['地址']}" rules="required"
          v-model="orderInfo.data.user.address"></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea id="message" class="form-control" cols="30" rows="10"
          v-model="orderInfo.data.message"></textarea>
      </div>
      <div class="text-end">
          <button type="submit" class="btn btn-danger" >送出訂單</button>
      </div>
  </v-form>
</div>`,
    components: {
        VForm: VeeValidate.Form,
        VField: VeeValidate.Field,
        ErrorMessage: VeeValidate.ErrorMessage,
    },
    methods: {
        ...mapActions(orderStore, ["phoneValidate", "sendOrder", "targetForm"])
    },
    computed: {
        ...mapState(orderStore, ["formInfo"])
    }, 
    mounted (){
        const form = this.$refs.form
        this.targetForm(form)
    }
}