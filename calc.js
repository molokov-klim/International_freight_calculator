// ОБЪЯВЛЕНИЕ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ LCL
// Прайсы LCL
var PriceListLCL, PriceListLCL_delivery, PriceListLCL_rail;
// LCL море+жд
var CBM, Weight, freightLCL, railLCLbyCBM, railLCLbyKG, railLCL,
deliveryLCL, deliveryLCLcalcValue, deliveryLCLcalcPriceID,
sumLCL=0, seaLCLcalcValue, deliveryTime,
seaLCLcalcPriceID=1, selectPort, selectDestination;
// ОБЪЯВЛЕНИЕ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ FCL
// Прайсы LCL	
var PriceListFCL_delivery, PriceListFCL_rail, PriceListFCL;	
// FCL море + ЖД
var freightFCL, railFCL, deliveryFCL, deliveryTimeFCL,sumFCL,
selectBoxFCL, selectPortFCL, selectDestinationFCL;	
// ОБЪЯВЛЕНИЕ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ LCL RAIL CHINA
var PriceListLCLrailChina;
var RailLCLcalValue, RailLCLfreight, CBMRail, WeightRail, selectStationLCL, 
selectDestinationRail, deliveryLCLcalcPriceIDrail, 
deliveryLCLcalcValueRail, deliveryLCLrail, railLCLcalcPriceID, deliveryTimeRailLCL ;	// ОБЪЯВЛЕНИЕ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ FCL RAIL CHINA
var PriceListFCLrail;
var selectStationFCLrail, selectDestinationFCLrail;
// ПОДБИРАЕМ ЗНАЧЕНИЕ КУРСА ДОЛЛАРА С ЦБР
var usd;
jQuery.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function(data) {
	usd=(data.Valute.USD.Value);	
	jQuery('#usd').html(usd);
});
// ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
jQuery(document).ready(function(){
    jQuery(".dws-form").on("click",".tab",function(){
        jQuery("label.tab").removeClass("active");
        jQuery(".tab-form").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".tab-form").eq(jQuery(this).index()).addClass("active");
    })
});
// ПАРСИНГ ТАБЛИЦ
var url = "http://u77820.test-handyhost.ru/wp-content/calc_files/PriceList.xlsx" // Путь к 
файлу с прайсами
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";
oReq.onload = function(e) {
  var arraybuffer = oReq.response;
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");
  var workbook = XLSX.read(bstr, {type:"binary"});
                   var sheet_name_list = workbook.SheetNames;
                sheet_name_list.forEach(function (y) { 
                    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
					if (y=="LCL_FILO_ASIA"){PriceListLCL=roa} 
					if (y=="AUTO_LNR"){PriceListLCL_delivery=roa} 
					if (y=="LCL_RAIL_ASIA"){PriceListLCL_rail=roa}
					if (y=="FCL_ASIA"){PriceListFCL=roa}
					if (y=="FCL_RAIL_ASIA"){PriceListFCL_rail=roa}
					if (y=="FCL_AUTO_LNR"){PriceListFCL_delivery=roa}
					if (y=="RAIL_CHINA_LCL"){PriceListLCLrailChina=roa}
					if (y=="RAIL_CHINA_FCL"){PriceListFCLrail=roa}
					});
// ЗАПОЛНЕНИЕ ВЫПАДАЮЩЕГО СПИСКА - ОТКУДА LCL
function insertPortLCL(){
        var html = '';
for(var i=0; i<PriceListLCL.length; i++ ){
html += '<option data-port="'+ PriceListLCL[i].POL +'">'+PriceListLCL[i].POL+'</option>';
        }
        jQuery('#port').append(html);
    }
    insertPortLCL();
// ЗАПОЛНЕНИЕ ВЫПАДАЮЩЕГО СПИСКА - КУДА	LCL		
function insertDestinationLCL(){
        var html = '';
        for(var i=0; i<PriceListLCL_delivery.length; i++ ){
html += '<option data-destination="'+ PriceListLCL_delivery[i].City +'">'+PriceListLCL_delivery[i].City+'</option>';
        }
        jQuery('#destination').append(html);
    }
insertDestinationLCL();			
// ЗАПОЛНЕНИЕ ВЫПАДАЮЩЕГО СПИСКА - ОТКУДА FCL	
function insertPortFCL(){
        var html = '';
        for(var i=0; i<PriceListFCL.length; i++ ){
html += '<option data-portfcl="'+ PriceListFCL[i].POL +'">'+PriceListFCL[i].POL+'</option>';
        }
        jQuery('#portFCL').append(html);
    }
    insertPortFCL();
// ЗАПОЛНЕНИЕ ВЫПАДАЮЩЕГО СПИСКА - КУДА	FCL		
function insertDestinationFCL(){
        var html = '';
        for(var i=0; i<PriceListFCL_delivery.length; i++ ){
			html += '<option data-destinationfcl="'+ PriceListFCL_delivery[i].City +'">'+PriceListFCL_delivery[i].City+'</option>';
        }
        jQuery('#destinationFCL').append(html);
    }
insertDestinationFCL();	
		
// ЗАПОЛНЕНИЕ ВЫПАДАЮЩЕГО СПИСКА - ОТКУДА LCL Rail
function insertPortLCLrail(){
        var html = '';
        for(var i=0; i<PriceListLCLrailChina.length; i++ ){
			html += '<option data-stationrail="'+ PriceListLCLrailChina[i].SOL +'">'+PriceListLCLrailChina[i].SOL+'</option>';
        }
        jQuery('#stationRail').append(html);
    }
insertPortLCLrail();
// ЗАПОЛНЕНИЕ ВЫПАДАЮЩЕГО СПИСКА - КУДА	LCL Rail	 
function insertDestinationLCLrail(){
        var html = '';
        for(var i=0; i<PriceListLCL_delivery.length; i++ ){
			html += '<option data-destinationrail="'+ PriceListLCL_delivery[i].City +'">'+PriceListLCL_delivery[i].City+'</option>';
        }
        jQuery('#destinationRail').append(html);
    }
insertDestinationLCLrail();		
// ЗАПОЛНЕНИЕ ВЫПАДАЮЩЕГО СПИСКА - ОТКУДА FCL rail
function insertPortFCLrail(){
        var html = '';
        for(var i=0; i<PriceListFCLrail.length; i++ ){
			html += '<option data-stationfclrail="'+ PriceListFCLrail[i].SOL +'">'+PriceListFCLrail[i].SOL+'</option>';
        }
        jQuery('#stationFCLrail').append(html);
    }
insertPortFCLrail();
// ЗАПОЛНЕНИЕ ВЫПАДАЮЩЕГО СПИСКА - КУДА	FCL rail
function insertDestinationFCLrail(){
        var html = '';
        for(var i=0; i<PriceListFCL_delivery.length; i++ ){
			html += '<option data-destinationfclrail="'+ PriceListFCL_delivery[i].City +'">'+PriceListFCL_delivery[i].City+'</option>';
        }
        jQuery('#destinationFCLrail').append(html);
    }
insertDestinationFCLrail();	
} // oReq.onload = function(e) END
// Функция приема данных с поля "ОТКУДА" LCL
function changePort(){
    selectPort=jQuery('#port option').filter(':selected').data('port');
}			
// Запуск функций
jQuery('#port').change(function (){
    changePort();
});				
				
