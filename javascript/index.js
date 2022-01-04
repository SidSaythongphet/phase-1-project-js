/** Global Variables**/
let startCount = 2
let count = startCount * 60



/** Node Getters**/
const mainBody = () => document.querySelector('body')
const mainDiv = () => document.getElementById('main')
const secondDiv = () => document.getElementById('second')
const homeLink = () => document.getElementById('home-link')
const journalLink = () => document.getElementById('journal-link')
const entriesLink = () => document.getElementById('entries-link')
const leftDiv = () => document.querySelector('.col.s3')
const rightDiv = () => document.querySelector('.col.s9')
const timer = () => document.getElementById('counter')
const start = () => document.getElementById('start')
const pastEntryContainer = () => document.querySelector('.collapsible.expandable')

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

const startEvent = () => {
    start().addEventListener('click', startCountDown)
}

/** Event Handlers**/

const loadHome = (event) => {
    if(event) {
        event.preventDefault()
    }
    clearDivs()
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
    clearDivs()
    createLayout()
    renderTimer()
    renderStart()
    renderJournalBox()
    startEvent()

}

const loadEntries = (event) => {
    event.preventDefault()
    clearDivs()

    createLayout()
    renderEntriesHeader()
    renderPastEntryContainer()
    renderMonthsContainer()
    renderPastEntries()
}

const expandEntries = () => {
    $(document).ready(function(){
        $('.collapsible').collapsible();
        var elem = document.querySelector('.collapsible.expandable');
        var instance = M.Collapsible.init(elem, {
        accordion: false
        })
    })
}

const startCountDown = () => {
    start().setAttribute('hidden', 'true')
    countDown()
    
}

/** Miscellaneous**/
const clearDivs = () => {
    mainDiv().innerHTML = ''
    secondDiv().innerHTML = ''
}

const createLayout = () => {
    const leftColumn = document.createElement('div')
    const rightColumn = document.createElement('div')

    leftColumn.setAttribute('class', 'col s3')
    rightColumn.setAttribute('class', 'col s9')

    secondDiv().appendChild(leftColumn)
    secondDiv().appendChild(rightColumn)
}

const renderJournalBox = () => {
    const journalBox = document.createElement('input')
    journalBox.setAttribute('type', 'text')
    journalBox.setAttribute('class', 'entry')
    journalBox.setAttribute('placeholder', 'What is on your mind?')

    rightDiv().appendChild(journalBox)    
}

const renderEntriesHeader = () => {
    const entryHeader = document.createElement('h2')   
    entryHeader.setAttribute('class', 'center')
    entryHeader.innerText = 'Past Entries'    
    mainDiv().appendChild(entryHeader)    
}

const renderPastEntryContainer = () => {
    const entryContainer = document.createElement('ul')
    entryContainer.setAttribute('class', 'collapsible expandable')
    rightDiv().appendChild(entryContainer)
}

const renderPastEntries = () => {
    const li = document.createElement('li')
    const header = document.createElement('div')
    const body = document.createElement('div')
    const span = document.createElement('span')
    
    header.setAttribute('class', 'collapsible-header')
    header.innerText = fullDate()
    body.setAttribute('class', 'collapsible-body')
    span.innerText = 'Journal entry'

    pastEntryContainer().appendChild(li)
    li.appendChild(header)
    li.appendChild(body)
    body.appendChild(span)

    expandEntries()
}

const renderMonthsContainer = () => {
    // const monthContainer = document.createElement('div')
    const monthHeader = document.createElement('h4')
    leftDiv().setAttribute('class', 'collection col s3')
    monthHeader.innerText = 'Entry by Month'
    leftDiv().appendChild(monthHeader)

    const jan = document.createElement('a')
    const feb = document.createElement('a')

    jan.setAttribute('href', '#')
    jan.setAttribute('class', 'collection-item')
    jan.innerText = 'January'
    feb.setAttribute('href', '#')
    feb.setAttribute('class', 'collection-item')
    feb.innerText = 'February'

    leftDiv().appendChild(jan)
    leftDiv().appendChild(feb)
}

const fullDate = () => {
    let today = new Date();
    return today.toDateString()
}

const countDown = () => {
    const minutes = Math.floor(count / 60)
    let seconds = count % 60

    seconds = seconds < 10 ? '0' + seconds : seconds

    setTimeout(() => {
        if (count >= 0) {
            count--
            timer().innerText = `${minutes}:${seconds}`
            countDown()
        } else {
            timer().innerHTML = '<h2>Well done! You journaled for 2 minutes!</h2>'

        }
    }, 1000);
}

const renderTimer = () => {
    const timer = document.createElement('h5')
    timer.setAttribute('id', 'counter')
    timer.setAttribute('class', 'center')
    timer.innerText = '2:00'
    mainDiv().appendChild(timer)
}

const displayCount = () => {
    timer().innerText = `${minutes}:${seconds}`
    
}

const renderStart = () => {
    const btn = document.createElement('button')
    btn.setAttribute('id', 'start')
    btn.setAttribute('class', 'center')
    btn.innerText = 'Start'
    mainDiv().appendChild(btn)
}

/** Start Up**/
document.addEventListener('DOMContentLoaded', () => {
    loadHome()
    homePageEvent()
    jouralPageEvent()
    entriesPageEvent()

    
})


// let count = 0


// const renderTimer = () => {
//     const timer = document.createElement('div')
//     timer.setAttribute('id', 'counter')
//     timer.innerText = 30
//     mainDiv().appendChild(timer)
// }

// const displayCount = () => {
//     timer().innerText = count
// }

// const startCountDown = () => {
//     let count = timer().innerText
//     countDown()
// }

// const startEvent = () => {
//     start().addEventListener('click', startCountDown)
// }

// const countDown = () => {
//     console.log(count)
//     setTimeout(() => {
//         if (count < 0) {
//             count--
//             displayCount()
//             countDown()
//         } else {
//             console.log("done")
//         }
//     }, 1000);
// }

