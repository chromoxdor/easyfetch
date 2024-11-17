var firstRun = 1;
//var wasUsed;
//var slA; //sliderAmount
var bigLength = 0;
var jsonPath;
var nNr; //nodeNr
var nP; //nodePath
var nP2;
var nN; //nodeName
var unitNr;
var unitNr1;
var fJ; //fetchJson interval
var nIV; //nodeinterval
var iIV; //InputInterV
var navOpen;
var myParam;
var hasParams = 1;
var isittime = 1;
var NrofSlides = 0;
var currVal;
var html;
var tsX = 0; //startx
var teX = 0; //endx
var tsY = 0;
var teY = 0;
var msTs = 0; //start time
var msTe = 0;
var manNav;
var gesVal;
var iO;


//##############################################################################################################
//      FETCH AND MAKE TILES
//##############################################################################################################
async function fetchJson(event) {
    //invert color scheme----------
    try {
        for (Array of document.styleSheets) {
            for (e of Array.cssRules) {
                if (e.conditionText?.includes("prefers-color-scheme")) {
                    if (document.cookie.includes("Col=1")) { e.media.mediaText = "(prefers-color-scheme: light)" }
                    else { e.media.mediaText = "(prefers-color-scheme: dark)" }
                };
            }
        }
    }
    catch (err) {
        //console.log(err); // or just pass/continue/return true/any way of doing nothing
    }
    //-----------------------
    urlParams = new URLSearchParams(window.location.search);
    myParam = urlParams.get('unit');
    if (urlParams.get('cmd') == "reboot") { window.location.href = window.location.origin + "/tools?cmd=reboot" }
    if (myParam == null) { hasParams = 0; }
    someoneEn = 0;
    if (!jsonPath) { jsonPath = `/json`; }
    let nodeCheck = nNr;
    responseTime = Date.now();
    response = await getUrl(jsonPath);
    myJson = await response.json();
    if (isittime) {
        if (nodeCheck === nNr) {
            html = '';
            html1 = '';
            html2 = '';
            html3 = '';
            let i = -1;
            unit = myJson.WiFi.Hostname;
            unitNr = myJson.System['Unit Number'];
            sysInfo = myJson.System
            let syshtml = `
                        <div class="syspair"><div>Sysinfo</div><div>${unit}</div></div>
                        <div class="syspair"><div>Local Time:</div><div>${sysInfo['Local Time']}</div></div>
                        <div class="syspair"><div>Uptime:</div><div>${minutesToDhm(sysInfo['Uptime'])}</div></div>
                        <div class="syspair"><div>Load:</div><div>${sysInfo['Load']}%</div></div>
                        ${sysInfo['Internal Temperature']
                    ? `<div class="syspair">
                                <div>Temp:</div>
                                <div style="color: ${sysInfo['Internal Temperature'] > 65 ? 'red' : 'inherit'};">
                                    ${sysInfo['Internal Temperature']}°C
                                </div>
                                </div>`
                    : ''
                }
                        <div class="syspair"><div>Free Ram:</div><div>${sysInfo['Free RAM']}</div></div>
                        <div class="syspair"><div>Free Stack:</div><div>${sysInfo['Free Stack']}</div></div>
                        <div class="syspair"><div>IP Address:</div><div>${myJson.WiFi['IP Address']}</div></div>
                        <div class="syspair"><div>RSSI:</div><div>${myJson.WiFi['RSSI']} dBm</div></div>
                        <div class="syspair"><div>Build:</div><div>${sysInfo['Build']}</div></div>
                        <div class="syspair"><div>Eco Mode:</div><div>${sysInfo['CPU Eco Mode'] === "true" ? 'on' : 'off'}</div></div>
                        `;

            let [dateBig, clockBig] = myJson.System['Local Time'].split(" ");
            clockBig = clockBig.split(':').slice(0, -1).join(':');
            let [dateY, dateM, dateD] = dateBig.split('-');

            if (!myJson.Sensors.length) {
                html += '<div class="sensorset clickables"><div  class="sensors" style="font-weight:bold;">no tasks configured...</div>';
            }
            else {
                for (const sensor of myJson.Sensors) {
                    //myJson.Sensors.forEach(sensor => {
                    var bigSpan = "";
                    sensorName = sensor.TaskName;
                    if (sensorName.includes("?")) { //if a tile has a custom color
                        const [, bgColor] = getComputedStyle(document.body).backgroundColor.match(/\d+/g);
                        tBG = `background:#${sensorName.split("?")[1]}${bgColor === "0" ? "80" : ""}`;
                        sensorName = sensorName.split("?")[0];
                    } else {
                        tBG = "";
                    }
                    //this is a bit to confusing when creating events for now
                    var sensorName3 = changeNN(sensorName) //replace "_" and "." in device and "BigValue" names

                    htS1 = ' sensorset clickables" style="' + tBG + '" onclick="playSound(3000), ';
                    htS2 = '<div  class="sensors" style="font-weight:bold;">' + sensorName3 + '</div>'
                    exC = [87, 38, 41, 42].includes(sensor.TaskDeviceNumber); //all PluginNR in an array that need to be excluded 
                    exC2 = !sensor.Type?.includes("Display")
                    taskEnabled = sensor.TaskEnabled.toString();

                    if (taskEnabled === "true" && !sensorName.includes("XX") && !exC && exC2 && !hasParams) {
                        if (sensor.TaskValues) {
                            someoneEn = 1;
                            firstItem = true;
                            for (const item of sensor.TaskValues) {
                                //sensor.TaskValues.forEach(item => {
                                wasUsed = false;
                                if (item.Value == "nan") { item.Value = 0; item.NrDecimals = 0; }
                                if (typeof item.Value == 'number') {
                                    num2Value = item.Value.toFixed(item.NrDecimals);
                                }
                                else { num2Value = item.Value; }
                                iN = item.Name.toString();
                                //replace "_" and "." in value names
                                //this is a bit to confusing when creating events for now
                                /*const index = iN.indexOf('?') === -1 ? iN.indexOf('&') : iN.indexOf('?');
                                index === -1 ? iN.length : index;
                                iN = iN.slice(0, index).replace(/_/g, " ").replace(/\./g, "<br>") + iN.slice(index);;*/

                                //split name into name and unit of measurement 
                                itemN = iN.split("?")[0];
                                kindN = iN.split("?")[1];
                                if (!kindN) { kindN = ""; }
                                if (kindN == "H") { kindN = "%"; }
                                if (kindN == "T") {

                                    num2Value = num2Value.toString();
                                    num2Value = num2Value.replace('.', ':');
                                    if (item.NrDecimals == 4) {
                                        num2Value = num2Value.replace(/(.*)(.)(.)/, '$1.$2$3');
                                    }
                                    kindN = "";
                                }

                                slMax = 1023;
                                slMin = 0;
                                slStep = 1;
                                //empty button State
                                bS = "";
                                //buttons = html; sensor tiles = html1; slider = html2; big values = html3
                                //switch---------------------------------------------------------
                                if (sensor.TaskDeviceNumber == 1) {
                                    wasUsed = true;
                                    if ((iN === "btnStateC" && item.Value < 2) || item.Value === 1) { bS = "on"; }
                                    else if (item.Value === 2) { bS = "alert"; }
                                    if (sensor.TaskDeviceGPIO1 && iN === "State" || iN === "iState") {
                                        if (iN === "iState") { item.Value = item.Value == 1 ? 0 : 1 };
                                        uttonGP = sensorName + "|" + sensor.TaskDeviceGPIO1;
                                        html += '<div class="btnTile ' + bS + htS1 + 'buttonClick(\'' + uttonGP + '\', \'' + item.Value + '\')">' + htS2;
                                    }
                                    //needs an extra plugin in espeasy
                                    /*else if (sensor.TaskDeviceGPIO1 && iN === "ledState") {
                                        html2 += '<div class="sensorset"><input type="range" min="' + slMin + '" max="' + slMax + '"  step="' + slStep + '" value="' + num2Value + '" id="' + sensorName + '"class="slider ' + sensor.TaskNumber + ',' + item.ValueNumber;
                                        html2 += ' noVal"><div  class="sensors" style="align-items: flex-end;"><div style="font-weight:bold;">' + sensorName + '</div></div></div>';
                                    }*/
                                    else if (iN === "pState") {
                                        if (sensor.TaskDeviceGPIO1) {
                                            uttonGP = sensorName + "?" + sensor.TaskDeviceGPIO1;
                                            html += '<div class="' + bS + ' btnTile push sensorset" onpointerdown="playSound(3000), pushClick(\'' + uttonGP + '\',1)" onpointerup="pushClick(\'' + uttonGP + '\',0)"><div id="' + sensorName + '" class="sensors" style="font-weight:bold;">' + sensorName + '</div></div>';
                                        }
                                    }
                                    else if (itemN.includes("btnState")) {
                                        if (itemN === "ibtnState") { item.Value = item.Value == 1 ? 0 : 1 };
                                        if (kindN) { sensorName = sensorName + "|" + kindN };
                                        html += '<div class="btnTile ' + bS + htS1 + 'buttonClick(\'' + sensorName + '\', \'' + item.Value + '\')">' + htS2;
                                    }
                                    else { wasUsed = false; }
                                }
                                //dummy---------------------------------------------------------
                                if (sensor.TaskDeviceNumber == 33 && !(iN).includes("XX") && !(sensorName).includes("bigVal")) {
                                    wasUsed = true;
                                    //button coloring
                                    if ((kindN === "C" && item.Value < 2) || item.Value === 1) { bS = "on"; }
                                    else if (item.Value === 2) { bS = "alert"; }
                                    //handle tile hiding of dummy tiles
                                    if (["dButtons", "vInput", "pButtons"].some(v => (sensor.TaskName).includes(v)) && item.Name.includes("noVal")) {
                                        if (item.Name.includes("noValAuto")) {
                                            if (window.innerWidth >= 450 && document.cookie.includes("Two=1")) {
                                                html += '<div class="sensorset btnTile"></div>';
                                            }
                                        }
                                        else { html += '<div class="sensorset btnTile"></div>'; }
                                    }
                                    //virtual buttons
                                    else if ((sensorName).includes("dButtons")) {
                                        if (item.Value > -1) {
                                            itemNB = itemN.split("&")[0];
                                            itemNB2 = changeNN(itemNB);
                                            if (itemN.split(">")[1]) getRemoteGPIOState(sensor.TaskNumber, itemN.split("&")[1].split(">")[0], itemN.split(">")[1], myJson.System['Unit Number'], item.ValueNumber);
                                            if (itemN.split("&")[1] == "A") { html += '<div class="btnTile ' + bS + htS1 + 'getNodes(\'' + itemNB + '\')"><div  class="sensors nodes" style="font-weight:bold;">' + itemNB2 + '</div></div>'; }
                                            else { html += '<div class="btnTile ' + bS + htS1 + 'buttonClick(\'' + itemN + '\')"><div id="' + itemN + '" class="sensors" style="font-weight:bold;">' + itemNB2 + '</div></div>'; }
                                        }
                                    }
                                    //push buttons
                                    else if ((sensorName).includes("pButtons")) {
                                        if (item.Value > -1) {
                                            itemNB = itemN.split("&")[0];
                                            itemNB2 = changeNN(itemNB);
                                            html += '<div class="' + bS + ' btnTile push sensorset" onpointerdown="playSound(3000), pushClick(\'' + itemN + '\',1)" onpointerup="pushClick(\'' + itemN + '\',0)"><div id="' + itemN + '" class="sensors" style="font-weight:bold;">' + itemNB2 + '</div></div>';
                                        }
                                    }
                                    //number input
                                    else if ((sensorName).includes("vInput")) {
                                        if (!itemN) { itemN = "&nbsp;" }
                                        html += '<div class="sensorset clickables"><div class="sensors" style="font-weight:bold" onclick="getInput(this.nextElementSibling.firstChild)">' + itemN + '</div><div class="valWrap"><input type="number" class="vInputs ' + sensor.TaskNumber + ',' + item.ValueNumber + '" id="' + itemN + '"name="' + sensorName + '" placeholder="' + num2Value + '" onkeydown="getInput(this)" onclick="getInput(this,1)"> <div class="kindInput">' + kindN + '</div></div></div>';
                                    }
                                    //normal slider
                                    else if ((sensorName).includes("vSlider")) {
                                        slName = iN;
                                        slKind = "";
                                        if ((iN.match(/\?/g) || []).length >= 3) {
                                            [slName, slMin, slMax, slStep, slKind] = iN.split("?");
                                        }
                                        slName = changeNN(slName);
                                        num2Value = Number(num2Value).toFixed((slStep.toString().split('.')[1] || '').length);
                                        if (slName == "noVal") slName = "&nbsp;";
                                        if (!slKind) { slKind = ""; } if (slKind == "H") { slKind = "%"; }
                                        html2 += '<div class="sensorset"><input type="range" min="' + slMin + '" max="' + slMax + '"  step="' + slStep + '" value="' + num2Value + '" id="' + iN + '"class="slider sL ' + sensor.TaskNumber + ',' + item.ValueNumber;
                                        if ((sensorName).includes("vSliderSw")) { html2 += " swSlider"; } // add switch functionality 
                                        if ((sensorName).includes("nvSlider")) { html2 += ' noVal"><div  class="sensors" style="align-items: flex-end;"><div style="font-weight:bold;">' + slName + '</div></div></div>'; }
                                        else { html2 += '"><div  class="sensors" style="align-items: flex-end;"><div style="font-weight:bold;">' + slName + '</div><div class="sliderAmount" style="text-align: right;">' + num2Value + slKind + '</div></div></div>'; }
                                    }
                                    //time slider
                                    else if ((sensorName).includes("tSlider")) {
                                        if (item.NrDecimals !== 4) iN = "For the Time slider the value must have<br>4 decimals!";
                                        slT1 = item.Value.toFixed(4);
                                        slT2 = (slT1 + "").split(".")[1];
                                        slT1 = Math.floor(slT1);
                                        hour1 = Math.floor(slT1 / 60);
                                        minute1 = slT1 % 60;
                                        const padded1 = minute1.toString().padStart(2, "0");
                                        hour2 = Math.floor(slT2 / 60);
                                        minute2 = slT2 % 60;
                                        const padded2 = minute2.toString().padStart(2, "0");
                                        iN = changeNN(iN);
                                        htmlSlider1 = '<input class="slTS" type="range" min="0" max="1440" step="5" value="';
                                        html2 += '<div id="' + iN + '" class="slTimeSetWrap ' + sensorName + ' ' + sensor.TaskNumber + ',' + item.ValueNumber + '" style="font-weight:bold;">' + iN + '<div class="slTimeText"> <span class="hAmount1">' + hour1 + '</span><span>:</span><span class="mAmount1">' + padded1 + '</span><span>-</span><span class="hAmount2">' + hour2 + '</span><span>:</span><span class="mAmount2">' + padded2 + '</span></div><div class="slTimeSet">' + htmlSlider1 + slT1 + '" id="' + iN + 'L">' + htmlSlider1 + slT2 + '" id="' + iN + 'R"></div></div>';
                                    }
                                    //neopixel slider
                                    else if (sensorName.includes("neoPixel")) {
                                        // Determine the type of the range based on the value of iN
                                        const rangeType = iN === 'h' ? '?H' : iN === 's' ? '?S' : iN === 'v' ? '?V' : '';

                                        // Create the HTML element with a range input, depending on the type
                                        html2 += `<input type="range" max="${iN === 'h' ? 359 : 100}" min="0" value="${num2Value}" id="${sensorName}${rangeType}" class="sL npSl ${sensor.TaskNumber},${item.ValueNumber} np${iN.toUpperCase()} noVal">`;
                                    }
                                    else { wasUsed = false; }
                                }
                                //big values---------------------------------------------------------
                                if ((sensorName).includes("bigVal")) {
                                    wasUsed = true;
                                    let htmlBig1 = '<div class="valuesBig" style="font-weight:bold;text-align:left;">';
                                    if (firstItem == true) {
                                        html3 += '<div class="bigNum">';
                                        if (bigLength < sensor.TaskValues.length) { bigLength = sensor.TaskValues.length };
                                    }
                                    htmlBig2 = '<div style="' + tBG + '" class="bigNumWrap '
                                    if (!(iN).includes("XX")) {
                                        if (sensor.TaskValues.length === 3 && !(sensor.TaskValues).some(item => iN === 'XX')) { if (window.innerWidth < 450 || document.cookie.includes("Two=1")) { bigSpan = "bigSpan" } }
                                        if ((sensorName).includes("bigValC")) {
                                            html3 += htmlBig2 + 'bigC ' + bigSpan + '">';
                                        }
                                        else {
                                            html3 += htmlBig2 + bigSpan + '">';
                                        }
                                        htS3 = htmlBig1 + iN + '</div><div id="'
                                        if (["Clock", "Uhr", "Zeit", "Time"].some(v => (iN).includes(v))) { //(item.Name).toLowerCase().includes(v)
                                            html3 += htS3 + 'clock" class="valueBig">' + clockBig + '</div></div>';
                                        }
                                        else if ((iN).toLowerCase().includes("datum")) {
                                            html3 += htS3 + 'date" class="valueBig">' + dateD + '.' + dateM.toString() + '</div></div>';
                                        }
                                        else if ((iN).toLowerCase().includes("date")) {
                                            html3 += htS3 + 'date" class="valueBig">' + dateM + '-' + dateD.toString() + '</div></div>';
                                        }
                                        else if (["year", "jahr"].some(v => (iN).toLowerCase().includes(v))) {
                                            html3 += htS3 + 'year" class="valueBig">' + dateY + '</div></div>';
                                        }
                                        else if (iN.includes("noVal")) { html3 += htmlBig1 + '</div><div class="valueBig"></span></div></div>'; }
                                        else {
                                            itemN = changeNN(itemN);
                                            html3 += htmlBig1 + itemN + '</div><div class="valueBig">' + num2Value + '<span style="background:none;padding-right: 1%;">' + kindN + '</span></div></div>';
                                        }
                                    }
                                }
                                // if all items with a specific declaration are processed do the rest---------------------------------------------------------
                                if (!wasUsed) {
                                    //itemN = itemN.replace(/_/g, " ").replace(/\./g, "<br>"); //replace "_" and "." in value names of sensor tiles
                                    if (sensor.TaskDeviceNumber == 43) {
                                        if (firstItem) {
                                            if (item.Value === 1) { bS = "on"; } html += '<div class="btnTile ' + bS + ' sensorset clickables" onclick="playSound(3000); splitOn(' + sensor.TaskNumber + '); topF()""><div class="sensors" style="font-weight:bold;">' + sensorName + '</div><div class=even style="font-size: 20pt;">&#x23F2;&#xFE0E;</div></div></div>'
                                        }
                                    }
                                    else {
                                        if (firstItem == true) { html1 += '<div class="' + htS1 + 'buttonClick(\'' + sensorName + '\')">' + htS2; }
                                        if (!item.Name.toString().includes("XX")) {
                                            //else if (iN.includes("noVal")) { html += '<div class="values therest"><div>&nbsp;</div><div></div></div>'; }
                                            if (sensor.TaskDeviceNumber == 81) { html1 += '<div class="cron"><div>' + itemN + '</div><div style="font-size: 10pt;">' + item.Value + '</div></div>'; }
                                            else { html1 += '<div class=row><div class=odd>' + itemN + '</div><div class=even>' + num2Value + ' ' + kindN + '</div></div>'; }
                                        }
                                    }
                                }
                                firstItem = false;

                            };
                            html += '</div>';
                            html1 += '</div>';
                            html3 += '</div>';
                            if (!document.cookie.includes("Sort=1")) {
                                html += html1;
                                html1 = '';
                            }
                        }
                        else { html1 += '<div  class="sensorset clickables" onclick="buttonClick(\'' + sensorName + '\')"><div class="sensors" style="font-weight:bold;">' + sensorName + '</div><div></div><div></div></div>'; someoneEn = 1; document.getElementById('sensorList').innerHTML = html; }
                    }
                };
                if (!someoneEn && !hasParams) {
                    html += '<div class="sensorset clickables" onclick="splitOn(); topF()"> <div class="sensors" style="font-weight:bold;">no tasks enabled or visible...</div>';
                }
            }
            html += html1;

            document.getElementById('sysInfo').innerHTML = syshtml;
            document.getElementById('sensorList').innerHTML = html;
            document.getElementById('sliderList').innerHTML = html2;
            document.getElementById('bigNumber').innerHTML = html3;
            //Things that only need to run once
            if (firstRun) {
                if (!document.cookie.includes("Snd=")) { mC("Snd") }
                //if (!document.cookie.includes("Two=")) { mC("Two") }
                if (window.navigator.userAgent.match(/iPhone/i)) {
                    document.body.style.height = "101vh";
                }
                fJ = setInterval(fetchJson, 2000);
                getNodes();
                longPressS();
                longPressN();
                addEonce()
                unitNr1 = myJson.System['Unit Number'];
                initIP = 0;
                if (myJson.WiFi['IP Address'] == "(IP unset)") { initIP = "192.168.4.1" }
                else { initIP = myJson.WiFi['IP Address'] }
                nP2 = 'http://' + initIP + '/devices';
                nP = 'http://' + initIP + '/tools';
                firstRun = 0;
            }
            if (unitNr === unitNr1) { styleU = "&#8858;&#xFE0E;"; }
            else { styleU = ""; }
            if (!hasParams) {
                document.getElementById('unitId').innerHTML = styleU + unit + '<span class="numberUnit"> (' + myJson.WiFi.RSSI + ')</span>';
                document.getElementById('unitT').innerHTML = styleU + unit;
            }
            paramS();
            changeCss();
            resizeText();
            longPressB();

        }
    }
}

