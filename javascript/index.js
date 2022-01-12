/** Global Variables**/
let startCount = 2
let count = parseInt(startCount) * 60
const BASE_URL = 'http://localhost:3000'
let entries = []

/** Node Getters**/
const navList = () => Array.from(document.querySelectorAll('ul#nav li'))
const homeLink = () => document.getElementById('home-link')
const journalLink = () => document.getElementById('journal-link')
const entriesLink = () => document.getElementById('entries-link')

const mainBody = () => document.querySelector('body')

const mainDiv = () => document.getElementById('main')
const mainLeft = () => document.getElementById('main-left')
const mainRight = () => document.getElementById('main-right')

const secondDiv = () => document.getElementById('second')
const leftSection = () => document.getElementById('second-div-left')
const middleSection = () => document.getElementById('second-div-middle')
const rightSection = () => document.getElementById('second-div-right')

const dropdown = () => document.querySelector('.browser-default')
const promptOne = () => document.getElementById('optOne')
const promptTwo = () => document.getElementById('optTwo')
const promptThree = () => document.getElementById('optThree')
const promptFour = () => document.getElementById('optFour')
const promptFive = () => document.getElementById('optFive')
const promptSix = () => document.getElementById('optSix')

const radioOne = () => document.querySelector('input#one')
const radioTwo = () => document.querySelector('input#two')
const radioFive = () => document.querySelector('input#five')
const radioTen = () => document.querySelector('input#ten')

const textBox = () => document.getElementById('entry-text')
const entryLabel = () => document.getElementById('entry-label')
const entryForm = () => document.getElementById('entry-form')
const submit = () => document.getElementById('submit')
const reset = () => document.getElementById('reset')
const timer = () => document.getElementById('counter')
const start = () => document.getElementById('start')
const pastEntryContainer = () => document.querySelector('.collapsible.expandable')
const deleteBtns = () => Array.from(document.querySelectorAll('.delete.btn'))
const monthLink = () => Array.from(document.querySelectorAll('.collection-item'))

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

const radioEvent = () => {
    const radioArray = [radioOne(), radioTwo(), radioFive(), radioTen()]
    for (let radio of radioArray) {
        radio.addEventListener('click', () => {
            startCount = radio.value
            count = startCount * 60
        })
    }
}

const activateLinkTagEvent = () => {
    const [home, journal, entries] = navList()
    for (let link of navList()) {
        link.addEventListener('click', (event) => {
            navList().forEach(link => link.className = '')
            event.currentTarget.className = 'active'
            if (event.currentTarget === home) {
                journal.className = ''
                entries.className = ''
            } else if (event.currentTarget === journal) {
                home.className = ''
                entries.className = ''
            } else if (event.currentTarget === entries) {
                 home.className = ''
                journal.className = ''
            } else {
                 return false
            }
        })
    }
}

/** Event Handlers**/

const loadHome = (event) => {
    if(event) {
        event.preventDefault()
    }
    clearDivs()
    createLayout(secondDiv())
    const h1 = document.createElement('h1')
    h1.innerText = 'Two Minutes A Day Journal'
    const br1 = document.createElement('br')
    const br2 = document.createElement('br')
    const p1 = createParagraph('The Two-Minute Rule states “When you start a new habit, it should take less than two minutes to do.”')
    p1.className = 'center-align'
    p1.style = 'font-weight: bold; margin-top: 9%; font-size: large'
    const p2 = createParagraph('Welcome to Two Minutes a Day, your very own journal which will allow you the freedom to express your thoughts in a few short minutes. With a build in timer, this journal will help you create your daily habit of journaling, making sure you do not feel like you have to write for too long. If the thought of starting to journal seems daunting, this is a perfect way to start. The time restriction allows you just enough time to express your thoughts but as you build this routine, you\'ll be wishing for more time! So, let\'s begin!')
    p2.className = 'container'
    p2.style = 'line-height: 175%; font-size: medium'
    mainDiv().appendChild(h1)
    middleSection().appendChild(p1)
    middleSection().appendChild(br1)
    middleSection().appendChild(p2)
    middleSection().appendChild(br2)
}

