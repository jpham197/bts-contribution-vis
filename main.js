var selectedMember = '';
let finalData = [];
let processedData;
let prefilteredData;

//Hides detail bar at beginning
let detailBar = d3.select('.hide-detail-bar');
detailBar.style('display', 'none');

// Show the Intro page in the begining
let introPage = d3.select('.intro-page');
introPage.style('display', 'block');

//Handles highlighting selected Member and showing detail bar
d3.selectAll('.bts-tab')
    .on('click', function(){
    let clickedTab = d3.select(this);

    d3.select('.bts-tab.active').classed('active',false);
    clickedTab.classed('active', true);
    
    let member = clickedTab.attr('data-member');
    selectedMember = member;
    updateBars(member);
    // Hide the intro page once a member is selected and display the bars, then show intro page if BTS orbit is selected again
    if (selectedMember == "BTS") {
        introPage.style('display', 'block');
        detailBar.style('display', 'none');
    } else {
        introPage.style('display', 'none');
    detailBar.style('display', 'block');
    }
    
    processedData = processData(member);
    prefilteredData = processData(member);
    renderBars(processedData, member);
});

/*
    Create the contribution bars
*/
function renderBars(data, member) {

    // Delete everything to reload new info - this is a hacky way to do it instead of merging old page and new page
    d3.selectAll('.bts-contribution').remove();
    
    var select = d3.selectAll('.bts-contribution')
        .data(data);

    // Append divs for each song, class them to reference later
    var enter = select.enter().append('div')
        .attr('class','bts-contribution');

    // Append p for each song name, class them to reference later
    var pEnter = enter.append('p')
        .attr('class', 'song-name');

    // Append a div to create the contribution-bar structure
    var fillEnter = enter.append('div')
        .attr('class', 'contribution-bar');
    
    let album_box = fillEnter.append('div')
        .style('background-image', function(d) {
            return `url('${d.albumPath}')`;
        })
        .attr('class', 'picture')
        .on('mouseover', function(d){
            var hovered = d3.select(this);
            hovered.classed('text', true);
            
            var group = hovered.append('div')
            .attr('class', 'popup');

            group.append('text')
                .attr('class', 'detail-text')
                .text(`Album: ${d.album}`);
            group.append('text')
                .attr('class', 'detail-text')
                .text(`Genre(s): ${d.genre1} ${d.genre2} ${d.genre3}`);
            group.append('text')
                .attr('class', 'detail-text')
                .text(`Year Released: ${d.year}`);
        })
        .on('mouseout', function(d){
            var hovered = d3.select(this);
            hovered.classed('text', false);
            hovered.select('.popup').remove();
        });

    // ***************Create the 4 rectangles
    // Vocal box
    let vocal_box = fillEnter.append('span')
        .attr('class', 'vocal')
        .style('background-color', 'white')  // set background-color to white as first state
        .on('mouseover', function(d){
            var hovered = d3.select(this);
            hovered.classed('text', true);
            if (d.contribution[0] == 1) {
                let vocal_flag = 'vocal';
                hovered.append('text')
                    .attr('class', 'box-hover-text')
                    .style('color', colorBox(member, vocal_flag))
                    .text(member + " contributed in Vocals");
            }else{
                hovered.append('text')
                    .attr('class', 'box-hover-text')
                    .style('color', 'black')
                    .text(member + " didn't contribute in Vocals");
            }
        })
        .on('mouseout', function(d){
            var hovered = d3.select(this);
            hovered.classed('text', false);
            hovered.select('text').remove();
        });
        
    // transition animation for box fill
    vocal_box.transition().duration(1000).style('background-color', function(d) {
        if (d.contribution[0] == 1) {
            let vocal_flag = 'vocal';
            return colorBox(member, vocal_flag);
        } else {
            return 'white' //none
        }
    })
        
    
    // The V text
    vocal_box.append('p')
        .text('V')
        .attr('class', 'box_text');
    
    // Write box
    let write_box = fillEnter.append('span')
        .attr('class', 'write')
        .style('background-color', 'white')  // set background-color to white as first state
        .on('mouseover', function(d){
            var hovered = d3.select(this);
            hovered.classed('hovered', true);
            if (d.contribution[1] == 1) {
                let write_flag = 'write';
                hovered.append('text')
                    .attr('class', 'box-hover-text')
                    .style('color', colorBox(member, write_flag))
                    .text(member + " contributed in Writing");
            }else{
                hovered.append('text')
                    .attr('class', 'box-hover-text')
                    .style('color', 'black')
                    .text(member + " didn't contribute in Writing");
            }
        })
        .on('mouseout', function(d){
            var hovered = d3.select(this);
            hovered.classed('hovered', false);
            hovered.select('text').remove();
        });
    
    // transition animation for box fill
    write_box.transition().duration(1000).style('background-color', function(d) {
            if (d.contribution[1] == 1) {
                let write_flag = 'write';
                return colorBox(member, write_flag);
            } else {
                return 'white'
            }
        });
    
    // The W text
    write_box.append('p')
        .text('W')
        .attr('class', 'box_text');
    
    // Compose box
    let compose_box = fillEnter.append('span')
        .attr('class', 'compose')
        .style('background-color', 'white')  // set background-color to white as first state
        .on('mouseover', function(d){
            var hovered = d3.select(this);
            hovered.classed('hovered', true);
            if (d.contribution[2] == 1) {
                let compose_flag = 'compose';
                hovered.append('text')
                    .attr('class', 'box-hover-text')
                    .style('color', colorBox(member, compose_flag))
                    .text(member + " contributed in Composing");
            }else{
                hovered.append('text')
                    .attr('class', 'box-hover-text')
                    .style('color', 'black')
                    .text(member + " didn't contribute in Composing");
            }
        })
        .on('mouseout', function(d){
            var hovered = d3.select(this);
            hovered.classed('hovered', false);
            hovered.select('text').remove();
        });
    
    // transition animation for box fill
    compose_box.transition().duration(1000).style('background-color', function(d) {
            if (d.contribution[2] == 1) {
                let compose_flag = 'compose';
                return colorBox(member, compose_flag);
            } else {
                return 'white'
            }
        });
    
    // The C text
    compose_box.append('p')
        .text('C')
        .attr('class', 'box_text');
    
    // Produce box
    let produce_box = fillEnter.append('span')
        .attr('class', 'produce')
        .style('background-color', 'white')  // set background-color to white as first state
        .on('mouseover', function(d){
            var hovered = d3.select(this);
            hovered.classed('hovered', true);
            if (d.contribution[3] == 1) {
                let produce_flag = 'produce';
                hovered.append('text')
                    .attr('class', 'box-hover-text')
                    .style('color', colorBox(member, produce_flag))
                    .text(member + " contributed in Producing");
            }else{
                hovered.append('text')
                    .attr('class', 'box-hover-text')
                    .style('color', 'black')
                    .text(member + " didn't contribute in Producing");
            }
        })
        .on('mouseout', function(d){
            var hovered = d3.select(this);
            hovered.classed('hovered', false);
            hovered.select('text').remove();
        });
    
    // transition animation for box fill
    produce_box.transition().duration(1000).style('background-color', function(d) {
        if (d.contribution[3] == 1) {
            let produce_flag = 'produce';
            return colorBox(member, produce_flag);
        } else {
            return 'white';
        }
    });
    
    // The P text
    produce_box.append('p')
        .text('P')
        .attr('class', 'box_text');
    
    // Merge the .song-name on screen elements with the newly created ones, and update song name
    select.select('.song-name').merge(pEnter)
        .text(function(d){
            return d['song'];
        });


    
    // Merge the .contribution-bar-fill on screen elements with the newly created ones, and update width
//    select.select('.contribution-bar-fill').merge(fillEnter)
//        .style('width', function(d){
//            return 'calc(' + d['contribution'] + '% - 10px)';
//        })
//        .style('background-image', function(d){ if (member == 'RM') {return 'linear-gradient(to right, #B40404, #FE2E2E)';}
//                            else if (member == 'Jin') {return 'linear-gradient(to right, #B43104, #FE642E)';}
//                            else if (member == 'SUGA') {return 'linear-gradient(to right, #868A08, #F7D358)';}
//                            else if (member == 'J-Hope') {return 'linear-gradient(to right, #088A08, #00FF00)';}
//                            else if (member == 'Jimin') {return 'linear-gradient(to right, #B4045F, #FE2E9A)';}
//                            else if (member == 'V') {return 'linear-gradient(to right, #6A0888, #BF00FF)';}
//                            else if (member == 'Jungkook') {return 'linear-gradient(to right, #08298A, #0040FF)';}
//                            else if (member == 'BTS') {return 'linear-gradient(to right, red, yellow)';}
//        });

    select.exit().remove();
}


