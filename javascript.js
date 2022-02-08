
// Make an output template for the member information
// and CSS styling references. I need to use "let" and
// not "const" since the template will change for 
// each member

//Dates

const arrival = document.getElementById("arrivalfield");
const departure = document.getElementById("departurefield");


function validDates(arrivalfield, departurefield) {
    const arrival = new Date(arrivalfield);
    const departure = new Date(departurefield);
    if (arrival > departure) {
        return false;
    } else { 
        return true;
    }
}

function calculateDays(arrivalfield, departurefield){
    const arrival = new Date(arrivalfield);
    const departure = new Date(departurefield);
    const timediff = departure.getTime() - arrival.getTime()
    const daydiff = timediff / (1000*3600*24) +1;
    return daydiff;
}
    
const form = document.getElementById("form");
const error = document.getElementById("error");


//FILTERING
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const peopleInput = parseFloat(document.getElementById("peoplefield").value);
    const suitcaseInput = parseFloat(document.getElementById("suitcasefield").value);
    const output = document.getElementById("output");
    const datesValid = validDates( arrival.value, departure.value);

    let carOutput = "";
    for (const car of carlist) {
    
        if  (peopleInput <= car.people & suitcaseInput <= car.suitcases & datesValid) {
            
            function calculatePrice (days) {
                const priceprday = 100;
                const totalprice = (priceprday + car.price) * days ;
                return totalprice;
            }

            const days = calculateDays(arrival.value, departure.value);
            const carPrice = calculatePrice(days);

            const carTemp = `
            <div class="car-1">
            <img src="${car.image}" alt="Suzuki Swift" class="car-img">
            <h2 class="type">${car.type}</h2>
            <p class="info">
            ${car.category}<br>
            People: ${car.people}<br> 
            Suitcases: ${car.suitcases}<br>
            ${car.comfort}</p>
            <h3 class="price">DKK${carPrice}.00</h3>
            <button class="book-btn">Book Now</button>
            </div>`;
            carOutput = carOutput + carTemp;
            output.innerHTML = carOutput;
    } else {
        error.innerHTML = "The day of departure has to be later than day of arrival.";
    }
}

});