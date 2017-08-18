
function annoletContainer(){
    //appending a div(annolet container) to body element of a webpage.
    var body = document.getElementsByTagName('body')[0];
    container = document.createElement('div');
    container.id = 'annolet-container';
    body.appendChild(container);

    //appending a CSS stylesheet to head element of a webpage, which is used to stylize the annolet container.
    var linktag = document.createElement('link');
    linktag.rel = "stylesheet";
    linktag.type = "text/css";
    linktag.href = "https://cdn.rawgit.com/ren-admin/pgxfrm-annolet/semantic-overlay/src/pgxfrm-bookmarklet/annolet/css/pgxfrm-annolet.css"; 
    document.getElementsByTagName('head')[0].appendChild(linktag);
    // injecting html code
    //loadHtml();
     document.getElementById('annolet-container').innerHTML = "<h4 id='annolet-header'>Semantic Overlay</h4>"+
    "<ul id='annolet-tools-menu' >"+
        "<li class='annolet-menu-item'>"+
            "<div style='position:relative;top:19px;display:inline-block;'>"+
                "<button id='qa-category' class='annolet-menu-sub-item' >Tag Q/A..!</button>"+"<br>"+
                "<select class='select-tools-menu' id='qa'>"+
                    "<option value='question'>question</option>"+
                    "<option value='multiple-choice'>multiple choice</option>"+
                    "<option value='correct-answer'>correct answer</option>"+
                    "<option value='explanation'>explanation</option>"+
                    "<option value='useful-links'>useful-links</option>"+
                "</select>"+
            "</div>"+
            "<div style='position:relative;top:19px;display:inline-block;'>"+
                "<button id='product-category' class='annolet-menu-sub-item' >Tag Product..!</button>"+"<br>"+
                "<select class='select-tools-menu' id='pd'>"+
                    "<option value='product-name'>product name</option>"+
                    "<option value='model'>model</option>"+
                    "<option value='price'>price</option>"+
                    "<option value='seller'>seller</option>"+
                    "<option value='brand'>brand</option>"+
                "</select>"+
            "</div>"+
            "<div style='position:relative;top:19px;display:inline-block;'>"+
                "<button id='number-category' class='annolet-menu-sub-item' >Tag Number..!</button>"+"<br>"+
                "<select class='select-tools-menu' id='num'>"+
                    "<option value='date'>date</option>"+
                    "<option value='time'>time</option>"+
                    "<option value='currency'>currency</option>"+
                    "<option value='distance'>distance</option>"+
                    "<option value='weight'>weight</option>"+
                "</select>"+
            "</div>"+"<br>"+
            "<button id='submit-btn' class='annolet-menu-sub-item' style='position:relative;top:19px;'>Submit</button>"+
        "</li>"+
    "</ul>";
}

  function loadHtml()
  {
    var html_url = "https://cdn.rawgit.com/ren-admin/pgxfrm-annolet/semantic-overlay/src/pgxfrm-bookmarklet/annolet/html_content.txt"; 
    $.get(html_url, function(data, status) {
    	html_content = data;
    	console.log("Data: " + html_content + "\nStatus: " + status);
	document.getElementById("annolet-container").innerHTML = html_content;
    }); 
  }

function getJsondata()
{
    var url = "https://cdn.rawgit.com/ren-admin/pgxfrm-annolet/semantic-overlay/src/pgxfrm-bookmarklet/annolet/custom_tags.json"; 
    $.get(url, function(data, status) {
    	json_data = data;
    	console.log("Data: " + json_data + "\nStatus: " + status);
    });
}

function annotateTag(markup_category) {
    var selected_tag = document.getElementById(markup_category).value;
    if(markup_category == "qa") {
       var custom_tag = document.createElement(json_data['categories'][0]['tags'][0][selected_tag]);
       createCustomTag();
    }
    else if(markup_category == "pd") {
       var custom_tag = document.createElement(json_data['categories'][1]['tags'][0][selected_tag]);
       createCustomTag();
    }
    else if(markup_category == "num") {
        var custom_tag = document.createElement(json_data['categories'][2]['tags'][0][selected_tag]);
        createCustomTag();
    }
    function createCustomTag() {
    	if(window.getSelection){
          	var userSelection = window.getSelection()
        	var userSelection_text = userSelection.toString();
        	custom_tag.textContent = userSelection_text;
    	}
   		else if (document.selection && document.selection.type != "Control") {
        	var userSelection = document.selection.createRange().text;
        	custom_tag.textContent = userSelection;
    	}      
    	custom_tag.style.backgroundColor = "yellow";
    	var range = userSelection.getRangeAt(0);
    	range.deleteContents();
    	range.insertNode(custom_tag);
    }
}

function addclickEvents() {
    document.getElementById('qa-category').addEventListener('click', function() {
        var category = json_data["categories"][0]["name"];
	annotateTag(category);
    }, false);
    document.getElementById('product-category').addEventListener('click', function() {
        var category = json_data["categories"][1]["name"];
	annotateTag(category);
    }, false);
    document.getElementById('number-category').addEventListener('click', function() {
        var category = json_data["categories"][2]["name"];
        annotateTag(category);
    }, false);
}  

window.onload = function() {
    annoletContainer()
    getJsondata()
    addclickEvents()
};
