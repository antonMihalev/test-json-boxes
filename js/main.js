
 // -----------------------JSON TASK CSGO--------------------------------
var data = jQuery.getJSON("js/data.json");
$.getJSON( "js/data.json", function( data ) {
      var items = [];
      var parent = document.getElementsByTagName('BODY')[0];
      var rectangle = document.querySelector('rectangle');
      
      
          (function parseObj(data){
              console.log(data);
              for(var key in data){
              // console.log(data[key]);

                  if(typeof data[key] !== 'object'){
                      // console.log(data[key]);
                      items.push({'order':key, 'color':data[key]});
                  } else {
                      parseObj(data[key]);
                  }
                  
              }
          })(data);
          console.log(items);

          (function addRectangle(items){
          	for(var i = 0; i< items.length; i++){
          		var newDiv = document.createElement('div');
          		newDiv.className = 'rectangle';
          		var text = "Block:"+ (i+1);
          		var textNode = document.createTextNode(text);
          		newDiv.appendChild(textNode);
          		parent.appendChild(newDiv);
          		
          		newDiv.setAttribute('data-brd-width', items[i].order);//---data-attr

          		//------------------ORDER as BORDER START
          		newDiv.style.borderWidth = items[i].order+'px';
          		//------------------ORDER as BORDER END

          		//------------------ODD or EVEN as BORDER or BackGround START
          		if(items[i].order % 2){
          			newDiv.style.backgroundColor = items[i].color;
          			newDiv.setAttribute('data-color', items[i].color);//---data-attr
          		}else {
          			newDiv.style.borderColor = items[i].color;
          			newDiv.setAttribute('data-color', items[i].color);//---data-attr
          		}
          		//------------------ODD or EVEN as BORDER or BackGround END

          		if((i % 3) === 0) {newDiv.classList.add("clearfix")} //Each fouth start new line

          		if(((i+1) % 2) === 0) {newDiv.classList.add("box_shadow")} //Odd has shadow

          		// console.log(items[i]);
          	}

          })(items);

          //------------------HOVER EFFECT current-Rotate, prev-Yellow, next-Opacity 0.5
          	document.body.onmouseover = document.body.onmouseout = document.body.onclick = document.body.ondblclick= handler;

			function handler(event) {

			  function str(el) {
			    if (!el) return "null"
			    return el.className || el.tagName;
			  }

			  if (event.type == 'mouseover') {
			  		if(event.target.classList.contains('rectangle')){
			  			event.target.classList.add('rotating');
			  		}
				    
				    if(event.target.previousElementSibling.classList != ''){
				    	event.target.previousElementSibling.style.backgroundColor = 'yellow';
				    }
				    if(event.target.nextElementSibling.classList.contains('rectangle')){
				    	event.target.nextElementSibling.classList.add('opacity_half');
				    }
				    	
			  }
			  if (event.type == 'mouseout') {
				    event.target.classList.remove('rotating');
				    if(event.target.previousElementSibling.getAttribute('data-brd-width') % 2){
				    	event.target.previousElementSibling.style.backgroundColor = event.target.previousElementSibling.getAttribute('data-color');
				    }else {
				    	event.target.previousElementSibling.style.borderColor = event.target.previousElementSibling.getAttribute('data-color');
				    	event.target.previousElementSibling.style.backgroundColor = 'initial';
				    } 
			
				    event.target.nextElementSibling.classList.remove('opacity_half');
				}		

				  //---------Click => border-x-3. Second Click => return to initial view
			  if (event.type == 'click') {
				    event.target.style.borderWidth = (event.target.getAttribute('data-brd-width')*3)+'px'; 
			  }
			  if (event.type == 'dblclick') {
				    event.target.style.borderWidth = event.target.getAttribute('data-brd-width')+'px'; 
			  }
			}
	        //------------------HOVER EFFECT END

	        //------------------Button for ordering START
	        var buttonToOrdering = document.createElement('button');
	        buttonToOrdering.className = ('button_styles');
	        var buttonText = 'Sort';
	        var buttonTextNode = document.createTextNode(buttonText);
	        buttonToOrdering.appendChild(buttonTextNode);
	        parent.appendChild(buttonToOrdering);

	        function compareByOrder (firstObj, secondObj){
	        	return firstObj.order - secondObj.order;
	        }

	        sortedItems = items.sort(compareByOrder);
	        console.log(sortedItems);
	        //------------------Button for ordering END

});

 	// -----------------------JSON TASK CSGO END-------------------------------

