<template>
    <v-container class="back-app app-page">
        <h1>Backend App</h1>

        <div class="buttons d-flex flex-column">
            <v-btn @click="testConnection">
                <span class="mr-2">Test Connection</span>
            </v-btn>
            <v-btn @click="fetchWordsFromApi">
                <span class="mr-2">Fetch Words From Api</span>
            </v-btn>

            <v-btn @click="fetchWordsFromMongo">
                <span class="mr-2">Fetch Words From Mongo</span>
            </v-btn>
            <v-btn @click="tweetReport">
                <span class="mr-2">Tweet Report</span>
            </v-btn>
            <div class="report ml-4" v-if="report && report.length > 0">
             <h4>Report: </h4>
                <div class="item ml-2" v-for="(item, idx) in report" :key="item.id"><strong>{{item.id}}: {{item.length}}</strong> Related Words</div>
            </div>
            <v-btn @click="deleteLocal()">
                <span class="mr-2">Delete Local</span>
            </v-btn>
            <v-btn @click="deleteAll()">
                <span class="mr-2">Delete All</span>
            </v-btn>


        </div>

        <!--====================EXPANSION PANEL================-->
        <v-expansion-panel
                v-model="panel"
                class="mt-3"
                expand
        >
            <v-expansion-panel-content
                    v-for="(item,idx) in wordsObj"
                    :key="idx"
            >
                <template v-slot:header>
                    <div>{{item._id}} </div>
                    <small class="text-center" v-if="item.wordsArr.length > 999">(can't fetch more then 1000 words) </small>
                    <small class="text-right mr-3">total: {{item.wordsArr.length}} items</small>
                </template>
                <v-card>
                    <v-card-text>{{item.wordsArr}}</v-card-text>
                </v-card>
            </v-expansion-panel-content>

            <!--====================SNACKBAR================-->
        </v-expansion-panel>
        <v-snackbar
                v-model="snackbar"
                :right="true"
                :timeout="4000"
                :top="true"
        >
            {{ snackbarText }}
            <v-btn
                    color="pink"
                    flat
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>

    </v-container>
</template>

<script>
    export default {
        name:'BackApp',
        data: () => ({
            snackbarText: '',
            snackbar: false,
            panel:[],
        }),
        methods:{
            async testConnection(){
                try {
                    this.$loading(true)
                    await this.$store.dispatch(`backApp/testConnection`)
                    this.snackbarText = 'Connection Tested Successfully'
                }catch(err){
                    this.snackbarText = 'Connection Failed'
                }finally{
                    this.$loading(false)
                }
                this.snackbar = true;
            },
            async fetchWordsFromMongo(){
                await this.dispatchEvent('fetchWordsFromMongo')
                let txt = 'Data Fetched Successfully from Mongo'
                if(!this.wordsObj || this.wordsObj.length ===0 ){
                    txt ='No Data In Mongo'
                }
                this.snackbar = true;
                this.snackbarText = txt
            },
            async tweetReport(){
                await this.dispatchEvent('tweetReport')
                let txt = 'Report Fetched Successfully From Mongo';
                if(!this.report || this.report.length===0 ){
                   txt = 'No Data In Mongo'
                }
                this.snackbar = true;
                this.snackbarText = txt
            },
            async fetchWordsFromApi(){
                await this.dispatchEvent('fetchWordsFromApi')
                this.snackbar = true;
                this.snackbarText = 'Data Fetched Successfully To Mongo'
            },
            async deleteLocal(){
                await this.dispatchEvent('deleteLocal')
                this.snackbar = true;
                this.snackbarText = 'All Local Records Deleted'
            },
            async deleteAll(){
                await this.dispatchEvent('deleteAll')
                this.snackbar = true;
                this.snackbarText = 'All Records Deleted'
            },
            async dispatchEvent(actionStr){
                try {
                    this.$loading(true)
                   return await this.$store.dispatch(`backApp/${actionStr}`)
                }catch(err){
                    console.log(err);
                }finally{
                    this.$loading(false)
                }
            },
        },
        computed:{
            wordsObj(){return this.$store.getters['backApp/wordsObj']},
            report(){return this.$store.getters['backApp/report']},
        }
    }
</script>

<style scoped lang="scss">
.back-app.app-page{
    .buttons{
        max-width:20rem;
    }
    .word-section{
        max-height: 30vh;
    }
}
</style>

