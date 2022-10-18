js:
let d = [];
d.push({
    col_type: 'x5_webview_single',
    extra: {
        urlInterceptor: $.toString(() => {
            if(input.includes('/detail/')) {
                return $.toString((url)=>{
                    fy_bridge_app.open(JSON.stringify({
                        rule: "规则名称", 
                        title: "页面标题", 
                        url: input, 
                        group: "", 
                        col_type: "x5_webview_single", 
                        findRule: "", 
                        preRule: "", 
                        extra: {}
                    }))
                }, input)
            }
        })
    }
});
setResult(d);
