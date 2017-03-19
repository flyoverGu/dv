;(function() {

    function getDom(url) {
        var dom = $('<a href="' + url + '" download="1.mp4" style=" position: absolute; z-index: 999; color: #fff; background: rgba(0, 0, 0, 0.60); font-size: 16px; bottom: 0px; right: 0px; padding: 3px; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; ">下载视频</a>');
        if (navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("Safari") != -1) {
            dom.html('下载地址(右键另存为)');
        }
        return dom;
    }

    function parseVideoUrl(str) {
        var list = decodeURIComponent(str).split('&');
        //console.log(list);
        var obj = {};
        for(var i = 0; i < list.length; i++) {
            var m = list[i].split('=');
            if (m[0] == 'video_src') {
                obj['video_src'] = m[1]+'='+m[2];
            } else if (m[0] == 'Expires') {
                obj['Expires'] = list[i];
            } else if (m[0] == 'ssig') {
                obj['ssig'] = list[i];
            } else if (m[0] == 'KID') {
                obj['KID'] = list[i];
            }
        }
        //console.log(obj);
        return obj['video_src']+'&'+obj['Expires']+'&'+obj['ssig']+'&'+obj['KID'];
    }

    function isTvDomain() {
        return /\/tv\//.test(document.location.pathname);
    }

    function isSearchDomain() {
        return /^s\.weibo\.com/.test(document.location.host);
    }

    function appendBtn($el, url) {
        var dom = getDom(url);
        if (!isTvDomain()) {
            $el.css({position: 'relative'});
        }
        $el.append(dom);
    }

    function findAllVideoCard(done) {
        var videoCardList = $('.WB_video');
        if (isTvDomain()) {
            videoCardList = $('[node-type="common_video_player"]');
        }
        videoCardList.map(function() {
            var $el = $(this);
            var url = parseVideoUrl($el.attr('action-data'));
            done($el, url);
        });
    }

    function isSupportDomain() {
        if (!/weibo\.com/.test(document.location.host)) {
            document.location.href="http://video.0xgg.com/";
            return false;
        }
        return true;
    }

    function loadScript(done) {
        var node = document.createElement('script');
        node.src = '//cdn.bootcss.com/zepto/1.2.0/zepto.min.js';
        node.onload = function() {
            done();
        }
        document.body.appendChild(node);
    }

    function start() {
        if (isSupportDomain()) {
            loadScript(function() {
                findAllVideoCard(appendBtn);
            });
        }
    }

    start();

})();
