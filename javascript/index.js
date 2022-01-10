/** Global Variables**/
let startCount = 2
let count = startCount * 60
const BASE_URL = 'http://localhost:3000'
let entries = []


/** Node Getters**/
const navList = () => document.querySelectorAll('li')
const mainBody = () => document.querySelector('body')
const mainDiv = () => document.getElementById('main')
const mainLeft = () => document.querySelector('.col.l7')
const mainRight = () => document.querySelector('.col.l5')
const secondDiv = () => document.getElementById('second')
const homeLink = () => document.getElementById('home-link')
const journalLink = () => document.getElementById('journal-link')
const entriesLink = () => document.getElementById('entries-link')
const leftDiv = () => document.querySelector('.col.l2')
const rightDiv = () => document.querySelector('.col.l8')
const textBox = () => document.getElementById('entry')
const form = () => document.getElementsByName('form')
const submit = () => document.getElementById('submit')
const reset = () => document.getElementById('reset')
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
    activeHome()
    clearDivs()
    createLayout()
    const h1 = document.createElement('h1')
    const p = document.createElement('p')
    h1.innerText = 'Two Minutes A Day Journal'
    p.innerText = 'The Two-Minute Rule states “When you start a new habit, it should take less than two minutes to do.”'
    p.className = 'center-align'

    mainDiv().appendChild(h1)
    rightDiv().appendChild(p)

}

const loadJournal = (event) => {
    event.preventDefault()
    clearDivs()
    createLayout()
    journalMain()
    journalPrompt()
    timeRadio()
    renderJournalBox()
    startEvent()
    activeJournal()
}

const loadEntries = (event) => {
    event.preventDefault()
    clearDivs()
    createLayout()
    renderEntriesHeader()
    renderPastEntryContainer()
    renderMonthsContainer()
    loadPastEntry()
    activeEntry()
}

const startCountDown = (event) => {
    event.preventDefault()
    renderTimer()
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
        entries.unshift(data)
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

const activeHome = () => {
    const links = Array.from(navList())
    const home = links[0]
    const journal = links[1]
    const entry = links[2]

    home.className = 'active'
    journal.className = 'none'
    entry.className = 'none'
}

const activeJournal = () => {
    const links = Array.from(navList())
    const home = links[0]
    const journal = links[1]
    const entry = links[2]

    journal.className = 'active'
    home.className = 'none'
    entry.className = 'none'
}

const activeEntry = () => {
    const links = Array.from(navList())
    const home = links[0]
    const journal = links[1]
    const entry = links[2]

    entry.className = 'active'
    journal.className = 'none'
    home.className = 'none'
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

const clearDivs = () => {
    mainDiv().innerHTML = ''
    secondDiv().innerHTML = ''
}

const createLayout = () => {
    const leftColumn = document.createElement('div')
    const middleColumn = document.createElement('div')
    const rightColumn = document.createElement('div')

    leftColumn.setAttribute('class', 'col l2')
    middleColumn.setAttribute('class', 'col l8')
    rightColumn.setAttribute('class', 'col l2')

    secondDiv().appendChild(leftColumn)
    secondDiv().appendChild(middleColumn)
    secondDiv().appendChild(rightColumn)
}

const renderJournalBox = () => {
    const form = document.createElement('form')
    const submit = document.createElement('button')
    const reset = document.createElement('button')
    const today = document.createElement('h5')
    const label = document.createElement('label')
    const journalBox = document.createElement('textarea')

    form.setAttribute('name', 'entry')
    form.setAttribute('method', 'post')

    submit.setAttribute('type', 'submit')
    submit.setAttribute('id', 'submit')
    submit.setAttribute('class', 'center')
    submit.setAttribute('hidden', 'true')
    submit.innerText = 'Submit'

    reset.setAttribute('id', 'reset')
    reset.setAttribute('class', 'center')
    reset.setAttribute('hidden', 'true')
    reset.innerText = 'Reset'

    today.setAttribute('id', 'today')
    today.innerText = fullDate()

    label.setAttribute('for', 'entry')
    label.innerText = 'What is on your mind?'

    journalBox.setAttribute('id', 'entry')
    journalBox.setAttribute('name', 'entry')
    journalBox.setAttribute('placeholder', 'Press \'Start\' to begin writing...')
    journalBox.setAttribute('disabled', 'true')

    rightDiv().appendChild(form)
    mainDiv().appendChild(submit)
    mainDiv().appendChild(reset)
    form.appendChild(today)
    form.appendChild(label)
    form.appendChild(journalBox)    

    form.addEventListener('submit', submitJournalLog)
    reset.addEventListener('click', loadJournal)
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
    rightDiv().setAttribute('style', 'background:none')
}

const loadPastEntry = () => {
        let reverseEntries = [...entries].reverse()
        reverseEntries.forEach(entry => {
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
    leftDiv().setAttribute('class', 'collection col l2')
    monthHeader.innerText = 'Entry by Month'
    leftDiv().appendChild(monthHeader)

    const monthCollection = document.querySelectorAll('a.collection-item')
    const monthCollectionArray = Array.from(monthCollection)
    const monthCollectionArrayText = ['none']
    monthCollectionArray.map((ar) => {
        const innerText = ar.innerText
        monthCollectionArrayText.push(innerText)
    })
    
    let JournalMonths = []
    entries.forEach(entry => {
        let splitDate = entry.entryDate.split(' ')
        splitDate.splice(2,1)
        splitDate.shift()
        let monthYear = splitDate.join(' ')
        JournalMonths.push(monthYear)
    })
    
    let uniqueMonths = JournalMonths.filter((month, index) => {
        return JournalMonths.indexOf(month) === index;
    });

    let uniqueReverse = uniqueMonths.reverse()
    uniqueReverse.forEach(month => {
        for(let monthArray of monthCollectionArrayText) {
            if (month !== monthArray) {
                const a = document.createElement('a')
                a.setAttribute('href', '#')
                a.setAttribute('class', 'collection-item')
                a.innerText = `${month}`
                leftDiv().appendChild(a)   
            } else {
                return false
            }
        }
    })
}

const fullDate = () => {
    let today = new Date();
    return today.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}) 
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
            timer().innerHTML = '<h3>Well done! You journaled for 2 minutes!</h3>'
            textBox().setAttribute('disabled', 'true')
            submit().removeAttribute('hidden', 'true')
            reset().removeAttribute('hidden', 'true')
        }
    }, 1000);
}

