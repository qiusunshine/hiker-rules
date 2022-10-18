var d = [];
d.push({
    title: "开始测试",
    url: $().lazyRule(() => {
        showLoading("开始下载");
        var results = []
        var task = function(obj) {
            //downloadFile(obj.url, obj.path);
            fetch(obj.url);
            const {
                getApi,
                color,
                small,
                getFile,
                htmlTag,
                api
            } = $.require("hiker://page/utiliy?rule=道长仓库Pro");
            return obj.url
        };
        let tasks = [{
                func: task,
                param: {
                    url: "https://gitee.com/qiusunshine233/hikerView/raw/master/module/aes2.js",
                    path: "hiker://files/cache/t1.txt"
                },
                id: "task1"
            },
            {
                func: task,
                param: {
                    url: "https://gitee.com/qiusunshine233/hikerView/raw/master/module/aes2.js",
                    path: "hiker://files/cache/t2.txt"
                },
                id: "task2"
            },
            {
                func: task,
                param: {
                    url: "https://gitee.com/qiusunshine233/hikerView/raw/master/module/aes2.js",
                    path: "hiker://files/cache/t3.txt"
                },
                id: "task3"
            },
            {
                func: task,
                param: {
                    url: "https://gitee.com/qiusunshine233/hikerView/raw/master/module/aes2.js",
                    path: "hiker://files/cache/t3.txt"
                },
                id: "task4"
            },
            {
                func: task,
                param: {
                    url: "https://gitee.com/qiusunshine233/hikerView/raw/master/module/aes2.js",
                    path: "hiker://files/cache/t3.txt"
                },
                id: "task5"
            }
        ];
        var count = tasks.length;
        var success = 3;
        count = success;
        be(tasks, {
            func: function(obj, id, error, taskResult) {
                obj.results.push(taskResult)
                //log("task:" + id);
                //log("error:" + error);
                //log(obj);

                count = count - 1;
                if (count == 1) {
                    toast("我主动中断了");
                    hideLoading();
                    return "break";
                } else if (count > 0) {
                    showLoading("下载中，剩余任务：" + count)
                } else {
                    hideLoading();
                }

            },
            param: {
                hi: "ccc",
                results: results
            }
        }, success);
        updateItem({
            title: "任务数：" + tasks.length + "，要求结果数：" + success + "，返回结果数：" + results.length,
            url: "",
            col_type: "long_text",
            desc: "",
            pic_url: "",
            extra: {
                id: "vbdjhdhdjd"
            }
        })
        updateItem({
            title: "结果：" + new Date() + "<br>" + JSON.stringify(results),
            extra: {
                textSize: 18,
                click: true,
                id: MY_RULE.title + "log"
            }
        });
        return "toast://完成"
    }),
    col_type: "text_1",
    desc: "",
    pic_url: ""
});
d.push({
    title: "任务数：0，要求结果数：0，返回结果数：0",
    url: "",
    col_type: "long_text",
    desc: "",
    pic_url: "",
    extra: {
        id: "vbdjhdhdjd"
    }
});

d.push({
    title: "",
    col_type: "rich_text",
    extra: {
        textSize: 18,
        click: true,
        id: MY_RULE.title + "log"
    }
});

setResult(d);
