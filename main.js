var main = d3.select('#main');

// Select all the album tabs
d3.selectAll('.got-tab')
    .on('click', function(){
    // On click, activate the selected tab (this), and de-select the previously active
    var clickedTab = d3.select(this);

    d3.select('.got-tab.active').classed('active',false);
    clickedTab.classed('active',true);

    // Get which album was selected, call updateBars
    var member = clickedTab.attr('data-member');
    updateBars(member);
});


function renderBars(data) {
    // Create a selection for character survival bars
    var select = d3.selectAll('.got-survival')
    .data(data);

    // Append divs for each song, class them to reference later
    var enter = select.enter().append('div')
    .attr('class','got-song');

    // Append a <p> element to the newly appended div.got-song
    var pEnter = enter.append('p')
    .attr('class', 'got-song-name');

    // Append <div><div></div></div> to create the contributionv-bar structure
    var fillEnter = enter.append('div')
    .attr('class', 'got-contribution-bar')
    .append('div')
    .attr('class', 'got-contribution-bar-fill');

    // Append a <p> element to display the contribution value
    var valEnter = fillEnter.append('p')
    .attr('class', 'got-contribution-bar-value');

    // Now this is where we update both the newly created elements on screen and the ones already present

    // Merge the .got-person-name elements on screen elements with the newly created ones, and update name
    select.select('.got-song-name').merge(pEnter)
        .text(function(d){
        return d['name'];
    });

    // Merge the .got-contribution-bar-fill on screen elements with the newly created ones, and update width
    select.select('.got-contribution-bar-fill').merge(fillEnter)
        .style('width', function(d){
        return 'calc(' + d['percentage_of_contribution'] + '% - 3px)';
    });

    // Merge the .got-progress-bar-value on screen elements with the newly created ones, and update text,
    // positioning, and color
    select.select('.got-contribution-bar-value').merge(valEnter)
        .text(function(d){
        return d['percentage_of_contribution'] + '%';
    })
        .style('padding-left',function(d){
        return d['percentage_of_contribution'] > 5 ? 0 : '30px';
    })
        .style('color',function(d){
        return d['percentage_of_contribution'] > 5 ? '#222' : '#fff';
    });

    // Remove all elements that no longer have data bound to them
    select.exit().remove();
}

// **** Your JavaScript code goes here ****
// Your task is to filter the global characters array to only display the selected house.
// You should use the characters' house property to filter. Remember the filter() function creates a new array.
// However, you will need to come up with an exception for the top case where you filter by power_ranking greater than 0 instead.

//d3.csv("dataset.csv").then((data) => {
//});

function updateBars(member) {
    // Edit this function to filter the characters based on house
    // You will need a special case for the top characters 'top'

    data = member.filter( function(value)  {
        return (value.member === member);
    });

    renderBars(data);
}

