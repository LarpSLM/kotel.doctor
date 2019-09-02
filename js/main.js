const baseKeys = Object.keys(base);

function createBrandElement(name) {
    return `<option value="${name}" class="change-brand-value" id="${name}">${name}</option>`
}

function createModelElement(name, brand) {
    return `<option value="${name}" class="change-model-value" id="${name}" data-brand="${brand}">${name}</option>`
}

function createErrorElement(name, brand, model, description) {
    if (description) {
        return `<option value="${name}" class="change-error-value" id="${name}" data-brand="${brand}" data-model="${model}" data-description="${description}">${description}</option>`
    } else {
        return `<option value="${name}" class="change-error-value" id="${name}" data-brand="${brand}" data-model="${model}">${name}</option>`
    }
}

function renderTable(name) {
    return `<p>${name}</p>`
}

function cleanListTable(arg) {
    switch (arg) {
        case 'brand-select':
            const modelDiv = document.querySelector('.model-select');
            modelDiv.value = '1 default';
        case 'model-select':
            const errorDiv = document.querySelector('.error-select');
            errorDiv.innerHTML = '<option disabled selected value="1 default">-- выберите --</option>';
        case 'error-select':
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
    sortOption('brand');
    brandsDiv.value = '1 default';
}

function renderModel(el, cleanValue) {
    const brandBoiler = el.value;
    const model = Object.keys(base[brandBoiler]);
    const modelDiv = document.querySelector('.model-select');
    modelDiv.innerHTML = '<option disabled value="1 default">-- выберите --</option>';
    model.forEach(models => {
        modelDiv.innerHTML += createModelElement(models, brandBoiler);
    });
    cleanListTable(cleanValue);
    sortOption('model');
    modelDiv.value = '1 default';
}

function renderError(el, cleanValue) {
    cleanListTable(cleanValue);
    const errorId = el.value;
    const brandBoiler = el.dataset.brand;
    const model = Object.keys(base[brandBoiler][errorId]);
    const errorDiv = document.querySelector('.error-select');
    errorDiv.innerHTML = '<option disabled selected value="1 default">-- выберите --</option>';
    model.forEach(errors => {
        if (base[brandBoiler][errorId][errors]["remade"]) {
            const nameKey = base[brandBoiler][errorId][errors]["remade"];
            errorDiv.innerHTML += createErrorElement(errors, brandBoiler, errorId, nameKey);
        } else {
            errorDiv.innerHTML += createErrorElement(errors, brandBoiler, errorId);
        }
    });
    sortOption('error');
    errorDiv.value = '1 default';
}

function renderErrorDescription(arg1, arg2, arg3, arg4, arg5, arg6) {
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

function gettingArraysValues(el, cleanValue) {
    cleanListTable(cleanValue);
    let errorId = el.value;
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
    function checkingTableSectionSix(variable) {
        if (variable === '') {
            return 'Комментарий сервис-инженера в разработке. Нужен срочный совет? Звоните!'
        } else {
            return variable;
        }
    }
    function convertName() {
        if (base[brandBoiler][modelBoiler][errorId]["remade"]) {
            let newErrorId;
            newErrorId = base[brandBoiler][modelBoiler][errorId]["remade"];
            return errorId = newErrorId;
        } else {
            return errorId;
        }
    }
    renderErrorDescription(modelBoiler, convertName(), tableSectionThee, checkingTableSectionFour(tableSectionFour), tableSectionFive, checkingTableSectionSix(tableSectionSix));
}

// СОРТИРОВКА СПИСКОВ //

function sortOption(arg) {
    let wrapper = document.getElementById(arg),
        nodes = wrapper.getElementsByTagName("OPTION"),
        len = nodes.length,
        sorted = [];
    while (nodes[0]) {
        if (arg === 'error') {
            sorted.push(new String(nodes[0].dataset.description));
        } else {
            sorted.push(new String(nodes[0].value));
        }
        sorted[sorted.length-1].element = nodes[0];
        wrapper.removeChild(nodes[0]);
    }
    sorted = sorted.sort();
    for (let i = 0; i < len; i++) {
        wrapper.appendChild(sorted[i].element);
    }
}

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
        const defaultValue = 'error-select';
        gettingArraysValues(optionError, defaultValue);
        eventCatched = true;
    }
    if (eventCatched === true) {
        event.preventDefault();
        return;
    }
});

renderBrand();