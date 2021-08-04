import refs from './refs';

const { langSwitch, searchInput, htmlDoc } = refs;

const RU = '[lang=ru]';
const EN = '[lang=en]';

const PLACEHOLDER_TEXT_EN = 'Search films';
const PLACEHOLDER_TEXT_RU = 'Поиск фильмов';

const nodeSwitchDisplayProperty = (node, property) => {
    node.style.display = property;
}

const languageSwitchingOnCheckbox = () => {
    let hide = EN;
    let show = RU;

    if(!langSwitch.checked) {
        [hide, show] = [show, hide];
    }

    if(show === RU) {
        searchInput.placeholder = PLACEHOLDER_TEXT_RU;
        htmlDoc.setAttribute('lang', 'ru');
    } else {
        searchInput.placeholder = PLACEHOLDER_TEXT_EN;
        htmlDoc.setAttribute('lang', 'en');
    }

    document.querySelectorAll(hide).forEach((node) => {
        nodeSwitchDisplayProperty(node, 'none');
    });

    document.querySelectorAll(show).forEach((node) => {
        nodeSwitchDisplayProperty(node, 'unset');
    });
}

langSwitch.addEventListener('change', languageSwitchingOnCheckbox);