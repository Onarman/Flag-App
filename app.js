//*===========================================================
//*                     Flag-App
//*===========================================================


const searchBar =document.getElementById("searchBar");
const countriesDiv = document.querySelector(".countries")
let data = [];
console.log(searchBar);

const fetchCountry = async(name) => {
    const url = `https://restcountries.com/v3.1/name/${name}`;

    try {
        const res = await fetch(url) // istek gönderdik.
        if(!res.ok){ 
            renderError(`Something went wrong: ${res.status}`)
             throw new Error()
        } 

        data = await res.json() 
        
        renderCountry(data[0])
        console.log(data[0])

    } catch (error) {
        console.log(error)
    }
}

searchBar.addEventListener("keyup", (e) =>{
    const searchStr = e.target.value.toLowerCase();
    // console.log(searchStr)
    const filteredCountries = data.filter((country)=> {
        console.log(country);
        return (
            country.name.toString().toLowerCase().includes(searchStr) || 
            country.capital.toString().toLowerCase().includes(searchStr)
        )
    })
    console.log(filteredCountries)
})


const renderError = (err) => {
   const countriesDiv = document.querySelector(".countries")
    countriesDiv.innerHTML = `
    <h1 class="text-danger">${err}</h1>
    <img src="./img/indir.png" alt="" />
    `
}
const renderCountry = (country) => {
    console.log(country);
    const countriesDiv = document.querySelector(".countries")

    //destructring
    const {capital,
        name :{common},
        region,
        flags:{svg},
        languages,
        currencies
    } =country;
    // const {currencies} =country
    // console.log(capital,common,region,svg)
    // console.log(Object.values(languages));
    // console.log(Object.values(currencies)[0].name);
    // console.log(Object.values(currencies)[0].symbol);

    countriesDiv.innerHTML += `
    <div class="card shadow-lg" style="width: 18rem;">
    <img src="${svg}" class="card-img-top" alt="flag">
    <div class="card-body">
      <h5 class="card-title">${common}</h5>
      <p class="card-text">${region}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"> <i class="fas fa-lg fa-landmark"></i> ${capital}</li>
      <li class="list-group-item"> <i class="fas fa-lg fa-comments"></i> ${Object.values(
        languages
      )}</li>
      <li class="list-group-item"> <i class="fas fa-lg fa-money-bill-wave"></i> ${
        Object.values(currencies)[0].name
      }, ${Object.values(currencies)[0].symbol} </li>
    </ul>
  </div>
    `
    
}

// fetchCountry("france")

