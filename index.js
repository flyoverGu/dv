;(function() {
    function getOneUrl($video, done) {
        function foo($video, done) {
            var src = $video.find('video').attr('src');
            if (src) {
                $video.find('.hv-ring').click();
                done(src, $video);
            } else {
                setTimeout(function() {
                    foo($video, done);
                }, 100);
            }
        }
        $video.find('.hv-ring').click();
        foo($video, done);
    }

    function getDom(url) {
        var dom = $('<a href="' + url + '" download style=" position: absolute; z-index: 99999; color: #fff; background: rgba(0, 0, 0, 0.60); font-size: 16px; bottom: 0px; right: 0px; padding: 3px; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; ">下载视频</a>');
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            dom.html('下载地址(右键另存为)');
        }
        return dom;
    }

    function getUrl() {
        var $videoList = $('.html5-video');
        for (var i = 0; i < $videoList.length; i++) {
            getOneUrl($videoList.eq(i), function(url, $video) {
                if (!/\/tv\//.test(document.location.pathname)) {
                    $video.parent().css({position: 'relative'});
                }
                $video.after(getDom(url));
            });
        }
    }

    function isSupportDomain() {
        if (!/weibo\.com/.test(document.location.host)) {
            document.location.href="http://indexof.site/labs/weibo/index.html";
            return false;
        }
        return true;
    }

    function start() {
        if (isSupportDomain()) {
            var node = document.createElement('script');
            node.src = '//cdn.bootcss.com/zepto/1.2.0/zepto.min.js';
            node.onload = function() {
                getUrl();
            }
            document.body.appendChild(node);
        }
    }

    start();

})();