// Функция приема данных с поля "КУДА" LCL
function changeDestination(){
    selectDestination=jQuery('#destination option').filter(':selected').data('destination');
}			
// Запуск функций
jQuery('#destination').change(function (){
    changeDestination();
});							
// Функция приема данных с поля "Объем" LCL
function changeCBM(){
    CBM=jQuery('#CBM').val();
    if (CBM<=0){
        CBM=1;
        jQuery('#CBM').val('1');
    }}
jQuery('#CBM').change(function (){
    changeCBM();
});	
// Функция приема данных с поля "Вес" LCL
function changeWeight(){
    Weight=jQuery('#Weight').val();
    if (Weight< 1){
        Weight=1;
        jQuery('#Weight').val('1');
    }}
jQuery('#Weight').change(function (){
    changeWeight();
});				
// Служебная функция
function isNumeric(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}
//parseFloat(n) // Получаем из строки число с плавающей точкой или NaN в случае неудачи
//isNaN(n) // Собственно проверяет значение на NaN
//isFinite(n) // Проверяем является ли переданное значение конечным числом		
// НАЖАТИЕ НА КНОПКУ "РАССЧИТАТЬ" НА ФОРМЕ №1
function ButtonClickLCL(){
//БЛОК РАСЧЕТА МОРСКОГО ФРАХТА СБОРНЫХ ГРУЗОВ
// Определение столбца
	if (CBM<Weight/1000){seaLCLcalcValue=Weight/1000} else {seaLCLcalcValue=CBM};
	if(seaLCLcalcValue>=1&&seaLCLcalcValue<=2){seaLCLcalcPriceID="<=2"}
	else{if(seaLCLcalcValue>2&&seaLCLcalcValue<=3){seaLCLcalcPriceID="<=3"}
	else{if(seaLCLcalcValue>3&&seaLCLcalcValue<=4){seaLCLcalcPriceID="<=4"}
    else{if(seaLCLcalcValue>4&&seaLCLcalcValue<=5){seaLCLcalcPriceID="<=5"}
    else{if(seaLCLcalcValue>5&&seaLCLcalcValue<=6){seaLCLcalcPriceID="<=6"}
    else{if(seaLCLcalcValue>6&&seaLCLcalcValue<=7){seaLCLcalcPriceID="<=7"}
    else{if(seaLCLcalcValue>7&&seaLCLcalcValue<=8){seaLCLcalcPriceID="<=8"}
    else{if(seaLCLcalcValue>8&&seaLCLcalcValue<=9){seaLCLcalcPriceID="<=9"}
    else{if(seaLCLcalcValue>9&&seaLCLcalcValue<=10){seaLCLcalcPriceID="<=10"}
    else{if(seaLCLcalcValue>10){seaLCLcalcPriceID=">10"}
    }}}}}}}}};		
// Определение строки и присваивание				
for(var i=0; i<PriceListLCL.length; i++ ){ 
	if (PriceListLCL[i].POL == selectPort) { freightLCL=PriceListLCL[i][seaLCLcalcPriceID]*seaLCLcalcValue;
	if (freightLCL<PriceListLCL[i].Min ){freightLCL=PriceListLCL[i].Min; seaLCLcalcPriceID="Min";}
	}}
// БЛОК РАСЧЕТА ЖД ДОСТАВКИ
//по объему
if (CBM<3) {railLCLbyCBM=PriceListLCL_rail[0]["1"]*CBM}
	else {if (CBM>=3&&CBM<9){railLCLbyCBM=PriceListLCL_rail[0]["2"]*CBM}
	else {if (CBM>9&&CBM<15){railLCLbyCBM=PriceListLCL_rail[0]["3"]*CBM}
	else {if (CBM>15){railLCLbyCBM=PriceListLCL_rail[0]["4"]*CBM}
    }}};
	if (railLCLbyCBM<4100){railLCLbyCBM=4100};
// по весу
	if (Weight<500){railLCLbyKG=PriceListLCL_rail[1]["1"]*Weight}
	else {if (Weight>=500&&Weight<2000){railLCLbyKG=PriceListLCL_rail[1]["2"]*Weight}
	else {if (Weight>2000&&Weight<5000){railLCLbyKG=PriceListLCL_rail[1]["3"]*Weight}
	else {if (Weight>5000){railLCLbyKG=PriceListLCL_rail[1]["4"]*Weight}
	}}};
	if (railLCLbyKG<4100){railLCLbyKG=4100};
// сравнение
	if (railLCLbyKG>railLCLbyCBM){railLCL=railLCLbyKG}else{railLCL=railLCLbyCBM}
// БЛОК РАСЧЕТА АВТО ДОСТАВКИ
	if (CBM*500 > Weight) {deliveryLCLcalcValue=CBM*500} else {deliveryLCLcalcValue=Weight}
if (deliveryLCLcalcValue<=500){deliveryLCLcalcPriceID="<500"}
	else {if (deliveryLCLcalcValue>500&&deliveryLCLcalcValue<=1000){deliveryLCLcalcPriceID="500-1000"}
	else {if (deliveryLCLcalcValue>1000&&deliveryLCLcalcValue<=1500){deliveryLCLcalcPriceID="1000-1500"}
	else {if (deliveryLCLcalcValue>1500&&deliveryLCLcalcValue<=2000){deliveryLCLcalcPriceID="1500-2000"}
	else {if (deliveryLCLcalcValue>2000&&deliveryLCLcalcValue<=2500){deliveryLCLcalcPriceID="2000-2500"}
	else {if (deliveryLCLcalcValue>2500){deliveryLCLcalcPriceID=">2500"}
}}}}};
for(var i=0; i<PriceListLCL_delivery.length; i++ ){ 
	if (PriceListLCL_delivery[i].City == selectDestination) {deliveryLCL=PriceListLCL_delivery[i][deliveryLCLcalcPriceID]*deliveryLCLcalcValue}};
// БЛОК РАСЧЕТА СРОКА ДОСТАВКИ
for(var i=0; i<PriceListLCL.length; i++ ){ 
	if (PriceListLCL[i].POL == selectPort) { deliveryTime=PriceListLCL[i].Time}};
// Функция вывода значений
function changeTable() {
jQuery('.freight').text(Math.ceil(freightLCL) + ' USD');
	jQuery('.rail').text(Math.ceil(railLCL) + ' руб.');
	jQuery('.delivery').text(Math.ceil(deliveryLCL) + ' руб.');
	sumLCL=freightLCL+(railLCL+deliveryLCL)/usd;
jQuery('.sumLCL').text(Math.ceil(sumLCL) + ' USD');
	jQuery('.route').text('Маршрут: FOB '+ selectPort + ' - Владивосток - Москва - ' +selectDestination);
	jQuery('.info').text('Срок доставки: ' + deliveryTime + ' суток с даты выхода судна ');
	}	
// Проверка
function checkLCL(){
if (CBM!==undefined&&Weight!==undefined&&selectPort!==undefined&&selectDestination!==undefined){changeTable();}
	freightLCL = isNumeric(freightLCL) ? freightLCL : 0;
    railLCL = isNumeric(railLCL) ? railLCL : 1;
    deliveryLCL = isNumeric(deliveryLCL) ? deliveryLCL : 0;
    }			
	checkLCL();			
	} // ButtonClickLCL(){ END
