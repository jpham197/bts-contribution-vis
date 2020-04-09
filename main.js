// var main = d3.select('#main');

d3.selectAll('.bts-tab')
    .on('click', function(){
    var clickedTab = d3.select(this);

    d3.select('.bts-tab.active').classed('active',false);
    clickedTab.classed('active',true);
    
    var member = clickedTab.attr('data-member');
    updateBars(member);
    document.getElementById('hide-me').style.display = "none";
});


/*
    Function to create the contribution bars
*/
function renderBars(data, member) {

    var select = d3.selectAll('.bts-contribution')
        .data(data);

    // Append divs for each song, class them to reference later
    var enter = select.enter().append('div')
        .attr('class','bts-contribution');

    
    // Append p for each song name, class them to reference later
    var pEnter = enter.append('p')
        .attr('class', 'song-name')
        .attr('class', function(d, i) {
            if (i == 0) {
                return "first";
            }
        });

    // Append <div><div></div></div> to create the contribution-bar structure
    var fillEnter = enter.append('div')
        .attr('class', 'contribution-bar')
        .append('div')
        .attr('class', 'contribution-bar-fill');

    // Append a <p> element to display the contribution bar values
    var valEnter = fillEnter.append('p')
        .attr('class', 'contribution-bar-value');

    // Merge the .song-name on screen elements with the newly created ones, and update song name
    select.select('.song-name').merge(pEnter)
        .text(function(d){
            return d['song'];
        });

    // Merge the .contribution-bar-fill on screen elements with the newly created ones, and update width
    select.select('.contribution-bar-fill').merge(fillEnter)
        .style('width', function(d){
            return 'calc(' + d['contribution'] + '% - 10px)';
        })
        .style('background-image', function(d){ if (member == 'RM') {return 'linear-gradient(to right, #B40404, #FE2E2E)';}
                            else if (member == 'Jin') {return 'linear-gradient(to right, #B43104, #FE642E)';}
                            else if (member == 'SUGA') {return 'linear-gradient(to right, #868A08, #F7D358)';}
                            else if (member == 'J-Hope') {return 'linear-gradient(to right, #088A08, #00FF00)';}
                            else if (member == 'Jimin') {return 'linear-gradient(to right, #B4045F, #FE2E9A)';}
                            else if (member == 'V') {return 'linear-gradient(to right, #6A0888, #BF00FF)';}
                            else if (member == 'Jungkook') {return 'linear-gradient(to right, #08298A, #0040FF)';}
                            else if (member == 'BTS') {return 'linear-gradient(to right, red, yellow)';}
        });

// This code shows the percentage. Currently this displays it inside of block, needs to be moved to the end of the block
//    select.select('.contribution-bar-value').merge(valEnter)
//        .text(function(d){
//            return d['contribution'] + '%';
//        })
//        .style('padding-left',function(d){
//            return d['contribution'] > 5 ? 0 : '30px';
//        })
//        .style('color',function(d){
//            return d['contribution'] > 5 ? '#222' : '#fff';
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
    console.log(member);

    //If BTS icon is clicked, show all songs, else check against the selected member
    if (member === 'BTS') {
        new_bts_object.forEach(dataRow => {
            let song = dataRow.song;
            let album = dataRow.album;

            data.push(
                {
                    "member": "BTS",
                    "song": song,
                    "contribution": 100
                }
            );
        });
    } else {
        /*
        new_bts_object is from new_data.js, which is the revised data set
        dataRow is each actual row from the excel spreadsheet
        */
        new_bts_object.forEach(dataRow => {
            let song = dataRow.Song;
            let album = dataRow.album;

            member_contribution = calculateContribution(member, dataRow);
            // denominator = calculateMax(dataRow);
            if (member_contribution > 0) {
                data.push(
                    {
                        "member": member,
                        "song": song,
                        "contribution": (member_contribution / 4) * 100 //Contribution relative to self
                        // "contribution": Math.trunc((member_contribution / denominator) * 100) //Contribution relative to other members
                    }
                )
            }
        });
    }

    

    renderBars(data, member);
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
    let contribution = 0.0;

    contribution += parseInt(song[member + "_Voice"] == -1 ? 0 : song[member + "_Voice"]);
    contribution += parseInt(song[member + "_Write"] == -1 ? 0 : song[member + "_Write"]);
    contribution += parseInt(song[member + "_Compose"] == -1 ? 0 : song[member + "_Compose"]);
    contribution += parseInt(song[member + "_Produce"] == -1 ? 0 : song[member + "_Produce"]);

    return contribution;
}

/**
 * CURRENTLY UNUSED
 * 
 * Contribution max, total member contribution of a song
 * @param {*} song
 * @returns {Integer} total possible contribution to song
 */
function calculateMax(song) {
    
    let possibleContribution = parseInt(song["RM_Voice"]) +
        + parseInt(song["RM_Write"])
        + parseInt(song["RM_Compose"])
        + parseInt(song["RM_Produce"])
        + parseInt(song["SUGA_Voice"])
        + parseInt(song["SUGA_Write"])
        + parseInt(song["SUGA_Compose"])
        + parseInt(song["SUGA_Produce"])
        + parseInt(song["J-Hope_Voice"])
        + parseInt(song["J-Hope_Write"])
        + parseInt(song["J-Hope_Compose"])
        + parseInt(song["J-Hope_Produce"])
        + parseInt(song["Jin_Voice"])
        + parseInt(song["Jin_Write"])
        + parseInt(song["Jin_Compose"])
        + parseInt(song["Jin_Produce"])
        + parseInt(song["Jimin_Voice"])
        + parseInt(song["Jimin_Write"])
        + parseInt(song["Jimin_Compose"])
        + parseInt(song["Jimin_Produce"])
        + parseInt(song["V_Voice"])
        + parseInt(song["V_Write"])
        + parseInt(song["V_Compose"])
        + parseInt(song["V_Produce"])
        + parseInt(song["Jungkook_Voice"])
        + parseInt(song["Jungkook_Write"])
        + parseInt(song["Jungkook_Compose"])
        + parseInt(song["Jungkook_Produce"]);

    

    if (possibleContribution <= 0) {
        possibleContribution = 1;
    }

    return possibleContribution;
}