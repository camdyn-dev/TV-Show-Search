//Grab the elements from the HTML page
const tvForm = document.querySelector('#tvForm')
const resetMovieList = document.querySelector('#resetMovieList')
const movieContainer = document.querySelector('#movieContainer')



//Queries the API, gets da data, triggers the main logic
tvForm.addEventListener('submit', async function (e) {
    e.preventDefault()
    const searchResult = tvForm.elements.query.value;
    const config = { params: { q: searchResult } }

    const res = await axios.get("https://api.tvmaze.com/search/shows?q=$", config)

    console.log(res.data)
    returnShows(res.data)

    //Reset the input
    tvForm.elements.query.value = ''
})



//Main Logic
const returnShows = (shows) => {

    //Create the row of movies
    const movieRow = document.createElement('div')
    movieRow.classList.add('row', 'bg-dark', 'bg-gradient', 'mt-2', 'border')
    movieRow.append(resultCreation(tvForm.elements.query.value))

    //main for loop to yoink the movies from the query
    for (let movieName of shows) {
        //Creating the movie container/column
        const movie = document.createElement('div')
        movie.classList.add('col-3')


        //Defining the pieces
        let noImage = null
        let img = null
        let card = null

        //if there's image
        if (movieName.show.image) {
            img = imageReturn(img, movieName.show.image.medium)
            card = cardCreator(img, movieName.show.name, movieName.show.url)
            movie.append(card)
        }

        //if there's no image
        else {
            noImage = nullImage(noImage)
            card = cardCreator(noImage, movieName.show.name, movieName.show.url)
            movie.append(card)
        }

        //putting everything together
        movieRow.append(movie)
        movieContainer.append(movieRow)

    }
}



//Creates the card for the movie, outlining it
const cardCreator = function (content, title, movieLink) {
    const card = document.createElement('div')
    card.classList.add('card', 'my-2', 'bg-danger', 'bg-gradient')
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    cardBody.append(content)

    const cardFooter = document.createElement('div')
    cardFooter.classList.add('card-footer')


    const cardLink = document.createElement('a')
    cardLink.classList.add('card-title', 'text-center')
    cardLink.href = movieLink

    const cardTitle = document.createElement('h4')
    cardTitle.textContent = title

    cardLink.append(cardTitle)



    cardFooter.append(cardLink)

    card.append(cardBody)
    card.append(cardFooter)
    return card

}



//Creates the images, assigns its source and returns it
const imageReturn = function (image, source) {
    image = document.createElement('img')
    image.classList.add('card-img-top')
    image.src = source
    return image
}



//If no imagey wimagy, use da no image image
const nullImage = function (nullImage) {
    nullImage = document.createElement('img')
    nullImage.classList.add('card-img-top')
    nullImage.src = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
    return nullImage
}



//this is so many fucking lines for something no one cares about
//puts da search result in da container so if u retarded and 4got wat u searched 4 ///u see it
const resultCreation = function (searchInput) {
    const searchText = document.createElement('h2')
    searchText.textContent = `Results from your search for ${searchInput}`
    searchText.classList.add('mb-2')
    const textHolder = document.createElement('div')
    textHolder.classList.add('col-12', 'text-center')
    textHolder.append(searchText)
    return textHolder
}


//reset the movie list
resetMovieList.addEventListener('click', () => {
    movieContainer.innerHTML = ''
})
