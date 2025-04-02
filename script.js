// async function fetchNews() {
const fetchNews = async() => {
  try {
      let response =  await fetch("https://newsdata.io/api/1/news?apikey=pub_76990f7be9c171352e1e9dc33f7dac70ad274&q=news&country=in&language=en&category=business,crime,domestic,education,other", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
          mode: "cors" 
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      console.log(data); 

      if (!data.results || data.results.length === 0) {
          throw new Error("No news articles found.");
      }

    //   let newsContainer = document.getElementById("news-container");
    let newsContainer = document.querySelector('#news-container');
    // querySelectorAll('.')
      newsContainer.innerHTML = ""; 

      data.results.forEach(article => {
          let newsCard = document.createElement("div");
          newsCard.className = "col-12 col-md-4";

          newsCard.innerHTML = `
              <div class="card h-100 shadow">
        <img src="${article.image_url || 'https://via.placeholder.com/150'}" class="card-img-top" alt="news-image">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${article.title}</h5>
            <h6 class="text-muted small">Source: ${article.source_id} | ${article.pubDate.split(' ')[0]}</h6>
            <p class="card-text flex-grow-1">${article.description || 'No description available.'}</p>
            <a href="${article.link}" target="_blank" class="btn btn-primary mt-auto">Read More</a>
        </div>
    </div>
`;

          newsContainer.appendChild(newsCard);
      });

  } catch (error) {
      console.error("Error fetching news:", error);
      document.getElementById("news-container").innerHTML = `<p style="color: red;">Failed to load news.</p>`;
  }
}


fetchNews();
