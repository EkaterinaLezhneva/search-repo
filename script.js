$(document).ready(function () {
    let handleSearchRepoKeyDownWithDebounce = _.debounce(handleSearchRepoKeyDown, 500);

    let searchString = '';
    let page = 1;

    $('.search-repo').on('keydown', handleSearchRepoKeyDownWithDebounce);
    $('.pagination').on('click', handlePaginationClick);

    function requestRepositories() {
        $.ajax({
            method: "GET",
            url: "https://api.github.com/search/repositories",
            data: {
                searchString: searchString,
                page: page
            }
        }).done(function (res) {
            render(res.items)
        })
    }

    function handleSearchRepoKeyDown(event) {
        console.log(event.target.value);
        searchString = event.target.value;
        requestRepositories();

    }

    function handlePaginationClick(event) {
        let currentPage=$('.pagination__current-page');
        currentPage.empty();
        let paginationDirection = event.target.innerHTML;
        if (paginationDirection === 'prev' && page > 1) {
            page -= 1;

        } else if (paginationDirection === 'next') {
            page += 1;
        }
        currentPage.append(page);
        requestRepositories();
    }

    function render(repos) {
        let listRepo = $('#cards');
        let stringToAppend = '';
        listRepo.empty();
        repos.forEach(function (repo) {

            stringToAppend += `<div class="card-repo">
                                    <div class="card-repo__name-repo">${repo.name}</div>
                                    <div class="card-repo__name-author">
                                        <span class="name">Name: ${repo.owner.login}</span>
                                        <span class="last-name">id: ${repo.owner.id}</span>
                                     </div>
                                        <div class="card-repo__rating">
                                       Score: ${repo.score}
                                        </div>
                                </div>`

        });
        listRepo.append(stringToAppend);
    }
});