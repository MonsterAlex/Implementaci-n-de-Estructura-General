var menu=document.querySelector("#menu");

var menuItems=[
  {"item":"Importación de Productos","icon":"file_download"},
  {"item":"Explóracion de Competidores","state":"exploracionCompetidores","icon":"insert_chart"},
  {"item":"Exploración de Productos","state":"exploracionProductos","icon":"grid_on"},
  {"item":"Definición de Precios","icon":"attach_money"},
  {"item":"Exportación de Productos","icon":"file_upload"}
];

var menuContext={menuItems};
manu.innerHTML=PriceApp.menu(menuContext);

var stateFilter="medium";

var appContent=document.querySelector("#appContent")

function getStateTitle(state){
  for(var i=0;i<menuItems.length;i++){
    if(menuItems[i].state === state)
      return menuItems[i].item;
  }
};

function changeState(state){
  var appContentContext={"state":state,"title":getStateTitle(state)};
  appContent.innerHTML=PriceApp.content(appContentContext);
  var statePage=document.querySelector("#"+state);
  $(".menuLinks").removeClass("menuActive");
  $("#"+state+"Link").addClass("menuActive");
  statePage.innerHTML=PriceApp[state]();

  if(state==="exploracionProductos"){
    var sliders=document.querySelectorAll(".sliders");
    sliders.forEach(function(slider){
      slider.innerHTML=PriceApp.slider();
      noUiSlider.create(slider.querySelector(".filterSliders"){
        start:[10,50],
        conect:true,
        step:1,
        range:{
          'min':0,
          'max':100
        },
        format:wNumb({
          decimals:0
        })
      });
    });

  $('#buscarProducto').autocomplete({
    data:{
      "Calzado deportivo": null,
      "Calzado para hombre": null,
      "Calzado para mujer": null
    }
  });

  var tableProductsInfo=document.querySelector("#productsTable");
  var productsInfo= [
    {"name":"Producto 1","price":134,"competidor1":123,"competidor2":145,"inventory":5},
    {"name":"Producto 2","price":156,"competidor1":134,"competidor2":123,"inventory":0},
    {"name":"Producto 1","price":45,"competidor1":45,"competidor2":45,"inventory":12}
  ];
  tableProductsInfo.innerHTML=PriceApp.tableProducts({products:productsInfo});
  changeWidthAndShow();
  }
};

changeState("exploracionProductos");

//////activador del boton de menu para diseño Responsivo
$(".button-collapse").sideNav();

function changeWidthAndShow(){
  if($('.competidorCard')){
    $('.competidorCard').eq(1)
        .width($('.competidorCard').eq(0).width());
      }
      ////para que se vuelva a mostrar los fitros que desaparecen cuando no se esta en diseño responsivo
      if($('#filterContainer') || $('#tableContainer')){
        if($(window).width()>600){
          $('#filterContainer').show();
          $('#tableContainer').show();
          stateFilter="medium";
        }else{
          if(stateFilter==="medium"){
            /////////para diseño responsivode los filtros y PRODUCTOS
            $('#filterContainer').hide();
            $('#tableContainer').show();
            stateFilter="small";
          }
        }
      }
};

/////Diseño responsivo de las cartas de los Competidores
$(window).resize(function(){
  changeWidthAndShow();
});

function showFilter(){
  $('#filterContainer').show();
  $('#tableContainer').hide();
}
function showProucts(){
  $('#filterContainer').hide();
  $('#tableContainer').show();
}
