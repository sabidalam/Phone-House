const loadPhones = (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data, dataLimit))
}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    // display 10 phones only
    const showAll = document.getElementById('showall');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('hidden');
    } else {
        showAll.classList.add('hidden');
    }
    // if search phone not found
    const NoPhone = document.getElementById('no-phone-found');
    if (phones.length === 0) {
        NoPhone.classList.remove('hidden');
    } else {
        NoPhone.classList.add('hidden');
    }
    //
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('card');
        phoneDiv.innerHTML = `
        <figure><img src="${phone.image}" alt="" /></figure>
                    <div class="card-body">
                        <h3 class="card-title">${phone.phone_name}</h3>
                        <h4 class="">${phone.brand}</h4>
                        <button onclick = "loadPhoneDetails('${phone.slug}')" class="btn btn-primary mt-4" >Show Detail</button>
                    </div>
        `;
        phoneContainer.appendChild(phoneDiv);

    });
    toggleLoader(false);
}

const searchMethod = (dataLimit) => {
    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    // searchField.value = '';

}

document.getElementById('search-btn').addEventListener('click', function () {
    searchMethod(10);

})

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchMethod(10);
    }
})

const toggleLoader = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}

document.getElementById('showall-btn').addEventListener('click', function () {
    searchMethod();
})

const loadPhoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
}

const displayPhoneDetail = () => {
    const displayConatiner = document.getElementById('display-container');


}


loadPhones('find');