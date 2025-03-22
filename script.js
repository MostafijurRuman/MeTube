// Utility function

// Time convert 
const timeConvert = time => {
    if(time < 86400){
        const hour = parseInt(time / 3600);
        let remainSeconds = time % 3600;
        let minutes = parseInt(remainSeconds / 60);
        remainSeconds = remainSeconds % 60;
        return `${hour} Hrs ${minutes} Min ${remainSeconds} Sec Ago`
    }
    else{
        const year = parseInt(time / 31536000);
        let remainSeconds = time % 31536000;
        const day = parseInt(remainSeconds / 86400);
        remainSeconds = remainSeconds % 86400;
        const hour = parseInt(remainSeconds / 3600);
        remainSeconds = remainSeconds % 3600;
        let minutes = parseInt(remainSeconds / 60);
        remainSeconds = remainSeconds % 60;
        return `${year} Yrs ${day} Days ${hour} Hrs ${minutes} Min ${remainSeconds} Sec Ago`
        }
}

// button active function
const setActiveButton = (id) => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (button.id === id) {
            button.classList.add('bg-primary','text-white');
        } else {
            button.classList.remove('bg-primary','text-white');
        }
    });
};


// Loding data form api

// Load categories
const loadCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
    const data = await response.json();
    // console.log(data);
    loadCategorie(data);
    
}

// Load Video 
const loadVideos = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await response.json();
    // console.log(data);
    loadVideo(data.videos);
    timeConvert(data)
}

// Load category videos
const loadCategorieVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(response => response.json())
        .then(data =>  {
            loadVideo(data.category)
        })
       
        .catch(error => console.error('Error loading category videos:', error));
}



// Use data after load



// load categories display
const loadCategorie = Categories => {
    Categories.categories.forEach(categorie => {
        // console.log(categorie)

        const CategoriesContainer = document.getElementById("Categories-container");
        const div = document.createElement("div")
        div.innerHTML= `
            <div class="flex justify-center items-center">
                 <button onclick="loadCategorieVideos(${categorie.category_id}); setActiveButton('btn_${categorie.category_id}')"  id="btn_${categorie.category_id}" class="btn "> ${categorie.category} </button> 
            </div>
        `
        CategoriesContainer.appendChild(div)


    });
}

// load all videos
const loadVideo = (Videos) => {
    const videosContainer = document.getElementById("videosContainer");
    videosContainer.innerHTML=""

    if(Videos.length === 0){
        videosContainer.classList.remove("grid")
        videosContainer.innerHTML=`
        <div class="flex flex-col items-center space-y-8 mt-9">
            <img class="w-32 h-32" src="./assets/Icon.png" alt="">
            <h1 class="text-center font-bold text-2xl">Oops!! Sorry, There is no <br> content here</h1>
        </div>
        `
    }

    Videos.forEach(Video => {
        // console.log(Video)
        videosContainer.classList.add("grid")
        const div = document.createElement("div")
        div.innerHTML= `
            <div class="   ">
        <figure class="bg-base-100 relative  ">
          <img class="rounded-lg w-[312px] h-[200px] object-cover"
            src="${Video.thumbnail}"
            alt="Thumnail" />
            ${Video.others.posted_date.length === 0 ? "" : `<span class="absolute bottom-4 right-4 text-xs text-white bg-gray-600 rounded-sm px-2"> ${timeConvert(Video.others.posted_date)} </span>`}
            
        </figure>
        <div class="flex gap-x-3 pt-5">
            <div>
                <img class="w-10 h-10 rounded-full" src="${Video.authors[0].profile_picture}" alt="">
            </div>
            <div class="space-y-1">
                <h2 class="font-bold text-[16px]">${Video.title}</h2>
                <div class="flex gap-2">
                  <p class="font-normal text-[14px] text-text">${Video.authors[0].profile_name}</p>
                ${Video.authors[0].verified ? `<img class="w-5" src="./assets/verified-badge.png" alt="verified-badge">` : ''}

                </div>
                <p class="font-normal text-[14px] text-text">${Video.others.views} Views </p>
            </div>
        </div>
      </div>
        `
        videosContainer.appendChild(div)

    });
}

// Function to sort videos by views
const sortByViews = () => {
    // Step 1: Fetch the data from the API
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(response => response.json())
        .then(data => {
            // Step 2: Parse the views and add a numericViews property to each video
            data.videos.forEach(video => {
                const viewsString = video.others.views;
                let numericViews = 0;

                if (viewsString.includes('K')) {
                    numericViews = parseFloat(viewsString.replace('K', '')) * 1000;
                } else if (viewsString.includes('M')) {
                    numericViews = parseFloat(viewsString.replace('M', '')) * 1000000;
                } else {
                    numericViews = parseFloat(viewsString);
                }

                video.numericViews = numericViews;
            });

            // Step 3: Sort the videos in descending order based on numericViews
            data.videos.sort((a, b) => b.numericViews - a.numericViews);

            // Output the sorted array
            console.log(data.videos);
            loadVideo(data.videos);
        })
        .catch(error => console.error('Error fetching data:', error));
};

document.getElementById("sortByViews").addEventListener("click", sortByViews)

// Search Function
document.getElementById('Search-input').addEventListener('keyup', input => {
    const inputText = input.target.value;
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${inputText}`)
    .then(res => res.json())
    .then(data => loadVideo(data.videos))
});







// Call Functions
loadCategories();
loadVideos();