fabric = (function(f) {
    var nativeOn = f.on;
    var dblClickSubscribers = [];
    var nativeCanvas = f.Canvas;
    f.Canvas = (function(domId, options) {
        var canvasDomElement = document.getElementById(domId);
        var c = new nativeCanvas(domId, options);
        c.dblclick = function(handler) {
            dblClickSubscribers.push(handler)
        };
        canvasDomElement.nextSibling.ondblclick = function(ev){
            for(var i = 0; i < dblClickSubscribers.length; i++) {
                console.log(ev); dblClickSubscribers[i]({ e :ev });
            }
        };
        return c;
    });
    return f;
}(fabric));

$('#textController').draggable();
$(".pick-a-color").pickAColor();
$("[data-toggle='tooltip']").tooltip();

$('#fontFamilyDropDown option').each(function(index,element){

    var value = $(element).html();
    $(element).attr("value",value);
    $(element).css("font-family",value);

});



// canvas
var cI = $('#c');
var canvas = new fabric.Canvas('c');
canvas.backgroundColor = "#F5F5F5";
canvas.renderAll();


// text

$('body').on('click','.addText',function(){

    var text = new fabric.Text('Double Click here to change Text!!');
    text.hasRotatingPoint = true;
    text.textAlign = "center";
    text.fontFamily = "MyriadPro";
    text.fontSize = "30";
    text.fontColor = "#000000";
    text.fontWeight = "normal";
    text.fontStyle = "normal";
    text.top = 50;
    text.left = 100;
    canvas.add(text);
    canvas.renderAll();

});


$('body').on('click','.modalImgBtn',function(e){

    var imgElement = $('#imagePushModal .modal-body img.selected');
    var src = imgElement.attr('src');

    fabric.Image.fromURL(src, function(oImg) {

        oImg.top = 50;
        oImg.left = 100 ;

        canvas.add(oImg);
        console.log(oImg);
    });


    canvas.renderAll();

    $('#imagePushModal').modal('hide');


//    var canvasN = document.getElementById("c");
//    var context = canvasN.getContext("2d");
//    var imageObj = new Image();
//    imageObj.onload = function(){
//        context.drawImage(imageObj, 300, 300);
//    };
//    imageObj.src = src;


});


$('body').on('click','.addImg',function(){

    $.ajax({
        url : "images.html",
        type : "GET",
        dataType : "HTML",
        success:function(data){
//            console.log("success " + data);

            $('#successAlert p span').html("Successfully images are loaded.");
            $('#imagePushModal .modal-body').append($('#successAlert'));

            $('#imagePushModal .modal-body').append(data);
            $('#imagePushModal').modal('show');

        },
        error:function(shr,status,data){
            console.log("error " + data + " Status " + shr.status);

            $('#dangerAlert p span').html("error " + data + " Status " + shr.status);
            $('#alertBoxContainer').html($('#dangerAlert'));

        }
    });


});



var itemProperties ;
var currentSelection ;
var lastRotationPoint;
canvas.dblclick(function(e) {
    activeObject = canvas.getActiveObject();
    currentSelection = activeObject;

    console.log(currentSelection);

    if(typeof currentSelection._element == 'undefined')
    {
        console.log("yes");


        if('type' in activeObject){


            if(activeObject.type = "text")
            {

                $('#textDone').removeAttr('disabled');

                itemProperties = activeObject;
                lastRotationPoint = activeObject.hasRotatingPoint;
                activeObject.hasRotatingPoint = false;

                canvas.renderAll();

                var topText = activeObject.top ;
                var leftText = activeObject.left ;
                var addX = 20;
                var addY = 20;

                if(topText > 0)
                {
                    topText = topText-20;
                    topText = topText > 0 ? topText : 0;
                    addX = topText > 0 ? 40 : 20 ;
                }
                else
                {
                    addX = topText > 0 ? 40 : 20 ;
                }

                if(leftText > 0)
                {
                    leftText = leftText-20;
                    leftText = leftText > 0 ? leftText : 0 ;
                    addY = leftText > 0 ? 40 : 20 ;
                }
                else
                {
                    addY = leftText > 0 ? 40 : 20 ;
                }

                console.log(addX+"============"+addY);

                var topText = topText + cI.parent('.canvas-container').position().top;
                var leftText = leftText + cI.parent('.canvas-container').position().left;
                var widthText = activeObject.width+addX;
                var heightText = activeObject.height+addY;
                var value = activeObject.text;

                var textAlign = activeObject.textAlign;
                var fontSize = activeObject.fontSize;
                var fontFamily = activeObject.fontFamily;
                var fontColor = activeObject.fontColor;
                var fontStyle = activeObject.fontStyle;

                var TheTarget =  activeObject;


                $('#textController').css({"top":(topText+heightText+20)+"px",
                    "left":leftText+"px"
                });

                $('#textController').fadeIn('slow');

                console.log(cI.position().top+"================"+cI.position().left+"========="+textAlign+"=========="+value);

                console.log(TheTarget);

                $html = $('<textarea id="rendomeText" >'+value+'</textarea>');
                $html.css({"position":"absolute",
                    "top":topText+"px",
                    "left":leftText+"px",
                    "width":widthText+"px",
                    "height":heightText+"px",
                    "text-align":textAlign,
                    "font-size":fontSize+"px",
                    "font-family":fontFamily,
                    "font-color":fontColor,
                    "font-style":fontStyle
                });
                $("body").append($html);

            }


        }



    }
    else
    {
        console.log("No");
    }



});