// КОНЕЦ БЛОКА ОБРАБОТЧИКА НАЖАТИЯ НА КНОПКУ BUTTON #1
// Функция приема данных с поля "ОТКУДА" FCL
function changePortFCL(){
    selectPortFCL=jQuery('#portFCL option').filter(':selected').data('portfcl');
}			
// Запуск функций
jQuery('#portFCL').change(function (){
    changePortFCL();
});				
		
// Функция приема данных с поля "КУДА" FCL
function changeDestinationFCL(){
    selectDestinationFCL=jQuery('#destinationFCL option').filter(':selected').data('destinationfcl');
}			
// Запуск функций
jQuery('#destinationFCL').change(function (){
    changeDestinationFCL();
});			
// Функция приема данных с поля "ТИП КОНТЕЙНЕРА" FCL
function changeBoxFCL(){
selectBoxFCL=jQuery('#boxFCL option').filter(':selected').data('boxfcl');
}			
// Запуск функций
jQuery('#boxFCL').change(function (){
    changeBoxFCL();
});	
// НАЖАТИЕ НА КНОПКУ "РАССЧИТАТЬ" НА ФОРМЕ №2
function ButtonClickFCL(){
//БЛОК РАСЧЕТА МОРСКОГО ФРАХТА FCL
for(var i=0; i<PriceListFCL.length; i++ ){ 
	if (PriceListFCL[i].POL == selectPortFCL) { 
	if (selectBoxFCL=="20DC"){freightFCL=PriceListFCL[i]["20DC"]};
	if (selectBoxFCL=="40HC"){freightFCL=PriceListFCL[i]["40HC"]};
	}}
// БЛОК РАСЧЕТА ЖД ДОСТАВКИ	FCL
	if (selectBoxFCL=="20DC"){railFCL=PriceListFCL_rail[0]["20DC"]};
	if (selectBoxFCL=="40HC"){railFCL=PriceListFCL_rail[0]["40HC"]};
// БЛОК РАСЧЕТА АВТО ДОСТАВКИ FCL

for(var i=0; i<PriceListFCL_delivery.length; i++ ){ 
	if (PriceListFCL_delivery[i].City == selectDestinationFCL) {
	if(selectBoxFCL=="20DC"){deliveryFCL=PriceListFCL_delivery[i]["20DC"]}
	if(selectBoxFCL=="40HC"){deliveryFCL=PriceListFCL_delivery[i]["40HC"]}	
	}};
// БЛОК РАСЧЕТА СРОКА ДОСТАВКИ FCL
for(var i=0; i<PriceListFCL.length; i++ ){ 
	if (PriceListFCL[i].POL == selectPortFCL) { deliveryTimeFCL=PriceListFCL[i].Time}};
// Функция вывода значений
function changeTableFCL() {
jQuery('.freightFCL').text(Math.ceil(freightFCL) + ' USD');
	jQuery('.railFCL').text(Math.ceil(railFCL) + ' руб.');
	jQuery('.deliveryFCL').text(Math.ceil(deliveryFCL) + ' руб.');
	sumFCL=freightFCL+(railFCL+deliveryFCL)/usd;
jQuery('.sumFCL').text(Math.ceil(sumFCL) + ' USD');
	jQuery('.routeFCL').text('Маршрут: FOB '+ selectPortFCL + ' - Владивосток - Москва - ' +selectDestinationFCL);
	jQuery('.infoFCL').text('Срок доставки: ' + deliveryTimeFCL + ' суток с даты выхода судна ');
		}	
// Проверка
function checkFCL(){
    if (selectBoxFCL!==undefined&&selectPortFCL!==undefined&&selectDestinationFCL!==undefined){changeTableFCL();}
	freightFCL = isNumeric(freightLCL) ? freightLCL : 0;
    railFCL = isNumeric(railLCL) ? railLCL : 1;
    deliveryFCL = isNumeric(deliveryLCL) ? deliveryLCL : 0;
    }			
	checkFCL();			
	
		
} // ButtonClickFCL() END
// КОНЕЦ ОБРАБОТЧИКА НАЖАТИЯ НА КНОПКУ BUTTON #2

