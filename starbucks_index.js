/**
 * Created by Administrator on 2016/6/23.
 */
// todo 未知数据省份用其它颜色表示
window.onload = function(){
    var emSvg = document.getElementById("emSvg"),
        svgDoc = emSvg.getSVGDocument(),
        svgRoot = svgDoc.documentElement,
        dataBo = document.getElementsByClassName("dataBoard")[0],
        showName = document.getElementsByClassName("showNameBtn")[0],
        showData = document.getElementsByClassName("showDataBtn")[0];

    update();

    dataBo.addEventListener("focus", function(event){
        var target = event.target;
        svgDoc.getElementsByClassName( target.getAttribute("data-provinces") )[0].setAttribute("fill", "#888");
    }, true);

    dataBo.addEventListener("blur", function(event){
        update();
    }, true);

    dataBo.addEventListener("change", function(event){
        var target = event.target;
        var clsName = target.getAttribute("data-provinces");
        PROVINCES[clsName].data = parseFloat(target.value);     //make sure input value is a Number type
    }, true);

    showName.addEventListener("click", function(){
        changeBtnStyle(this, "chinese");

    })

    showData.addEventListener("click", function(){
        changeBtnStyle(this, "data");
    })

    // show box with detail information when mouse on map
    svgRoot.onmouseover = function(event){

        var target = event.target,
            detail = document.getElementsByClassName("detail")[0],
            className,
            classes,
            stateArr;

        if(target.getAttribute("class")){
            className = target.getAttribute("class");
            classes = className.split(" ");

            if(typeof className === "string" && className.indexOf("state") > -1){
                stateArr = this.getElementsByClassName(className),
                    i = 0,
                    len = stateArr.length;

                for(; i < len; i++){
                    stateArr[i].setAttribute("class", className + " selected");
                }

                detail.style.visibility = "visible";
                detail.getElementsByClassName("stateName")[0].innerText = PROVINCES[classes[1]].chinese;
                detail.getElementsByClassName("showData")[0].innerText = PROVINCES[classes[1]].data;

                this.onmousemove = function(event){
                    detail.style.top = event.clientY - detail.offsetHeight - 10 + "px";
                    detail.style.left = event.clientX - detail.offsetWidth - 10 + "px";
                }
            }
        }
    }

    // hidden box with detail information when mouse out map
    svgRoot.onmouseout = function(event){
        var target = event.target,
            detail = document.getElementsByClassName("detail")[0],
            className,
            slen,
            repName,
            stateArr;

        if(target.getAttribute("class")){
            className = target.getAttribute("class");
            slen = className.indexOf(" selected");
            repName = className.slice(0, slen);

            if(typeof className === "string" && className.indexOf("state") > -1){
                stateArr = this.getElementsByClassName(className),
                    i = 0,
                    len = stateArr.length;

                for(; i < len; i++){
                    stateArr[0].setAttribute("class", repName)
                }
                detail.style.visibility = "hidden";
                this.onmousemove = null;
            }
        }
    }

    // update data and map
    function update(){
        var dataMapCls = {},    // provinces name map to its data
            dataSort = [];

        // reload data from PROVINCES object
        for(var key in PROVINCES){
            if(!dataMapCls[PROVINCES[key].data]){
                dataMapCls[PROVINCES[key].data] = [];
            }
            dataMapCls[PROVINCES[key].data].push(key);
            dataSort.push(PROVINCES[key].data);
        }

        mergeSort(dataSort, 0 ,dataSort.length - 1);    // data are sorted by increasing sequences
        resetColorAndDataBoard();   // set map color and show databoard's data according to sorted data

        // set map color and show databoard's data
        function resetColorAndDataBoard(){

            // if data less than ot equal to 0, add a offset to all data to make sure them are positive
            var maxData = dataSort[dataSort.length - 1],
                minData = dataSort[0],
                i = 0;
            while(minData <= 0){
                minData = dataSort[++i];
            }

            var offset = minData <= 0 ? (-minData + 1) : 0,
                max = maxData + offset,
                min = minData + offset,
                inner = "",
                tmpName,
                cls;

            // calculate color according data, maximum and minimum
            function calcColor(data) {
                var d,
                    color;

                // d value is exponential based on data, max = 150, min = 0. it make sure higher contrast in small value.
                d = parseInt( 150 - 150 * (Math.log(data / min) / Math.log(max / min)));
                if(data <= 0){
                    color = "#CCCCCC";
                } else {
                    color = "#" + toDoubleDigit( d.toString(16) ) + (d+100).toString(16) + (d+50).toString(16);
                    // color = "#" + (d+100).toString(16) + (d+50).toString(16)+ toDoubleDigit( d.toString(16) ) ;
                }

                // return different lightness color of starbucks green(#006633)
                return color;
            }

            //set map color and databoard's data
            for(var i = dataSort.length - 1; i >= 0; i--){
                while(dataMapCls[ dataSort[i] ].length > 0){
                    tmpName = dataMapCls[ dataSort[i] ].pop();
                    svgDoc.getElementsByClassName(tmpName)[0].setAttribute("fill",
                           calcColor(PROVINCES[tmpName].data + offset));
                    cls = "<p>" + PROVINCES[tmpName].chinese + "</p><input type='text' value=" +
                          PROVINCES[tmpName].data + " data-provinces=" + tmpName + "><br>";
                    inner += cls;
                }
            }
            document.getElementsByClassName("dataBoard")[0].innerHTML = inner;
        }

    }

    // button inner function
    function changeBtnStyle(obj, type){
        var clsName = obj.className,
            clickedBtn = document.getElementsByClassName("clicked"),
            clickedName;

        removeText();
        if(clsName.indexOf("clicked") > -1){
            obj.className = clsName.slice(0, clsName.indexOf("clicked") - 1);
        }else{

            // innit all button's styles to unclicked
            while(clickedBtn.length > 0){
                clickedName = clickedBtn[0].className;
                clickedBtn[0].className = clickedName.slice(0, clickedName.indexOf("clicked") - 1);
            }
            showDataOnMap(type);
            obj.className += " clicked";
        }
    }

    // show names or data on map, type include chinese(provinces' chinese name) and data
    function showDataOnMap(type){
        var states = svgDoc.getElementsByClassName("state"),
            len = states.length,
            i = 0,
            size,
            ts,
            clsName;

        for(i=0; i<len; i++){
            size = states[i].getBoundingClientRect();   //
            ts = states[i].getAttribute("class");
            clsName = ts.split(" ")[1];

            // fine adjust position of deflected text
            switch (clsName){
                case "neimenggu":
                    createText(size.left, size.top + 40, size.width, size.height, PROVINCES[clsName][type]);
                    break;

                case "xianggang":
                    createText(size.left + 10, size.top + 5, size.width, size.height, PROVINCES[clsName][type]);
                    break;

                case "guangdong":
                    createText(size.left, size.top - 10, size.width, size.height, PROVINCES[clsName][type]);
                    break;

                case "aomen":
                    createText(size.left - 12, size.top + 10, size.width, size.height,PROVINCES[clsName][type]);
                    break;

                case "hebei":
                    createText(size.left - 15, size.top + 10, size.width, size.height, PROVINCES[clsName][type]);
                    break;

                case "beijing":
                    createText(size.left - 12, size.top, size.width, size.height, PROVINCES[clsName][type]);
                    break;

                case "tianjin":
                    createText(size.left + 5, size.top, size.width, size.height, PROVINCES[clsName][type]);
                    break;

                case "gansu":
                    createText(size.left + 30, size.top + 30, size.width, size.height, PROVINCES[clsName][type]);
                    break;

                case "jiangxi":
                    createText(size.left - 10, size.top, size.width, size.height, PROVINCES[clsName][type]);
                    break;

                case "shanxi":
                    createText(size.left - 5, size.top, size.width, size.height, PROVINCES[clsName][type]);
                    break;

                case "shanxiHZ":
                    createText(size.left, size.top + 20, size.width, size.height, PROVINCES[clsName][type]);
                    break;

                default:
                    createText(size.left, size.top, size.width, size.height, PROVINCES[clsName][type]);
            }

        }
    }

    // remove all of text in Svg document
    function removeText(){
        var text = svgDoc.getElementsByClassName("text"),
            len = text.length,
            i = 0;
        for(i=0; i<len; i++) {
            svgRoot.removeChild(text[0]);
        }
    }

    // create a text nearby center of polygon
    function createText(x ,y ,w, h, s){
        var node = svgDoc.createElementNS(SVG_NS, "text");
        node.setAttribute("x",x + w / 2 - 6);
        node.setAttribute("y",y + h / 2 + 6);
        node.setAttribute("class", "text");
        //node.setAttribute("style","fill:red;");
        node.textContent = s;   // set inner text
        svgRoot.appendChild(node);
    }
}

