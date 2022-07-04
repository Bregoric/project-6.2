/*document.getElementById('test-button').addEventListener('click', function() {
const links = document.querySelectorAll('.titles a')
console.log('links:', links)
})*/
{
    const titleClickHandler = function(event) {
        event.preventDefault()
        const clickedElement = this
        console.log('Link was clicked!')
        console.log(event)

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active')

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active')
        }
        /* add class 'active' to the clicked link */

        console.log('clickedElement:', clickedElement)
        clickedElement.classList.add('active')

        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active')

        for (let activeArticle of activeArticles) {
            console.log(activeArticle)
            activeArticle.classList.remove('active')
        }

        /* get 'href' attribute from the clicked link */

        /* find the correct article using the selector (value of 'href' attribute) */

        /* add class 'active' to the correct article */
        const articleSelector = clickedElement.getAttribute('href')
        const targetArticle = document.querySelector(articleSelector)
        console.log(targetArticle)
        targetArticle.classList.add('active')
    }

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles'

    function generateTitleLinks() {
        console.log(optArticleSelector)
            /* find the title element */
        const titleList = document.querySelector(optTitleListSelector)

        /* get the title from the title element */
        const articles = document.querySelectorAll(optArticleSelector)
            /* remove contents of titleList */
        titleList.innerHTML = ''
        let html
            /* for each article */
        for (let article of articles) {
            /* get the article id */
            const articleId = article.getAttribute('id')
            const articleTitle = article.querySelector(optTitleSelector).innerHTML
                /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'
                /* insert link into titleList */
            titleList.insertAdjacentHTML('beforeend', linkHTML)
        }
        const links = document.querySelectorAll('.titles a')

        for (let link of links) {
            link.addEventListener('click', titleClickHandler)
        }
    }
    generateTitleLinks()

    function generateTags() {
        /* find all articles */

        /* START LOOP: for every article: */

        /* find tags wrapper */

        /* make html variable with empty string */

        /* get tags from data-tags attribute */

        /* split tags into array */

        /* START LOOP: for each tag */

        /* generate HTML of the link */

        /* add generated code to html variable */

        /* END LOOP: for each tag */

        /* insert HTML of all the links into the tags wrapper */

        /* END LOOP: for every article: */
    }

    generateTags();
}