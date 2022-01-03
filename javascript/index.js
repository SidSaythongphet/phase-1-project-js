/** Global Variables**/



/** Node Getters**/
const mainDiv = () => document.getElementById('main')
const homeLink = () => document.getElementById('home-link')
const journalLink = () => document.getElementById('journal-link')
const entriesLink = () => document.getElementById('entries-link')

/** Event Listners**/
const homePageEvent = () => {
    homeLink().addEventListener('click', loadHome)
}

const jouralPageEvent = () => {
    journalLink().addEventListener('click', loadJournal)
}

const entriesPageEvent = () => {
    entriesLink().addEventListener('click', loadEntries)
}

/** Event Handlers**/
const clearMainDiv = () => {
    mainDiv().innerHTML = ''
}

const loadHome = (event) => {
    if(event) {
        event.preventDefault()
    }
    clearMainDiv()
    const h1 = document.createElement('h1')
    const p = document.createElement('p')
    h1.innerText = 'Two Minutes A Day Journal'
    p.innerText = 'The Two-Minute Rule states “When you start a new habit, it should take less than two minutes to do.”'
    h1.className = 'center-align'
    p.className = 'center-align'

    mainDiv().appendChild(h1)
    mainDiv().appendChild(p)
}

const loadJournal = (event) => {
    event.preventDefault()
    clearMainDiv()
    renderJournalBox()

}

const loadEntries = (event) => {
    event.preventDefault()
    clearMainDiv()

//     <ul class="collapsible">
//     <li>
//       <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
//       <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
//     </li>
//     <li>
//       <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
//       <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
//     </li>
//     <li>
//       <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
//       <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
//     </li>
//   </ul>

    renderPastEntryContainer()

}

/** Miscellaneous**/

const renderJournalBox = () => {
    const journalBox = document.createElement('textarea')
    journalBox.setAttribute('type', 'text')
    journalBox.setAttribute('class', 'entry')
    journalBox.setAttribute('placeholder', 'What is on your mind?')

    mainDiv().appendChild(journalBox)    
}

const renderPastEntryContainer = () => {
    const entryContainer = document.createElement('ul')
    const entryHeader = document.createElement('h2')

    entryHeader.innerText = 'Past Entries'
    entryContainer.setAttribute('class', 'collapsible expandable')
    
    mainDiv().appendChild(entryHeader)
    mainDiv().appendChild(entryContainer)
    
}

/** Start Up**/
document.addEventListener('DOMContentLoaded', () => {
    // loadHome()
    homePageEvent()
    jouralPageEvent()
    entriesPageEvent()
    $(document).ready(function(){
        $('.collapsible').collapsible();
        var elem = document.querySelector('.collapsible.expandable');
          var instance = M.Collapsible.init(elem, {
          accordion: false
          })
      })
})