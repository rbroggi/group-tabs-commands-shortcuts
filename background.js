
chrome.commands.onCommand.addListener(function(command) {
    console.log("invoked!!")
    chrome.tabs.query({currentWindow: true, active: true}, function(foo) {
        var cur = foo[0];
        chrome.tabs.create({index: cur.index+1}, function(bar) {
            chrome.tabs.group({tabIds: bar.id, groupId: cur.groupId});
        });
    });
});