/** Iterates over all BTS songs and calculates contribution of member for a given song and stores it into a JavaScript object.
 * 
 *  Logic of function: Loops through each item in the new_bts_object. Each item in this object is a row within the excel spreadsheet.
 *  Each property is a column. It extracts the song name and uses the calculateContriubtion().
 * 
 * @param {*} member BTS member passed into to calculate contribution for
 */
function updateBars(member) {
    //array to hold 
    let data = [];

    /*
    new_bts_object is from new_data.js, which is the revised data set
    dataRow is each actual row from the excel spreadsheet
    */
    new_bts_object.forEach(dataRow => {
        let song = dataRow.Song;
        let album = dataRow.Album;
        let year = dataRow.Year_of_Release;
        let genre1 = dataRow.Genre1;
        let genre2 = dataRow.Genre2;
        let genre3 = dataRow.Genre3;
        
        let member_contribution = calculateContribution(member, dataRow);
        let albumPath = connectAlbumPath(album);
        let sum = 0;
        for (let contribution of member_contribution) {
            sum += contribution;
        }

        if (sum > 0) {
            data.push(
                {
                    "member": member,
                    "song": song,
                    "contribution": member_contribution,
                    "albumPath": albumPath,
                    "year": year,
                    "genre1": genre1,
                    "genre2": genre2,
                    "genre3": genre3,
                    "album": album
                }
            )
        }
    });

    renderBars(data, member);
}

