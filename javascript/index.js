/** Global Variables**/
let startCount = 2
let count = parseInt(startCount) * 60
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
const leftSection = () => document.getElementById('secondLeft')
const middleSection = () => document.getElementById('secondMiddle')
const rightSection = () => document.getElementById('secondRight')
const dropdown = () => document.querySelector('.browser-default')
const promptOne = () => document.getElementById('optOne')
const promptTwo = () => document.getElementById('optTwo')
const promptThree = () => document.getElementById('optThree')
const promptFour = () => document.getElementById('optFour')
const promptFive = () => document.getElementById('optFive')
const promptSix = () => document.getElementById('optSix')
const entryLabel = () => document.getElementById('entry-label')
const radioOne = () => document.querySelector('input#one')
const radioTwo = () => document.querySelector('input#two')
const radioFive = () => document.querySelector('input#five')
const radioTen = () => document.querySelector('input#ten')
const textBox = () => document.getElementById('entry')
const entryForm = () => document.getElementById('entry-form')
const submit = () => document.getElementById('submit')
const reset = () => document.getElementById('reset')
const timer = () => document.getElementById('counter')
const start = () => document.getElementById('start')
const pastEntryContainer = () => document.querySelector('.collapsible.expandable')
const deleteBtns = () => Array.from(document.querySelectorAll('.delete.btn'))

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
    console.log(radioArray)
    for (let radio of radioArray) {
        radio.addEventListener('click', () => {
            startCount = radio.value
            count = startCount * 60
        })
    }
}

/** Event Handlers**/

const loadHome = (event) => {
    if(event) {
        event.preventDefault()
    }
    activeHome()
    clearDivs()
    createLayout(secondDiv())
    const h1 = document.createElement('h1')
    const p = document.createElement('p')
    h1.innerText = 'Two Minutes A Day Journal'
    p.innerText = 'The Two-Minute Rule states “When you start a new habit, it should take less than two minutes to do.”'
    p.className = 'center-align'

    mainDiv().appendChild(h1)
    middleSection().appendChild(p)

}

const loadJournal = (event) => {
    event.preventDefault()
    activeJournal()
    clearDivs()
    journalMain()
    journalPrompt()
    durationRadio()
    renderJournalBox()
    startEvent()
}

const loadEntries = (event) => {
    if (event) {
        event.preventDefault()
    }
    activeEntry()
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

const createLayout = (parent) => {
    const leftColumn = document.createElement('section')
    const middleColumn = document.createElement('section')
    const rightColumn = document.createElement('section')

    leftColumn.setAttribute('class', 'col s12 m4 l2')
    leftColumn.id = 'secondLeft'
    middleColumn.setAttribute('class', 'col s12 m4 l8')
    middleColumn.id = 'secondMiddle'
    rightColumn.setAttribute('class', 'col s12 m4 l2')
    rightColumn.id = 'secondRight'

    parent.appendChild(leftColumn)
    parent.appendChild(middleColumn)
    parent.appendChild(rightColumn)
}

const renderJournalBox = () => {
    const form = document.createElement('form')
    const today = document.createElement('h5')
    const label = document.createElement('label')
    const journalBox = document.createElement('textarea')

    form.setAttribute('name', 'entry')
    form.id = 'entry-form'
    form.setAttribute('method', 'post')

    const submit = createButton('Submit', 'submit')
    submit.type = 'submit'
    submit.name = 'entry'
    submit.hidden = 'true'
    
    const reset = createButton('Reset', 'reset')
    reset.hidden = 'true'
    
    today.setAttribute('id', 'today')
    today.innerText = fullDate()
    
    label.setAttribute('for', 'entry')
    label.setAttribute('style', 'padding-left: 5%')
    label.id = 'entry-label'
    label.innerText = 'What is on your mind?'
    
    journalBox.setAttribute('id', 'entry')
    journalBox.setAttribute('name', 'entry')
    journalBox.setAttribute('placeholder', 'Press \'Start\' to begin writing...')
    journalBox.setAttribute('disabled', 'true')
    
    secondDiv().appendChild(form)
    createLayout(form)
    leftSection().appendChild(submit)
    rightSection().appendChild(reset)
    middleSection().appendChild(today)
    middleSection().appendChild(label)
    middleSection().appendChild(journalBox)    
    leftSection().appendChild(submit)
    rightSection().appendChild(reset)
    
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
    middleSection().appendChild(entryContainer)
    middleSection().setAttribute('style', 'background:none')
}

const loadPastEntry = () => {
    let reverseEntries = [...entries].reverse()
    reverseEntries.forEach(entry => {
        const li = document.createElement('li')
        const header = document.createElement('div')
        const date = document.createElement('p')
        const duration = document.createElement('p')
        const body = document.createElement('div')
        const prompt = document.createElement('p')
        const line = document.createElement('hr')
        const log = document.createElement('p')
        const deleteBtn = createButton('Delete', 'delete')
    
        header.setAttribute('class', 'collapsible-header')
        date.setAttribute('style', 'margin-left: 0')
        date.innerText = entry.entryDate
        duration.setAttribute('style', 'margin-right: 25px')
        duration.innerText = entry.duration
        body.setAttribute('class', 'collapsible-body')
        prompt.innerHTML = `<strong>${entry.prompt}</strong>`
        line.setAttribute('style', 'border-top: 2px solid teal')
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
    })
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
    monthHeader.setAttribute('id', 'month-header')
    leftSection().setAttribute('class', 'collection col l2')
    monthHeader.innerText = 'Entry by Month'
    leftSection().appendChild(monthHeader)

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
                leftSection().appendChild(a)   
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
            mainDiv().innerHTML = ''
            mainDiv().innerHTML = `<h3>Well done! You journaled for ${startCount} minute(s)!`
            textBox().setAttribute('disabled', 'true')
            submit().removeAttribute('hidden', 'true')
            submit().className = 'right btn'
            reset().removeAttribute('hidden', 'true')
            reset().className = 'left btn'
        }
    }, 1000);
}

const durationRadio = () => {
    const h5 = document.createElement('h5')

    h5.setAttribute('class', 'left')
    h5.innerText = 'Set duration to write:'

    mainRight().appendChild(h5)

    const radioLeft = createSection(mainRight())
    radioLeft.setAttribute('class', 'left col l6')
    const radioRight = createSection(mainRight())
    radioRight.setAttribute('class', 'right col l6')

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
    const start = createButton('Start', 'start')
    start.type = 'submit'
    start.setAttribute('class', 'right btn')

    return start
}

const journalMain = () => {
    const form = document.createElement('form')
    const left = document.createElement('section')
    const right = document.createElement('section')

    mainDiv().appendChild(form)
    form.name = 'prompt'
    form.setAttribute('class', 'row')
    form.setAttribute('action', '#')

    left.setAttribute('class', 'col l7')
    right.setAttribute('class', 'col l5')

    form.appendChild(left)
    form.appendChild(right)
}

const journalPrompt = () => {
    const h5 = document.createElement('h5')
    const select = document.createElement('select')

    h5.innerText = "Today's topic is..."
    select.setAttribute('class', 'browser-default')

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
/** Node Creator **/

const createSection = (childOf) => {
    const section = document.createElement('section')

    return childOf.appendChild(section)
}

const createRadio = (name, number, numeral, childOf) => {
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

    childOf.appendChild(p)
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

/** Start Up**/

document.addEventListener('DOMContentLoaded', () => {
    loadJournalLogs()
    loadHome()
    homePageEvent()
    jouralPageEvent()
    entriesPageEvent()
})

