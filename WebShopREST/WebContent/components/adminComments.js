Vue.component("admin-comments", {
    data: function() {
        return {
            comments: [
                {buyerUsername: 'Gorčilo', mark: 5, dateTime: '12.3.2021. 15:00', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
                {buyerUsername: 'Slavko', mark: 3, dateTime: '15.3.2021. 15:00', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
                {buyerUsername: 'Spiridon', mark: 4, dateTime: '12.7.2021. 15:00', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
                {buyerUsername: 'Srki', mark: 4, dateTime: '1.2.2020. 15:00', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
                {buyerUsername: 'Anci', mark: 5, dateTime: '23.8.2021. 15:00', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
            ]
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
                                            <span class="dateComment">{{c.dateTime}}</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <p class="contentComment">{{c.content}}</p>
                                    </div>
                                </div>

                                <div class="col-md-2 commentStatus">
                                    <div class="row">
                                        <p class="ml-4"> Čeka odobrenje </p>
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

    },
    methods: {
        
    }
});