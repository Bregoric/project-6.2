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
        targetArticle.classList.add('active')
    }

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optArticleTagsSelector = '.post-tags .list',
        optTitleListSelector = '.titles',
        optArticleAuthorSelector = '.post .post-author',
        optAuthorsListSelector = '.list.authors'

    function generateTitleLinks(customSelector = '') {
        const titleList = document.querySelector(optTitleListSelector)
        titleList.innerHTML = ''
        const articles = document.querySelectorAll(optArticleSelector + customSelector)
        let html = ''
        for (let article of articles) {
            const articleId = article.getAttribute('id')
            const articleTitle = article.querySelector(optTitleSelector).innerHTML
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'
            html = html + linkHTML
        }
        titleList.innerHTML = html
            //titleList.innerHTML = titleList.innerHTML + linkHTML;
    }
    generateTitleLinks()

    const links = document.querySelectorAll('.titles a')
    for (let link of links) {
        link.addEventListener('click', titleClickHandler)
    }

    function generateTags() {
        /* [DONE]find all articles */
        const articles = document.querySelectorAll(optArticleSelector)
            /* [DONE]START LOOP: for every article: */
        for (let article of articles) {
            /* [DONE] find tags wrapper */
            const articlesTags = article.querySelector(optArticleTagsSelector)
                /* [DONE]make html variable with empty string */
            let html = ''
                /* [DONE]get tags from data-tags attribute */
            const targetTags = article.getAttribute('data-tags')
                /* [DONE]split tags into array */
            const targetTagsArray = targetTags.split(' ')
                /* [DONE]START LOOP: for each tag */
            for (let tag of targetTagsArray) {
                /* [DONE]generate HTML of the link */
                const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '\xa0' + '</a></li>'
                    /* [DONE]add generated code to html variable */
                html = html + linkHTML
            }
            /* [DONE]END LOOP: for each tag */
            /* [DONE]insert HTML of all the links into the tags wrapper */
            articlesTags.innerHTML = html
        }
        /* [DONE]END LOOP: for every article: */
    }
    generateTags()

    function tagClickHandler(event) {
        /* [DONE]prevent default action for this event */
        event.preventDefault()
            /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this
            /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href')
            /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '')
            /* find all tag links with class active */
        const targetActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]')
            /* START LOOP: for each active tag link */
        for (let targetActiveLink of targetActiveLinks) {
            /* remove class active */
            targetActiveLink.classList.remove('active')
                /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const targetLinks = document.querySelectorAll('a[href="' + href + '"]')
            /* START LOOP: for each found tag link */
        for (let targetLink of targetLinks) {
            /* add class active */
            targetLink.classList.add('active')
                /* END LOOP: for each found tag link */
        }

        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]')
    }

    function addClickListenersToTags() {
        /* find all links to tags */
        const targetLinks = document.querySelectorAll('.post-tags .list a')
            /* START LOOP: for each link */
        for (let targetLink of targetLinks) {
            /* add tagClickHandler as event listener for that link */
            targetLink.addEventListener('click', tagClickHandler)
        }
        /* END LOOP: for each link */
    }
    addClickListenersToTags()

    function generateAuthors() {
        const articles = document.querySelectorAll(optArticleSelector)
        for (let article of articles) {
            const authorWrapper = article.querySelector(optArticleAuthorSelector)
            let html = ''
            const targetAuthor = article.getAttribute('data-author')
            const linkHTML = '<p class="post-author"><a href="#author-' + targetAuthor + '">by ' + targetAuthor + '</a></p>'
            html = html + linkHTML
            authorWrapper.innerHTML = html
        }
    }
    generateAuthors()

    function authorClickHandler(event) {
        event.preventDefault()
        const clickedElement = this
        const href = clickedElement.getAttribute('href')
        const author = href.replace('#author-', '')
        const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]')
        for (activeAuthor of activeAuthors) {
            activeAuthor.classList.remove('active')
        }
        const allAuthors = document.querySelectorAll('a[href="#author-' + author + '"]')
        for (let targetAuthor of allAuthors) {
            targetAuthor.classList.add('active')
        }
        generateTitleLinks('[data-author="' + author + '"]')
    }

    function addClickListenersToAuthors() {
        const targetAuthors = document.querySelectorAll('.post-author a')
        for (let targetAuthor of targetAuthors) {
            targetAuthor.addEventListener('click', authorClickHandler)
        }
    }
    addClickListenersToAuthors()
}