/**
 * Function to connect album path
 * 
 * @param {String} album the album name
 * 
 * @returns {String} the path to the album image
 */
function connectAlbumPath(album) {
    switch(album) {
        case "2 Cool 4 Skool":
            return 'img/album pics/2Cool4Skool_albumcover.jpg';
        case "Agust D":
            return 'img/album pics/AgustD_albumcover.jpg';
        case "Dark & Wild":
            return 'img/album pics/DarkAndWild_albumcover.jpg';
        case "O!RUL8,2?":
            return 'img/album pics/orul82_albumcover.jpg';
        case "LOVE YOURSELF 結 'Answer'":
            return 'img/album pics/LYAnswer_albumcover.jpg';
        case "LOVE YOURSELF 轉 'Tear'":
            return 'img/album pics/LYTear_albumcover.jpg';
        case "LOVE YOURSELF 承 'Her'":
            return 'img/album pics/LYHer_albumcover.jpg';
        case "Skool Luv Affair":
            return 'img/album pics/SkoolLuvAffair_albumcover.jpg';
        case "Skool Luv Affair (Special Edition)":
            return 'img/album pics/SkoolLuvAffairSpecialEdition_albumcover.jpg';
        case "The Most Beautiful Moment in Life Pt.1":
            return 'img/album pics/TheMostBeautifulMomentinLifePart1_albumcover.jpg';
        case "The Most Beautiful Moment in Life Pt.2":
            return 'img/album pics/TheMostBeautifulMomentinLifePart2_albumcover.jpg';
        case "The Most Beautiful Moment in Life: Young Forever":
            return 'img/album pics/TheMostBeautifulMomentinLifeYoungForever_albumcover.jpg';
        case "Wings":
            return 'img/album pics/Wings_albumcover.jpg';
        case "You Never Walk Alone":
            return 'img/album pics/YouNeverWalkAlone_albumcover.jpg';
        case "MAP OF THE SOUL: PERSONA":
            return 'img/album pics/MapoftheSoulPersona_albumcover.jpg';
        case "RM":
            return 'img/album pics/RM_albumcover.jpg';
        case "mono.":
            return 'img/album pics/mono_albumcover.jpg';
        case "Hope World":
            return 'img/album pics/HopeWorld_albumcover.jpg';
    }
}

/**
 * Calculates contribution of a member in a song.
 * 
 *  Ex: voice: 1, write: 0, compose: 0, produce: 0, will return 1.
 * 
 * @param {*} member 
 * @param {*} song 
 * @returns {Integer} total value of member contribution to song, maximum is 4.
 */