$('body').on('keyup','#rendomeText',function(e){

    console.log(currentSelection);

    currentSelection.opacity = 0 ;
    currentSelection.text=$('#rendomeText').val();
    canvas.renderAll();

    returnArray = returnWh();

    $('#rendomeText').css({
        'width': returnArray['width'],
        'height': returnArray['height'],
        'top': returnArray['top'],
        'left': returnArray['left']
    });


});

$('body').on('change','#sizePicker',function(e){

    console.log(currentSelection);

    var fs = $('#sizePicker option:selected').text();

    console.log(fs);
    currentSelection.opacity = 0 ;
    currentSelection.fontSize=fs;
    canvas.renderAll();

    returnArray = returnWh();

    $('#rendomeText').css({
        'font-size' : fs+"px",
        'width': returnArray['width'],
        'height': returnArray['height'],
        'top': returnArray['top'],
        'left': returnArray['left']
    });


});



$('body').on('click','#textDone',function(e){

    $(this).attr('disabled','disabled');

    console.log(currentSelection);

    for (var key in currentSelection) {
        if (currentSelection.hasOwnProperty(key)) {
            console.log(key + " -> " + currentSelection[key]);
        }
    }

    currentSelection.opacity = 1 ;
    currentSelection.hasRotatingPoint = lastRotationPoint;
    currentSelection.text=$('#rendomeText').val();
    canvas.renderAll();

    $('#textController').fadeOut('slow');
    $('#rendomeText').remove();


});

$('body').on('change','#fontFamilyDropDown',function(e){
//$('#fontFamilyDropDown').change(function(e){

    console.log(currentSelection.width+"======="+currentSelection.height);

    currentSelection.opacity = 0 ;
    currentSelection.fontFamily = $(this).val() ;
    canvas.renderAll();

    returnArray = returnWh();
    $('#rendomeText').css({'font-family':$(this).val(),
                           'width': returnArray['width'],
                           'height': returnArray['height'],
                           'top': returnArray['top'],
                           'left': returnArray['left']
                          });
});