const timeRadio = () => {
    const h5 = document.createElement('h5')

    h5.setAttribute('class', 'left')
    h5.innerText = 'Set duration to write:'

    mainRight().appendChild(h5)

    const radioRight = createSection(mainRight())
    radioRight.setAttribute('class', 'right col l6')
    const radioLeft = createSection(mainRight())
    radioLeft.setAttribute('class', 'left col l6')

    createRadio('optradio', 'one', 'one', 1, radioLeft)
    createRadio('optradio', 'two', 'default', 2, radioLeft)
    createRadio('optradio', 'five', 'long', 5, radioRight)
    createRadio('optradio', 'ten', 'longer', 10, radioRight)
    mainLeft().appendChild(renderStart())
}

const renderTimer = () => {
    const timer = document.createElement('h4')
    timer.setAttribute('id', 'counter')
    timer.setAttribute('class', 'center')
    timer.innerText = startCount + ':00'
    mainRight().innerHTML = ''
    mainRight().appendChild(timer)
}

const displayCount = () => {
    timer().innerText = `${minutes}:${seconds}`  
}

const renderStart = () => {
    const btn = document.createElement('button')
    btn.setAttribute('id', 'start')
    btn.setAttribute('class', 'right btn')

    btn.innerText = 'Start'
    return btn
}

const journalMain = () => {
    const form = document.createElement('form')
    const left = document.createElement('section')
    const right = document.createElement('section')

    mainDiv().appendChild(form)
    form.setAttribute('class', 'row')
    form.setAttribute('action', '')

    left.setAttribute('class', 'col l7')
    right.setAttribute('class', 'col l5')

    form.appendChild(left)
    form.appendChild(right)
}

const journalPrompt = () => {
    const h5 = document.createElement('h5')
    const select = document.createElement('select')
    const option0 = document.createElement('option')
    const option1 = document.createElement('option')
    const option2 = document.createElement('option')
    const option3 = document.createElement('option')
    const option4 = document.createElement('option')
    const option5 = document.createElement('option')

    h5.innerText = "Today's topic is..."
    h5.setAttribute('class', 'left')
    select.setAttribute('class', 'browser-default')

    option0.setAttribute('value', '0')
    option0.innerText = 'Whatever is on my mind!'
    
    option1.setAttribute('value', '1')
    option1.innerText = 'What am I most grateful for today?'

    option2.setAttribute('value', '2')
    option2.innerText = 'What am I looking forward to in the coming days?'

    option3.setAttribute('value', '3')
    option3.innerText = 'What is one thing that I want to accomplish or have accomplished today?'

    option4.setAttribute('value', '4')
    option4.innerText = 'What am I doing today to take care of myself?'

    option5.setAttribute('value', '5')
    option5.innerText = 'Where do I see myself in 6 months?'

    mainLeft().appendChild(h5)
    mainLeft().appendChild(select)
    select.appendChild(option0)
    select.appendChild(option1)
    select.appendChild(option2)
    select.appendChild(option3)
    select.appendChild(option4)
    select.appendChild(option5)
}




/** Node Creator **/

const createSection = (childOf) => {
    const section = document.createElement('section')

    return childOf.appendChild(section)
}

const createRadio = (name, number, value, numeral, childOf) => {
    const radioNode = document.createElement('input')
    const p = document.createElement('p')
    const label = document.createElement('label')
    const span = document.createElement('span')

    radioNode.type = 'radio'
    radioNode.id = number
    radioNode.name = name
    radioNode.value = value
    label.htmlFor = number
    span.innerText = `${numeral} minute(s)`

    childOf.appendChild(p)
    p.appendChild(label)
    label.appendChild(radioNode)
    label.appendChild(span)
}

/** Start Up**/

document.addEventListener('DOMContentLoaded', () => {
    loadJournalLogs()
    loadHome()
    homePageEvent()
    jouralPageEvent()
    entriesPageEvent()
})