function calculateContribution(member, song) {
    let contribution = [];

    contribution[0] = parseInt(song[member + "_Voice"] == -1 ? 0 : song[member + "_Voice"]);  // 0 is vocal
    contribution[1] = parseInt(song[member + "_Write"] == -1 ? 0 : song[member + "_Write"]);  // 1 is write
    contribution[2] = parseInt(song[member + "_Compose"] == -1 ? 0 : song[member + "_Compose"]); // 2 is compose
    contribution[3] = parseInt(song[member + "_Produce"] == -1 ? 0 : song[member + "_Produce"]); // 3 is produce

    return contribution;
}

/**
 * Choses the correct color associated with the member to fill the boxes
 * @returns {String} color name
*/
function colorBox(member, flag) {

    var colorsArray =  [["#B40404", "#DF0101", "#FF0000", "#FE2E2E"],
                        ["#FF8000", "#FE9A2E", "#FAAC58", "#F7BE81"],
                        ["#DBA901", "#FFBF00", "#FACC2E", "#F7D358"],
                        ["#088A08", "#04B404", "#01DF01", "#00FF00"],
                        ["#B4045F", "#DF0174", "#FF0080", "#FE2E9A"],
                        ["#6A0888", "#8904B1", "#A901DB", "#BF00FF"],
                        ["#08298A", "#0431B4", "#013ADF", "#0040FF"]];
    var colorChosen;

    if (member == 'RM') {
        if (flag == 'vocal') { colorChosen = colorsArray[0][0] }
        else if (flag == 'write') { colorChosen = colorsArray[0][1] }
        else if (flag == 'compose') { colorChosen = colorsArray[0][2] }
        else if (flag == 'produce') { colorChosen = colorsArray[0][3] }
    } else if (member == 'Jin') {
        if (flag == 'vocal') { colorChosen = colorsArray[1][0] }
        else if (flag == 'write') { colorChosen = colorsArray[1][1] }
        else if (flag == 'compose') { colorChosen = colorsArray[1][2] }
        else if (flag == 'produce') { colorChosen = colorsArray[1][3] }
    } else if (member == 'SUGA') {
        if (flag == 'vocal') { colorChosen = colorsArray[2][0] }
        else if (flag == 'write') { colorChosen = colorsArray[2][1] }
        else if (flag == 'compose') { colorChosen = colorsArray[2][2] }
        else if (flag == 'produce') { colorChosen = colorsArray[2][3] }
    } else if (member == 'J-Hope') {
        if (flag == 'vocal') { colorChosen = colorsArray[3][0] }
        else if (flag == 'write') { colorChosen = colorsArray[3][1] }
        else if (flag == 'compose') { colorChosen = colorsArray[3][2] }
        else if (flag == 'produce') { colorChosen = colorsArray[3][3] }
    } else if (member == 'Jimin') {
        if (flag == 'vocal') { colorChosen = colorsArray[4][0] }
        else if (flag == 'write') { colorChosen = colorsArray[4][1] }
        else if (flag == 'compose') { colorChosen = colorsArray[4][2] }
        else if (flag == 'produce') { colorChosen = colorsArray[4][3] }
    } else if (member == 'V') {
        if (flag == 'vocal') { colorChosen = colorsArray[5][0] }
        else if (flag == 'write') { colorChosen = colorsArray[5][1] }
        else if (flag == 'compose') { colorChosen = colorsArray[5][2] }
        else if (flag == 'produce') { colorChosen = colorsArray[5][3] }
    } else if (member == 'Jungkook') {
        if (flag == 'vocal') { colorChosen = colorsArray[6][0] }
        else if (flag == 'write') { colorChosen = colorsArray[6][1] }
        else if (flag == 'compose') { colorChosen = colorsArray[6][2] }
        else if (flag == 'produce') { colorChosen = colorsArray[6][3] }
    }

    return colorChosen;
}


//Search Functionality
// search(selectedMember);
d3.select('#search-Input').on('input', function() {
    search(selectedMember);
});


/**
 * Function for Searching through the interface. 
 * Users define an input that can search 
 * either a song or album name.
 * 
 * @param {String} value the text in the input that was typed by the user
 */
