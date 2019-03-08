//-- RECUPERE LES DERNIERS ELEMENTS EDITEE DE LA CATEGORIE PHYSICS AU FORMAT JSON
//https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&list=categorymembers&cmsort=timestamp&cmdir=desc&cmtitle=Category:Physics&cmcontinue=
//--

var text;
var continueArticleKey;
var continueContentKey;
var articlesName = new Array();

var motState = {
    
    queryArticleText: function(article, continueKey) {
        var continueKey = continueKey == null ? '' : '&excontinue=' + continueKey;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://' + language + '.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&explaintext=true&exintro=true&exlimit=10&titles=' + encodeURI(article) + continueKey);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE) {
                var responseJson = JSON.parse(xhr.responseText);
                //continueArticleKey = responseJson.continue.excontinue;
                var contentKey = Object.keys(responseJson.query.pages);
                for(var key of contentKey) {
                    var contentData = responseJson.query.pages[key];
                    if(contentData.extract != null) {
                        x = contentData.extract.split(' ');
                        for(y of x) {
                            if(y.match(/^\w{5,}$/)) {
                                articlesContent.push(y.toLowerCase());
                            }
                        }
                        game.state.start('jeu');
                        //console.log(contentData.extract);
                        //var normalizedContentData = contentData.extract.replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '');
                        //normalizedContentData.replace(/[0-9]/g, '');
                        //normalizedContentData.replace(/\W/g, '');
                        //motState.articlesContent.push(contentData.extract);
                    }
                }
            }
        }
        xhr.send(null);
    },

    queryArticlesName: function(category, continueKey) {
        var continueKey = continueKey == null ? '' : '&cmcontinue=' + continueKey;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://' + language + '.wikipedia.org/w/api.php?origin=*&format=json&action=query&list=categorymembers&cmsort=timestamp&cmdir=desc&cmtitle=Category:' + category + continueKey);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE) {
                var responseJson = JSON.parse(xhr.responseText);
                //continueArticleKey = responseJson.continue.cmcontinue;
                for(var articleData of responseJson.query.categorymembers) {
                    if(articleData.ns == 0) {
                        articlesName.push(articleData.title);
                    }
                }
                console.log(articleData);
                motState.queryArticleText(articlesName.join('|'));
            }
        }
        xhr.send(null);
    },
    
    create: function() {
        articlesContent = new Array();
        
        var c = game.add.text(game.width/2, game.height/2, 'CHARGEMENT', {fill: 'white', fontSize: 32});
        c.anchor.setTo(0.5);
        
        this.queryArticlesName(category);
    }
}