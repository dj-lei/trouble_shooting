const url = require("./plugins/url");

function TextView(path, name)
{
	this.path = path
  this.name = name
};

TextView.prototype.init = function()
{

}

TextView.prototype.openFile = async function()
{
  let that = this
  await url.get(`open_file?path=${this.path}`)
  .then(function (response) {
    // handle success
    that.createTextView(response.data.lines, that.name)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}

TextView.prototype.createTextView = function(lines, name)
{
  let that = this
  var tablink = document.createElement('button')
  tablink.style.backgroundColor = '#555'
  tablink.style.color = 'white'
  tablink.style.float = 'left'
  tablink.style.border = 'none'
  tablink.style.outline = 'none'
  tablink.style.cursor = 'pointer'
  tablink.style.padding = '14px 16px'
  tablink.style.fontSize = '17px'
  tablink.style.width = '25%'
  tablink.className = "tablink"
  tablink.innerHTML = name
  tablink.addEventListener("mouseover", () => {
    tablink.style.backgroundColor = '#777'
  })
  tablink.addEventListener('click', function()
  {
    that.openPage(name, tablink)
  })

  var tabcontent = document.createElement('div')
  tabcontent.setAttribute('id', name)
  tabcontent.style.display = 'none'
  tabcontent.style.color = 'white'
  tabcontent.style.height = '100%'
  tabcontent.className = "tabcontent"

  var table = document.createElement('table')
  table.style.width = '100%'

  lines.forEach((line) => {
    var tr = document.createElement('tr')
    var td = document.createElement('td')
    td.style.color = '#FFF'
    td.innerText = line
    tr.appendChild(td)
    table.appendChild(tr)
  })
  tabcontent.append(table)

  var screen = document.getElementById('screen')
  screen.append(tablink)
  screen.append(tabcontent)
}

TextView.prototype.openPage = function(name, element)
{
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(name).style.display = "block";
  element.style.backgroundColor = "#333";
}
module.exports.TextView = TextView