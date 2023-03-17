var str
var filename;
var fileStr;
export function GetStr() {

    return fileStr;
}
export function SetOrder(f, fun) {
    var reader = new FileReader();

    reader.onload = function () {

        str = "";
        fileStr = "";
        filename = f.name;
        str = reader.result;
        var arrStr = str.split("\r\n");

        var max = arrStr.length;
        var row = Math.round(Math.random() * (max - 50) + 20);
        var returnStr = "";
        var strTemp = "";
        for (var i = 0; i < 10; i++) {
            if (i < 9)
                strTemp += arrStr[row + i] + "&&";
            else
                strTemp += arrStr[row + i];
            console.log(arrStr[row + i]);
        }
        returnStr += strTemp + "#%#";
        strTemp = "";
        row = Math.round(Math.random() * (max - 50) + 20);
        for (var i = 0; i < 10; i++) {
            if (i < 9)
                strTemp += arrStr[row + i] + "&&";
            else
                strTemp += arrStr[row + i];
            console.log(arrStr[row + i]);
        }
        returnStr += strTemp + "#%#";
        strTemp = "";
        row = Math.round(Math.random() * (max - 50) + 20);
        for (var i = 0; i < 10; i++) {
            if (i < 9)
                strTemp += arrStr[row + i] + "&&";
            else
                strTemp += arrStr[row + i];
            //console.log(arrStr[row + i]);
        }
        returnStr += strTemp;
        console.log(returnStr);//�ϴ��ַ���
        strTemp = "";
        fileStr = returnStr;
        fun();
        //return returnStr;

        //doSave("%\r\n(Order:" + id + ")\r\n", "text/latex")
    }

    reader.readAsText(f, "gb2312");
}
export function doSave(value) {

   var type = "text/latex";
    value = "%\r\n(Order:" + value + ")\r\n" + str.substring(3);
    var blob;

    if (typeof window.Blob == "function") {

        blob = new Blob([value], {

            type: type

        });

    } else {

        var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;

        var bb = new BlobBuilder();

        bb.append(value);

        blob = bb.getBlob(type);

    }

    var URL = window.URL || window.webkitURL;

    var bloburl = URL.createObjectURL(blob);

    var anchor = document.createElement("a");

    if ('download' in anchor) {

        anchor.style.visibility = "hidden";

        anchor.href = bloburl;

        anchor.download = filename;

        document.body.appendChild(anchor);

        var evt = document.createEvent("MouseEvents");

        evt.initEvent("click", true, true);

        anchor.dispatchEvent(evt);

        document.body.removeChild(anchor);

    } else if (navigator.msSaveBlob) {

        navigator.msSaveBlob(blob, filename);

    } else {

        location.href = bloburl;

    }

}