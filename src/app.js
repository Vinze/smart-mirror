var data = {
    time: '',
    date: '',
    news: []
};

function updateTime() {
    data.time = moment().format('HH:mm');
    data.date = moment().format('dd D MMM YYYY').toLowerCase();
}

function updateNews() {
    axios.get('news').then(function(res) {
        if ( ! res) return;
        data.news = res.data;
    });
}

setInterval(updateTime, 5 * 1000);

setInterval(updateNews, 5 * 60 * 1000);

new Vue({
    el: '#app',
    data: data,
    methods: {
        fullscreen: function() {
            screenfull.toggle();
        }
    },
    created: function() {
        updateTime();
        updateNews();
    }
});
