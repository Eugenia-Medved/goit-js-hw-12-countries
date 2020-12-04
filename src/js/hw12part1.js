import countriesCardTpl from '../templates/countries-card.hbs';
import listCardTpl from '../templates/list-card.hbs';
import API from './fetchCountries';
import getRefs from './get-refs';

import '@pnotify/core/dist/BrightTheme.css';
import { defaults } from '@pnotify/core';
import 'material-design-icons/iconfont/material-icons.css';
const { error } = require('@pnotify/core');

defaults.width = '360px'; // ширина
defaults.minHeight = '40px'; // мин высота
defaults.delay = '1000'; // время показа уведомления
defaults.closer = false; // крестик закрытия
defaults.sticker = false; // иконка булавки
defaults.addClass = 'error'; // кастомный класс для своих стилей
defaults.autoOpen = false; // сработка при объявлении

const refs = getRefs();
const debounce = require('lodash.debounce');

refs.searchForm.addEventListener('input', debounce(onSearch, 1000));

function onSearch(e) {
  e.preventDefault();
  refs.cardContainer.innerHTML = '';

  const searchQuery = e.target.value;
  console.log(searchQuery);

  API.fetchCountries(searchQuery).then(whotRenderCard);
}

// Карточка страны

function whotRenderCard(country) {
  if (country.length > 10) return onFetchError();
  if (country.length === 1) return renderCountryCard(country);
  if (country.length > 1) return renderCountryListCard(country);
}

function renderCountryCard(country) {
  const markup = countriesCardTpl(country);
  refs.cardContainer.innerHTML = markup;
}

// Список стран

function renderCountryListCard(country) {
  const markup = listCardTpl(country);
  refs.cardContainer.innerHTML = markup;
}

// Ошибка

function onFetchError() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
  });
}
