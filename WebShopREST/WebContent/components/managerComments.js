Vue.component("manager-comments", {
    data: function() {
        return {
            comments: [],
            comment: null
        }
    },
    template:
        `
        <!-- Main body -->
        <div class="main_body" id="restaurants">
            <div class="container" style="padding-bottom: 10vh">
    
                <div class="row">
                    <div class="col-md-2">
                        
    
                        <div class="row mb-3">
                            <div class="col-md-12">
                                    <ul class="list-group flex">
                                        <label class="list-group-item filter-item">
                                            <input class="form-check-input me-1" type="checkbox" value="Chineese">
                                            Čeka 
                                        </label>
                                        <label class="list-group-item filter-item">
                                            <input class="form-check-input me-1" type="checkbox" value="Italian">
                                            Prihvaćeni
                                        </label>
                                        <label class="list-group-item filter-item">
                                            <input class="form-check-input me-1" type="checkbox" value="Barbeque">
                                            Odbijeni
                                        </label>
                                    </ul>
                            </div>
                        </div>
    
                    </div>
    
                    <div class="col-md-10">
                        <div class="row main_content">
                            <div class="col-md-12">
                                <div class="card shadow pt-4" style="height: auto">
            
                                    <div v-for="c in comments" v-if="comments !== null">
                                        <div class="row p-4">
                                            <div class="col-md-2">
                                                <img src="../images/user.png" alt="User image" height="100px" class="mx-2">
                                            </div>
                                            <div class="commentContent col-md-8">
                                                <div class="row">
                                                    <div class="col">
                                                        <span class="usernameComment">{{c.buyerUsername}}&ensp;</span>
                                                        <span><img src="../images/star.png"></span>
                                                        <span class="markComment">{{c.mark}}</span>
                                                    </div>
                                                    <div class="col-md-auto"></div>
                                                    <div class="col-md-3">
                                                        
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <p class="contentComment">{{c.content}}</p>
                                                </div>
                                            </div>
            
                                            <div class="col-md-2 commentStatus">
                                                <div class="row">
                                                    <p class="ml-4" style="color:blue;" v-if="c.status == 'PENDING'"> Čeka odobrenje </p>
                                                    <p class="ml-4" style="color:green;" v-if="c.status == 'ACCEPTED'"> Prihvaćen </p>
                                                    <p class="ml-4" style="color:red;" v-if="c.status == 'REJECTED'"> Odbijen </p>
                                                </div>
                                                <div v-if="c.status == 'PENDING'">
                                                    <button type="button" class="btn btn-primary" v-on:click="acceptComment(c)">
                                                        <i class="fa fa-check"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-primary" v-on:click="rejectComment(c)">
                                                        <i class="fa fa-close"></i>
                                                    </button>
                                                </div>
                                            </div>
            
                                        </div>
                                        <hr/>
                                    </div>
                                
                                </div>

                            </div>

                            



                    </div>
    
                    </div>
    
                </div>
            </div>
    
    
        </div>
		`,
    mounted() {
        axios.get('../rest/comments/getManagerComments/')
            .then(response => {
                this.comments = response.data;
            });
    },
    methods: {
        acceptComment: function(comment){
            console.log(comment);
            axios.get('../rest/comments/acceptComment/' + comment.id)
            .then(response => {
                console.log(response.data);
                this.updateCommentView();
            });
        },

        rejectComment: function(comment){
            console.log(comment);
            axios.get('../rest/comments/rejectComment/' + comment.id)
            .then(response => {
                console.log(response.data);
                this.updateCommentView();
            });
        },

        updateCommentView: function(){
            axios.get('../rest/comments/getManagerComments/')
            .then(response => {
                this.comments = response.data;
            });
        }
    }
})