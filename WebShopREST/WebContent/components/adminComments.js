Vue.component("admin-comments", {
    data: function() {
        return {
            comments: []
        }
    },
    template:         
        `<div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-8">
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
                                            <span class="dateComment">{{c.restaurantName}}</span>
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
                                </div>

                            </div>
                            <hr/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>`,
    mounted() {
        axios.get('../rest/comments/getAdminComments/')
            .then(response => {
                this.comments = response.data;
            });
    },
    methods: {
        
    }
});