function search(member) {
    
    var filterText = d3.select('#search-Input').property('value');
    if (filterText !== "") {
        finalData = processedData.filter(function(d){
            return(d.song.toString().toLowerCase().includes(filterText.toLowerCase()) || d.album.toString().toLowerCase().includes(filterText.toLowerCase()));
        });
    }

    processedData = finalData;
    prefilteredData = finalData;

    renderBars(processedData, member);
}


/** USED 'btssort' AS NAME BECAUSE sort() IS A NATIVE JS FUNCTION
 * Function that handles the sorting.
 * This is the function that is called when the element is clicked in the UI
 * 
 * @param {String} value the type of sort to perform
 */
function btssort(value) {
    let sortAscending = value[0] == '▲' ? true : false;
    let sortType = value.substring(2, value.length);

    member = selectedMember;
    
    console.log(processedData);
    
    //let finalData = [];
    if (sortType == 'Alphabetically') {
        finalData = processedData.sort(function(a, b) {
            a = a.song.toString().toUpperCase();
            b = b.song.toString().toUpperCase();
    
            let comparison = a > b ? 1 : -1;
            return sortAscending ? comparison : -comparison;
        });
    } else if (sortType == 'Year of Release') {
        finalData = processedData.sort(function(a, b) {    
            let comparison = a.year - b.year;
            return sortAscending ? comparison : -comparison;
        });
    } else if (sortType == 'Contribution %') {
        finalData = processedData.sort(function(a, b) {
            let aScore = 0;
            let bScore = 0;
            for (let i = 0; i < 4; i++) {
                aScore += a.contribution[i];
                bScore += b.contribution[i];
            }
            let comparison = aScore - bScore;
            return sortAscending ? comparison : -comparison;
        });
    }

    processedData = finalData;
    prefilteredData = finalData;

    renderBars(processedData, member);
}

/**
 * Helper Function that handles the genre filtering.
 * This is the function that is called when the element is clicked in the UI
 * 
 * @param {String} value the text in the button that was clicked
 */
function genreFilter(value) {
    let filter_data = [];
    let filter_Type = value;
    let member = selectedMember;

    prefilteredData.forEach(element => {
        genre1 = element.genre1;
        genre2 = element.genre2;
        genre3 = element.genre3;

        if (genre1 == filter_Type || genre2 == filter_Type || genre3 == filter_Type){
            filter_data.push(
                {
                    "member": member,
                    "song": element.song,
                    "contribution": element.contribution,
                    "albumPath": element.albumPath,
                    "year": element.year,
                    "genre1": element.genre1,
                    "genre2": element.genre2,
                    "genre3": element.genre3,
                    "album": element.album
                }
            )
        }
    });

    processedData = filter_data;
    return processedData;
}
/**
 * Helper Function that handles the year filtering.
 * This is the function that is called when the element is clicked in the UI
 * 
 * @param {String} value the text in the button that was clicked
 */

function yearFilter(value) {
    let filter_data = [];
    let filter_Type = value;
    let member = selectedMember;

    prefilteredData.forEach(element => {

        if (element.year == filter_Type){
            filter_data.push(
                {
                    "member": member,
                    "song": element.song,
                    "contribution": element.contribution,
                    "albumPath": element.albumPath,
                    "year": element.year,
                    "genre1": element.genre1,
                    "genre2": element.genre2,
                    "genre3": element.genre3,
                    "album": element.album
                }
            )
        }
    });

    processedData = filter_data;
    return processedData;
}

/**
 * Helper Function that handles the percent filtering.
 * This is the function that is called when the element is clicked in the UI
 * 
 * @param {String} value the text in the button that was clicked
 */
function percentFilter(value) {
    let filter_data = [];
    let filter_Type = value;
    let member = selectedMember;

    prefilteredData.forEach(element => {

        let sum = 0;
        for (let contribution of element.contribution) {
            sum += contribution;
        }
    
        if (sum == filter_Type){
            filter_data.push(
                {
                "member": member,
                "song": element.song,
                "contribution": element.contribution,
                "albumPath": element.albumPath,
                "year": element.year,
                "genre1": element.genre1,
                "genre2": element.genre2,
                "genre3": element.genre3,
                "album": element.album
                }
            )
        }
    });

    processedData = filter_data;
    return processedData;
}
/**
 * Helper Function that handles the album filtering.
 * This is the function that is called when the element is clicked in the UI
 * 
 * @param {String} value the text in the button that was clicked
 */
