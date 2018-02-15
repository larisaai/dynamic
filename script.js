"use strict"
const template = document.querySelector('template').content;
const main = document.querySelector('main');
const catLink = "http://kea-alt-del.dk/t5/api/categories";
const pListLink = "http://kea-alt-del.dk/t5/api/productlist";
const pLink = "http://kea-alt-del.dk/t5/api/product?id=";
const imglink = "http://kea-alt-del.dk/t5/site/imgs/"

modal.addEventListener("click", () => modal.classList.add("hide"));

fetch(catLink).then(result => result.json()).then(data => createCatContainers(data));

function createCatContainers(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        const h2 = document.createElement("h2");
        section.id = category;
        h2.textContent = category;
        section.appendChild(h2);
        main.appendChild(section);
    });
    fetch(pListLink).then(result => result.json()).then(data => showProducts(data));
}

function filter(myFilter) {
    document.querySelectorAll("main section").forEach(section => {
        if (section.id == myFilter || myFilter == "menu") {
            section.classList.remove("hide");
        } else {
            section.classList.add("hide");
        }
    })
}


function showDetails(product) {
    modal.querySelector("h2").textContent = product.name;
    modal.querySelector("img").src = "http://kea-alt-del.dk/t5/site/imgs/medium/" + product.image + "-md.jpg";
    modal.querySelector("p").textContent = product.longdescription;
    modal.classList.remove("hide");
}



function showProducts(data) {
    data.forEach(elem => {
        const section = document.querySelector("#" + elem.category);
        const clone = template.cloneNode(true);
        clone.querySelector("img").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + elem.image + "-sm.jpg";
        clone.querySelector("h2").textContent = elem.name;
        clone.querySelector("p").textContent = elem.shortdescription;
        clone.querySelector(".price span").textContent = "Price: " + elem.price;
        clone.querySelector("button").addEventListener("click", () => {
            fetch(pLink + elem.id).then(result => result.json()).then(product => showDetails(product));
        });





        if (elem.discount) {
            const newPrice = Math.ceil(elem.price - elem.price * elem.discount / 100);
            clone.querySelector(".discountprice span").textContent = "New price: " + newPrice;
            clone.querySelector(".discountprice.hide").classList.remove("hide")
            clone.querySelector(".price").classList.add("strike");
        }
        if (elem.alcohol) { //elem.alcohol could be 0;
            console.log("alcohol")
            const newImage = document.createElement("img");
            newImage.setAttribute("src", "gfx/alc.png");
            newImage.setAttribute("alt", "Contains alcohol " + elem.alcohol + "%");
            newImage.setAttribute("title", "Contains alcohol " + elem.alcohol + "%");
            clone.querySelector(".icons").appendChild(newImage);
            clone.querySelector(".icons").classList.add('icon')
        }

        if (elem.soldout) {
            console.log("soldout")
            const newImage = document.createElement("img");
            newImage.setAttribute("src", "gfx/soldout.png");
            newImage.setAttribute("alt", "SOLDOUT");
            newImage.setAttribute("title", "SOLDOUT");
            clone.querySelector(".icons3").appendChild(newImage);
            clone.querySelector(".icons3").classList.add('icon')
        }

        if (elem.vegetarian) {
            console.log("vegetarian")
            const newImage = document.createElement("img");
            newImage.setAttribute("src", "gfx/vegan-logo.png");
            newImage.setAttribute("alt", "Specific for vegetarians " + elem.vegetarian);
            newImage.setAttribute("title", "Specific for vegetarians ");
            clone.querySelector(".icons2").appendChild(newImage);
            clone.querySelector(".icons2").classList.add('icon')
        }
        section.appendChild(clone);
    })
}
