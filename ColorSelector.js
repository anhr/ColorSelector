﻿var colorSelector = {
	idcolorSelector: "colorSelector"
	
	, getcolorSelector: function(){
		return document.getElementById(this.idcolorSelector);
	}
	
	, Create: function(color, selectedColor, elementColorID){
		try{
			colorSelector.AddElementColorSelector(color, function(e){
		//consoleLog("ColorSelector.onmousedown(" + e + ")");
					colorSelector.Add(this);
				}
				, selectedColor, elementColorID);
	    } catch(e) {
			consoleError("Create Color Selector failed. " + e);
	    }
	}
	
	, Add: function(elementColorSelector){
		var element = this.getcolorSelector();
		if(element)
			return;
		element = document.createElement("span");
		element.style.display = 'none';
		document.body.appendChild(element);
		element.id = this.idcolorSelector;
		element.className = "downarrowcolorselector";
		colorSelector.AddElementColorA(element, elementColorSelector);//.selectedColor);
		var offsetSum = getOffsetSum(elementColorSelector);
//		element.style.top = (offsetSum.top - elementColorSelector.offsetHeight - element.offsetHeight) + "px";
		element.style.top = (offsetSum.top - elementColorSelector.offsetHeight) + "px";
		
		//for Internet for Android 5.0 in Samsung Galaxy S5
		setTimeout(function()
			{
				var element = colorSelector.getcolorSelector();
				element.style.display = 'block';
				element.style.top = (parseInt(element.style.top) - element.offsetHeight) + "px";
			}
			, 0
		);
		
//alert("element.style.top = " + element.style.top + " offsetSum.top = " + offsetSum.top + " elementColorSelector.offsetHeight  = " + elementColorSelector.offsetHeight + " element.offsetHeight = " + element.offsetHeight);
		element.style.left = offsetSum.left + "px";
	}
	
	, AddElementColorA: function(elementParent, elementColorSelector){
		//Color names http://www.javascripter.net/faq/colornam.htm
		colorSelector.AddElementColorTooltip(elementParent, "black"  , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "white"  , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "red"    , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "green"  , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "blue"   , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "yellow" , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "aqua"   , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "lime"   , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "silver" , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "maroon" , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "teal"   , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "navy"   , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "fuchsia", elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "olive"  , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "gray"   , elementColorSelector);
		colorSelector.AddElementColorTooltip(elementParent, "purple" , elementColorSelector);
	}
		
	, AddElementColor: function(elementParent, color, onmousedown, elementColorID){
		var elementColor;
		if(typeof elementColorID == 'undefined'){
			elementColor = document.createElement("input");
			elementParent.appendChild(elementColor);
		} else elementColor = document.getElementById(elementColorID);
		if(!elementColor)
			throw "Invalid id of Color Selector input element: " + elementColorID;
		elementColor.style.background = color; 
		elementColor.style.border = "1px solid #000000"; 
		elementColor.style.padding = "0px 0px"; 
		elementColor.style.display = "inline-block";
		elementColor.style.cursor = "default";//for IE
		elementColor.onmousedown = onmousedown;
		elementColor.onmouseover = function(){
//consoleLog("colorSelector.elementColor.onmouseover()");
			this.style.borderColor = "white";
		}
		elementColor.onmouseout = function(){
//consoleLog("colorSelector.elementColor.onmouseout()");
			this.style.borderColor = "black";
		}
//consoleLog("colorSelector.AddElementColor(...). elementColor.onmousedown = " + elementColor.onmousedown);
		return elementColor;
	}
	
	, AddElementColorSelector: function(color, onmousedown, selectedColor, elementColorID){
		var elementColorSelector = this.AddElementColor(document.body, color, onmousedown, elementColorID);
		if(elementColorSelector.tagName.toUpperCase() != "INPUT"){
			consoleError("Use input element as Color Selector");
			return;
		}
		if(elementColorSelector.type.toLowerCase() != "text"){
			consoleError("Use input text element as Color Selector");
			if(isIE)
				return;
			elementColorSelector.type = "text";
		}
		elementColorSelector.readOnly = true;
		elementColorSelector.style.width = "50px";
		colorSelector.InputValue(elementColorSelector, color);
		elementColorSelector.selectedColor = selectedColor;
		elementColorSelector.onblur = function(){
//consoleLog("colorSelector.elementColorSelector.onblur()");
			colorSelector.Remove();
		}
	}
	
	, AddElementColorTooltip: function(elementParent, color, elementColorSelector){
		var elementColorTooltip = this.AddElementColor(elementParent, color, function()
			{
		//consoleLog("colorSelector.selectColor(). this.selectedColor = " + this.selectedColor);
				colorSelector.Remove();
				var elementColorSelector = this.elementColorSelector;
				var color = this.style.backgroundColor;
				elementColorSelector.style.background = color;
				colorSelector.InputValue(elementColorSelector, color);
				elementColorSelector.selectedColor(color);
			}
		);
		elementColorTooltip.elementColorSelector = elementColorSelector;
		elementColorTooltip.style.width = "10px";
		elementColorTooltip.style.height =  "10px"; 
	}
	
	, InputValue: function(elementInput, color){
		var colorInvert = invertHex(colourNameToHex(color));
		if(colorInvert == false)
			return;
//alert(color);			
		elementInput.style.color = colorInvert;
		elementInput.value = color;
	}
	
	, Remove: function(){
//consoleLog("colorSelector.Remove()");
		setTimeout(function()
			{
				var element = colorSelector.getcolorSelector();
				if(!element)
					return;
				document.body.removeChild(element);
			}
			, 0
		);
	}
}

