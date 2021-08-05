import refs from './refs';
import { refreshLibrary } from './result';

const { langSwitch, searchInput, htmlDoc } = refs;

const RU = 'ru';
const EN = 'en';

const PLACEHOLDER_TEXT_EN = 'Search films';
const PLACEHOLDER_TEXT_RU = 'Поиск фильмов';
const LANGUAGE_ATTRIBUTE = 'language';

const nodeSwitchDisplayProperty = (node, property) => {
  node.style.display = property;
};

const checkAndChangeLangAttributeOfHTML = language => {
  if (language) {
    htmlDoc.setAttribute('lang', language);
    htmlDoc.style.display = 'unset';
    return;
  } else {
    htmlDoc.setAttribute('lang', EN);
  }
};

const changeSearchPlaceholderLanguage = languageShow => {
  if (languageShow === EN) {
    searchInput.placeholder = PLACEHOLDER_TEXT_EN;
  } else if (languageShow === RU) {
    searchInput.placeholder = PLACEHOLDER_TEXT_RU;
  }
};

const changeDocumentElementsLanguage = (languageShow, languageHide) => {
  document.querySelectorAll(`[lang=${languageHide}]`).forEach(node => {
    if (node.tagName !== 'HTML') {
      nodeSwitchDisplayProperty(node, 'none');
    }
  });

  document.querySelectorAll(`[lang=${languageShow}]`).forEach(node => {
    if (node.tagName !== 'HTML') {
      nodeSwitchDisplayProperty(node, 'unset');
    }
  });
};

const changePageLanguage = (languageShow, languageHide) => {
  checkAndChangeLangAttributeOfHTML(languageShow);
  changeSearchPlaceholderLanguage(languageShow);
  changeDocumentElementsLanguage(languageShow, languageHide);
};

const changePageLanguageAndSwitchLangCheckBox = (languageShow, languageHide) => {
  changePageLanguage(languageShow, languageHide);

  languageShow === RU ? (langSwitch.checked = true) : (langSwitch.checked = false);
};

const languageSwitchingOnCheckbox = () => {
  let languageHide = EN;
  let languageShow = RU;

  if (!langSwitch.checked) {
    [languageHide, languageShow] = [languageShow, languageHide];
  }
  changePageLanguage(languageShow, languageHide);
  localStorage.setItem(LANGUAGE_ATTRIBUTE, languageShow);
  
  if (!refs.controlWrapper.classList.contains('non-displayed')) {
    refreshLibrary();} else {refs.logo.click();}
};

const checkLanguageInLocalStorageOnPageLoad = () => {
  const language = localStorage.getItem(LANGUAGE_ATTRIBUTE);

  checkAndChangeLangAttributeOfHTML(language);

  if (language === null) {
    localStorage.setItem(LANGUAGE_ATTRIBUTE, EN);
    language = EN;
  }

  if (language === EN) {
    changePageLanguageAndSwitchLangCheckBox(EN, RU);
  } else if (language === RU) {
    changePageLanguageAndSwitchLangCheckBox(RU, EN);
  }
};

checkLanguageInLocalStorageOnPageLoad();

langSwitch.addEventListener('change', languageSwitchingOnCheckbox);
