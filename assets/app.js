new Vue({
    el: '#app',
    data: {
        time: '',
        date: ''
    },
    created: function() {
        this.time = moment().format('HH:mm');
        this.date = moment().format('dddd D MMMM YYYY');

        setInterval(function() {
            this.time = moment().format('HH:mm');
            this.date = moment().format('dddd D MMMM YYYY');
        }.bind(this), 5000);
    }
});

axios.get('http://www.nu.nl/rss').then(function(data) {
    console.log(data);
});

console.log(mainWindow)