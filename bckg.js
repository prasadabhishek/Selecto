/*chrome.browserAction.onClicked.addListener(function (t) {
          chrome.tabs.create(
            {"url" : "http://www.google.com/buzz/post?url=" + encodeURI(t.url) });
            
            setTimeout(getNewInfo(t.id), 5000); // Refresh the count.
      });*/

//chrome.tabs.onSelectionChanged.addListener(getNewInfo);
//chrome.tabs.onUpdated.addListener(getNewInfo);

var copiedTextArray = [];
var parentUrlArray = [];
// Set up the context menus
chrome.contextMenus.create({
    "title": "Selecto",
        "contexts": ["page", "selection", "image", "link"],
        "onclick": function (e) {

        var parentUrl = e.pageUrl;
        var copiedText;
        var imageUrl;
        var copiedUrl;


        if (e.selectionText) {
            // The user selected some text, put this in the message.
            copiedText = e.selectionText;
            parentUrlArray.push(parentUrl);
            copiedTextArray.push(copiedText);
            //alert(JSON.stringify(copiedTextArray));

            // Save copiedTextArray
            chrome.storage.local.set({
                "copiedTextArray": JSON.stringify(copiedTextArray)
            }, function () {});
            // Save parentUrlArray
            chrome.storage.local.set({
                "parentUrlArray": JSON.stringify(parentUrlArray)
            }, function () {});
        }

        if (e.mediaType === "image") {
            imageUrl = encodeURI(e.srcUrl);
			parentUrlArray.push(parentUrl);
            copiedTextArray.push(imageUrl);
			// Save copiedTextArray
            chrome.storage.local.set({
                "copiedTextArray": JSON.stringify(copiedTextArray)
            }, function () {});
            // Save parentUrlArray
            chrome.storage.local.set({
                "parentUrlArray": JSON.stringify(parentUrlArray)
            }, function () {});
        }

        if (e.linkUrl) {
            // The user wants to buzz a link.
            copiedUrl = e.linkUrl;
        }

        // Open the page up.
        chrome.tabs.create({
            "url": buzzPostUrl
        });
    }
});