async function getRemoteGPIOState(taskNum, unitToNum, gpioNum, unitFromNum, valueNum) {
    console.log(taskNum, unitToNum, gpioNum, unitFromNum, valueNum);
    const gState = (await getUrl(`control?cmd=SendTo,${unitToNum},"SendTo,${unitFromNum},'taskvalueset,${taskNum},${valueNum},%5BPlugin%23GPIO%23Pinstate%23${gpioNum}%5D'"`))
    return gState;
}

//##############################################################################################################
//      replace _ and .
//##############################################################################################################

function changeNN(nn) {
    return nn.replace(/_/g, " ").replace(/\./g, "<br>"); //replace "_" and "." in device and "BigValue" names
}

//##############################################################################################################
//      ADJUST THE STYLING
//##############################################################################################################
function changeCss() {
    let x = "auto ";
    let m = null;
    let coloumnSet, y, z;
    var numSl = document.querySelectorAll('input[type=range]').length;
    if (!numSl) { document.getElementById("allList").classList.add('allExtra'); }
    else { document.getElementById("allList").classList.remove('allExtra'); }
    var list3 = document.querySelectorAll(".bigNum");
    var sList = document.getElementById("sensorList");
    var numSet = sList.getElementsByClassName('sensorset').length;
    z = 0;
    if (!list3.length) z = numSet; //if there are no big values orient on number of "normal" tiles
    if (bigLength == 4 || z > 9) {
        y = x + x + x + x;
        coloumnSet = 4;
    }
    else if (bigLength == 3 || z > 4) {
        y = x + x + x;
        coloumnSet = 3;
    }
    else if (bigLength == 2 || z > 1) {
        y = x + x;
        coloumnSet = 2;
    }
    else if (bigLength == 1 || z < 2) {
        y = x;
        m = "important"
        if (list3.length) { for (let i = 0; i < list3.length; ++i) { list3[i].classList.add('bigNumOne'); } }
        coloumnSet = 1;
    }
    else {
        y = x + x;
        coloumnSet = 2;
    }
    widthLimit = coloumnSet * 150 + (coloumnSet * (window.innerHeight / 100));
    if (window.innerWidth < widthLimit || document.cookie.includes("Two=1")) {
        if (list3.length) { for (let i = 0; i < list3.length; ++i) { list3[i].style.cssText = "display: grid; grid-template-columns: auto auto;"; } }
        if (bigLength == 1 || (bigLength == 0 && numSet == 1)) {
            coloumnSet = 1
            y = x;
            m = "important"
        }
        else { coloumnSet = 2; y = x + x }
    };

    sList.style.setProperty('grid-template-columns', y, m);

    //calculate and add extra tiles
    if (numSet % coloumnSet != 0 && coloumnSet != 1) {
        calcTile = coloumnSet - (numSet - coloumnSet * Math.floor(numSet / coloumnSet));
        for (let i = 1; i <= calcTile; i++) {
            html += '<div class="sensorset"></div>'
        }
    }
    document.getElementById('sensorList').innerHTML = html;
    bigLength = 0;
}

