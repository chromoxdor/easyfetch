
var firstRun = true;
var wasUsed;
var whichSl;
var sliderAmount;
var bigLength = 0;
var isLongNode;
var lutton;
var jsonPath;
var nodeNr;
var nodeIp;
var nodePath;
var nodePath2;
var unitNr;
var unitNr1;
var nodeInterV;
var InputInterV;
var isOpen;
var myParam;
var urlParams;
var hasParams = true;
var dataT = [];
var dataT2 = [];
var isittime = 1;
var NrofSlides = 0;
var currVal;
var html;
async function fetchJson(event) {
    urlParams = new URLSearchParams(window.location.search);
    myParam = urlParams.get('unit');
    if (myParam == null) { hasParams = false; }
    someoneEn = 0;
    onceNoTask = 0;
    if (!jsonPath) { jsonPath = `http://esp-easy.us/json`; }
    if (isittime) {
        response = await fetch(jsonPath);
        myJson = await response.json();
        dataT = [];
        let i = -1;
        unit = myJson.WiFi.Hostname;
        unitNr = myJson.System['Unit Number'];
        sysInfo = myJson.System
        let syshtml = ('<div class="syspair"><div>Sysinfo</div><div>' + unit + '</div></div>' +
            '<div class="syspair"><div>Local Time:</div><div>' + sysInfo['Local Time'] + '</div></div>' +
            '<div class="syspair"><div>Uptime:</div><div>' + minutesToDhm(sysInfo['Uptime']) + '</div></div>' +
            '<div class="syspair"><div>Load:</div><div>' + sysInfo['Load'] + '%</div></div>' +
            '<div class="syspair"><div>Free Ram:</div><div>' + sysInfo['Free RAM'] + '</div></div>' +
            '<div class="syspair"><div>Free Stack:</div><div>' + sysInfo['Free Stack'] + '</div></div>' +
            '<div class="syspair"><div>IP Address:</div><div>' + myJson.WiFi['IP Address'] + '</div></div>' +
            '<div class="syspair"><div>RSSI:</div><div>' + myJson.WiFi['RSSI'] + ' dBm</div></div>')
        html = '';
        let html2 = '';
        let html3 = '';
        var jsonT = myJson.System['Local Time'];
        var clockBig = jsonT.split(" ")[1];
        clockBig = clockBig.split(':');
        clockBig.pop();
        clockBig = clockBig.join(':');
        var dateBig = jsonT.split(" ")[0];
        dateD = dateBig.split('-')[2];
        dateM = dateBig.split('-')[1];
        dateY = dateBig.split('-')[0];

        nodeInfos = myJson.nodes;
        if (!myJson.Sensors.length) {
            html += '<div class="sensorset clickables"><div  class="sensors" style="font-weight:bold;">no tasks configured...</div>';
        }
        else {
            myJson.Sensors.forEach(sensor => {
                utton = sensor.TaskName;
                let htmlStatic1 = ' sensorset clickables" onclick="';
                let htmlStatic2 = '<div  class="sensors" style="font-weight:bold;">' + sensor.TaskName + '</div>'
                if (sensor.TaskEnabled === "true" && sensor.TaskValues && !sensor.TaskName.includes("XX") && !sensor.Type.includes("Display") && !hasParams) {
                    someoneEn = 1;
                    firstItem = true;
                    sensor.TaskValues.forEach(item => {
                        wasUsed = false;
                        if (item.Name.includes("XX")) { wasUsed = true; }
                        if (item.Value == "nan") { item.Value = 0; item.NrDecimals = 0; }
                        if (typeof item.Value == 'number') {
                            num2Value = item.Value.toFixed(item.NrDecimals);
                        }
                        else { num2Value = item.Value; }
                        item.Name = item.Name.toString();
                        itemSl = item.Name;
                        itemA = item.Name;
                        itemN = itemA.split("?")[0];
                        kindN = itemA.split("?")[1];
                        if (!kindN) { kindN = ""; }
                        if (kindN == "H") { kindN = "%"; }
                        slMax = 1023;
                        slMin = 0;
                        slStep = 1;
                        whichSl = 0;
                        //thingspeak check
                        if ((itemA.match(/\&/g) || []).length >= 2) {
                            i++;
                            if (dataT2.length === 0) { itemTSName = 0; }
                            else { itemTSName = dataT2[i]; }
                            isTspeak = true;
                            itemN = itemA.split("&")[0];
                            chanN = itemA.split("&")[1];
                            fieldN = itemA.split("&")[2];
                            if (fieldN.includes("?")) { fieldN = fieldN.split("?")[0]; }
                            dataT.push([chanN, fieldN, item.NrDecimals, i]);
                        }
                        else { isTspeak = false; }
                        //normal tiles = html; slider = html2; big values = html3
                        //switch---------------------------------------------------------
                        if (sensor.TaskDeviceNumber == 1) {
                            wasUsed = true;
                            if ((item.Name === "btnStateC" && item.Value < 2) || item.Value === 1) { StateClass = "on"; }
                            else if (item.Value === 2) { StateClass = "alert"; }
                            else { StateClass = "off"; }
                            if (sensor.TaskDeviceGPIO1 && item.Name.includes("State")) {
                                if (item.Name === "iState") (item.Value = item.Value == 1 ? 0 : 1)
                                utton = sensor.TaskName + "?" + sensor.TaskDeviceGPIO1;
                                html += '<div class="btnTile ' + StateClass + htmlStatic1 + 'buttonClick(\'' + utton + '\', \'' + item.Value + '\')">' + htmlStatic2;
                            }
                            else if (sensor.TaskDeviceGPIO1 && item.Name === "ledState") {
                                html2 += '<div class="sensorset"><input type="range" min="' + slMin + '" max="' + slMax + '"  step="' + slStep + '" value="' + num2Value + '" id="' + sensor.TaskName + '"class="slider ' + sensor.TaskNumber + ',' + item.ValueNumber;
                                html2 += ' noVal"><div  class="sensors" style="align-items: flex-end;"><div style="font-weight:bold;">' + sensor.TaskName + '</div></div></div>';
                            }
                            else if (itemN === "btnState") {
                                if (kindN) { utton = sensor.TaskName + "?" + kindN }
                                html += '<div class="btnTile ' + StateClass + htmlStatic1 + 'buttonClick(\'' + utton + '\', \'' + item.Value + '\')">' + htmlStatic2;
                            }
                            else { wasUsed = false; }
                        }
                        //dummy---------------------------------------------------------
                        if (sensor.TaskDeviceNumber == 33 && !["noVal", "XX"].some(v => (item.Name).includes(v))) {
                            wasUsed = true;
                            //virtual buttons
                            if ((sensor.TaskName).includes("dButtons")) {
                                itemNB = itemN.split("&")[0];
                                if ((kindN === "C" && item.Value < 2) || item.Value === 1) { html += '<div class="on'; }
                                else if (item.Value === 2) { html += '<div class="btnTile alert'; }
                                else { html += '<div class="btnTile off '; }
                                if (itemN.split("&")[1] == "A") { html += buttonClick + 'getNodes(\'' + itemNB + '\')"><div  class="sensors nodes" style="font-weight:bold;">' + itemNB + '</div></div>'; }
                                else { html += htmlStatic1 + 'buttonClick(\'' + itemN + '\')"><div id="' + itemN + '" class="sensors" style="font-weight:bold;">' + itemNB + '</div></div>'; }
                            }
                            //number input
                            else if ((sensor.TaskName).includes("vInput")) {
                                if (!itemN) { itemN = "&nbsp;" }
                                html += '<div class="sensorset clickables"><div class="sensors" style="font-weight:bold" onclick="getInput(this.nextElementSibling.firstChild)" >' + itemN + '</div><div class="valWrap btnTile"><input type="number" class="vInputs ' + sensor.TaskNumber + ',' + item.ValueNumber + '" id="' + itemN + '"name="' + utton + '" placeholder="' + num2Value + '" onkeydown="getInput(this)" onclick="waitforInput(this)" max="999999"> <div class="kindInput">' + kindN + '</div></div></div>';
                            }
                            //normal slider
                            else if ((sensor.TaskName).includes("vSlider")) {
                                slName = item.Name;
                                slKind = "";
                                if ((itemSl.match(/\?/g) || []).length >= 3) {
                                    slName = itemSl.split("?")[0];
                                    slMin = itemSl.split("?")[1];
                                    slMax = itemSl.split("?")[2];
                                    slStep = itemSl.split("?")[3];
                                    slKind = itemSl.split("?")[4];
                                }
                                if (!slKind) { slKind = ""; } if (slKind == "H") { slKind = "%"; }
                                html2 += '<div class="sensorset"><input type="range" min="' + slMin + '" max="' + slMax + '"  step="' + slStep + '" value="' + num2Value + '" id="' + item.Name + '"class="slider ' + sensor.TaskNumber + ',' + item.ValueNumber;
                                if ((sensor.TaskName).includes("nvSlider")) { html2 += ' noVal"><div  class="sensors" style="align-items: flex-end;"><div style="font-weight:bold;">' + slName + '</div></div></div>'; }
                                else { html2 += '"><div  class="sensors" style="align-items: flex-end;"><div style="font-weight:bold;">' + slName + '</div><div class="sliderAmount" style="text-align: right;">' + num2Value + slKind + '</div></div></div>'; }
                            }
                            //time slider
                            else if ((sensor.TaskName).includes("tSlider")) {
                                slT1 = item.Value.toFixed(4);
                                slT2 = (slT1 + "").split(".")[1];
                                slT1 = Math.floor(slT1);
                                var hour1 = Math.floor(slT1 / 60);
                                var minute1 = slT1 % 60;
                                const padded1 = minute1.toString().padStart(2, "0");
                                var hour2 = Math.floor(slT2 / 60);
                                var minute2 = slT2 % 60;
                                const padded2 = minute2.toString().padStart(2, "0");
                                let htmlSlider1 = '<div class="slTimeSet"><input class="slTS" type="range" min="0" max="1440" step="5" value="';
                                html2 += '<div id="' + item.Name + '" class="slTimeSetWrap ' + sensor.TaskNumber + ',' + item.ValueNumber + '" style="font-weight:bold;">' + item.Name + htmlSlider1 + slT1 + '" id="' + item.Name + 'L"><span class="slTimeText"> <span class="hAmount">' + hour1 + '</span><span>:</span><span class="mAmount">' + padded1 + '</span><span>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> </span></div>' + htmlSlider1 + slT2 + '" id="' + item.Name + 'R"><span class="slTimeText"> <span class="hAmount">' + hour2 + '</span><span>:</span><span class="mAmount">' + padded2 + '</span></span></div></div>';
                            }
                            else { wasUsed = false; }
                        }
                        //handle tile hiding of dummy tiles
                        if (["dButtons", "vInput", "tSlider", "vSlider"].some(v => (sensor.TaskName).includes(v))) {
                            if (item.Name.includes("noValAuto")) {
                                if (window.innerWidth >= 450) {
                                    html += '<div class="sensorset"><div>&nbsp;</div><div</div></div>';
                                }
                            }
                            else if (item.Name.includes("noVal")) { html += '<div class="sensorset"><div>&nbsp;</div><div</div></div>'; }
                            wasUsed = true;
                        }
                        //big values---------------------------------------------------------
                        if ((sensor.TaskName).includes("bigVal")) {
                            let htmlBig1 = `<div class="valuesBig" style="font-weight:bold;text-align:left;">`;
                            if (firstItem == true) {
                                html3 += '<div class="bigNum">';
                                if (bigLength < sensor.TaskValues.length) { bigLength = sensor.TaskValues.length };
                            }
                            if (!(item.Name).includes("XX")) {
                                if ((sensor.TaskName).includes("bigValC")) {
                                    if (sensor.TaskValues.length === 3 && !(sensor.TaskValues).some(item => item.Name === 'XX')) { html3 += '<div class="bigNumWrap bigC bigSpan">'; }
                                    else { html3 += '<div class="bigNumWrap bigC">'; }
                                }
                                else {
                                    if (sensor.TaskValues.length === 3 && !(sensor.TaskValues).some(item => item.Name === 'XX')) { html3 += '<div class="bigNumWrap bigSpan">'; }
                                    else { html3 += '<div class="bigNumWrap">'; }
                                }

                                if (["Clock", "Uhr", "Zeit", "Time"].some(v => (item.Name).includes(v))) { //(item.Name).toLowerCase().includes(v)
                                    html3 += htmlBig1 + item.Name + '</div><div id="clock" class="valueBig">' + clockBig + '</div></div>';
                                }
                                else if ((item.Name).toLowerCase().includes("datum")) {
                                    html3 += htmlBig1 + item.Name + '</div><div id="date" class="valueBig">' + dateD + '.' + dateM.toString() + '</div></div>';
                                }
                                else if ((item.Name).toLowerCase().includes("date")) {
                                    html3 += htmlBig1 + item.Name + '</div><div id="date" class="valueBig">' + dateM + '-' + dateD.toString() + '</div></div>';
                                }
                                else if (["year", "jahr"].some(v => (item.Name).toLowerCase().includes(v))) {
                                    html3 += htmlBig1 + item.Name + '</div><div id="year" class="valueBig">' + dateY + '</div></div>';
                                }
                                else if (item.Name.includes("noVal")) { html3 += htmlBig1 + '</div><div class="valueBig"></span></div></div>'; }
                                else {
                                    if (isTspeak) { html3 += htmlBig1 + itemN + '</div><div id="' + itemN + 'TS" class="valueBig">' + itemTSName + '<span style="background:none;padding-right: 1%;">' + kindN + '</span></div></div>'; }
                                    else { html3 += htmlBig1 + itemN + '</div><div class="valueBig">' + num2Value + '<span style="background:none;padding-right: 1%;">' + kindN + '</span></div></div>'; }
                                }
                            }
                            wasUsed = true;
                        }
                        // if all items with a specific delaration processed do the rest---------------------------------------------------------
                        if (!wasUsed) {
                            if (firstItem == true) { html += '<div class="' + htmlStatic1 + 'buttonClick(\'' + utton + '\')">' + htmlStatic2; }
                            if (isTspeak) { html += '<div class="values thingspeak"><div>' + itemN + '</div><div id="' + itemN + 'TS">' + itemTSName + kindN + '</div></div>'; }
                            else if (item.Name.includes("noVal")) { html += '<div class="values therest"><div>&nbsp;</div><div></div></div>'; }
                            else if (sensor.TaskDeviceNumber == 81) { html += '<div class="cron"><div>' + itemN + '</div><div style="font-size: 10pt;">' + item.Value + '</div></div>'; }
                            else { html += '<div class="values therest"><div>' + itemN + '</div><div>' + num2Value + kindN + '</div></div>'; }
                        }
                        firstItem = false;
                    });
                    html += '</div>';
                    html3 += '</div>';
                }
                else if (sensor.TaskEnabled === "true" && !sensor.TaskName.includes("XX") && !sensor.Type.includes("Display") && !hasParams) { html += '<div  class="sensorset clickables" onclick="buttonClick(\'' + utton + '\')"><div class="sensors" style="font-weight:bold;">' + sensor.TaskName + '</div><div></div><div></div></div>'; someoneEn = 1; document.getElementById('sensorList').innerHTML = html; }
            });
            if (!someoneEn && !hasParams) {
                html += '<div class="sensorset clickables" onclick="splitOn(); topF()"> <div class="sensors" style="font-weight:bold;">no tasks enabled or visible...</div>';
            }
        }
        document.getElementById('sysInfo').innerHTML = syshtml;
        document.getElementById('sensorList').innerHTML = html;
        document.getElementById('sliderList').innerHTML = html2;
        document.getElementById('bigNumber').innerHTML = html3;

        if (firstRun) {
            //setInterval(fetchJson, 2000);
            setInterval(getTS, 10000);
            getTS();
            getNodes();
            unitNr1 = myJson.System['Unit Number'];
            nodePath2 = 'http://' + myJson.WiFi['IP Address'] + '/devices';
            nodePath = 'http://' + myJson.WiFi['IP Address'] + '/tools';
            firstRun = false;
        }
        if (unitNr === unitNr1) { styleU = "&#8857;"; }
        else { styleU = ""; }
        document.getElementById('unitId').innerHTML = styleU + unit + '<span class="numberUnit"> (' + myJson.WiFi.RSSI + ')</span>';
        document.getElementById('unitT').innerHTML = styleU + unit;
        paramS();
        changeCss();
        resizeText();
        longPressB();
        longPressN();
        if (event) { dataT2 = []; getTS(); }
    }
}
async function getTS() {
    if (dataT) {
        for (Array of dataT) {
            responseTS = await fetch('https://api.thingspeak.com/channels/' + Array[0] + '/fields/' + Array[1] + '/last')
            myTS = await responseTS.json();
            if (responseTS.ok) { dataT2[Array[3]] = myTS.toFixed(Array[2]); }
            else { dataT2.push('error'); }
        }
    }
}
function getUrl(url) { fetch(url) }
function changeCss() {
    var numSl = document.querySelectorAll('input[type=range]').length;
    if (!numSl) { document.getElementById("allList").classList.add('allExtra'); }
    else { document.getElementById("allList").classList.remove('allExtra'); }
    var list3 = document.querySelectorAll(".bigNum");
    var numBigger = document.getElementsByClassName('bigNum').length;
    var numBig = document.getElementsByClassName('valuesBig').length;
    var element = document.getElementById("sensorList");
    var numSet = element.getElementsByClassName('sensorset').length;
    if (bigLength === 1 || (!numBigger && numSet < 2)) {
        document.getElementById("sensorList").classList.add('sensorL1');
        document.getElementById("sensorList").classList.remove('sensorL2', 'sensorL3', 'sensorL4');
        if (list3.length) { for (var i = 0; i < list3.length; ++i) { list3[i].classList.add('bigNumOne'); } }
        coloumnSet = 1;
    }
    else if (bigLength === 2 || (!numBigger && numSet < 5 && numSet > 1)) {
        document.getElementById("sensorList").classList.remove('sensorL1', 'sensorL3', 'sensorL4');
        document.getElementById("sensorList").classList.add('sensorL2');
        coloumnSet = 2;
    }
    else if (bigLength === 3 || (!numBigger && numSet < 10 && numSet > 4)) {
        document.getElementById("sensorList").classList.remove('sensorL1', 'sensorL2', 'sensorL4');
        document.getElementById("sensorList").classList.add('sensorL3');
        coloumnSet = 3;
    }
    else if (bigLength === 4 || (!numBigger && numSet > 9)) {
        document.getElementById("sensorList").classList.remove('sensorL1', 'sensorL2', 'sensorL3');
        document.getElementById("sensorList").classList.add('sensorL4');
        coloumnSet = 4;
    }
    else {
        document.getElementById("sensorList").classList.remove('sensorL1', 'sensorL3', 'sensorL4');
        document.getElementById("sensorList").classList.add('sensorL2');
        coloumnSet = 2;
    }
    if (bigLength > 1) {
        if (list3.length) { for (var i = 0; i < list3.length; ++i) { list3[i].classList.remove('bigNumOne'); } }
    }
    //calculate and add extra tiles
    if (window.innerWidth < 450) { if (bigLength === 1 && !numBigger || bigLength === 0 && numSet === 1) { coloumnSet = 1 } else { coloumnSet = 2 } };
    console.log(coloumnSet);
    if (numSet % coloumnSet != 0) {
        calcTile = coloumnSet - (numSet - coloumnSet * Math.floor(numSet / coloumnSet));
        for (let i = 1; i <= calcTile; i++) {
            html += '<div class="sensorset"><div>&nbsp;</div><div</div></div>'
        }

    }
    document.getElementById('sensorList').innerHTML = html;
    var list;
    var list2;
    if (numSl && (bigLength < 3 && numSet < 5)) {
        list = document.querySelectorAll(".slTS");
        list2 = document.querySelectorAll(".slider");
        for (var i = 0; i < list.length; ++i) {
            list[i].classList.add('slTSsmall');
        }
        for (var i = 0; i < list2.length; ++i) {
            list2[i].classList.add('slidersmall');
        }
    }
    else {
        list = document.querySelectorAll(".slTS");
        list2 = document.querySelectorAll(".slider");
        for (var i = 0; i < list.length; ++i) {
            list[i].classList.remove('slTSsmall');
        }
        for (var i = 0; i < list2.length; ++i) {
            list2[i].classList.remove('slidersmall');
        }
    }
    bigLength = 0;
}
function paramS() {
    var sliders = document.querySelectorAll(".slTS");
    sliders.forEach(slider => {
        slider.addEventListener("input", updateSlTS);
        slider.addEventListener('change', sliderChTS);
    });
    var sliders = document.querySelectorAll(".slider");
    sliders.forEach(slider => {
        slider.addEventListener('input', updateSlider);
        slider.addEventListener('change', sliderChange);
    });
}
function updateSlTS(event) {
    isittime = 0;
    slider = event.target;
    const amount = slider.closest(".slTimeSet").querySelector(".hAmount");
    const amount2 = slider.closest(".slTimeSet").querySelector(".mAmount");
    var hours = Math.floor(slider.value / 60);
    var minutes = slider.value % 60;
    const padded = minutes.toString().padStart(2, "0");
    amount.textContent = hours;
    amount2.textContent = padded;
}
function updateSlider(event) {
    NrofSlides++;
    isittime = 0;
    slider = event.target;
    currVal = slider.attributes.value.nodeValue;
    const amount = slider.closest('div.sensorset').querySelector('.sliderAmount');
    slKind = slider.id.split("?")[4];
    if (!slKind) { slKind = ""; } if (slKind == "H") { slKind = "%"; }
    if (!slider.className.includes("noVal")) {
        sliderAmount = Number(event.target.value).toFixed(undefined !== event.target.step.split('.')[1] && event.target.step.split('.')[1].length) + slKind;
        amount.textContent = sliderAmount;
    }
}
function sliderChTS(event) {
    slider = event.target;
    const slTName = slider.parentNode.parentNode;
    if (slider.id == slTName.id + "L") { var secVal = document.getElementById(slTName.id + "R"); }
    else { var secVal = document.getElementById(slTName.id + "L"); }
    if (unitNr === unitNr1) { if (slider.id == slTName.id + "L") { getUrl('control?cmd=taskvalueset,' + slTName.classList[1] + ',' + event.target.value + '.' + secVal.value.toString().padStart(4, "0")); } else { getUrl('control?cmd=taskvalueset,' + slTName.classList[1] + ',' + secVal.value + '.' + event.target.value.toString().padStart(4, "0")); }; getUrl('control?cmd=event,' + slTName.classList[1]) }
    else { if (slider.id == slTName.id + "L") { getUrl('control?cmd=SendTo,' + nodeNr + ',"taskvalueset,' + slTName.classList[1] + ',' + event.target.value + '.' + secVal.value.toString().padStart(4, "0") + '"'); } else { getUrl('control?cmd=SendTo,' + nodeNr + ',"taskvalueset,' + slTName.classList[1] + ',' + secVal.value + '.' + event.target.value.toString().padStart(4, "0") + '"'); }; getUrl('control?cmd=SendTo,' + nodeNr + ',"event,' + slTName.classList[1] + '"') }
    isittime = 1;
    setTimeout(fetchJson, 400);
}
function sliderChange(event) {
    slider = event.target;
    maxVal = slider.attributes.max.nodeValue;
    minVal = slider.attributes.min.nodeValue;
    OnOff = "";
    parseFloat(event.target.value).toFixed(undefined !== event.target.step.split('.')[1] && event.target.step.split('.')[1].length);
    sliderAmount = event.target.value;
    if (NrofSlides == 1) {
        if (sliderAmount > maxVal * 5 / 6 && currVal !== maxVal) { sliderAmount = maxVal; OnOff = ",1"; }
        if (sliderAmount < maxVal / 6 && currVal !== minVal) { sliderAmount = minVal; OnOff = ",0"; }
    }
    if ((slider.id.match(/\?/g) || []).length >= 3) { sliderId = slider.id.split("?")[0]; } else { sliderId = slider.id; }
    if (unitNr === unitNr1) { fetch('control?cmd=taskvalueset,' + slider.classList[1] + ',' + sliderAmount); fetch('control?cmd=event,' + sliderId + '=' + sliderAmount + OnOff); }
    else { fetch('control?cmd=SendTo,' + nodeNr + ',"taskvalueset,' + slider.classList[1] + ',' + sliderAmount + '"'); fetch('control?cmd=SendTo,' + nodeNr + ',"event,' + sliderId + '=' + sliderAmount + OnOff + '"'); }
    isittime = 1;
    NrofSlides = 0;
    setTimeout(fetchJson, 400);
}
function buttonClick(utton, gState) {
    if (utton.split("&")[1]) {
        utton2 = utton.split("&")[0];
        nodeNr2 = utton.split("&")[1];
        fetch('control?cmd=SendTo,' + nodeNr2 + ',"event,' + utton2 + 'Event"');
    }
    if (utton.split("?")[1]) {
        gpioNr = utton.split("?")[1];
        gS = gState == 1 ? 0 : 1
        if (unitNr === unitNr1) { getUrl('control?cmd=gpio,' + gpioNr + ',' + gS); }
        else { fetch('control?cmd=SendTo,' + nodeNr + ',"gpio,' + gpioNr + ',' + gS + '"'); }
    }
    else {
        if (unitNr === unitNr1) { getUrl('control?cmd=event,' + utton + 'Event'); }
        else { fetch('control?cmd=SendTo,' + nodeNr + ',"event,' + utton + 'Event"'); }
    }
    setTimeout(fetchJson, 400);
}
function waitforInput(inputNum) {
    isittime = 0;
    InputInterV = setTimeout(blurInput, 8000);
    clearTimeout(InputInterV);
    inputNum.addEventListener('blur', (event) => {
        clearTimeout(InputInterV)
        isittime = 1;
        setTimeout(fetchJson, 400);
    });
}

