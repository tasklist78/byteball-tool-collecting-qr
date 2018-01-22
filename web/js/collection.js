var drawQRcode = function(text, typeNumber, errorCorrectionLevel) {
  document.write(create_qrcode(text, typeNumber, errorCorrectionLevel) );
};

var createQRcode = function(text, typeNumber,errorCorrectionLevel, mode, mb) {

  qrcode.stringToBytes = qrcode.stringToBytesFuncs[mb];

  var qr = qrcode(typeNumber || 4, errorCorrectionLevel || 'M');
  qr.addData(text, mode);
  qr.make();

//  return qr.createTableTag();
//  return qr.createSvgTag();
  return qr.createImgTag(4);
};

var updateAll = function() {

  var querytStr =location.search.substring(1);
　var obj = QueryString.parse(querytStr,'&','=',true);
　console.log(obj);
　
  var t = 6;
  var e = 'Q';
  var m = 'Byte';
  var mb = 'default';
  var text ="byteball:";
  	  
  if(obj["title"]) document.getElementById('title').innerText = obj["title"];
  if(obj["description"]) document.getElementById('description').innerText = obj["description"];
  
  if(obj["address"]){
	document.getElementById('address').innerText = "Byteball Address: "+obj["address"];
  	text = text+obj["address"];
  }
  if(obj["img"]) document.getElementById('img').src = "images/"+obj["img"];
  
  if(obj["amount"]) {
    document.getElementById('amount').innerText = "Amount: "+(parseFloat(obj["amount"])) +" M bytes";
  	text = text+"?amount="+(parseFloat(obj["amount"])*1000*1000);
  }
  if(obj["message"]) {
  	document.getElementById('message').innerText = "Message: "+obj["message"];
  }
  
  if(obj["btn"]) document.getElementById('send').innerText = obj["btn"];
  
  console.log(text);
  document.getElementById('qr').innerHTML = createQRcode(text, t, e, m, mb);
  
  document.getElementById("send").onclick = function(){
  	console.log(text);
    location.href = text
  };
  
  var date = new Date(); 
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  
  document.getElementById('date').innerText = ""+year+"/"+month+"/"+day+" "+hour+":"+minute+":"+second;
	
};

updateAll();