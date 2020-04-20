# BTS Contribution Visualization
A visualization of each BTS member's contribution to the group's music.

[Viewable by clicking here](https://sandraalsayar.github.io/bts-contribution-vis/)

## How to Run Code
To run the project locally:
1. Download the project or clone it onto your machine
2. Start up a local server either by using a text editor extension or a simple python server

To view the project live: [Click here](https://sandraalsayar.github.io/bts-contribution-vis/)

# Data
Data was gathered by team lead Sandra Alsayar. Production credits came from the KOMCA online database.

The original format of this data was an Excel spreadsheet. In order to use this data with d3.js, we converted it into a .csv format and then used an online converter that transformed it into JSON. 

# Contribution Types
Contribution within this visualization is classified into four categories: 
1. Voice
2. Write
3. Compose
4. Produce

The type of contribution considered is relative to how much a member himself can contribute. For example, if a member contributes to a song only by voice, that member has 25% contribution. Each additional contribution adds a 25% for a total of 100%.

# Design of Program
Our project was designed using:
* HTML
* CSS
* Plain JavaScript
* D3.js

Our visualization is based on functional programming. Functions are hooked up into HTML elements through both the html ```onclick``` attribute and D3's ```on()``` function. Clicking elements that were wired up with these methods activated its respective JavaScript function.

For example, the BTS members at the top of the page are connected as such:

```javascript
d3.selectAll('.bts-tab')
    .on('click', function() {
        //Operations here
    });
```

Member selection and searching was detected via D3's ```on()``` while sort and filter used ```onclick```.

Data was converted from ```.csv``` into ```.json``` via an online converter. Both files are still included in the project regardless.