// Функция приема данных с поля "ОТКУДА" LCL Rail
function changeStationLCL(){
    selectStationLCL=jQuery('#stationRail option').filter(':selected').data('stationrail');
}			
// Запуск функций
jQuery('#stationRail').change(function (){
    changeStationLCL();
});			
// Функция приема данных с поля "КУДА" LCL Rail
function changeDestinationRail(){
selectDestinationRail=jQuery('#destinationRail option').filter(':selected').data('destinationrail');
}			
// Запуск функций
jQuery('#destinationRail').change(function (){
changeDestinationRail();
});					
// Функция приема данных с поля "Объем" LCL Rail
function changeCBMRail(){
CBMRail=jQuery('#CBMRail').val();
    if (CBMRail<=0){
        CBMRail=1;
        jQuery('#CBMRail').val('1');
    }}
jQuery('#CBMRail').change(function (){
changeCBMRail();
});	
// Функция приема данных с поля "Вес" LCL Rail
function changeWeightRail(){
    WeightRail=jQuery('#WeightRail').val();
    if (WeightRail< 1){
        WeightRail=1;
        jQuery('#WeightRail').val('1');
    }}
jQuery('#WeightRail').change(function (){
    changeWeightRail();
});				
// НАЖАТИЕ НА КНОПКУ "РАССЧИТАТЬ" НА ФОРМЕ №3
function ButtonClickLCLrail(){
// БЛОК РАСЧЕТА ЖД ДОСТАВКИ Rail LCL
if (WeightRail/500>CBMRail){RailLCLcalValue=WeightRail/500}else{RailLCLcalValue=CBMRail}
if (RailLCLcalValue<5){railLCLcalcPriceID="<5"}
else {if(RailLCLcalValue>5&&RailLCLcalValue<=10){railLCLcalcPriceID="<=10"}
else {if(RailLCLcalValue>10&&RailLCLcalValue<=15){railLCLcalcPriceID="<=15"}
else {if(RailLCLcalValue>15){railLCLcalcPriceID=">15"}
}}};
for(var i=0; i<PriceListLCLrailChina.length; i++ ){ 
	if (PriceListLCLrailChina[i].SOL == selectStationLCL) { RailLCLfreight=PriceListLCLrailChina[i][railLCLcalcPriceID]*RailLCLcalValue;
	if (RailLCLfreight<PriceListLCLrailChina[i].Min ){freightLCL=PriceListLCLrailChina[i].Min; railLCLcalcPriceID="Min";}
	}}
// БЛОК РАСЧЕТА АВТО ДОСТАВКИ Rail LCL
	if (CBMRail*500 >= WeightRail) {deliveryLCLcalcValueRail=CBMRail*500} else {deliveryLCLcalcValueRail=WeightRail}
	if (deliveryLCLcalcValueRail<=500){deliveryLCLcalcPriceIDrail="<500"}
	else {if (deliveryLCLcalcValueRail>500&&deliveryLCLcalcValueRail<=1000){deliveryLCLcalcPriceIDrail="500-1000"}
	else {if (deliveryLCLcalcValueRail>1000&&deliveryLCLcalcValueRail<=1500){deliveryLCLcalcPriceIDrail="1000-1500"}
	else {if (deliveryLCLcalcValueRail>1500&&deliveryLCLcalcValueRail<=2000){deliveryLCLcalcPriceIDrail="1500-2000"}
	else {if (deliveryLCLcalcValueRail>2000&&deliveryLCLcalcValueRail<=2500){deliveryLCLcalcPriceIDrail="2000-2500"}
	else {if (deliveryLCLcalcValueRail>2500){deliveryLCLcalcPriceIDrail=">2500"}
}}}}};
for(var i=0; i<PriceListLCL_delivery.length; i++ ){ 
	if (PriceListLCL_delivery[i].City == selectDestinationRail) {deliveryLCLrail=PriceListLCL_delivery[i][deliveryLCLcalcPriceIDrail]*deliveryLCLcalcValueRail}};
// БЛОК РАСЧЕТА СРОКА ДОСТАВКИ
for(var i=0; i<PriceListLCLrailChina.length; i++ ){ 
	if (PriceListLCLrailChina[i].SOL == selectStationLCL){deliveryTimeRailLCL=PriceListLCLrailChina[i].Time}};
// Функция вывода значений
function changeTable() {
	jQuery('.railRail').text(Math.ceil(RailLCLfreight) + ' USD');
	jQuery('.deliveryRail').text(Math.ceil(deliveryLCLrail) + ' руб.');
	var sumLCLrail=RailLCLfreight+(deliveryLCLrail/usd);
jQuery('.sumLCLrail').text(Math.ceil(sumLCLrail) + ' USD');
	jQuery('.routeRail').text('Маршрут: FOR '+ selectStationLCL + ' - Ворсино - ' +selectDestinationRail);
	jQuery('.infoRail').text('Срок доставки: ' + deliveryTimeRailLCL + ' суток с даты выхода состава ');
	}
// Проверка
function checkLCLrail(){
if (CBMRail!==undefined&&WeightRail!==undefined&&selectStationLCL!==undefined&&selectDestinationRail!==undefined){changeTable();}
	RailLCLfreight = isNumeric(RailLCLfreight) ? RailLCLfreight : 0;
    deliveryLCLrail = isNumeric(deliveryLCLrail) ? deliveryLCLrail : 0;
    }			
	checkLCLrail();	
} // ButtonClickLCLrail(){ END	