//##############################################################################################################
//      ADD ADDITIONAL STUFF
//##############################################################################################################
function paramS() {
    var sliders = document.querySelectorAll(".slTS");
    sliders.forEach(slider => {
        slider.addEventListener("input", updateSlTS);
        slider.addEventListener('change', sliderChTS);
        slider.addEventListener("pointerup", (event) => { iIV = setTimeout(blurInput, 1000) });
    });
    var sliders = document.querySelectorAll(".sL");
    sliders.forEach(slider => {
        slider.addEventListener('input', updateSlider);
        slider.addEventListener('change', sliderChange);
        slider.addEventListener("pointerup", (event) => { iIV = setTimeout(blurInput, 1000) });
    });
    neoS = document.querySelectorAll(".npS");
    neoS.forEach(sID => {
        hVal = document.getElementById(sID.id.split("?")[0] + '?H')?.value;
        vVal = document.getElementById(sID.id.split("?")[0] + '?V')?.value || 20;
        if (vVal < 20) vVal = 20;
        sID.style.backgroundImage = 'linear-gradient(to right, hsl(0,0%,' + vVal + '%),hsl(' + hVal + ',100%,50%))';
    });
}

//##############################################################################################################
//      EVENTLISTENERS THAT NEED TO BE ADDED ONCE
//##############################################################################################################
function addEonce() {
    document.addEventListener('touchstart', e => {
        msTs = Date.now();
        tsX = e.changedTouches[0].screenX
        tsY = e.changedTouches[0].screenY
    })
    document.addEventListener('touchend', e => {
        msTe = Date.now();
        teX = e.changedTouches[0].screenX
        teY = e.changedTouches[0].screenY
        checkDirection()
    })
    document.addEventListener('mousemove', e => {
        if (!manNav && !navOpen) {
            if (e.clientX < 10 && document.getElementById('mySidenav').offsetLeft === -280) openNav()
            //if (e.clientX >280 && document.getElementById('sysInfo').offsetHeight === 0) closeNav()
        }
    })
    document.getElementById('mySidenav').addEventListener('mouseleave', e => {
        if (!manNav) {
            closeNav()
        }
    })
}

