var main = d3.select('#main');

d3.selectAll('.bts-tab')
    .on('click', function(){
    var clickedTab = d3.select(this);

    d3.select('.bts-tab.active').classed('active',false);
    clickedTab.classed('active',true);

    var member = clickedTab.attr('data-member');
    updateBars(member);
    document.getElementById('hide-me').style.display = "none";
});


function renderBars(data) {

    var select = d3.selectAll('.bts-contribution')
        .data(data);

    var enter = select.enter().append('div')
        .attr('class','bts-contribution');

    var pEnter = enter.append('p')
        .attr('class', 'song-name')
        .attr('class', function(d, i) {
            if (i == 0) {
                return "first";
            }
        });

    var fillEnter = enter.append('div')
        .attr('class', 'contribution-bar')
        .append('div')
        .attr('class', 'contribution-bar-fill');

    var valEnter = fillEnter.append('p')
        .attr('class', 'contribution-bar-value');

    select.select('.song-name').merge(pEnter)
        .text(function(d){
            return d['song'];
        });

    
    select.select('.contribution-bar-fill').merge(fillEnter)
        .style('width', function(d){
            return 'calc(' + d['contribution'] + '% - 6px)';
        });

        
    select.select('.contribution-bar-value').merge(valEnter)
        .text(function(d){
            return d['contribution'] + '%';
        })
        .style('padding-left',function(d){
            return d['contribution'] > 5 ? 0 : '30px';
        })
        .style('color',function(d){
            return d['contribution'] > 5 ? '#222' : '#fff';
        });

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

    renderBars(data);
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