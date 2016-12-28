new Vue({
    el: '#app',
    data: {
        time: '',
        date: ''
    },
    methods: {
        fullscreen: function() {
            screenfull.toggle();
        }
    },
    created: function() {
        this.time = moment().format('HH:mm');
        this.date = moment().format('dd D MMM YYYY');

        setInterval(function() {
            this.time = moment().format('HH:mm');
            this.date = moment().format('dd D MMM YYYY');
        }.bind(this), 5000);
    }
});

// axios.get('http://www.nu.nl/rss').then(function(data) {
//     console.log(data);
// });
