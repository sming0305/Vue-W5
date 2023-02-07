import { apiUrl, apiPath } from "../js/config.js"
import cartStore from "./cartStore.js";
const { defineStore , mapActions} = Pinia

export default defineStore("orderStore", {
    state: () => ({
        order: {},
        form: {}
    }),
    actions: {
        phoneValidate(value) {
            const pattern = /^09\d{8}$/;
            return pattern.test(value) ? true : "電話號碼格式不符，請重新輸入"
        },
        sendOrder(orderInfo) {

            this.order = orderInfo;

            axios.post(`${apiUrl}api/${apiPath}/order`, this.order)
                .then(res => {
                    alert(res.data.message);
                    this.form.resetForm();
                    this.getCartList();
                }).catch(err => {
                    alert(err.data.message);
                })
        },
        targetForm(target) {
            this.form = target
        },
         ...mapActions(cartStore,["getCartList"])
    },
    getters: {

    }
})
