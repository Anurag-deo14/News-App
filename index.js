let newsAPI = "http://api.mediastack.com/v1/news?access_key=07ec56c14c79f044ad2b634bb61bd5ef&categories=";
let dummeyImage ="dummey-image.jpeg";
let app = document.querySelector(".app");
let screen = {
    main:app.querySelector(".main-screen"),
    news:app.querySelector(".news-screen")
};
let categories = ["General","Bussiness","Technology","Entertainment","Health","Science","Sports"];

for(let i =0;i<categories.length;i++){
    let div = document.createElement("div");
    div.innerText = categories[i];
    div.addEventListener("click",function(){
       screen.main.querySelector(".categories .active").classList.remove("active");
       div.classList.add("active");
       fetchCategoryNews(categories[i]);
    });
    if(i==0){
        div.classList.add("active");
        fetchCategoryNews(categories[i]);
    }
    screen.main.querySelector(".categories").appendChild(div);
}
async function fetchCategoryNews(category){
   try{
    let res = await fetch(newsAPI + category.toLowerCase());
    let data = await res.json();
    let news = data.data;

    for(let i=0;i<news.length;i++){
        let div = document.createElement("div");
        div.classList.add("item");
        div.addEventListener("click",function(){
            showFullNews(news[i]); 
        });
        div.innerHTML = `
          <div class="thumbnail">
              <img src="$${news[i].image || dummeyImage}">
          </div>
          <div class="details">
                <h2>${news[i].title}</h2>
                <p>${news[i].description}</p>
          </div>;
        `;
        screen.main.querySelector(".news.list").appendChild(div);
    }
   }catch(msg){}
}