//##############################################################################################################
//      TOUCHSLIDE TO OPEN SIDENAV
//##############################################################################################################
function checkDirection() {
    touchtime = msTe - msTs
    touchDistX = teX - tsX
    touchDistY = teY - tsY
    if (teX < tsX && navOpen) {
        if (Math.abs(touchDistX) > 40 && Math.abs(touchDistY) < 30 && touchtime < 250) closeNav()
    }
    if (teX > tsX && !navOpen) {
        if (Math.abs(touchDistX) > 40 && Math.abs(touchDistY) < 30 && touchtime < 250) openNav()
    }
}

//##############################################################################################################
//      TIMESLIDER UPDATE VALUES
//##############################################################################################################
function updateSlTS(event) {
    isittime = 0;
    slider = event.target;
    if (slider.id.slice(-1) == "L") { nuM = 1 } else { nuM = 2 }
    const amount = slider.parentElement.closest(".slTimeSetWrap").firstElementChild.querySelector(".hAmount" + nuM);
    const amount2 = slider.parentElement.closest(".slTimeSetWrap").firstElementChild.querySelector(".mAmount" + nuM);
    var hours = Math.floor(slider.value / 60);
    var minutes = slider.value % 60;
    const padded = minutes.toString().padStart(2, "0");
    amount.textContent = hours;
    amount2.textContent = padded;
}

