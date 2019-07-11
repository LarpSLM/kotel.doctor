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

function cleanListTable(arg) {
    switch (arg) {
        case 'brand-select':
            const modelDiv = document.querySelector('.model-select');
            modelDiv.value = '';
            const errorDiv = document.querySelector('.error-select');
            errorDiv.innerHTML = '';
        case 'model-select':
            document.getElementById('value-table-one').innerHTML = '';
            document.getElementById('value-table-two').innerHTML = '';
            document.getElementById('value-table-three').innerHTML = '';
            document.getElementById('value-table-four').innerHTML = '';
            document.getElementById('value-table-five').innerHTML = '';
            document.getElementById('value-table-six').innerHTML = '';
            break;
    }
}


function renderBrand() {
    const brandsDiv = document.querySelector('.brand-select');
    baseKeys.forEach(brand => {
        brandsDiv.innerHTML += createBrandElement(brand);
    });
    brandsDiv.value = '';
}

function renderModel(el, cleanValue) {
    const brandBoiler = el.value;
    const model = Object.keys(base[brandBoiler]);
    const modelDiv = document.querySelector('.model-select');
    modelDiv.innerHTML = '';
    model.forEach(models => {
        modelDiv.innerHTML += createModelElement(models, brandBoiler);
    });
    cleanListTable(cleanValue);
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

function renderErrorDescription(arg1, arg2, arg3, arg4, arg5, arg6) {
    cleanListTable('error-select');
    const errorValueTableOne = document.getElementById('value-table-one');
    const errorValueTableTwo = document.getElementById('value-table-two');
    const errorValueTableThree = document.getElementById('value-table-three');
    const errorValueTableFour = document.getElementById('value-table-four');
    const errorValueTableFive = document.getElementById('value-table-five');
    const errorValueTableSix = document.getElementById('value-table-six');
    errorValueTableOne.innerHTML += renderTable(arg1);
    errorValueTableTwo.innerHTML += renderTable(arg2);
    errorValueTableThree.innerHTML += renderTable(arg3);
    errorValueTableFour.innerHTML += renderTable(arg4);
    errorValueTableFive.innerHTML += renderTable(arg5);
    errorValueTableSix.innerHTML += renderTable(arg6);
}

function gettingArraysValues(el) {
    const errorId = el.value;
    const brandBoiler = el.dataset.brand;
    const modelBoiler = el.dataset.model;
    const tableSectionThee = base[brandBoiler][modelBoiler][errorId]['0'];
    const tableSectionFour = base[brandBoiler][modelBoiler][errorId]['1'];
    const tableSectionFive = base[brandBoiler][modelBoiler][errorId]['2'];
    const tableSectionSix = base[brandBoiler][modelBoiler][errorId]['3'];
    function checkingTableSectionFour(arg1) {
        if (arg1 === '') {
            return 'Информация уточняется'
        } else {
            return arg1;
        }
    }
    function cheakingTagleSectionSix(variable) {
        if (variable === '') {
            return 'Комментарий сервис-инженера в разработке. Нужен срочный совет? Звоните!'
        } else {
            return variable;
        }

    }
    renderErrorDescription(brandBoiler, modelBoiler, tableSectionThee, checkingTableSectionFour(tableSectionFour), tableSectionFive, cheakingTagleSectionSix(tableSectionSix));
}

renderBrand();


document.addEventListener('change', event => {
    let eventCatched = false;

    if (event.target.classList.contains('brand-select')) {
        const defaultValue = 'brand-select';
        renderModel(event.target, defaultValue);
        eventCatched = true;
    } else if (event.target.classList.contains('model-select')) {
        const optionModel = document.querySelector(`option.change-model-value[value="${event.target.value}"]`);
        const defaultValue = 'model-select';
        renderError(optionModel, defaultValue);
        eventCatched = true;
    } else if (event.target.classList.contains('error-select')) {
        const optionError = document.querySelector(`option.change-error-value[value="${event.target.value}"]`);
        gettingArraysValues(optionError);
        eventCatched = true;
    }
    if (eventCatched === true) {
        event.preventDefault();
        return;
    }
});