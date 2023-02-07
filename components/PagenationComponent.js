import productStore from "../pinia/productStore.js";
const { mapState , mapActions} = Pinia;

export default {
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination ">

      <li class="page-item " :class="{'disabled': pagination.current_page === 1}">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page -1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'disabled': pagination.current_page === page}">
         <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
      </li>

      <li class="page-item" :class="{'disabled': pagination.current_page === pagination.total_pages}">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>

    </ul>
  </nav>`,
  computed:{
    ...mapState(productStore,["pagination"])
  },
  methods:{
    ...mapActions(productStore,["getProducts"])
  }
}