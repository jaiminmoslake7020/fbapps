/**
 * Created by SWING Home on 7/21/14.
 */

$('.dropdown-toggle').dropdownHover();


$('a[data-toggle="tooltip"]').tooltip();

$('.privacyPolicy').click(function(e){

e.preventDefault();

    $.ajax({
        url : "privacypolicy.html",
        type : "GET",
        dataType : "HTML",
        success : function(response){

            $('#privacyModal').find('.modal-body').html(response);
            $('#privacyModal').modal('show');

        },
        error : function(){
            alert("some thing wrong happende.");
        }
    });

});



var authToken ;
window.onload = function(){

    //alert("hi how are you");

    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var imageObj = new Image();
    imageObj.onload = function(){

        context.drawImage(imageObj, 10, 10);
        context.font = "30pt Calibri";
        context.fillText("Jaimin MosLake \t Is Awesome", 15, 480);
    };
    imageObj.src = "images/image.png";


};

var mark = 50;
var markStart = 50  ;

$('#exampleInputEmail1').keyup(function(){

    var value = $(this).val();

    $('#test').html(value);
    $('#test').css("font-size",(mark*1.34)+"px");

    console.log(mark+"===================="+$('#test').width());

    if($('#test').width() >= 400)
    {
        mark = mark-15;
    }
    else
    {
        if(mark >= 50)
        {

        }
        else
        {
            while($('#test').width() < 400)
            {
                if(mark >= 50)
                {
                    break;
                }
                else
                {

                    $('#test').css("font-size",(mark*1.34)+"px");

                    if($('#test').width() < 400)
                    {
                        mark = mark+5;
                    }

                }

            }
        }

    }

    console.log(mark+"===================="+$('#test').width());



    var dynamicValue = 500-parseInt($('#test').width());
    dynamicValue = dynamicValue/2 ;

    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var imageObj = new Image();
    imageObj.onload = function(){

        context.drawImage(imageObj, 10, 10);
        context.font = mark+"pt Calibri";
        context.fillText(value, dynamicValue, 480);

    };
    imageObj.src = "images/image.png";


});




// Converts canvas to an image
function convertCanvasToImage() {
    var canvas = document.getElementById("myCanvas");
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

    $('#facebookLogin').modal('show');

    ///PostImageToFacebook(authToken);

    return image;
}
