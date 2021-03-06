document.addEventListener('DOMContentLoaded', function (dcle) {

    var person_id = document.getElementById('person_id');
    var getin_date = document.getElementById('getin_date');
    var from_station = document.getElementById('from_station');
    var to_station = document.getElementById('to_station');
    var train_no = document.getElementById('train_no');
    var n_order_qty_str = document.getElementById('n_order_qty_str');
    var z_order_qty_str = document.getElementById('z_order_qty_str');
    var randInputErrorBack = document.getElementsByName('randInputErrorBack');

    var today = new Date();
    var beforehandDay;
    // 一般提前14天，禮拜五提前16天
    if (today.getDay() == 5) {
        beforehandDay = 18;
    } else {
        beforehandDay = 16;
    }
    // 超過11點就無法訂當日票
    if (today.getHours() == 23) {
        today.setDate(today.getDate() + 1);
        beforehandDay -= 1;
    }
    //產生日期選單 有bug，台鐵儲存日期會變動但這邊的儲存日期不會變動!!!
    // for (var i = 0; i < beforehandDay; i++) {
    //     let formatDay = today.getFullYear() + "/" + paddingLeft((today.getMonth() + 1).toString(), 2) + "/" + paddingLeft(today.getDate().toString(), 2);
    //     let date_value = formatDay + '-' + paddingLeft(i.toString(), 2);
    //     let theOption = document.createElement("OPTION");
    //     theOption.setAttribute("value", date_value);
    //     let text = document.createTextNode(formatDay);
    //     theOption.appendChild(text);
    //     getin_date.appendChild(theOption);

    //     today.setDate(today.getDate() + 1);
    // }
    let formatDay1 = '2018/06/13';
        let date_value1 = '2018/06/13-02';
        let theOption1 = document.createElement("OPTION");
        theOption1.setAttribute("value", date_value1);
        let text1 = document.createTextNode(formatDay1);
        theOption1.appendChild(text1);
        getin_date.appendChild(theOption1);

        today.setDate(today.getDate() + 1);

        let formatDay = '2018/06/25';
        let date_value = '2018/06/25-14';
        let theOption = document.createElement("OPTION");
        theOption.setAttribute("value", date_value);
        let text = document.createTextNode(formatDay);
        theOption.appendChild(text);
        getin_date.appendChild(theOption);

        today.setDate(today.getDate() + 1);


    //放入儲存值
    chrome.storage.sync.get(['person_id', 'getin_date', 'from_station', 'to_station', 'train_no', 'n_order_qty_str','z_order_qty_str', 'errorBack'], function (data) {
        if (data.person_id) {
            console.log('有東西!');
            console.log(data);
            person_id.value = data.person_id;
            getin_date.value = data.getin_date;
            from_station.value = data.from_station;
            to_station.value = data.to_station;
            train_no.value = data.train_no;
            n_order_qty_str.value = data.n_order_qty_str;
            z_order_qty_str.value=data.z_order_qty_str;
            data.errorBack ? randInputErrorBack[0].checked = true : randInputErrorBack[1].checked = true;
        } else {
            console.log('空的!');
            randInputErrorBack[1].checked = false;
        }
    });

    var saveButton = document.getElementById('saveBtn');

    saveButton.addEventListener('click', function () {

        var errorBack;
        errorBack = randInputErrorBack[0].checked ? true : false;

        chrome.storage.sync.set({
            'person_id': person_id.value,
            'getin_date': getin_date.value,
            'from_station': from_station.value,
            'to_station': to_station.value,
            'train_no': train_no.value,
            'n_order_qty_str': n_order_qty_str.value,
            'z_order_qty_str':z_order_qty_str.value,
            'errorBack': errorBack
        }, function () {
            console.log('person id is ' + person_id.value);
            var feedbackTag = document.getElementById('sucMsg');
            feedbackTag.style.color = '#ff0000';
            feedbackTag.innerHTML = '儲存成功!';
            var btnDiv = document.getElementById('btnDiv');
            btnDiv.appendChild(feedbackTag);
        });
    });

    startTime();



    /**
     * 左側補0
     * @param {*} str 
     * @param {*} lenght 
     */
    function paddingLeft(str, lenght) {
        if (str.length >= lenght)
            return str;
        else
            return paddingLeft("0" + str, lenght);
    }

});

var startTime = function () {
    var today = new Date();
    var hh = today.getHours();
    var mm = today.getMinutes();
    var ss = today.getSeconds();
    mm = checkTime(mm);
    ss = checkTime(ss);
    document.getElementById('clock').innerHTML = hh + ":" + mm + ":" + ss;
    var timeoutId = setTimeout(startTime, 500);
}

var checkTime = function (i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
