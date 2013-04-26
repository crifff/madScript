(function (window) {
    var MadScript = function (src, options) {
        this.initialize();
        this.data = src;
        for (var key in options) {
            if (options.hasOwnProperty(key) && this.options.hasOwnProperty(key)) {
                this.options[key] = options[key];
            }
        }
        this.loadAudio();
    };

    MadScript.prototype = {
        data: {},
        currentAudio: null,
        audioList: [],
        currentIndex: 0,
        options: {
            sprite: false,
            dir: 'sound'
        },
        initialize: function () {
            this.data = {};
            this.currentAudio = null;
            this.currentIndex = 0;
            this.audioList = [];
        },
        loadAudio: function () {
            var keys = Object.keys(this.data.spritemap);
            var audio;
            if (this.options.sprite) {
                audio = new Audio();
                audio.src = this.options['dir'] + '/' + this.data.resources[0];
                this.audioList.push(audio);
            } else {
                for (var i in keys) {
                    if (keys.hasOwnProperty(i)) {
                        audio = new Audio();
                        audio.src = this.options['dir'] + '/' + keys[i] + ".mp3";
                        this.audioList.push(audio);
                    }
                }
            }
            this.currentAudio = this.audioList[this.currentIndex];
        },
        play: function () {
            console.log(this.audioList[0]);
            this.audioList[0].currentTime = 0;
            this.currentAudio.play();
            if (this.options.sprite) {
                var timer;
                var self = this;
                timer = setInterval(function () {
                    var time = self.currentAudio.currentTime;
                    if (time >= 1.0198412698412698) {
                        clearInterval(timer);
                        self.currentAudio.pause();
                        self = timer = null;
                    }
                }, 1);
            }
        },
        seek:function(time){
            this.currentAudio.currentTime = time;
        },
        next: function () {
            this.currentIndex++;
            this.currentAudio = this.audioList[this.currentIndex];
        }
    };

    window.MadScript = MadScript;
})(window);