const loadJournal = (event) => {
    event.preventDefault()
    clearDivs()
    journalMainDiv()
    journalPrompt()
    durationRadio()
    renderJournalBox()
    startEvent()
}

const loadEntries = (event) => {
    if (event) {
        event.preventDefault()
    }
    clearDivs()
    createLayout(secondDiv())
    renderEntriesHeader()
    renderPastEntryContainer()
    renderMonthsContainer()
    loadPastEntry()
}

const startCountDown = (event) => {
    event.preventDefault()
    renderTimer()
    disableDropdown()
    textBox().removeAttribute('disabled', 'true')
    start().remove()
    countDown() 
}

const submitJournalLog = (event) => {
    event.preventDefault()
    const newEntry = {
        "entryDate": fullDate(),
        "log": textBox().value,
        "duration": `${startCount} minute(s)`,
        "prompt": entryForm().value,
        "id": ''
    }
    
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
        loadEntries()
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

const createLayout = (parent) => {
    const leftColumn = createSection('second-div-left', 'col s12 m1 l2')
    const middleColumn = createSection('second-div-middle', 'col s12 m10 l8')
    const rightColumn = createSection('second-div-right', 'col s12 m1 l2')
    parent.appendChild(leftColumn)
    parent.appendChild(middleColumn)
    parent.appendChild(rightColumn)
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

const renderJournalBox = () => {
    const form = document.createElement('form')
    form.name = 'entry'
    form.id = 'entry-form'
    form.method = 'POST'
    const today = document.createElement('h5')
    today.id = 'today'
    today.innerText = fullDate()
    const label = document.createElement('label')
    label.htmlFor = 'entry'
    label.style = 'padding-left: 5%'
    label.id = 'entry-label'
    label.innerText = 'Your journal entry:'
    const textarea = document.createElement('textarea')
    textarea.id = 'entry-text'
    textarea.name = 'entry'
    textarea.placeholder = 'Press \'Start\' to begin writing...'
    textarea.disabled = 'true'
    const submit = createButton('Submit', 'submit')
    submit.type = 'submit'
    submit.name = 'entry'
    submit.hidden = 'true'
    const reset = createButton('Reset', 'reset')
    reset.hidden = 'true'
    
    secondDiv().appendChild(form)
    createLayout(form)
    leftSection().appendChild(submit)
    rightSection().appendChild(reset)
    middleSection().appendChild(today)
    middleSection().appendChild(label)
    middleSection().appendChild(textarea)    
    leftSection().appendChild(submit)
    rightSection().appendChild(reset)
    
    form.addEventListener('submit', submitJournalLog)
    reset.addEventListener('click', loadJournal)
}

const renderEntriesHeader = () => {
    const entryHeader = document.createElement('h2')   
    entryHeader.className = 'center'
    entryHeader.innerText = 'Past Entries'    
    mainDiv().appendChild(entryHeader)    
}

const renderPastEntryContainer = () => {
    const entryContainer = document.createElement('ul')
    entryContainer.className = 'collapsible expandable'
    middleSection().appendChild(entryContainer)
    middleSection().style = 'background:none'
}

const loadPastEntry = () => {
    let reverseEntries = [...entries].reverse()
    reverseEntries.forEach(entry => createPastEntry(entry))
    expandEntries()

    const deleteEntry = (event) => {
        fetch(BASE_URL + '/entries/' + `${event.target.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
        .then(resp => resp.json())
        .then(data => {
            entries = entries.filter(e => e.id !== parseInt(event.target.id))
            loadEntries()
        })
    }

    const deleteEvent = () => {
        for ( let btn of deleteBtns()) {
            btn.addEventListener('click', deleteEntry)
        }
    }

    deleteEvent()
}

const renderMonthsContainer = () => {
    const monthHeader = document.createElement('h4')
    monthHeader.id = 'month-header'
    monthHeader.innerText = 'Entry by Month'
    leftSection().className = 'collection col l2'
    leftSection().style = 'border: none'
    leftSection().appendChild(monthHeader)

    const monthCollection = Array.from(document.querySelectorAll('a.collection-item'))
    const monthCollectionText = [""]
    monthCollection.map((ar) => {
        const innerText = ar.innerText
        monthCollectionText.push(innerText)
    })
    
    let journalMonths = []
    entries.forEach(entry => {
        let splitDate = entry.entryDate.split(' ')
        splitDate.splice(2,1)
        splitDate.shift()
        let monthYear = splitDate.join(' ')
        journalMonths.push(monthYear)
    })

    let uniqueMonths = journalMonths.filter((month, index) => journalMonths.indexOf(month) === index)

    let uniqueReverse = uniqueMonths.reverse()
    uniqueReverse.forEach(month => {
        for(let monthArray of monthCollectionText) {
            if (month !== monthArray) {
                const a = document.createElement('a')
                a.href = '#'
                a.className = 'collection-item'
                a.innerText = `${month}`
                leftSection().appendChild(a)   
            } else {
                return false
            }
        }
    })
    
    const loadMonth = (event) => {
        pastEntryContainer().innerHTML = ' '
        let filteredEntries = []
        let [month, year] = event.target.innerText.split(' ')
        filteredEntries = entries.filter(entry => entry.entryDate.includes(month) && entry.entryDate.includes(year))
        filteredEntries.map(entry => createPastEntry(entry))
    }

    const monthLinkEvent = () => {
        for (let link of monthLink()) {
            link.addEventListener('click', loadMonth)
        }
    }
    monthLinkEvent()
}

const fullDate = () => {
    let today = new Date();
    return today.toLocaleDateString('en-us', {weekday:"long", year:"numeric", month:"long", day:"numeric"}) 
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
            mainDiv().innerHTML = ''
            mainDiv().innerHTML = `<h3>Well done! You journaled for ${startCount} minute(s)!`
            textBox().disabled = 'true'
            submit().hidden = 'true'
            submit().className = 'right btn'
            reset().hidden = 'true'
            reset().className = 'left btn'
        }
    }, 1000);
}

const durationRadio = () => {
    const h5 = document.createElement('h5')
    h5.className = 'left'
    h5.innerText = 'Set duration to write:'
    mainRight().appendChild(h5)
    const radioLeft = createSection('radio-left', 'left col s6 m6 l6')
    const radioRight = createSection('radio-right', 'left col s6 m6 l6') 
    mainRight().appendChild(radioLeft)
    mainRight().appendChild(radioRight)
    createRadio('duration', 'one', 1, radioLeft)
    createRadio('duration', 'two', 2, radioLeft)
    createRadio('duration', 'five', 5, radioRight)
    createRadio('duration', 'ten', 10, radioRight)
    radioTwo().checked = 'checked'
    mainLeft().appendChild(renderStart())
    radioEvent()
}

const renderTimer = () => {
    const timer = document.createElement('h2')
    timer.id = 'counter'
    timer.className = 'center'
    timer.innerText = startCount + ':00'
    mainRight().innerHTML = ''
    mainRight().appendChild(timer)
}

const displayCount = () => {
    timer().innerText = `${minutes}:${seconds}`  
}

const renderStart = () => {
    const start = createButton('Start', 'start')
    start.type = 'submit'
    start.className = 'right btn'
    return start
}

const journalMainDiv = () => {
    const form = document.createElement('form')
    form.name = 'prompt'
    form.className = 'row'
    form.action = '#'
    const leftSection = createSection('main-left', 'col s4 m6 l7')
    const rightSection = createSection('main-right', 'col s4 m6 l5')
    mainDiv().appendChild(form)
    form.appendChild(leftSection)
    form.appendChild(rightSection)
}

const journalPrompt = () => {
    const h5 = document.createElement('h5')
    const select = document.createElement('select')
    h5.innerText = "Today's topic is..."
    select.className = 'browser-default'
    const option1 = new Option('optOne', 'Whatever is on my mind!')
    const option2 = new Option('optTwo','What am I most grateful for today?')
    const option3 = new Option('optThree','What am I looking forward to in the coming days?')
    const option4 = new Option('optFour','What is one thing that I want to accomplish or have accomplished today?')
    const option5 = new Option('optFive','What am I doing today to take care of myself?')
    const option6 = new Option('optSix','Where do I see myself in 6 months?')
    mainLeft().appendChild(h5)
    mainLeft().appendChild(select)
    select.appendChild(option1.option())
    select.appendChild(option2.option())
    select.appendChild(option3.option())
    select.appendChild(option4.option())
    select.appendChild(option5.option())
    select.appendChild(option6.option())
    promptOne().selected = "selected"
}

const disableDropdown = () => {
    let selected = dropdown().value
    const selectedDisplay = document.createElement('p')
    selectedDisplay.id = 'selected-prompt'
    selectedDisplay.className = 'center'
    selectedDisplay.innerText = `${selected}`

    mainLeft().appendChild(selectedDisplay)
    dropdown().remove()
    entryForm().value = selected
}

const createPastEntry = (entry) => {
    const li = document.createElement('li')
    const header = document.createElement('div')
    const date = document.createElement('p')
    const duration = document.createElement('p')
    const body = document.createElement('div')
    const prompt = document.createElement('p')
    const line = document.createElement('hr')
    const log = document.createElement('p')
    const deleteBtn = createButton('Delete', 'delete')

    header.className = 'collapsible-header'
    date.style = 'margin-left: 0'
    date.innerText = entry.entryDate
    duration.style = 'margin-right: 25px'
    duration.innerText = entry.duration
    body.className = 'collapsible-body'
    prompt.innerHTML = `<strong>${entry.prompt}</strong>`
    line.style = 'border-top: 2px solid teal'
    log.innerText = entry.log + '...'
    deleteBtn.className = 'delete btn'
    deleteBtn.id = entry.id
    deleteBtn.style = 'margin-top: 5%'
    
    pastEntryContainer().appendChild(li)
    li.appendChild(header)
    header.appendChild(date)
    header.appendChild(duration)
    li.appendChild(body)
    body.appendChild(prompt)
    body.appendChild(line)
    body.appendChild(log)
    body.appendChild(deleteBtn)
}
/** Node Creator **/

const createSection = (id, className) => {
    const section = document.createElement('section')
    section.id = id
    section.className = className
    return section
}

const createRadio = (name, number, numeral, parent) => {
    const radioNode = document.createElement('input')
    const p = document.createElement('p')
    const label = document.createElement('label')
    const span = document.createElement('span')

    radioNode.type = 'radio'
    radioNode.id = number
    radioNode.name = name
    radioNode.value = numeral
    label.htmlFor = number
    span.innerText = `${numeral} minute(s)`

    parent.appendChild(p)
    p.appendChild(label)
    label.appendChild(radioNode)
    label.appendChild(span)
}

const createButton = (name, id) => {
    const btn = document.createElement('button')
    btn.id = id
    btn.innerText = name
    return btn
}

class Option {
    constructor (id, text) {
        this.value = text,
        this.id = id
        this.text = text
    }
    option () {
        const option = document.createElement('option')
        option.value = this.value
        option.id = this.id
        option.innerText = this.text
        return option
    }
}

const createParagraph = (text) => {
    const p = document.createElement('p')
    p.innerText = text
    return p
}

/** Start Up**/

document.addEventListener('DOMContentLoaded', () => {
    loadJournalLogs()
    loadHome()
    homePageEvent()
    jouralPageEvent()
    entriesPageEvent()
    activateLinkTagEvent()
})

