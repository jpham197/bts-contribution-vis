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
    data = data.sort((element, nextElement) => {
        return nextElement.probability_of_survival - element.probability_of_survival;
    });

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



function updateBars(member) {

    let data = [];

    new_bts_object.forEach(element => {
        console.log(element);
        let song = element.Song;
        let album = element.album;

        member_contribution = calculateContribution(member, element);
        denominator = calculateMax(element);
        // console.log(`Denominator: ${denominator}, Song: ${song}`);
        // console.log(member_contribution / denominator);
        data.push(
            {
                "member": member,
                "song": song,
                "contribution": (member_contribution / 4) * 100
                // "contribution": Math.trunc((member_contribution / denominator) * 100)
            }
        )
    });

    // let RM_contribution = [];
    // let JIN_contribution = [];
    // let SUGA_contribution = [];
    // let J_HOPE_contribution = [];
    // let JIMIN_contribution = [];
    // let V_contribution = [];
    // let JK_contribution = [];

    // filtered = data.forEach(element => {
    //     RM =  calculateContribution("RM", element);
    //     JIN = calculateContribution("Jin", element);
    //     SUGA = calculateContribution("SUGA", element);
    //     J_HOPE = calculateContribution("J_Hope", element);
    //     JIMIN = calculateContribution("Jimin", element);
    //     V = calculateContribution("V", element);
    //     JK = calculateContribution("Jungkook", element);
        
    //     RM_contribution.push({"contribution": RM, "title": element["Song"]});
    //     JIN_contribution.push({"contribution": JIN, "title": element["Song"]});
    //     SUGA_contribution.push({"contribution": SUGA, "title": element["Song"]});
    //     J_HOPE_contribution.push({"contribution": J_HOPE, "title": element["Song"]});
    //     JIMIN_contribution.push({"contribution": JIMIN, "title": element["Song"]});
    //     V_contribution.push({"contribution": V, "title": element["Song"]});
    //     JK_contribution.push({"contribution": JK, "title": element["Song"]});
    // });

    // let contribution = {
    //     "RM": RM_contribution,
    //     "JIN": JIN_contribution,
    //     "SUGA": SUGA_contribution,
    //     "J_HOPE": J_HOPE_contribution,
    //     "JIMIN": JIMIN_contribution,
    //     "V": V_contribution,
    //     "JK": JK_contribution
    // };

    renderBars(data);
}

/**
 * Calculates contribution of a member in a song
 * @param {*} member 
 * @param {*} song 
 * @returns {Integer} total value of member contribution to song
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

    // if (song.Song == "Scenery") {
    //     console.log(song["RM_Voice"]);
    //     console.log(song["RM_Write"]);
    //     console.log(song["RM_Compose"]);
    //     console.log(song["RM_Produce"]);
    //     console.log(song["SUGA_Voice"]);
    //     console.log(song["SUGA_Write"]);
    //     console.log(song["SUGA_Compose"]);
    //     console.log(song["SUGA_Produce"]);
    //     console.log(song["J-Hope_Voice"]);
    //     console.log(song["J-Hope_Write"]);
    //     console.log(song["J-Hope_Compose"]);
    //     console.log(song["J-Hope_Produce"]);
    //     console.log(song["Jimin_Voice"]);
    //     console.log(song["Jimin_Write"]);
    //     console.log(song["Jimin_Compose"]);
    //     console.log(song["Jimin_Produce"]);
    //     console.log(song["V_Voice"]);
    //     console.log(song["V_Write"]);
    //     console.log(song["V_Compose"]);
    //     console.log(song["V_Produce"]);
    //     console.log(song["Jin_Voice"]);
    //     console.log(song["Jin_Write"]);
    //     console.log(song["Jin_Compose"]);
    //     console.log(song["Jin_Produce"]);
    //     console.log(song["Jungkook_Voice"]);
    //     console.log(song["Jungkook_Write"]);
    //     console.log(song["Jungkook_Compose"]);
    //     console.log(song["Jungkook_Produce"]);

    // }

    // console.log(`possibleContribution: ${possibleContribution}, song name: ${song.Song}`);

    return possibleContribution;
}