const resultsSection = document.getElementById('results')
const searchBtn = document.getElementById('searchBtn')
const titleField = document.getElementById('title')
const showCover = document.getElementById('poster')
const summary = document.getElementById('summary')
const showTitle = document.getElementById('showTitle')
const genre = document.getElementById('genre')
const status = document.getElementById('status')
const premiered = document.getElementById('premiered')
const ended = document.getElementById('ended')
const thumbnail = document.getElementById('thumbnail')
const closeBtn = document.getElementById('close')

searchBtn.addEventListener('click', searchTitle)

titleField.addEventListener('keypress', (e)=> {
  if(e.key === "Enter"){
    e.preventDefault()
    searchBtn.click()
  }
})

document.addEventListener('click', e =>{
  if(e.target.id.includes("poster") ){
    individualShow(e.target.dataset.id)
  }

  if(e.target.id.includes("close")){
    thumbnail.innerHTML = ''
    showTitle.innerHTML = ''
    summary.innerHTML = ''
    genre.innerHTML = ''
    premiered.innerHTML = ''
    ended.innerHTML = ''
    status.innerHTML = ''
    showDetails.style.display = "none"
  }

})


/* Fetch API using async/await */

async function searchTitle(){

  resultsSection.innerHTML = ''

  const config = {
    headers: {
    Accept: 'application/json'
  }
 }

  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${titleField.value}`, config)
  
  const data = await res.json()

  data.forEach((result, index)=> {
    const coverUrl = data[index].show.image.medium
    resultsSection.insertAdjacentHTML("beforeend", `<img class="poster" data-id="${data[index].show.id}" id="poster" src="${coverUrl}"></img>`)
  })
  
  titleField.value = ''
  titleField.focus()
  
}

async function individualShow(showId){
  const config = {
    headers: {
    Accept: 'application/json'
  }
 }

  const res = await fetch(`https://api.tvmaze.com/shows/${showId}`, config)
  
  const data = await res.json()

  // showDetails.innerHTML = data
  showDetails.style.display = 'grid'
  thumbnail.insertAdjacentHTML("beforeend", `<img src="${data.image.medium}"></img>`)
  summary.insertAdjacentHTML("beforeend", `<span class="summaryLabel details">Summary</span> ${data.summary != null ? data.summary: "N/A"}`)
  showTitle.insertAdjacentHTML("beforeend", `<span class="details">Title:</span> ${data.name != null? data.name : "N/A"}`)
  genre.insertAdjacentHTML("beforeend", `<span class="details">Genre:</span> ${data.genres != null? data.genres : "N/A"}`)
  status.insertAdjacentHTML("beforeend", `<span class="details">Status:</span> ${data.status != null? data.status: "N/A"}`)
  premiered.insertAdjacentHTML("beforeend", `<span class="details">Started: </span> ${data.premiered != null? data.premiered: "N/A"}`)
  ended.insertAdjacentHTML("beforeend", `<span class="details">Ended:</span> ${data.ended != null ? data.ended: "N/A"}`)
  
}

