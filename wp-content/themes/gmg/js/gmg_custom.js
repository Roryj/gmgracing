/*
 * refine vehicle script
 */

function init_vehicle_search(){
  jQuery('.link-refine-vehicle').on("click", function(){
        jQuery('#form-refine-vehicle').toggle();
    });
    
    jQuery('.make-selector').on('change', function(){
        jQuery('.model-selector').addClass('hidden');
        jQuery('#make-' + jQuery(this).val() + '-models').removeClass('hidden');
    });
    
    jQuery('#form-refine-vehicle form').on('submit', function(e){
        e.preventDefault();
        
        var make = jQuery('.make-selector').val();
        var model = jQuery('#make-' + make + '-models').val();
        
        var term = "";
        if(make!="")
            term=make;
        if(model!= "")
            term=model;
        if(term)
        {
            window.location = "/?project-model="+term;
        }else
        {
            return;
        }
            
    });
}


/*
 * menu
 */

var menuTimeout = null;
var menuId = null;
var current_menu_id = null;
function hide_submenu(func1){

  jQuery('#menu-main-menu>li').removeClass('active');
  jQuery('.sub-menu li').fadeOut(500, function(){
    jQuery('.sub-menu').slideUp(500);
  });

  if(func1){
    func1();
  }
}

function show_submenu(parent){
  parent = jQuery("#" + parent);
  var submenu = jQuery('.sub-menu', parent);

  //jQuery(submenu).css({left: -1 *  jQuery(parent).offset().left});
  //jQuery(submenu).width(jQuery(window).width());

  jQuery(submenu).css({top: jQuery(parent).height() + 5});
  jQuery('#menu-main-menu>li').removeClass('active');
  jQuery(parent).addClass('active');
  

  submenu.slideDown(500, function(){
    jQuery('li', submenu).fadeIn(500);
  });
}

function init_menu(){
  jQuery('#menu-main-menu .sub-menu').parent('li').addClass("parent");
  
  current_menu_id = jQuery('.current-menu-parent').attr('id');
  if(current_menu_id)
  { 
    setTimeout("show_submenu(current_menu_id);", 600);
  }


  jQuery('#menu-main-menu>li').hover(function(e){
      clearTimeout(menuTimeout);
      if(jQuery('.sub-menu:visible', this).length > 0)
      {
        return true;
      }

      if(jQuery(this).hasClass('parent')){
        menuId = jQuery(this).attr('id');
        hide_submenu(function(){
          menuTimeout = setTimeout("show_submenu(menuId);", 600);
        });
      }else{
        menuTimeout = setTimeout("hide_submenu();", 600);
      }
   }, function(){});



   jQuery('header').hover(function(){}, function(){
      menuTimeout = setTimeout("hide_submenu();", 600);
   });
}

/*
 * search box
 */

function init_searchbox(){
  jQuery('#search-form .clear').on("click", function(e){
     jQuery('#search-form input').val("");
   });
}

/*
 * partner logos
 */
function init_partners(){
  jQuery('#our-partners a img').hover(
      function()
      {
        var src = jQuery(this).attr('src');
        var src1 = jQuery(this).attr('src').replace(".png", "") + "-on.png";
        jQuery(this).attr('src', src1);
      }, function(){
        var src = jQuery(this).attr('src');
        var src1 = jQuery(this).attr('src').replace("-on.png", "") + ".png";
        jQuery(this).attr('src', src1);
      }
  );
}

function init_device(){
 
    if(jQuery('.device.visible-sm:visible').length > 0)
    {
      jQuery('body').attr('class','device-sm');
    }
    if(jQuery('.device.visible-md:visible').length > 0)
    {
      jQuery('body').attr('class','device-md');
    }
    if(jQuery('.device.visible-lg:visible').length > 0)
    {
      jQuery('body').attr('class','device-lg');
    }
    if(jQuery('.device.visible-xs:visible').length > 0)
    {
      jQuery('body').attr('class','device-xs');
    }
}
jQuery(function($){
  init_searchbox();
  init_menu(); 
  init_vehicle_search();
  init_partners();
  init_device();

});

jQuery(function($){
  $(window).resize(function(){
    init_device();
  });
});

function toggleMap() {
    if (!jQuery('#map').hasClass('map-show')) {
        jQuery('#map').addClass('map-show');
        jQuery('#map').hide();
    }
    
    jQuery('#map').slideToggle("slow", function(){
        jQuery("html, body").animate({ scrollTop: jQuery(document).height() }, 1000);
    });
}
function mapUp() {
    jQuery('#map').slideUp("slow", function(){
        // jQuery("html, body").animate({ scrollTop: jQuery(document).height() }, 1000);
    });
}
jQuery(document).ready(function($){
    $('#link-map').click(function(e){
        toggleMap();
        e.stopPropagation();    
    });
    $('#map').click(function(e){
        e.stopPropagation();
    });
    $('body').click(function(){
        mapUp();
    });
});