//##############################################################################################################
//      NORMAL SLIDER UPDATE VALUES
//##############################################################################################################
function updateSlider(event) {
    NrofSlides++;
    isittime = 0;
    slider = event.target;
    currVal = slider.attributes.value.nodeValue;
    slKind = slider.id.split("?")[4];
    if (!slider.className.includes("noVal")) {
        const amount = slider.closest('div.sensorset').querySelector('.sliderAmount');
        if (!slKind) { slKind = ""; } if (slKind == "H") { slKind = "%"; }
        slA = Number(event.target.value).toFixed(undefined !== event.target.step.split('.')[1] && event.target.step.split('.')[1].length) + slKind;
        amount.textContent = slA;
    }
    if (slider.classList[1] == 'npSl') {
        sliderId = slider.id.split("?")[0];
        hVal = document.getElementById(sliderId + '?H')?.value;
        sVal = document.getElementById(sliderId + '?S')?.value;
        vVal = document.getElementById(sliderId + '?V')?.value;
        gesVal = [hVal, sVal, vVal];
        vVal = vVal ?? 0;
        if (sVal && hVal) {
            if (vVal < 20) vVal = 20;
            sGrad = document.getElementById(sliderId + '?S');
            sGrad.style.backgroundImage = 'linear-gradient(to right, hsl(0,0%,' + vVal + '%),hsl(' + hVal + ',100%,50%))';
        }
    }
}

//##############################################################################################################
//      TIMESLIDER SEND EVENT ON CHANGE
//##############################################################################################################
function sliderChTS(event) {
    playSound(4000);
    slider = event.target;
    const slTName = slider.parentNode.parentNode;
    if (slider.id == slTName.id + "L") { var secVal = document.getElementById(slTName.id + "R"); }
    else { var secVal = document.getElementById(slTName.id + "L"); }
    if (unitNr === unitNr1) { if (slider.id == slTName.id + "L") { getUrl('control?cmd=taskvalueset,' + slTName.classList[2] + ',' + event.target.value + '.' + secVal.value.toString().padStart(4, "0")); } else { getUrl('control?cmd=taskvalueset,' + slTName.classList[2] + ',' + secVal.value + '.' + event.target.value.toString().padStart(4, "0")); }; getUrl('control?cmd=event,' + slTName.classList[1] + 'Event=' + slTName.classList[2].split(",")[1]) }
    else { if (slider.id == slTName.id + "L") { getUrl('control?cmd=SendTo,' + nNr + ',"taskvalueset,' + slTName.classList[2] + ',' + event.target.value + '.' + secVal.value.toString().padStart(4, "0") + '"'); } else { getUrl('control?cmd=SendTo,' + nNr + ',"taskvalueset,' + slTName.classList[2] + ',' + secVal.value + '.' + event.target.value.toString().padStart(4, "0") + '"'); }; getUrl('control?cmd=SendTo,' + nNr + ',"event,' + slTName.classList[1] + 'Event=' + slTName.classList[2].split(",")[1] + '"') }
}

