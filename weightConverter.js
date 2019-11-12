
var options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["ingredient"]
};



setupDensitySearch();
setupUnitSearch();

document.getElementById('ingredientOutput').style.visibility='hidden'
document.getElementById('unitOutput').style.visibility='hidden'
var ingredientOutputElements = document.getElementById("ingredientOutput").getElementsByClassName("card-body");
var unitOutputElements = document.getElementById("unitOutput").getElementsByClassName("card-body");


document.getElementById('ingredient').addEventListener('input',
function(e){
  document.getElementById('ingredientOutput').style.visibility='visible'
  let ingredient = e.target.value;
result = densitySearch.search(ingredient);
updateResults(ingredientOutputElements,"ingredient","density");
console.log(ingredient);
})

document.getElementById('unit').addEventListener('input',
function(e){
  document.getElementById('unitOutput').style.visibility='visible'
  let unit = e.target.value;
result = unitSearch.search(unit);
updateResults(unitOutputElements,"name","unit");
console.log(unit);
})





function setupDensitySearch(){
  fetch('densities.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      densities = data;
      densitySearch = new Fuse(densities,options);
    })
}

function setupUnitSearch(){
  fetch('units.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      units = data;
      var unitOptions = options;
      unitOptions.keys=["name"];
      unitSearch = new Fuse(units,unitOptions);
    })
}

function updateResults(elements,key1,key2){
  // var elements = document.getElementsByClassName("card-body");
  var selectedIngredient = result[0];
  for (var i= 0, j=elements.length; i < j; i++) {
    elements[i].innerHTML=result[i][key1];
    elements[i].innerHTML+="   "+result[i][key2]+" g/cm³"
  }
}
