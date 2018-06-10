
//接受快捷鍵觸發事件
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // console.log(message); //取得message {greeting: "hello"}
    // console.log(sender); // {id: "hojcoebfmdnijbojfkjpmhcdmoejgakn"}
    sendResponse({ res: "來自內容腳本的回覆" });

    //取得popup html儲存的訊息
    chrome.storage.sync.get(['person_id', 'getin_date', 'from_station', 'to_station', 'train_no', 'n_order_qty_str','z_order_qty_str'], function (data) {
        console.log(data);
        addInput(data);

        var searchButton = document.getElementsByClassName('btn-primary');
        searchButton[0].click();
    });
});

/**
 * 儲存值放入對應dom中
 * @param {*} data 
 */
var addInput = function (data) {
    console.log('addInput function內:');
    console.log(data);

    var person_id = document.getElementById('person_id');
    var getin_date = document.getElementById('getin_date');
    var from_station = document.getElementById('from_station');
    var to_station = document.getElementById('to_station');
    var train_no = document.getElementById('train_no');
    var n_order_qty_str = document.getElementById('n_order_qty_str');
    var z_order_qty_str = document.getElementById('z_order_qty_str');

    person_id.value = data.person_id;
    getin_date.value = data.getin_date;
    from_station.value = data.from_station;
    to_station.value = data.to_station;
    train_no.value = data.train_no;
    n_order_qty_str.value = data.n_order_qty_str;
    z_order_qty_str.value = data.z_order_qty_str;
}