//##############################################################################################################
//      NORMAL SLIDER SEND EVENT ON CHANGE
//##############################################################################################################
function sliderChange(event) {
    playSound(4000);
    slider = event.target;
    maxVal = parseFloat(slider.attributes.max.nodeValue);
    minVal = parseFloat(slider.attributes.min.nodeValue);
    OnOff = "";
    //parseFloat(event.target.value).toFixed(undefined !== event.target.step.split('.')[1] && event.target.step.split('.')[1].length);
    slA = event.target.value;
    if (NrofSlides == 1 && slider.classList[3] == 'swSlider') {
        df = (maxVal - minVal) * 1 / 10;
        if (slA > (maxVal - df) && currVal !== maxVal) { slA = maxVal; OnOff = ",1"; isittime = 1;; setTimeout(fetchJson, 500); }
        if (slA < (minVal + df) && currVal !== minVal) { slA = minVal; OnOff = ",0"; isittime = 1;; setTimeout(fetchJson, 500); }
    }
    if ((slider.id.match(/\?/g) || []).length >= 3 || slider.classList[1] == 'npSl') { sliderId = slider.id.split("?")[0]; } else { sliderId = slider.id; }
    if (gesVal) gesVal = gesVal.filter(n => n)
    if (unitNr === unitNr1) {
        getUrl('control?cmd=taskvalueset,' + slider.classList[2] + ',' + slA);
        if (slider.classList[1] != 'npSl') { getUrl('control?cmd=event,' + sliderId + 'Event=' + slA + OnOff); }
        else { getUrl('control?cmd=event,' + sliderId + 'Event=' + gesVal) }
    }
    else {
        getUrl('control?cmd=SendTo,' + nNr + ',"taskvalueset,' + slider.classList[2] + ',' + slA + '"');
        if (slider.classList[1] != 'npSl') { getUrl('control?cmd=SendTo,' + nNr + ',"event,' + sliderId + 'Event=' + slA + OnOff + '"'); }
        else { getUrl('control?cmd=SendTo,' + nNr + ',"event,' + sliderId + 'Event=' + gesVal + '"'); }
    }
    NrofSlides = 0;
}

//##############################################################################################################
//      NORMAL BUTTON EVENT
//##############################################################################################################
function buttonClick(sensorName, gState) {
    console.log(sensorName, gState);
    //send to other nodes by "dButtons"
    if (sensorName.split("&")[1]) {
        utton2 = sensorName.split("&")[0];
        nNr2 = sensorName.split("&")[1].split(">")[0];
        console.log(sensorName.split(">")[1])
        if (sensorName.split(">")[1] && !sensorName.split(">")[1].endsWith('L')) {
            getUrl('control?cmd=SendTo,' + nNr2 + ',"GPIOToggle,' + sensorName.split(">")[1] + '"');
        }
        else getUrl('control?cmd=SendTo,' + nNr2 + ',"event,' + utton2 + 'Event"');
    }
    //button event by "switch plugin"
    else if (sensorName.split("|")[1]) {
        gpioNr = sensorName.split("|")[1];
        uN = sensorName.split("|")[0];
        gS = gState == 1 ? 0 : 1
        if (unitNr === unitNr1) { getUrl('control?cmd=gpio,' + gpioNr + ',' + gS); getUrl('control?cmd=event,' + uN + 'Event'); }
        else { getUrl('control?cmd=SendTo,' + nNr + ',"gpio,' + gpioNr + ',' + gS + '"'); getUrl('control?cmd=SendTo,' + nNr + ',"event,' + uN + 'Event"'); }
    }
    //normal button event by "dButtons"
    else {
        if (unitNr === unitNr1) { getUrl('control?cmd=event,' + sensorName + 'Event'); }
        else { getUrl('control?cmd=SendTo,' + nNr + ',"event,' + sensorName + 'Event"'); }
    }
    setTimeout(fetchJson, 400);
}

//##############################################################################################################
//      PUSH BUTTON EVENT
//##############################################################################################################
function pushClick(sensorName, b) {
    if (b == 0) { isittime = 1; playSound(1000); }
    else { isittime = 0 }
    if (sensorName.split("?")[1]) {
        gpioNr = sensorName.split("?")[1];
        if (unitNr === unitNr1) { getUrl('control?cmd=gpio,' + gpioNr + ',' + b); }
        else { getUrl('control?cmd=SendTo,' + nNr + ',"gpio,' + gpioNr + ',' + b + '"'); }
    }
    else if (sensorName.split("&")[1]) {
        utton2 = sensorName.split("&")[0];
        nNr2 = sensorName.split("&")[1];
        getUrl('control?cmd=SendTo,' + nNr2 + ',"event,' + utton2 + 'Event=' + b + '"');
    }
    else {
        if (unitNr === unitNr1) { getUrl('control?cmd=event,' + sensorName + 'Event=' + b); }
        else { getUrl('control?cmd=SendTo,' + nNr + ',"event,' + sensorName + 'Event=' + b + '"'); }
    }
}

//##############################################################################################################
//      INPUT TILES EVENT
//##############################################################################################################
function getInput(ele, initalCLick) {
    if (event.type === 'click') {
        isittime = 0;
        iIV = setTimeout(blurInput, 8000);
        ele.addEventListener('blur', (event) => {
            clearTimeout(iIV)
            isittime = 1;
            setTimeout(fetchJson, 400);
        });
    }
    if (ele.value.length > 12) { ele.value = ele.value.slice(0, 12); }
    if (event.key === 'Enter' || event.type === 'click' && !initalCLick) {
        isittime = 1;
        if (ele.value) {
            playSound(4000);
            if (unitNr === unitNr1) { getUrl('control?cmd=taskvalueset,' + ele.classList[1] + ',' + ele.value); }
            else { getUrl('control?cmd=SendTo,' + nNr + ',"taskvalueset,' + ele.classList[1] + ',' + ele.value + '"'); }
            buttonClick(ele.id);
        }
        else { setTimeout(fetchJson, 400); }
        clearTimeout(iIV);
    }
    else if (event.key === 'Escape') { document.getElementById(ele.id).value = ""; }
    else { clearTimeout(iIV); iIV = setTimeout(blurInput, 5000); }
}

//##############################################################################################################
//      BLUR INPUT
//##############################################################################################################
function blurInput() {
    isittime = 1;
}

//##############################################################################################################
//      OPEN THE SIDENAV
//##############################################################################################################
function openNav(whatisit) {
    navOpen = 1;
    if (whatisit) manNav = 1;
    if (nIV) { clearInterval(nIV); }
    nIV = setInterval(getNodes, 10000);
    if (document.getElementById('mySidenav').offsetLeft === -280) {
        getNodes();
        document.getElementById("mySidenav").style.left = "0";
    } else { closeNav(); }
}