function getInput(ele) {
    console.log(event, ele.value)
    if (ele.value.length > 12) {
        ele.value = ele.value.slice(0, 12);
    }
    if ((event.key === 'Enter' || event.type === 'click')) {
        if (ele.value) {
            if (unitNr === unitNr1) { getUrl('control?cmd=taskvalueset,' + ele.classList[1] + ',' + ele.value); }
            else { fetch('control?cmd=SendTo,' + nodeNr + ',"taskvalueset,' + ele.classList[1] + ',' + ele.value + '"'); }
            buttonClick(ele.id);
        }
            clearTimeout(InputInterV);
            isittime = 1;
        
    }
    else if (event.key === 'Escape') { document.getElementById(ele.id).value = ""; }
    else { clearTimeout(InputInterV); InputInterV = setTimeout(blurInput, 5000); }
}
function blurInput() {
    isittime = 1;
}
function openNav() {
    if (nodeInterV) { clearInterval(nodeInterV); }
    nodeInterV = setInterval(getNodes, 10000);
    if (document.getElementById('mySidenav').offsetWidth === 0) {
        document.getElementById("mySidenav").style.width = "280px";
        document.getElementById("menueList").style.color = "white";
        document.getElementById("sysInfo").style.opacity = "1";
    } else { closeNav(); }
}
function closeNav() {
    clearInterval(nodeInterV);
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("menueList").style.color = "transparent";
    document.getElementById("sysInfo").style.opacity = "0";
}