// convert single digit number to double digits
function toDoubleDigit( num ){
    var d = num;

    if(num.length === 1){
        d = "0" + num;
    }
    return d;
}

// merging sorting interface
function mergeSort(arr, lh ,rh){
    var center;
    if( lh < rh){
        center = parseInt(lh / 2 + rh / 2);
        mergeSort(arr, lh, center);
        mergeSort(arr, center + 1, rh);
        merge(arr, lh, rh);
    }
}

// merging sorting inner function
function merge(arr, lhSta, rhEnd){
    var center = Math.floor(lhSta / 2 + rhEnd / 2);
    lhEnd = center;
    rhSta = center + 1;
    tmpArr = [];

    while(lhSta <= lhEnd && rhSta <= rhEnd ){
        if(arr[lhSta] <= arr[rhSta] ){
            tmpArr.push( arr[lhSta++] )
        }else{
            tmpArr.push( arr[rhSta++ ])
        }
    }
    while(lhSta <= lhEnd){
        tmpArr.push( arr[lhSta++] );
    }
    while(rhSta <= rhEnd){
        tmpArr.push( arr[rhSta++] )
    }
    for(var i = tmpArr.length - 1; i >= 0 ; i--){
        arr[ rhEnd-- ] = tmpArr[i];
    }
}