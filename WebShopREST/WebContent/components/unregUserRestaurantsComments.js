Vue.component("restaurant-comments", {
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
                                <div class="commentContent col-md-10">
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
                            </div>
                            <hr/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>`,
    mounted() {
        let restaurantId = window.location.href.split('?')[1].split('=')[1].split('#/')[0];
        axios.get('../rest/comments/getAcceptedComments/' + restaurantId)
        .then(response => {
            this.comments = response.data;
        });
    },
    methods: {
        
    }
});