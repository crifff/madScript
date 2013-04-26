describe('audio', function () {
    var madScript;
    var data;
    before(function () {
        data = json;
    });

    beforeEach(function () {
        madScript = null;
    });

    it('スプライトシートを読み込む', function () {
        madScript = new MadScript(data, {
            dir: '../sound'
        });
        expect(madScript.data.resources[0]).to.be('output.mp3');
    });

    it('すべての個別オーディオソース読み込む', function () {
        madScript = new MadScript(data, {
            dir: '../sound'
        });
        expect(madScript.audioList.length).to.be(5);
        expect(madScript.currentAudio.src.split('/').pop()).to.be('01.mp3');
    });

    it('最初のトラックを再生する', function (done) {
        madScript = new MadScript(data, {
            dir: '../sound'
        });
        madScript.currentAudio.muted = true;
        madScript.currentAudio.addEventListener('playing', function () {
            expect(this.currentSrc.split('/').pop()).to.be('01.mp3');
            done();
        });
        madScript.play();
    });

    it('次のトラックを再生する', function (done) {
        madScript = new MadScript(data, {
            dir: '../sound'
        });
        madScript.next();
        madScript.currentAudio.muted = true;
        madScript.currentAudio.addEventListener('playing', function () {
            expect(this.currentSrc.split('/').pop()).to.be('02.mp3');
            done();
        });
        madScript.play();
    });

    it('オーディオスプライト読み込む', function () {
        madScript = new MadScript(data, {
            sprite: true,
            dir: '../sound'
        });
        expect(madScript.audioList.length).to.be(1);
        expect(madScript.currentAudio.src.split('/').pop()).to.be('output.mp3');
    });

    it('最初のトラックを再生する', function (done) {
        madScript = new MadScript(data, {
            sprite: true,
            dir: '../sound'
        });
        expect(madScript.currentAudio.src.split('/').pop()).to.be('output.mp3');
        madScript.currentAudio.addEventListener('play', function () {
            madScript.currentAudio.addEventListener('pause', function () {
                done();
            });
        });
        madScript.play();
    });
});