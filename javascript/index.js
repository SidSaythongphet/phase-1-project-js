/** Global Variables**/
let startCount = 2
let count = startCount * 60
const BASE_URL = 'http://localhost:3000'
let entries = []

/** Node Getters**/
const mainBody = () => document.querySelector('body')
const mainDiv = () => document.getElementById('main')
const secondDiv = () => document.getElementById('second')
const homeLink = () => document.getElementById('home-link')
const journalLink = () => document.getElementById('journal-link')
const entriesLink = () => document.getElementById('entries-link')
const leftDiv = () => document.querySelector('.col.s3')
const rightDiv = () => document.querySelector('.col.s7')
const textBox = () => document.getElementById('entry')
const form = () => document.getElementsByName('form')
const submit = () => document.getElementById('submit')
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
    loadPastEntry()
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
    textBox().removeAttribute('disabled', 'true')
    start().setAttribute('hidden', 'true')
    countDown() 
}

const submitJournalLog = (event) => {
    event.preventDefault()

    const newEntry = {
        "entryDate": fullDate(),
        "log": textBox().value,
        "id": ''
    }
    console.log(newEntry)

    fetch(BASE_URL + '/entries', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(newEntry),
    })
        .then(resp => resp.json())
        .then(data => {
            entries.push(data)
        })
}

/** Requests **/

const loadJournalLogs = () => {
    fetch(BASE_URL + '/entries')
        .then(resp => resp.json())
        .then(data => {
            entries = data
        })
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
    rightColumn.setAttribute('class', 'col s7')

    secondDiv().appendChild(leftColumn)
    secondDiv().appendChild(rightColumn)
}

const renderJournalBox = () => {
    const form = document.createElement('form')
    const btn = document.createElement('button')
    const today = document.createElement('h5')
    const label = document.createElement('label')
    const journalBox = document.createElement('textarea')

    form.setAttribute('name', 'entry')
    form.setAttribute('method', 'post')

    btn.setAttribute('type', 'submit')
    btn.setAttribute('id', 'submit')
    btn.setAttribute('class', 'center')
    btn.setAttribute('hidden', 'true')
    btn.innerText = 'Submit'

    today.setAttribute('id', 'today')
    today.innerText = fullDate()

    label.setAttribute('for', 'entry')
    label.innerText = 'What is on your mind?'

    journalBox.setAttribute('id', 'entry')
    journalBox.setAttribute('name', 'entry')
    journalBox.setAttribute('placeholder', 'Let\'s write')
    journalBox.setAttribute('disabled', 'true')

    rightDiv().appendChild(form)
    form.appendChild(btn)
    form.appendChild(today)
    form.appendChild(label)
    form.appendChild(journalBox)    

    form.addEventListener('submit', submitJournalLog)
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

const loadPastEntry = () => {
    entries.forEach(entry => {
        const li = document.createElement('li')
        const header = document.createElement('div')
        const body = document.createElement('div')
        const span = document.createElement('span')
    
        header.setAttribute('class', 'collapsible-header')
        header.innerText = entry.entryDate
        body.setAttribute('class', 'collapsible-body')
        span.innerText = entry.log + '...'

        pastEntryContainer().appendChild(li)
        li.appendChild(header)
        li.appendChild(body)
        body.appendChild(span)
    })
    expandEntries()
}

const renderMonthsContainer = () => {
    const monthHeader = document.createElement('h4')
    monthHeader.setAttribute('id', 'month-header')
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
        if (count > 0) {
            count--
            timer().innerText = `${minutes}:${seconds}`
            countDown()
        } else {
            timer().innerHTML = '<h2>Well done! You journaled for 2 minutes!</h2>'
            textBox().setAttribute('disabled', 'true')
            submit().removeAttribute('hidden', 'true')
        }
    }, 1000);
}

const renderTimer = () => {
    const timer = document.createElement('h4')
    timer.setAttribute('id', 'counter')
    timer.setAttribute('class', 'center')
    timer.innerText = startCount + ':00'
    mainDiv().appendChild(timer)
}

const displayCount = () => {
    timer().innerText = `${minutes}:${seconds}`  
}

const renderStart = () => {
    const btn = document.createElement('button')
    btn.setAttribute('id', 'start')

    btn.innerText = 'Start'
    mainDiv().appendChild(btn)
}

/** Start Up**/

document.addEventListener('DOMContentLoaded', () => {
    loadJournalLogs()
    loadHome()
    homePageEvent()
    jouralPageEvent()
    entriesPageEvent()
})