//##############################################################################################################
//      CLOSE THE SIDENAV
//##############################################################################################################
function closeNav() {
    manNav = 0;
    navOpen = 0;
    clearInterval(nIV);
    document.getElementById("mySidenav").style.left = "-280px";
}

//##############################################################################################################
//      OPEN SYTEM INFO
//##############################################################################################################
function openSys() {
    if (document.getElementById('sysInfo').offsetHeight === 0) {
        document.getElementById('menueWrap1').style.flexShrink = "0";
        document.getElementById('sysInfo').style.height = "180px";
    } else {
        document.getElementById('sysInfo').style.height = "0";
        document.getElementById('menueWrap1').style.flexShrink = "999";
    }
}

//##############################################################################################################
//      NODES - MAKE A LIST FOR THE SIDENAV
//##############################################################################################################
async function getNodes(sensorName, allNodes, hasIt) {
    if (!hasIt) {
        response = await getUrl("json");
        myJson = await response.json();
    }
    let html4 = '';
    nInf = myJson.nodes;
    let i = -1;
    myJson.nodes.forEach(node => {
        i++
        if (node.nr == myParam) { if (hasParams) { nodeChange(i); hasParams = 0; } }
        if (node.nr === unitNr1) { if (node.nr === unitNr) { styleN = "&#8857;&#xFE0E;"; } else { styleN = "&#8858;&#xFE0E;"; } }
        else if (node.nr === unitNr) { styleN = "&#183;&#xFE0E;"; } else { styleN = ""; }
        html4 += '<div class="menueItem"><div class="serverUnit" style="text-align: center;">' + styleN + '</div><div id="' + node.name + '" class="nc" onclick="sendUpdate(); nodeChange(' + i + ');iFr();">' + node.name + '<span class="numberUnit">' + node.nr + '</span></div></div>';
        if (sensorName || allNodes) {
            if (allNodes) {
                if (node.nr === unitNr1) { fetch('control?cmd=event,' + sensorName + 'Long'); }
                else { fetch('/control?cmd=SendTo,' + node.nr + ',"event,' + sensorName + 'Long"'); }
            }
            else if (isittime) {
                if (node.nr === unitNr1) { fetch('control?cmd=event,' + sensorName + 'Event'); }
                else { fetch('/control?cmd=SendTo,' + node.nr + ',"event,' + sensorName + 'Event"'); }
            }
        }
    })
    i = 0
    document.getElementById('menueList').innerHTML = html4;
    if (hasParams) {
        let html = '<div class="sensorset clickables"><div  class="sensors" style="font-weight:bold;">can not find node # ' + myParam + '...</div></div>';
        document.getElementById('sensorList').innerHTML = html;
        hasParams = 0;
        setTimeout(fetchJson, 3000);
    }
    else { if (!nIV) { setTimeout(fetchJson, 1000); } }
}

//##############################################################################################################
//      GET NODES AFTER SOME TIME (when clicked on node in sidenav)
//##############################################################################################################
function sendUpdate() {
    setTimeout(getNodes.bind(null, '', '', 1), 600);

}

//##############################################################################################################
//      CHANGE THE ADDRESS ACCORDING TO THE SELECTED NODE
//##############################################################################################################
function nodeChange(event) {
    nInf = nInf[event];
    if (nInf) {
        nNr = nInf.nr;
        nN = nInf.name;
        nP = `http://${nInf.ip}/tools`;
        nP2 = `http://${nInf.ip}/devices`;
        jsonPath = `http://${nInf.ip}/json`;
        window.history.replaceState(null, null, '?unit=' + nNr);
        fetchJson(1);
    }
    if (window.innerWidth < 450 && document.getElementById('sysInfo').offsetHeight === 0) { closeNav(); }
}

//##############################################################################################################
//      RESIZE THE TEXT FOR "BIG VALUES"
//##############################################################################################################
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
            el.style.fontSize = `${i - step - 1}${unit}`
            el.style.lineHeight = "0.75"
        })
    }
    resizeText({ elements: document.querySelectorAll('.valueBig'), step: 1 })
}

//##############################################################################################################
//      FULLSCREEN
//##############################################################################################################
function launchFs(element) {
    element.requestFullscreen();
    //seems to not be necessary anymore
    /*if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }*/
}

//##############################################################################################################
//      OPENS THE IFRAME 
//##############################################################################################################
function splitOn(x) {
    if (document.getElementById('framie').offsetWidth === 0) { iO = 1; iFr(x); document.getElementById('framie').style.width = "100%"; }
    else { iO = 0; if (!x) {document.getElementById('framie').style.width = 0}; document.getElementById('framie').innerHTML = ""; }
    setTimeout(fetchJson, 100);
}
// either open the the devices page or the page of a specific plugin (e.g. clock)
function iFr(x) {
    if (iO) {
        if (x) { document.getElementById('framie').innerHTML = '<iframe src="' + nP2 + '?index=' + x + '&page=1"></iframe>'; }
        else { document.getElementById('framie').innerHTML = '<iframe src="' + nP2 + '"></iframe>' }
        closeNav();
    }
}


//##############################################################################################################
//      SCROLL TO THE TOP
//##############################################################################################################
function topF() { document.body.scrollTop = 0; document.documentElement.scrollTop = 0; }

//##############################################################################################################
//      LONGPRESS AND COOCKIE SECTION
//##############################################################################################################
function longPressN() { document.getElementById('mOpen').addEventListener('long-press', function (e) { window.location.href = nP; }); }

function longPressS() {
    document.body.addEventListener('long-press', function (e) {
        e.preventDefault();
        if (e.target.id === 'closeBtn') {
            mC("Snd");
        } else if (e.target.id === 'nOpen') {
            mC("Sort");
        } else if (e.target.id === 'openSys') {
            mC("Two");
        } else if (e.target.id === 'unitId') {
            mC("Col");
        }
    });
}

//make cockies
function mC(y) {
    const currentValue = (document.cookie.match(`(^|;)\\s*${y}\\s*=\\s*([^;]+)`)?.pop() || '') == 1;
    playSound(currentValue ? 500 : 900);
    document.cookie = `${y}=${currentValue ? 0 : 1}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=Lax;`;
    //document.cookie = `Snd=1; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=Lax;`
}

