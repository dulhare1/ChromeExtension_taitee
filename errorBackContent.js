var errorMsg = document.getElementsByTagName("h1")[0].innerHTML;
console.log(errorMsg);
if (errorMsg === '亂數驗證失敗') {
    chrome.storage.sync.get(['errorBack'], function (data) {
        if (data.errorBack) {
            document.getElementsByClassName('btn-primary')[0].click();
        } else {
            console.log('it is false');
        }
    });
}
