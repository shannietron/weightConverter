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

document.getElementById('ingredientOutput').style.visibility = 'hidden'
document.getElementById('unitOutput').style.visibility = 'hidden'
document.getElementById('convertedOutput').style.visibility = 'hidden'

var ingredientOutputElements = document.getElementById("ingredientOutput").getElementsByClassName("card-body");
var unitOutputElements = document.getElementById("unitOutput").getElementsByClassName("card-body");
var outputGrams = document.getElementById("outputGrams");
var outputMillilitres = document.getElementById("outputMillilitres");


document.getElementById('ingredient').addEventListener('input',
  function(e) {
    document.getElementById('ingredientOutput').style.visibility = 'visible'
    let ingredient = e.target.value;
    let result = densitySearch.search(ingredient);
    selectedIngredient = result[0];
    updateResults(result, ingredientOutputElements, "ingredient", "density", "g/cm³");
    convert();
    console.log(ingredient);
  })

document.getElementById('unit').addEventListener('input',
  function(e) {
    document.getElementById('unitOutput').style.visibility = 'visible'
    let unit = e.target.value;
    let result = unitSearch.search(unit);
    selectedUnit = result[0];
    console.log(selectedUnit);
    updateResults(result, unitOutputElements, "name", "conversion");
    convert();
    console.log(unit);
  })

document.getElementById('quantity').addEventListener('input',
  function(e) {
    quantity = e.target.value;
    convert();
    console.log(quantity);
  })



function convert() {
  document.getElementById('convertedOutput').style.visibility = 'visible';
  if(selectedUnit.isVolume){
    outputGrams.innerHTML = quantity * selectedUnit.conversion * selectedIngredient.density + " grams";
    outputMillilitres.innerHTML = quantity * selectedUnit.conversion + " cm³"
  } else{
    outputGrams.innerHTML = quantity * selectedUnit.conversion + " grams";
    let specificVolume = 1/selectedIngredient.density;
    outputMillilitres.innerHTML = (quantity * selectedUnit.conversion * specificVolume).toFixed(2) + " cm³"
  }


}

function setupDensitySearch() {
  fetch('densities.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      densities = data;
      densitySearch = new Fuse(densities, options);
    })
}

function setupUnitSearch() {
  fetch('units.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      units = data;
      var unitOptions = options;
      unitOptions.keys = ["name", "alternateName", "unit"];
      unitSearch = new Fuse(units, unitOptions);
    })
}

function updateResults(result, elements, key1, key2, units = "") {
  for (var i = 0, j = elements.length, k = result.length; i < j; i++) {
    if (i < result.length) {
      elements[i].innerHTML = result[i][key1];
      elements[i].innerHTML += "   " + result[i][key2] + units;
    }
  }
}
