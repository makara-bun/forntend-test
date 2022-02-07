<template>
  <div>
    <v-card
      flat
      color="transparent"
    >
      <v-card-text>
        <v-row>
          <v-col class="px-4">
            <span>Min and Max price range </span>
            <v-range-slider
              v-model="rangePrice "
              :max="maxPrice"
              :min="minPrice"
              hide-details
              @change="filterPrice"
            >
            </v-range-slider>
            <span>{{rangePrice[0]}}</span>
            <span class="float-right">{{rangePrice[1]}}</span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card
      flat
      color="transparent"
    >
      <v-card-text>
        <v-row>
          <v-col class="px-4">
            <span>Min and Max quantity range </span>
            <v-range-slider
              v-model="rangeQuantity"
              :max="maxQuantity"
              :min="minQuantity"
              hide-details
              @change="filterQuantity"
            >
            </v-range-slider>
            <span>{{rangeQuantity[0]}}</span>
            <span class="float-right">{{rangeQuantity[1]}}</span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      minPrice: 0,
      maxPrice: 3000,
      rangePrice: [0,3000],
      minQuantity: 0,
      maxQuantity: 100,
      rangeQuantity: [0,100],
    }
  },
  methods : {
    async filterPrice () {
      this.$store.dispatch("searchPrice",{
        min : this.rangePrice[0],
        max : this.rangePrice[1]
      })   
       },
    async filterQuantity () {
      this.$store.dispatch("searchQuantity",{
        min : this.rangeQuantity[0],
        max : this.rangeQuantity[1]
      })   
    }
  }
}
</script>

