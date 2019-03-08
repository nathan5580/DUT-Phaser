var language = 'fr';

var categories = new Map();
var langCategory = new Map();
langCategory.set('fr', 'Mathématiques');
langCategory.set('en', 'Mathematics');
langCategory.set('de', 'Mathematik');
categories.set('mathematics', langCategory);
var langCategory = new Map();
langCategory.set('fr', 'Physique');
langCategory.set('en', 'Physics');
langCategory.set('de', 'Physik');
categories.set('physics', langCategory);
var langCategory = new Map();
langCategory.set('fr', 'Informatique');
langCategory.set('en', 'Computer_science');
langCategory.set('de', 'Informatik');
categories.set('computer_science', langCategory);
var langCategory = new Map();
langCategory.set('fr', 'Histoire');
langCategory.set('en', 'History');
langCategory.set('de', 'Geschichte');
categories.set('history', langCategory);

var selectedCategory = 'history';
var category = categories.get(selectedCategory).get(language);

var articlesContent;

var scoreboard = new Array();
var backSound;
var soundActive = true;