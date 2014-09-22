/**
 * Created by SWING Home on 7/21/14.
 */

$('.dropdown-toggle').dropdownHover();

var setScreenHeight = $(window).height();

if(setScreenHeight > 767)
{
    setScreenHeight = setScreenHeight-$('#header').height();
    setScreenHeight = setScreenHeight-$('#cubexNavBar').height();
}

$('.heightScreen').css('height',setScreenHeight+'px');

$('#logoNavBar').find('ul.nav li a').click(function(e){

     e.preventDefault();
    //  alert('hi how are you');

    $(this).parents('ul.nav').children('li').removeClass('active');
    $(this).parent('li').addClass('active');

    var href = $(this).attr('data-href') ;
    var top = $(this).attr('data-top') ;
    $(document).scrollTo( href , 1000, {offset: function() { return {top:-top, left:-5}; }});


});


count = 0 ;
$('#logoNavBar').waypoint(function(direction) {
 //  alert('Top of thing hit top of viewport.'+window.scrollY);



    console.log('Top of thing hit top of viewport.'+window.scrollY);

    if(count > 1 )
    {
        if( $('#logoNavBar').hasClass('myCustomFixed'))
        {
            console.log('removeClass.'+window.scrollY);
            $('#logoNavBar').removeClass('myCustomFixed');
        }
        else
        {
            console.log('addClass.'+window.scrollY);
            $('#logoNavBar').addClass('myCustomFixed');
        }
    }

    count++;



});



//$('.mosLakeCarousal').find('img').click(function(){
//
//    if($(this).parent('a').hasClass('caroselIcon')  ||  $(this).parent('a').hasClass('caroselIcon2'))
//    {
//        // alert('hi');
//       // return false;
//    }
//    else
//    {
//        var img = $(this).clone();
//
//        $('#imageModal').find('.modal-body').find('.putImage').html(img);
//        $('#imageModal').modal('show');
//
//    }
//
//});


$('.portFolioBox').click(function(){

        var img = $(this).clone();

        img.addClass('adderImageClass');

        $('#imageModal').find('.modal-body').find('.putImage').html(img);
        $('#imageModal').modal('show');


});



$('.portFolioBox1').click(function(){

        var img = $(this).clone();

        img.addClass('adderImageClass');

        $('#imageModal').find('.modal-body').find('.putImage').html(img);
        $('#imageModal').modal('show');


});