function openSys() {
    if (document.getElementById('sysInfo').offsetHeight === 0) {
        document.getElementById('menueWrap1').style.flexShrink = "0";
        document.getElementById('sysInfo').style.height = "160px";
    } else {
        document.getElementById('sysInfo').style.height = "0";
        document.getElementById('menueWrap1').style.flexShrink = "999";
    }
}
async function getNodes(utton) {
    response = await fetch("json");
    myJson = await response.json();
    let html4 = '';
    nodeInfos = myJson.nodes;
    let i = -1;
    myJson.nodes.forEach(node => {
        i++
        if (node.nr == myParam) { if (hasParams) { nodeChange(i); hasParams = false; } }
        if (node.nr === unitNr1) { styleN = "&#8857;"; } else { styleN = ""; }
        if (node.nr === unitNr) { styleSel = 'style="color:gray";' } else { styleSel = ""; }
        html4 += '<div class="menueItem"><div class="serverUnit">' + styleN + '</div><div id="' + node.name + '" class="nc"' + styleSel + 'onclick="getNodes(); sendUpdate(); nodeChange(' + i + ');iFr();">' + node.name + '<span class="numberUnit">' + node.nr + '</span></div></div>';
        if (utton || isLongNode) {
            if (isLongNode) {
                if (node.nr === unitNr1) { getUrl('control?cmd=event,' + lutton + 'Long'); }
                else { getUrl('/control?cmd=SendTo,' + node.nr + ',"event,' + lutton + 'Long"'); }
            }
            else {
                if (node.nr === unitNr1) { getUrl('control?cmd=event,' + utton + 'Event'); }
                else { getUrl('/control?cmd=SendTo,' + node.nr + ',"event,' + utton + 'Event"'); }
            }
        }
    })
    i = 0
    document.getElementById('menueList').innerHTML = html4;
    isLongNode = 0;
    if (hasParams) {
        let html = '<div class="' + htmlStatic1 + '"><div  class="sensors" style="font-weight:bold;">can not find node # ' + myParam + '...</div>';
        document.getElementById('sensorList').innerHTML = html;
        changeCss()
        hasParams = false;
        setTimeout(fetchJson, 3000);
    }
    else { if (!nodeInterV) { setTimeout(fetchJson, 100); } }

}
function sendUpdate() {
    setTimeout(getNodes, 400);
}
function nodeChange(event) {
    nodeInfos = nodeInfos[event];
    if (nodeInfos) {
        nodeNr = nodeInfos.nr;
        nodePath = `http://${nodeInfos.ip}/tools`;
        nodePath2 = `http://${nodeInfos.ip}/devices`;
        jsonPath = `http://${nodeInfos.ip}/json`;
        window.history.replaceState(null, null, '?unit=' + nodeNr);
        fetchJson(1);
    }
    if (window.innerWidth < 1023 && document.getElementById('sysInfo').offsetHeight === 0) { closeNav(); }
}
function resizeText() {
    const isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => (scrollWidth > clientWidth) || (scrollHeight > clientHeight)
    const resizeText = ({ element, elements, minSize = 10, maxSize = 115, step = 1, unit = 'pt' }) => {
        (elements || [element]).forEach(el => {
            let i = minSize
            let overflow = false
            const parent = el.parentNode
            while (!overflow && i < maxSize) {
                el.style.fontSize = `${i}${unit}`
                overflow = isOverflown(parent)
                if (!overflow) i += step
            }
            el.style.fontSize = `${i - step}${unit}`
            el.style.lineHeight = "0.75"
        })
    }
    resizeText({ elements: document.querySelectorAll('.valueBig'), step: 1 })
}
function launchFs(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
function splitOn() {
    if (document.getElementById('framie').offsetWidth === 0) { isOpen = 1; iFr(isOpen); document.getElementById('framie').style.width = "100%"; }
    else { document.getElementById('framie').style.width = "0"; document.getElementById('framie').innerHTML = ""; isOpen = 0; }
    setTimeout(fetchJson, 100);
}
function iFr() { if (isOpen === 1) { document.getElementById('framie').innerHTML = '<iframe src="' + nodePath2 + '"></iframe>'; closeNav(); } }
function topF() { document.body.scrollTop = 0; document.documentElement.scrollTop = 0; }
function longPressN() { document.getElementById('mOpen').addEventListener('long-press', function (e) { window.location.href = nodePath; }); }
function longPressB() {
    var executed = false;
    const longButtons = document.querySelectorAll(".sensorset");
    longButtons.forEach(longButton => {
        longButton.addEventListener('long-press', function (e) {
            const lBName = longButton.querySelector(".sensors");
            const lBNode = longButton.querySelector(".nodes");
            if (lBNode) {
                lutton = lBNode.textContent;
                isLongNode = 1;
                getNodes();
            }
            else {
                if ((lBName.id).split("&")[1]) {
                    utton2 = (lBName.id).split("&")[0];
                    nodeNr2 = (lBName.id).split("&")[1];
                    fetch('control?cmd=SendTo,' + nodeNr2 + ',"event,' + utton2 + 'Long"');
                    isittime = 1;
                    setTimeout(fetchJson, 400);
                } else {
                    if (unitNr === unitNr1 && !executed) { getUrl('control?cmd=event,' + lBName.textContent + 'Long'); executed = true; }
                    else { getUrl('control?cmd=SendTo,' + nodeNr + ',"event,' + lBName.textContent + 'Long"', true); }
                    isittime = 1;
                    setTimeout(fetchJson, 400);
                }
            }
        });
    });
}
function minutesToDhm(minutes) {
    var d = Math.floor(minutes / (60 * 24));
    var h = Math.floor(minutes % (60 * 24) / 60);
    var m = Math.floor(minutes % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    return dDisplay + hDisplay + mDisplay;
}
!function (e, t) { "use strict"; var n = null, a = "PointerEvent" in e || e.navigator && "msPointerEnabled" in e.navigator, i = "ontouchstart" in e || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, o = a ? "pointerdown" : i ? "touchstart" : "mousedown", r = a ? "pointerup" : i ? "touchend" : "mouseup", m = a ? "pointermove" : i ? "touchmove" : "mousemove", u = 0, s = 0, c = 10, l = 10; function v(e) { f(), e = function (e) { if (void 0 !== e.changedTouches) return e.changedTouches[0]; return e }(e), this.dispatchEvent(new CustomEvent("long-press", { bubbles: !0, cancelable: !0, detail: { clientX: e.clientX, clientY: e.clientY }, clientX: e.clientX, clientY: e.clientY, offsetX: e.offsetX, offsetY: e.offsetY, pageX: e.pageX, pageY: e.pageY, screenX: e.screenX, screenY: e.screenY })) || t.addEventListener("click", function e(n) { t.removeEventListener("click", e, !0), function (e) { e.stopImmediatePropagation(), e.preventDefault(), e.stopPropagation() }(n) }, !0) } function d(a) { f(a); var i = a.target, o = parseInt(function (e, n, a) { for (; e && e !== t.documentElement;) { var i = e.getAttribute(n); if (i) return i; e = e.parentNode } return a }(i, "data-long-press-delay", "600"), 10); n = function (t, n) { if (!(e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame && e.mozCancelRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame)) return e.setTimeout(t, n); var a = (new Date).getTime(), i = {}, o = function () { (new Date).getTime() - a >= n ? t.call() : i.value = requestAnimFrame(o) }; return i.value = requestAnimFrame(o), i }(v.bind(i, a), o) } function f(t) { var a; (a = n) && (e.cancelAnimationFrame ? e.cancelAnimationFrame(a.value) : e.webkitCancelAnimationFrame ? e.webkitCancelAnimationFrame(a.value) : e.webkitCancelRequestAnimationFrame ? e.webkitCancelRequestAnimationFrame(a.value) : e.mozCancelRequestAnimationFrame ? e.mozCancelRequestAnimationFrame(a.value) : e.oCancelRequestAnimationFrame ? e.oCancelRequestAnimationFrame(a.value) : e.msCancelRequestAnimationFrame ? e.msCancelRequestAnimationFrame(a.value) : clearTimeout(a)), n = null } "function" != typeof e.CustomEvent && (e.CustomEvent = function (e, n) { n = n || { bubbles: !1, cancelable: !1, detail: void 0 }; var a = t.createEvent("CustomEvent"); return a.initCustomEvent(e, n.bubbles, n.cancelable, n.detail), a }, e.CustomEvent.prototype = e.Event.prototype), e.requestAnimFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (t) { e.setTimeout(t, 1e3 / 60) }, t.addEventListener(r, f, !0), t.addEventListener(m, function (e) { var t = Math.abs(u - e.clientX), n = Math.abs(s - e.clientY); (t >= c || n >= l) && f() }, !0), t.addEventListener("wheel", f, !0), t.addEventListener("scroll", f, !0), t.addEventListener(o, function (e) { u = e.clientX, s = e.clientY, d(e) }, !0) }(window, document);