// КОНЕЦ ОБРАБОТЧИКА НАЖАТИЯ НА КНОПКУ BUTTON #3
// Функция приема данных с поля "ОТКУДА" FCL rail
function changeStationFCLrail(){
selectStationFCLrail=jQuery('#stationFCLrail option').filter(':selected').data('stationfclrail');
}			
// Запуск функции 
jQuery('#stationFCLrail').change(function (){
changeStationFCLrail();
});			
// Функция приема данных с поля "КУДА" FCL rail
function changeDestinationFCLrail(){
selectDestinationFCLrail=jQuery('#destinationFCLrail option').filter(':selected').data('destinationfclrail');
}			
// Запуск функции
jQuery('#destinationFCLrail').change(function (){
    changeDestinationFCLrail();
});			
// НАЖАТИЕ НА КНОПКУ "РАССЧИТАТЬ" НА ФОРМЕ №4
function ButtonClickFCLrail(){
//БЛОК РАСЧЕТА ЖД ФРАХТА FCL rail
for(var i=0; i<PriceListFCLrail.length; i++ ){ 
	if (PriceListFCLrail[i].SOL == selectStationFCLrail) { 
	freightFCLrail=PriceListFCLrail[i]["40"]+PriceListFCLrail[i]["Terminal"]
}}
// БЛОК РАСЧЕТА АВТО ДОСТАВКИ FCL rail
for(var i=0; i<PriceListFCL_delivery.length; i++ ){ 
	if (PriceListFCL_delivery[i].City == selectDestinationFCLrail) {
	deliveryFCLrail=PriceListFCL_delivery[i]["40HC"]	
	}};
// БЛОК РАСЧЕТА СРОКА ДОСТАВКИ FCL rail
for(var i=0; i<PriceListFCLrail.length; i++ ){ 
	if (PriceListFCLrail[i].SOL == selectStationFCLrail) {deliveryTimeFCLrail=PriceListFCLrail[i].Time}};
// Функция вывода значений///////////////////////
function changeTableFCLrail() {
jQuery('.railFCLrail').text(Math.ceil(freightFCLrail) + ' USD');
	jQuery('.deliveryFCLrail').text(Math.ceil(deliveryFCLrail) + ' руб.');
	sumFCLrail=freightFCLrail+(deliveryFCLrail/usd);
jQuery('.sumFCLrail').text(Math.ceil(sumFCLrail) + ' USD');
	jQuery('.routeFCLrail').text('Маршрут: FOR '+ selectStationFCLrail + ' - Ворсино - ' +selectDestinationFCLrail +'; 40HC ');
	jQuery('.infoFCLrail').text('Срок доставки: ' + deliveryTimeFCLrail + ' суток с даты выхода состава ');
	}		
// Проверка//////////////////////////////
function checkFCLrail(){
if (selectStationFCLrail!==undefined&&selectDestinationFCLrail!==undefined){changeTableFCLrail();}
	//freightFCLrail = isNumeric(freightFCLrail) ? freightFCLrail : 0;
    deliveryFCLrail = isNumeric(deliveryFCLrail) ? deliveryFCLrail : 0;
    }			
	checkFCLrail();			
} // ButtonClickFCLrail() END
// КОНЕЦ ОБРАБОТЧИКА НАЖАТИЯ НА КНОПКУ BUTTON#4