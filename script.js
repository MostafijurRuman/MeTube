// Utility function

// Loding data form api

// Load categories
const loadCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
    const data = await response.json();
    console.log(data);
    loadCategorie(data);
}

// Load Video 
const loadVideos = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await response.json();
    console.log(data);
    loadVideo(data);
}




// Use data after load


// load cetagories display
const loadCategorie = Categories => {
    Categories.categories.forEach(categorie => {
        console.log(categorie)

        const CategoriesContainer = document.getElementById("Categories-container");
        const div = document.createElement("div")
        div.innerHTML= `
            <div class="flex justify-center items-center">
                 <button class="btn "> ${categorie.category} </button> 
            </div>
        `
        CategoriesContainer.appendChild(div)

    });
}

// load all videos
const loadVideo = Videos => {
    Videos.videos.forEach(Video => {
        console.log(Video)

        const videosContainer = document.getElementById("videosContainer");
        const div = document.createElement("div")
        div.innerHTML= `
            <div class="   ">
            <figure class="bg-base-100  ">
              <img class="rounded-lg w-[312px] h-[200px] object-cover"
                src="${Video.thumbnail}"
                alt="Thumnail" />
            </figure>
            <div class="flex gap-x-3 pt-5">
                <div>
                    <img class="w-10 h-10 rounded-full" src="${Video.authors[0].profile_picture}" alt="">
                </div>
                <div class="space-y-1">
                    <h2 class="font-bold text-[16px]">${Video.title}</h2>
                    <p class="font-normal text-[14px] text-text">${Video.authors[0].profile_name}</p>
                    <p class="font-normal text-[14px] text-text">${Video.others.views} </p>
                </div>
            </div>
          </div>
        `
        videosContainer.appendChild(div)

    });
}





// Call Functions
loadCategories();
loadVideos();