function longPressB() {
    let executed = false;
    const longButtons = document.querySelectorAll(".clickables");
    longButtons.forEach(longButton => {
        longButton.addEventListener('long-press', function (e) {
            e.preventDefault();
            const lBName = longButton.querySelector(".sensors");
            const lBNode = longButton.querySelector(".nodes");
            if (lBNode) {
                getNodes(lBNode.textContent, "1");
            }
            else {
                if ((lBName.id).split("&")[1]) {
                    utton2 = (lBName.id).split("&")[0];
                    nNr2 = (lBName.id).split("&")[1].split(">")[0];
                    if ((lBName.id).split(">")[1].endsWith('L')) {
                        getUrl('control?cmd=SendTo,' + nNr2 + ',"GPIOToggle,' + (lBName.id).split(">")[1].split('L')[0] + '"');
                    }
                    else { getUrl('control?cmd=SendTo,' + nNr2 + ',"event,' + utton2 + 'Long"'); }
                    setTimeout(fetchJson, 400);
                } else {
                    if (unitNr === unitNr1 && !executed) { getUrl('control?cmd=event,' + lBName.textContent + 'Long'); executed = true; }
                    else { getUrl('control?cmd=SendTo,' + nNr + ',"event,' + lBName.textContent + 'Long"'); executed = true; }
                    setTimeout(fetchJson, 400);
                }
            }
            playSound(1000);
            isittime = 0;
            iIV = setTimeout(blurInput, 600);
        });
    });
}

//##############################################################################################################
//      HELPER
//##############################################################################################################
function minutesToDhm(min) {
    const d = Math.floor(min / (60 * 24));
    const h = Math.floor((min % (60 * 24)) / 60);
    const m = min % 60;

    const format = (value, unit) => value > 0 ? `${value} ${unit}${value === 1 ? '' : 's'} ` : '';

    const dDis = format(d, 'day');
    const hDis = format(h, 'hour');
    const mDis = format(m, 'minute');

    return dDis + hDis + mDis;
}

function playSound(freQ) {
    if ((document.cookie.includes("Snd=1") || freQ < 1000) && (isittime || freQ !== 3000)) {
        c = new AudioContext()
        o = c.createOscillator()
        g = c.createGain()
        frequency = freQ
        o.frequency.value = frequency
        o.type = "sawtooth"
        o.connect(g)
        g.connect(c.destination)
        g.gain.setValueAtTime(0.05, 0)
        o.start(0)
        g.gain.exponentialRampToValueAtTime(0.00001, c.currentTime + 0.01)
        o.stop(c.currentTime + 0.01)
    }
}
//timeout fetch requests
async function getUrl(url) {
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 2000);
    try {
        response = await fetch(url, {
            signal: controller.signal
        });
    } catch { }
    return response;
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        //console.log("visible");
        clearTimeout(fJ);
        fetchJson();
        fJ = setInterval(fetchJson, 2000);
    } else {
        //console.log("invisible");
        clearTimeout(fJ);
    }
});
!function (e, t) { "use strict"; var n = null, a = "PointerEvent" in e || e.navigator && "msPointerEnabled" in e.navigator, i = "ontouchstart" in e || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, o = 0, r = 0; function m(e) { var n; s(), e = (n = e, void 0 !== n.changedTouches ? n.changedTouches[0] : n), this.dispatchEvent(new CustomEvent("long-press", { bubbles: !0, cancelable: !0, detail: { clientX: e.clientX, clientY: e.clientY, offsetX: e.offsetX, offsetY: e.offsetY, pageX: e.pageX, pageY: e.pageY }, clientX: e.clientX, clientY: e.clientY, offsetX: e.offsetX, offsetY: e.offsetY, pageX: e.pageX, pageY: e.pageY, screenX: e.screenX, screenY: e.screenY })) || t.addEventListener("click", function e(n) { var a; t.removeEventListener("click", e, !0), (a = n).stopImmediatePropagation(), a.preventDefault(), a.stopPropagation() }, !0) } function s(t) { var a; (a = n) && (e.cancelAnimationFrame ? e.cancelAnimationFrame(a.value) : e.webkitCancelAnimationFrame ? e.webkitCancelAnimationFrame(a.value) : e.webkitCancelRequestAnimationFrame ? e.webkitCancelRequestAnimationFrame(a.value) : e.mozCancelRequestAnimationFrame ? e.mozCancelRequestAnimationFrame(a.value) : e.oCancelRequestAnimationFrame ? e.oCancelRequestAnimationFrame(a.value) : e.msCancelRequestAnimationFrame ? e.msCancelRequestAnimationFrame(a.value) : clearTimeout(a)), n = null } function u(e, n, a) { for (; e && e !== t.documentElement;) { var i = e.getAttribute(n); if (i) return i; e = e.parentNode } return a } "function" != typeof e.CustomEvent && (e.CustomEvent = function (e, n) { n = n || { bubbles: !1, cancelable: !1, detail: void 0 }; var a = t.createEvent("CustomEvent"); return a.initCustomEvent(e, n.bubbles, n.cancelable, n.detail), a }, e.CustomEvent.prototype = e.Event.prototype), e.requestAnimFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (t) { e.setTimeout(t, 1e3 / 60) }, t.addEventListener(a ? "pointerup" : i ? "touchend" : "mouseup", s, !0), t.addEventListener(a ? "pointerleave" : i ? "touchleave" : "mouseleave", s, !0), t.addEventListener(a ? "pointermove" : i ? "touchmove" : "mousemove", function e(t) { var n = Math.abs(o - t.clientX), a = Math.abs(r - t.clientY); (n >= 10 || a >= 10) && s(t) }, !0), t.addEventListener("wheel", s, !0), t.addEventListener("scroll", s, !0), t.addEventListener(a ? "pointerdown" : i ? "touchstart" : "mousedown", function t(a) { var i, u; o = a.clientX, r = a.clientY, s(i = a), u = i.target, n = function t(n, a) { if (!e.requestAnimationFrame && !e.webkitRequestAnimationFrame && !(e.mozRequestAnimationFrame && e.mozCancelRequestAnimationFrame) && !e.oRequestAnimationFrame && !e.msRequestAnimationFrame) return e.setTimeout(n, a); var i = new Date().getTime(), o = {}, r = function () { var e; new Date().getTime() - i >= a ? n.call() : o.value = requestAnimFrame(r) }; return o.value = requestAnimFrame(r), o }(m.bind(u, i), 600) }, !0) }(window, document);
