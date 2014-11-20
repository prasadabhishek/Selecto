// Check browser support
if (typeof(Storage) != "undefined") {
	var copiedTextArray = []
	var parentUrlArray = []
	
	var h3 = []
	var li = []
    // Retrieve
	chrome.storage.local.get("copiedTextArray", function (result) {
		copiedTextArray = JSON.parse(result.copiedTextArray);
		//document.getElementById("result").innerHTML = copiedTextArray;
	});

	// Retrieve Url
	chrome.storage.local.get("parentUrlArray", function (result) {
		parentUrlArray = JSON.parse(result.parentUrlArray);
		//document.getElementById("result").innerHTML = parentUrlArray;
		var html = "";
		for (var i = 0; i < copiedTextArray.length; i++) {
			html += "<b>" + parentUrlArray[i] + "</b>";
			if(!checkURL(copiedTextArray[i]))
				html += "<li type='square'>" + copiedTextArray[i] + "</li>";
			else
				html += "<img src='"+ copiedTextArray[i]+"'>" + "</img>";
		}
		document.getElementById("list").innerHTML = html;
	});
	function checkURL(url) {
		return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
	}
	
	
} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}