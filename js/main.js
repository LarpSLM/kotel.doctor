const baseKeys = Object.keys(base);

function createBrandElement(name) {
    return `<option value="${name}" class="change-brand-value" id="${name}">${name}</option>`
}

function createModelElement(name, brand) {
    return `<option value="${name}" class="change-model-value" id="${name}" data-brand="${brand}">${name}</option>`
}

function createErrorElement(name, brand, model) {
    return `<option value="${name}" class="change-error-value" id="${name}" data-brand="${brand}" data-model="${model}">${name}</option>`
}

function renderTable(name) {
    return `<p>${name}</p>`
}


function renderBrand() {
    const brandsDiv = document.querySelector('.brand-select');
    baseKeys.forEach(brand => {
        brandsDiv.innerHTML += createBrandElement(brand);
    });
    brandsDiv.value = '';
}

function renderModel(el) {
    const brandBoiler = el.value;
    const model = Object.keys(base[brandBoiler]);
    const modelDiv = document.querySelector('.model-select');
    modelDiv.innerHTML = '';
    model.forEach(models => {
        modelDiv.innerHTML += createModelElement(models, brandBoiler);
    });
    modelDiv.value = '';
}

function renderError(el) {
    const errorId = el.value;
    const brandBoiler = el.dataset.brand;
    const model = Object.keys(base[brandBoiler][errorId]);
    const errorDiv = document.querySelector('.error-select');
    errorDiv.innerHTML = '';
    model.forEach(errors => {
        errorDiv.innerHTML += createErrorElement(errors, brandBoiler, errorId);
    });
    errorDiv.value = '';
}

function renderErrorDescription(el) {
    const errorId = el.value;
    const brandBoiler = el.dataset.brand;
    const modelBoiler = el.dataset.model;
    const dataTable = {
        'value-table-one': modelBoiler,
        'value-table-two': errorId,
        'value-table-three': base[brandBoiler][modelBoiler][errorId]['0'],
        'value-table-four': base[brandBoiler][modelBoiler][errorId]['1'],
        'value-table-five': base[brandBoiler][modelBoiler][errorId]['2'],
        'value-table-': base[brandBoiler][modelBoiler][errorId]['3']
    };
    const dataTableId = Object.keys(dataTable);
    console.log(dataTableId);
    function errorDescription(Obj) {
        Obj.forEach(reback => {
            const errorDivId = document.getElementById(reback);
            errorDivId.innerHTML = '';
            errorDivId.innerHTML += renderTable(dataTable[reback]);
        });
    }
    errorDescription(dataTableId)
}

renderBrand();

document.addEventListener('change', event => {
    let eventCatched = false;

    if (event.target.classList.contains('brand-select')) {
        renderModel(event.target);
        eventCatched = true;
    } else if (event.target.classList.contains('model-select')) {
        const optionModel = document.querySelector(`option.change-model-value[value="${event.target.value}"]`);
        renderError(optionModel);
        eventCatched = true;
    } else if (event.target.classList.contains('error-select')) {
        const optionError = document.querySelector(`option.change-error-value[value="${event.target.value}"]`);
        renderErrorDescription(optionError);
        eventCatched = true;
    }
    // if (event.target.classList.contains('change-brand-value')) {
    //     renderModel(event.target);
    //     eventCatched = true;
    // }
    // if (event.target.classList.contains('change-model-value')) {
    //     renderError(event.target);
    //     eventCatched = true;
    // }
    // if (event.target.classList.contains('change-error-value')) {
    //     renderErrorDescription(event.target);
    //     eventCatched = true;
    // }

    if (eventCatched === true) {
        event.preventDefault();
        return;
    }
});