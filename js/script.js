/*document.getElementById('test-button').addEventListener('click', function() {
const links = document.querySelectorAll('.titles a')
console.log('links:', links)
})*/

{
    const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
        authorLink: Handlebars.compile(
            document.querySelector('#template-author-link').innerHTML
        ),
        tagLink: Handlebars.compile(
            document.querySelector('#template-tag-link').innerHTML
        ),
        tagCloudLink: Handlebars.compile(
            document.querySelector('#template-tag-cloud-link').innerHTML
        ),
        authorListLink: Handlebars.compile(
            document.querySelector('#template-author-list-link').innerHTML
        ),
    };

    const titleClickHandler = function(event) {
        event.preventDefault()
        const clickedElement = this


        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active')

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active')
        }
        /* add class 'active' to the clicked link */

        /*  console.log('clickedElement:', clickedElement)*/
        clickedElement.classList.add('active')

        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active')

        for (let activeArticle of activeArticles) {

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
        optAuthorsListSelector = '.authors.list',
        optTagsListSelector = '.tags.list',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-'

    function generateTitleLinks(customSelector = '') {

        const titleList = document.querySelector(optTitleListSelector)
        titleList.innerHTML = ''
        const articles = document.querySelectorAll(optArticleSelector + customSelector)
        let html = ''
        for (let article of articles) {
            const articleId = article.getAttribute('id')
            const articleTitle = article.querySelector(optTitleSelector).innerHTML
            const linkHTMLData = { id: articleId, title: articleTitle };
            const linkHTML = templates.articleLink(linkHTMLData);
            html = html + linkHTML
        }
        titleList.innerHTML = html
            //titleList.innerHTML = titleList.innerHTML + linkHTML;
        const links = document.querySelectorAll('.titles a')
        for (let link of links) {
            link.addEventListener('click', titleClickHandler)

        }

    }
    generateTitleLinks()

    function calculateTagsParams(tags) {
        const params = {
            max: 0,
            min: 999999
        };
        for (let tag in tags) {
            if (tags[tag] > params.max) {
                params.max = tags[tag];
            }
            if (tags[tag] < params.min) {
                params.min = tags[tag];
            }
        }

        return (params);
    }
    const calculateTagClass = function(count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
        return (optCloudClassPrefix + classNumber);
    };

    function generateTags() {
        /* [NEW] create a new variable allTags with an empty array */
        let allTags = {};
        /* [DONE]find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log(articles);
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
                const linkHTMLData = { tag };
                const linkHTML = templates.tagLink(linkHTMLData);
                /* [DONE]add generated code to html variable */
                html = html + linkHTML

                /* [NEW] check if this link is NOT already in allTags */
                if (!allTags[tag]) {
                    /* [NEW] add tag to allTags object */
                    allTags[tag] = 1
                } else {
                    allTags[tag]++
                }
            }
            /* [DONE]END LOOP: for each tag */
            /* [DONE]insert HTML of all the links into the tags wrapper */
            articlesTags.innerHTML = html
        }


        /* [DONE]END LOOP: for every article: */
        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector(optTagsListSelector)

        const tagsParams = calculateTagsParams(allTags);

        /* [NEW] create variable for all links HTML code */
        const allTagsData = { tags: [] };

        /* [NEW] START LOOP: for each tag in allTags: */
        for (let tag in allTags) {
            /* [NEW] generate code of a link and add it to allTagsHTML */
            allTagsData.tags.push({
                tag: tag,
                count: allTags[tag],
                className: calculateTagClass(allTags[tag], tagsParams),
            });

            /* [NEW] END LOOP: for each tag in allTags: */
        }

        tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
        const targetLinks = document.querySelectorAll(`a[href="${href}"]`);
        /* START LOOP: for each found tag link */
        for (let targetLink of targetLinks) {
            /* add class active */
            targetLink.classList.add('active')
                /* END LOOP: for each found tag link */
        }

        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks(`[data-tags~="${tag}"]`);
    }

    function addClickListenersToTags() {
        /* find all links to tags */
        const targetLinks = document.querySelectorAll('a[href^="#tag-"]');
        /* START LOOP: for each link */
        for (let targetLink of targetLinks) {
            /* add tagClickHandler as event listener for that link */
            targetLink.addEventListener('click', tagClickHandler)
        }
        /* END LOOP: for each link */
    }
    addClickListenersToTags()

    function generateAuthors() {
        /* [NEW] create a new variable allAuthors with an empty array */
        let allAuthors = {};
        /* [DONE] find all articles */
        const articles = document.querySelectorAll(optArticleSelector);

        /* [DONE] START LOOP: for every article: */

        for (let article of articles) {
            /* [DONE] find author wrapper */
            const authorWrapper = article.querySelector(optArticleAuthorSelector);

            /* [DONE] make html variable with empty string */
            let html = '';

            /* [DONE] get Author from data-author attribute */
            const articleAuthor = article.getAttribute('data-author');


            /* [DONE] generate HTML of the link */
            const authorHTMLData = { author: articleAuthor };
            const authorHTML = templates.authorLink(authorHTMLData);
            /* [DONE] add generated code to html variable */
            html += authorHTML;

            /* [NEW] check if this link is NOT already in allAuthors */
            if (!allAuthors[articleAuthor]) {
                /* [NEW] add tag to allTags object */
                allAuthors[articleAuthor] = 1;
            } else {
                allAuthors[articleAuthor]++;
            }

            /* [DONE] insert HTML of all the links into the authors wrapper */
            authorWrapper.innerHTML = html;
            //   console.log('html:', html);
            /* [DONE] END LOOP: for every article: */
        }
        /* [NEW] find list of authors in right column */
        const authorsList = document.querySelector(optAuthorsListSelector);

        /* [NEW] create variable for all links HTML code */
        const allAuthorsData = { allAuthors: [] };

        /* [NEW] START LOOP: for each tag in allAuthors: */
        for (let author in allAuthors) {
            /* [NEW] generate code of a link and add it to allAuthorsData  */
            allAuthorsData.allAuthors.push({
                author: author,
                count: allAuthors[author],
            });
            /* [NEW] END LOOP: for each tag in allAuthors: */
        }
        /*[NEW]  ? */
        authorsList.innerHTML = templates.authorListLink(allAuthorsData);
    }

    generateAuthors();

    const authorClickHandler = function(event) {
        /* [DONE] prevent default action for this event */
        event.preventDefault();

        /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;

        /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        // console.log(href);

        /* [DONE] make a new constant "author" and extract author from the "href" constant */
        const author = href.replace('#author-', '');
        // console.log(author);

        /* [DONE] find all author links with class active */
        const activeAuthors = document.querySelectorAll(
            'a.active[href^="#author-"]'
        );

        /* [DONE] START LOOP: for each active tag link */
        for (let activeAuthor of activeAuthors) {
            /* [DONE] remove class active */
            activeAuthor.classList.remove('active');
            /* [DONE] END LOOP: for each active tag link */
        }

        /* [DONE] find all author links with "href" attribute equal to the "href" constant */
        const authorLinks = document.querySelectorAll(`a[href="${href}"]`);


        /* [DONE] START LOOP: for each found tag link */
        for (let authorLink of authorLinks) {
            /* [DONE] add class active */
            authorLink.classList.add('active');

            /* [DONE]  END LOOP: for each found tag link */
        }

        /* [DONE] execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks(`[data-author ="${author}"]`);
    };

    function addClickListenersToAuthors() {
        /* [DONE] find all links to authors */
        const authorLinks = document.querySelectorAll('a[href^="#author-"]');

        /* [DONE] START LOOP: for each link */
        for (let authorLink of authorLinks) {
            /* [DONE] add authorClickHandler as event listener for that link */
            authorLink.addEventListener('click', authorClickHandler);

            /* [DONE] END LOOP: for each link */
        }
    }
    addClickListenersToAuthors();

}