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

    // Delete everything to reload new info - this is a hacky way to do it instead of merging old page and new page
    d3.selectAll('.bts-contribution').remove();
    
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

    // Append a div to create the contribution-bar structure
    var fillEnter = enter.append('div')
        .attr('class', 'contribution-bar');
    //    .append('div')
    //    .attr('class', 'contribution-bar-fill');

    // Append a <p> element to display the contribution bar values
//    var valEnter = fillEnter.append('p')
//        .attr('class', 'contribution-bar-value');

    // ***************Create the 4 rectangles
    // Vocal box
    let vocal_box = fillEnter.append('span')
        .attr('class', 'vocal')
        .style('background-color', function(d) {
            if (d.contribution[0] == 1) {
                let vocal_flag = 'vocal';
                return colorBox(member, vocal_flag);
            } else {
                return 'white' //none
            }
        })
        .on('mouseover', function(d){
            var hovered = d3.select(this);
            hovered.classed('text', true);
            if (d.contribution[0] == 1) {
                let vocal_flag = 'vocal';
                hovered.append('text')
                    .attr('class', 'text')
                    .style('color', colorBox(member, vocal_flag))
                    .style('font-size', '15px')
                    .style('white-space', 'nowrap')
                    .style('vertical-align', 'top')
                    .text(member + " contributed Vocally to the song");
            }else{
                hovered.append('text')
                    .attr('class', 'text')
                    .attr('class', 'text')
                    .style('color', 'black')
                    .style('font-size', '15px')
                    .style('white-space', 'nowrap')
                    .style('vertical-align', 'top')
                    .text(member + " didn't contribute in writing this song");
            }
        })
        .on('mouseout', function(d){
            var hovered = d3.select(this);
            hovered.classed('text', false);
            hovered.select('text').remove();
        });
    
    // The V text
    vocal_box.append('p')
        .text('V')
        .attr('class', 'box_text');
    
    // Write box
    let write_box = fillEnter.append('span')
        .attr('class', 'write')
        .style('background-color', function(d) {
            if (d.contribution[1] == 1) {
                let write_flag = 'write';
                return colorBox(member, write_flag);
            } else {
                return 'white'
            }
        })
        .on('mouseover', function(d){
            var hovered = d3.select(this);
            hovered.classed('hovered', true);
            if (d.contribution[1] == 1) {
                let write_flag = 'write';
                hovered.append('text')
                    .attr('class', 'text')
                    .attr('class', 'text')
                    .style('color', colorBox(member, write_flag))
                    .style('font-size', '15px')
                    .style('white-space', 'nowrap')
                    .style('vertical-align', 'top')
                    .text(member + " contributed in writing this song");
            }else{
                hovered.append('text')
                    .attr('class', 'text')
                    .attr('class', 'text')
                    .style('color', 'black')
                    .style('font-size', '15px')
                    .style('white-space', 'nowrap')
                    .style('vertical-align', 'top')
                    .text(member + " didn't contributed in writing this song");
            }
        })
        .on('mouseout', function(d){
            var hovered = d3.select(this);
            hovered.classed('hovered', false);
            hovered.select('text').remove();
        });
    
    // The W text
    write_box.append('p')
        .text('W')
        .attr('class', 'box_text');
    
    // Compose box
    let compose_box = fillEnter.append('span')
        .attr('class', 'compose')
        .style('background-color', function(d) {
            if (d.contribution[2] == 1) {
                let compose_flag = 'compose';
                return colorBox(member, compose_flag);
            } else {
                return 'white'
            }
        })
        .on('mouseover', function(d){
            var hovered = d3.select(this);
            hovered.classed('hovered', true);
            if (d.contribution[2] == 1) {
                let compose_flag = 'compose';
                hovered.append('text')
                    .attr('class', 'text')
                    .attr('class', 'text')
                    .style('color', colorBox(member, compose_flag))
                    .style('font-size', '15px')
                    .style('white-space', 'nowrap')
                    .style('vertical-align', 'top')
                    .text(member + " contributed in composing this song");
            }else{
                hovered.append('text')
                    .attr('class', 'text')
                    .attr('class', 'text')
                    .style('color', 'black')
                    .style('font-size', '15px')
                    .style('white-space', 'nowrap')
                    .style('vertical-align', 'top')
                    .text(member + " didn't contributed in composing this song");
            }
        })
        .on('mouseout', function(d){
            var hovered = d3.select(this);
            hovered.classed('hovered', false);
            hovered.select('text').remove();
        });
    
    // The C text
    compose_box.append('p')
        .text('C')
        .attr('class', 'box_text');
    
    // Produce box
    let produce_box = fillEnter.append('span')
        .attr('class', 'produce')
        .style('background-color', function(d) {
            if (d.contribution[3] == 1) {
                let produce_flag = 'produce';
                return colorBox(member, produce_flag);
            } else {
                return 'white';
            }
        })
        .on('mouseover', function(d){
            var hovered = d3.select(this);
            hovered.classed('hovered', true);
            if (d.contribution[3] == 1) {
                let produce_flag = 'produce';
                hovered.append('text')
                    .attr('class', 'text')
                    .attr('class', 'text')
                    .style('color', colorBox(member, produce_flag))
                    .style('font-size', '15px')
                    .style('white-space', 'nowrap')
                    .style('vertical-align', 'top')
                    .text(member + " contributed in producing this song");
            }else{
                hovered.append('text')
                    .attr('class', 'text')
                    .attr('class', 'text')
                    .style('color', 'black')
                    .style('font-size', '15px')
                    .style('white-space', 'nowrap')
                    .style('vertical-align', 'top')
                    .text(member + " didn't contributed in producing this song");
            }
        })
        .on('mouseout', function(d){
            var hovered = d3.select(this);
            hovered.classed('hovered', false);
            hovered.select('text').remove();
        });
    
    // The P text
    produce_box.append('p')
        .text('P')
        .attr('class', 'box_text');
    
    // Merge the .song-name on screen elements with the newly created ones, and update song name
    select.select('.song-name').merge(pEnter)
        .text(function(d){
            console.log(d);
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

    //If BTS icon is clicked, show all songs, else check against the selected member
//    if (member === 'BTS') {
//        new_bts_object.forEach(dataRow => {
//            let song = dataRow.Song;
//            let album = dataRow.album;
//
//            data.push(
//                {
//                    "member": "BTS",
//                    "song": song,
//                    "contribution": [1, 1, 1, 1]
//                }
//            );
//        });
//    } else {
        /*
        new_bts_object is from new_data.js, which is the revised data set
        dataRow is each actual row from the excel spreadsheet
        */
        new_bts_object.forEach(dataRow => {
            let song = dataRow.Song;
            let album = dataRow.album;
            
            member_contribution = calculateContribution(member, dataRow);
            
            let sum = 0;
            for (let contribution of member_contribution) {
                sum += contribution;
            }
            if (sum > 0) {
                data.push(
                    {
                        "member": member,
                        "song": song,
                        "contribution": member_contribution //Contribution relative to self
                        // "contribution": Math.trunc((member_contribution / denominator) * 100) //Contribution relative to other members
                    }
                )
            }
        });

    
    
    //    }

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
//    var colorsArray = ['red', 'orange', 'yellow', 'green', 'pink', 'purple', 'blue', 'grey'];

    var colorsArray = [["#B40404", "#DF0101", "#FF0000", "#FE2E2E"],
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
//        colorChosen = colorsArray[0];
    } else if (member == 'Jin') {
        if (flag == 'vocal') { colorChosen = colorsArray[1][0] }
        else if (flag == 'write') { colorChosen = colorsArray[1][1] }
        else if (flag == 'compose') { colorChosen = colorsArray[1][2] }
        else if (flag == 'produce') { colorChosen = colorsArray[1][3] }
//        colorChosen = colorsArray[1];
    } else if (member == 'SUGA') {
        if (flag == 'vocal') { colorChosen = colorsArray[2][0] }
        else if (flag == 'write') { colorChosen = colorsArray[2][1] }
        else if (flag == 'compose') { colorChosen = colorsArray[2][2] }
        else if (flag == 'produce') { colorChosen = colorsArray[2][3] }
//        colorChosen = colorsArray[2];
    } else if (member == 'J-Hope') {
        if (flag == 'vocal') { colorChosen = colorsArray[3][0] }
        else if (flag == 'write') { colorChosen = colorsArray[3][1] }
        else if (flag == 'compose') { colorChosen = colorsArray[3][2] }
        else if (flag == 'produce') { colorChosen = colorsArray[3][3] }
//        colorChosen = colorsArray[3];
    } else if (member == 'Jimin') {
        if (flag == 'vocal') { colorChosen = colorsArray[4][0] }
        else if (flag == 'write') { colorChosen = colorsArray[4][1] }
        else if (flag == 'compose') { colorChosen = colorsArray[4][2] }
        else if (flag == 'produce') { colorChosen = colorsArray[4][3] }
//        colorChosen = colorsArray[4];
    } else if (member == 'V') {
        if (flag == 'vocal') { colorChosen = colorsArray[5][0] }
        else if (flag == 'write') { colorChosen = colorsArray[5][1] }
        else if (flag == 'compose') { colorChosen = colorsArray[5][2] }
        else if (flag == 'produce') { colorChosen = colorsArray[5][3] }
//        colorChosen = colorsArray[5];
    } else if (member == 'Jungkook') {
        if (flag == 'vocal') { colorChosen = colorsArray[6][0] }
        else if (flag == 'write') { colorChosen = colorsArray[6][1] }
        else if (flag == 'compose') { colorChosen = colorsArray[6][2] }
        else if (flag == 'produce') { colorChosen = colorsArray[6][3] }
//        colorChosen = colorsArray[6];
    }

    return colorChosen;
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

/**
 * Function to append the filter items onto the HTML
 * 
 * It will be used don't delete
 */
function appendFilterAndSort() {
    
}