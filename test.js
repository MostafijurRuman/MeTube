const sortByViews =  async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data = await res.json();
    data.videos.forEach( video => {
        const viewsString = video.others.views ;
        let numberViews = 0 ;
        if(viewsString.includes("K")){
            numberViews = parseFloat(viewsString.replace("K",''))*1000;
            
        }
        else if(viewsString.includes("M")){
            numberViews = parseFloat(viewsString.replace("M",''))*1000000;
        }
        else{
            numberViews = parseFloat(viewsString);
        }

        video.numberViews= numberViews;

        
    });
        data.videos.sort((a,b) =>  b.numberViews - a.numberViews );
        data.videos.forEach(vid => {
            console.log(vid.others.views)
        })
}
sortByViews()