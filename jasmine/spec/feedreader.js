/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {
    /**
     * 测试 google API 是否加载成功
     */
    describe('Google API', function() {
        it('goole defined', function() {
            expect(google).toBeDefined();
        });
    });
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('allFeeds defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
        it('all url defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(typeof allFeeds[i].url).toBe('string');
                expect($.trim(allFeeds[i].url)).not.toBe('');
            }
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
        it('all name defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(typeof allFeeds[i].name).toBe('string');
                expect($.trim(allFeeds[i].name)).not.toBe('');
            }
        });
    });
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('allFeeds defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
        it('all url defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(typeof allFeeds[i].url).toBe('string');
                expect($.trim(allFeeds[i].url)).not.toBe('');
            }
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
        it('all name defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(typeof allFeeds[i].name).toBe('string');
                expect($.trim(allFeeds[i].name)).not.toBe('');
            }
        });
    });

    /* TODO: 写一个叫做 "The menu" 的测试用例 */
    describe('The menu', function() {
        var $body = $('body'),
            sideMenu,
            translateLeft,
            isMenuHidden,
            isMenuShow;

        beforeEach(function() {
            sideMenu = $('.slide-menu');
            // matrix 对象第4个下标代表向左位移的距离
            // 检测菜单是否已经关闭
            // body 有 menu-hidden class 且 菜单的左移距离等于菜单总宽度
            isMenuHidden = function() {
                translateLeft = parseInt(sideMenu.css('transform').split(',')[4]);
                return $body.hasClass('menu-hidden') && translateLeft === -sideMenu.outerWidth();
            };

            // 检测菜单是否已经展示
            // body 没有 menu-hidden class 且 菜单左移为0
            isMenuShow = function() {
                translateLeft = parseInt(sideMenu.css('transform').split(',')[4]);
                return !$body.hasClass('menu-hidden') && translateLeft === 0
            };
        })

        /* TODO:
         * 保证菜单元素默认是隐藏的。
         */
        it('menu default hidden', function() {
            expect(isMenuHidden()).toBeTruthy();
        });

        /*
         * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
         * 测试应该包含两个 expectation ：
         * 当点击图标的时候菜单是否显示，
         * 再次点击的时候是否隐藏。
         */
        it('click icon can toggle menu', function(done) {
            var menuIcon = $('.menu-icon-link');
            // 触发点击事件
            menuIcon.trigger('click');
            // sideMenu 动画效果有0.2s的执行时间 这里需要等待动画完成
            setTimeout(function() {
                expect(isMenuShow()).toBeTruthy();
                // 再次点击应该显示
                menuIcon.trigger('click');
                setTimeout(function() {
                    expect(isMenuHidden()).toBeTruthy();
                    done();
                }, 250);
            }, 250);
        });


    });

    /* TODO: 写一个叫做 "Initial Entries" 的测试用例 */
    describe('Initial Entries', function() {
        var entryLoaded;

        // 保存容器对象
        beforeEach(function() {
            // 在 .feed 容器元素里面至少有一个 .entry 的元素。
            entryLoaded = function() {
                return $('.feed .entry').length > 0;
            };
        });

        /*
         * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */
        it('loadFeed is work', function(done) {
            loadFeed(0, function() {
                expect(entryLoaded()).toBeTruthy();
                done();
            });
        });
    });

    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */
    describe('New Feed Selection', function() {
        var oldEntry, newEntry;

        // 保存之前的内容，以便后续做比较
        beforeEach(function() {
            oldEntry = $('.feed .entry');
            // 如果还没有内容加载进来，则临时添加一个，数组越界处理
            if (!oldEntry.length) {
                oldEntry = $('<article class="entry"><h2></h2><p></p></article>').appendTo('.feed');
            }
        });

        /*
         * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
         * loadFeed() 函数是异步的。
         */
        it('load new source success', function(done) {
            loadFeed(1, function() {
                newEntry = $('.feed .entry');
                // 对比旧内容的第一条 entry html 是否和 新内容第一条entry相同，以判断其内容有没有更新
                expect(newEntry[0].outerHTML).not.toEqual(oldEntry[0].outerHTML);
                done();
            });
        })
    });

}());