function albumFilter(value) {
    let filter_data = [];
    let filter_Type = value;
    let member = selectedMember;

    prefilteredData.forEach(element => {
    
        if (element.album == filter_Type){
            filter_data.push(
                {
                    "member": member,
                    "song": element.song,
                    "contribution": element.contribution,
                    "albumPath": element.albumPath,
                    "year": element.year,
                    "genre1": element.genre1,
                    "genre2": element.genre2,
                    "genre3": element.genre3,
                    "album": element.album
                }
            )
        }
    });

    processedData = filter_data;
    return processedData;
}
/**
 * Function that handles the filtering.
 * This is the function that is called when the element is clicked in the UI
 * 
 * @param {String} value the text in the button that was clicked
 */
function filter(value) {
    //array to hold 
    let filter_data = [];
    let filter_Type = value;
    member = selectedMember;

    if (filter_Type == 'Ambient'){
            filter_data = genreFilter("Ambient");
        }else if (filter_Type == 'Ballad'){
            filter_data = genreFilter("Ballad");
        }else if (filter_Type == 'Blues'){
            filter_data = genreFilter("Blues");
        }else if (filter_Type == 'Dance'){
            filter_data = genreFilter("Dance");
        }else if (filter_Type == 'EDM'){
            filter_data = genreFilter("EDM");
        }else if (filter_Type == 'Electropop'){
            filter_data = genreFilter("Electropop");
        }else if (filter_Type == 'Emo Hip-Hop'){
            filter_data = genreFilter("Emo Hip-Hop");
        }else if (filter_Type == 'Funk'){
            filter_data = genreFilter("Funk");
        }else if (filter_Type == 'Future-Bass'){
            filter_data = genreFilter("Future-Bass");
        }else if (filter_Type == 'G-Funk'){
            filter_data = genreFilter("G-Funk");
        }else if (filter_Type == 'Hip-Hop'){
            filter_data = genreFilter("Hip-Hop");
        }else if (filter_Type == 'House'){
            filter_data = genreFilter("House");
        }else if (filter_Type == 'Indie'){
            filter_data = genreFilter("Indie");
        }else if (filter_Type == 'Jazz'){
            filter_data = genreFilter("Jazz");
        }else if (filter_Type == 'Latin-Pop'){
            filter_data = genreFilter('Latin-Pop');
        }else if (filter_Type == 'Moombahton'){
            filter_data = genreFilter("Moombahton");
        }else if (filter_Type == 'None'){
            filter_data = genreFilter("None");
        }else if (filter_Type == 'Neo-Soul'){
            filter_data = genreFilter("Neo-Soul");
        }else if (filter_Type == 'Nu-disco'){
            filter_data = genreFilter("Nu-disco");
        }else if (filter_Type == 'Pop'){
            filter_data = genreFilter("Pop");
        }else if (filter_Type == 'Punk-Rock'){
            filter_data = genreFilter("Punk-Rock");
        }else if (filter_Type == 'R&B'){
            filter_data = genreFilter("R&B");
        }else if (filter_Type == 'Reggaeton'){
            filter_data = genreFilter('Reggaeton');
        }else if (filter_Type == 'Rock'){
            filter_data = genreFilter("Rock");
        }else if (filter_Type == 'Samul-nori'){
            filter_data = genreFilter("Samul-nori");
        }else if (filter_Type == 'Trap'){
            filter_data = genreFilter("Trap");
        }else if (filter_Type == 'Tropical-House'){
            filter_data = genreFilter('Tropical-House');
        }else if (filter_Type == 'Turntablism Hip-Hop'){
            filter_data = genreFilter('Tropical-House');
        }else if (filter_Type == '2013'){
            filter_data = yearFilter('2013');
        }else if (filter_Type == '2014'){
            filter_data = yearFilter('2014');
        }else if (filter_Type == '2015'){
            filter_data = yearFilter('2015');
        }else if (filter_Type == '2016'){
            filter_data = yearFilter('2016');
        }else if (filter_Type == '2017'){
            filter_data = yearFilter('2017');
        }else if (filter_Type == '2018'){
            filter_data = yearFilter('2018');
        }else if (filter_Type == '2019'){
            filter_data = yearFilter('2019');
        }else if (filter_Type == '25%'){
            filter_data = percentFilter('1');
        }else if (filter_Type == '50%'){
            filter_data = percentFilter('2');
        }else if (filter_Type == '75%'){
            filter_data = percentFilter('3');
        }else if (filter_Type == '100%'){
            filter_data = percentFilter('4');
        }else if (filter_Type == '2 Cool 4 Skool'){
            filter_data = albumFilter('2 Cool 4 Skool');
        }else if (filter_Type == 'O!RUL8,2?'){
            filter_data = albumFilter('O!RUL8,2?');
        }else if (filter_Type == 'Skool Luv Affair'){
            filter_data = albumFilter('Skool Luv Affair');
        }else if (filter_Type == 'Skool Luv Affair (Special Edition)'){
            filter_data = albumFilter('Skool Luv Affair (Special Edition)');
        }else if (filter_Type == 'Dark & Wild'){
            filter_data = albumFilter('Dark & Wild');
        }else if (filter_Type == 'The Most Beautiful Moment in Life Pt.1'){
            filter_data = albumFilter('The Most Beautiful Moment in Life Pt.1');
        }else if (filter_Type == 'The Most Beautiful Moment in Life Pt.2'){
            filter_data = albumFilter('The Most Beautiful Moment in Life Pt.2');
        }else if (filter_Type == 'The Most Beautiful Moment in Life: Young Forever'){
            filter_data = albumFilter('The Most Beautiful Moment in Life: Young Forever');
        }else if (filter_Type == 'Wings'){
            filter_data = albumFilter('Wings');
        }else if (filter_Type == 'You Never Walk Alone'){
            filter_data = albumFilter('You Never Walk Alone')
        }else if (filter_Type == "LOVE YOURSELF 承 'Her'"){
            filter_data = albumFilter("LOVE YOURSELF 承 'Her'")
        }else if (filter_Type == "LOVE YOURSELF 轉 'Tear'"){
            filter_data = albumFilter("LOVE YOURSELF 轉 'Tear'")
        }else if (filter_Type == "LOVE YOURSELF 結 'Answer'"){
            filter_data = albumFilter("LOVE YOURSELF 結 'Answer'")
        }else if (filter_Type == 'MAP OF THE SOUL: PERSONA'){
            filter_data = albumFilter('MAP OF THE SOUL: PERSONA')
        }else if (filter_Type == 'RM'){
            filter_data = albumFilter('RM')
        }else if (filter_Type == 'mono.'){
            filter_data = albumFilter('mono.')
        }else if (filter_Type == 'Agust D'){
            filter_data = albumFilter('Agust D')
        }else if (filter_Type == 'Hope World'){
            filter_data = albumFilter('Hope World')
        }

    
    renderBars(filter_data, member);
}
function replaceButtonText(buttonId, text)
{
  if (document.getElementById)
  {
    var button=document.getElementById(buttonId);
    if (button)
    {
      if (button.childNodes[0])
      {
        button.childNodes[0].nodeValue=text;
      }
      else if (button.value)
      {
        button.value=text;
      }
      else //if (button.innerHTML)
      {
        button.innerHTML=text;
      }
    }
  }
}


/**
 * Function that handles the resetting filter and sort together
 * This is the function that is called when the element is clicked in the UI
 */
function resetAll() {
    let member = selectedMember;
    processedData = processData(member);
    console.log(processedData)
    renderBars(processedData, member);
}

/**
 * Converts data into the same format that filter sort and search 
 */
function processData(member) {
    let data = [];
        /*
    new_bts_object is from new_data.js, which is the revised data set
    dataRow is each actual row from the excel spreadsheet
    */
    new_bts_object.forEach(dataRow => {
        let song = dataRow.Song;
        let album = dataRow.Album;
        let year = dataRow.Year_of_Release;
        let genre1 = dataRow.Genre1;
        let genre2 = dataRow.Genre2;
        let genre3 = dataRow.Genre3;

        let member_contribution = calculateContribution(member, dataRow);
        let albumPath = connectAlbumPath(album);
        let sum = 0;
        for (let contribution of member_contribution) {
            sum += contribution;
        }

        data.push(
            {
                "member": member,
                "song": song,
                "contribution": member_contribution,
                "albumPath": albumPath,
                "year": year,
                "genre1": genre1,
                "genre2": genre2,
                "genre3": genre3,
                "album": album
            }
        )
    });

    return data;
}