$('body').on('click','.addEffect', function(e){


      if($(this).hasClass('btn-default'))
      {
          $(this).removeClass('btn-default').addClass('btn-primary');
      }
      else
      {
          $(this).removeClass('btn-primary').addClass('btn-default');
      }

    currentSelection.opacity = 0 ;

    if($(this).attr('data-action') == "bold")
    {
        if(currentSelection.fontWeight == "bold")
        {
            currentSelection.fontWeight = "normal";
        }
        else
        {
            currentSelection.fontWeight = "bold";
        }
    }

    if($(this).attr('data-action') == "italic")
    {
        if(currentSelection.fontStyle == 'italic')
        {
            currentSelection.fontStyle = "normal";
        }
        else
        {
            currentSelection.fontStyle = 'italic';
        }
    }

    if($(this).attr('data-action') == "underline")
    {
        $(this).siblings('button[data-action="strikethrough"]').removeClass('btn-primary').addClass('btn-default');
        if(currentSelection.textDecoration == 'underline')
        {
            currentSelection.textDecoration = "none";
        }
        else
        {
            currentSelection.textDecoration = 'underline';
        }
    }

    if($(this).attr('data-action') == "strikethrough")
    {
        $(this).siblings('button[data-action="underline"]').removeClass('btn-primary').addClass('btn-default');
        if(currentSelection.textDecoration == 'line-through')
        {
            currentSelection.textDecoration = 'none';
        }
        else
        {
            currentSelection.textDecoration = 'line-through';
        }
    }

    console.log(currentSelection);
    canvas.renderAll();
    returnArray = returnWh();

    if($(this).attr('data-action') == "bold")
    {
        if($('#rendomeText').css('font-weight') == "bold")
        {
            $('#rendomeText').css({
                'font-weight': "normal",
                'width': returnArray['width'],
                'height': returnArray['height'],
                'top': returnArray['top'],
                'left': returnArray['left']
            });
        }
        else
        {
            $('#rendomeText').css({
                'font-weight': "bold",
                'width': returnArray['width'],
                'height': returnArray['height'],
                'top': returnArray['top'],
                'left': returnArray['left']
            });
        }
    }

    if($(this).attr('data-action') == "italic")
    {
        if($('#rendomeText').css('font-style') == "italic")
        {
            $('#rendomeText').css({
                'font-style': "normal",
                'width': returnArray['width'],
                'height': returnArray['height'],
                'top': returnArray['top'],
                'left': returnArray['left']
            });
        }
        else
        {
            $('#rendomeText').css({
                'font-style': "italic",
                'width': returnArray['width'],
                'height': returnArray['height'],
                'top': returnArray['top'],
                'left': returnArray['left']
            });
        }
    }

    if($(this).attr('data-action') == "underline")
    {

        if($('#rendomeText').css('text-decoration') == "underline")
        {
            $('#rendomeText').css({
                'text-decoration':"none",
                'width': returnArray['width'],
                'height': returnArray['height'],
                'top': returnArray['top'],
                'left': returnArray['left']
            });
        }
        else
        {
            $('#rendomeText').css({
                'text-decoration':"underline",
                'width': returnArray['width'],
                'height': returnArray['height'],
                'top': returnArray['top'],
                'left': returnArray['left']
            });
        }

    }

    if($(this).attr('data-action') == "strikethrough")
    {

        if($('#rendomeText').css('text-decoration') == "line-through")
        {
            $('#rendomeText').css({
                'text-decoration':"none",
                'width': returnArray['width'],
                'height': returnArray['height'],
                'top': returnArray['top'],
                'left': returnArray['left']
            });
        }
        else
        {
            $('#rendomeText').css({
                'text-decoration':"line-through",
                'width': returnArray['width'],
                'height': returnArray['height'],
                'top': returnArray['top'],
                'left': returnArray['left']
            });
        }

    }



});

$('body').on('change','#colorPicker', function(){

        var colorAwesome = $(this).val();

        $('#rendomeText').css({
            'color':"#"+colorAwesome
        });

        console.log($(this).val());
        currentSelection.fill = "#"+colorAwesome;
        console.log(currentSelection);
        canvas.renderAll();

});


$('body').on('change','#colorPickerMain', function(){

    console.log($(this).val());
    var colorAwesome = $(this).val();
    addColor("#"+colorAwesome)

});

function addColor(back)
{
    canvas.backgroundColor = back ;
    canvas.renderAll();
}


function returnWh()
{
    var topText = currentSelection.top ;
    var leftText = currentSelection.left ;
    var addX = 20;
    var addY = 20;

    if(topText > 0)
    {
        topText = topText-20;
        topText = topText > 0 ? topText : 0;
        addX = topText > 0 ? 40 : 20 ;
    }
    else
    {
        addX = topText > 0 ? 40 : 20 ;
    }

    if(leftText > 0)
    {
        leftText = leftText-20;
        leftText = leftText > 0 ? leftText : 0 ;
        addY = leftText > 0 ? 40 : 20 ;
    }
    else
    {
        addY = leftText > 0 ? 40 : 20 ;
    }

    var returnArray = [] ;
    returnArray['width'] = activeObject.width+addX;
    returnArray['height'] =  activeObject.height+addY;
    returnArray['top'] = topText + cI.parent('.canvas-container').position().top;
    returnArray['left'] = leftText + cI.parent('.canvas-container').position().left;

    return returnArray;
}


// Converts canvas to an image
function convertCanvasToImage() {
    var canvas = document.getElementById("c");
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    var imageData  = canvas.toDataURL("image/png");

    try
    {
        blob = dataURItoBlob(imageData);
    }
    catch(e)
    {
        console.log(e);
    }

    $('#fbsharebox').html(image)


    if(authToken != null && authToken != "")
    {
        $('#shareBox').modal('show');
    }
    else
    {
        $('#facebookLogin').modal('show');
    }


    ///PostImageToFacebook(authToken);

    return image;
}
