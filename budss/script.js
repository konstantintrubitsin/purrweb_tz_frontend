const button__business = document.getElementsByClassName('button__business')
const button__customers = document.getElementsByClassName('button__customers')
const header__buttons = [button__business, button__customers]

const start = document.getElementById('start')

const header__button_contact = document.getElementById('header__button_contact')
const header__links_apps = document.getElementById('header__links_apps')

const header__bands = document.getElementById('header__bands')
const menu__button_close = document.getElementById('menu__button_close')
const menu = document.getElementById('menu')
const menu__buttons = [header__bands, menu__button_close]
const menu__button_contact = document.getElementById('menu__button_contact')
const menu__links_apps = document.getElementById('menu__links_apps')

const buttons__contact = document.getElementsByName('button__contact')
const form = document.getElementById('window')
const window__form = document.getElementById('window__form')
const window__positive = document.getElementById('window__positive')
const buttons__close = document.getElementsByName('window__close')
const window__button = document.getElementById('window__button')

const nameInput = document.getElementById('nameInput')
const emailInput = document.getElementById('emailInput')
const phoneInput = document.getElementById('phoneInput')
const companyInput = document.getElementById('companyInput')
const websiteInput = document.getElementById('websiteInput')

const header__bottom = document.getElementById('header__bottom')

const nameError = document.getElementById('nameError')
const emailError = document.getElementById('emailError')
const phoneError = document.getElementById('phoneError')
const commonError = document.getElementById('commonError')
const inputs = {
  'nameInput': [nameInput, nameError],
  'emailInput': [emailInput, emailError],
  'phoneInput': [phoneInput, phoneError],
}

const cookie = document.getElementById('cookie')
const cookie__buttons = document.getElementsByName('cookie__button')

if (button__business[0].classList.contains('active')){
  if (window.innerWidth > 375) {
    header__links_apps.classList.add('invisible')
  }
  else {
    menu__links_apps.classList.add('invisible')
  }
}
else {
  if (window.innerWidth > 375) {
    header__button_contact.classList.add('invisible')
  }
  else {
    menu__button_contact.classList.add('invisible')
  }
}

  header__buttons.forEach(elements => {
    Array.from(elements).forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        if (el.classList.contains('button__business')) {
          !button__business[0].classList.contains('active') && button__business[0].classList.add('active')
          button__customers[0].classList.remove('active')
          if (window.innerWidth > 375) {
            header__button_contact.classList.remove('invisible')
            header__links_apps.classList.add('invisible')
          }
          else {
            menu__button_contact.classList.remove('invisible')
            menu__links_apps.classList.add('invisible')
          }
        }
        else {
          !button__customers[0].classList.contains('active') && button__customers[0].classList.add('active')
          button__business[0].classList.remove('active')
          if (window.innerWidth > 375) {
            header__button_contact.classList.add('invisible')
            header__links_apps.classList.remove('invisible')
          }
          else {
            menu__button_contact.classList.add('invisible')
            menu__links_apps.classList.remove('invisible')
          }
        }
      })
    }
    )
  })

menu__buttons.forEach(element => {
  element.addEventListener('click', (e) => {
    e.preventDefault()
    if (menu.classList.contains('active')) {
      document.body.classList.remove('inactive')
      menu.classList.remove('active')
      header__bottom.style.display = 'flex'
    } else {
      document.body.classList.add('inactive')
      menu.classList.add('active')
      header__bottom.style.display = 'none'
    }
  })
})

buttons__contact.forEach(element => {
  element.addEventListener('click', (e) => {
    e.preventDefault()
    if (!form.classList.contains('active')) {
      window__positive.classList.remove('active')
      form.classList.add('active')
      window__form.classList.add('active')
      document.body.classList.add('inactive')
    }
  })
})

for (const element in inputs) {
  const input = inputs[element][0]
  const error = inputs[element][1]
  input.addEventListener("input", (e) => {
    if (!e.target.value) {
      input.classList.add('error')
      error.innerHTML = 'This field is required.'
      commonError.innerHTML = 'Please fill in all required fields'
    }
    else {
      input.classList.remove('error')
      error.innerHTML = ''
    }
    if (!nameError.innerHTML && !emailError.innerHTML && !phoneError.innerHTML)
      commonError.innerHTML = ''
    if (nameInput.value && emailInput.checkValidity() && phoneInput.value.length > 16) {
      window__button.disabled = false
    }
    else {
      window__button.disabled = true
    }
  })
}

nameInput.addEventListener('blur', (e) => {
  if(e.target.value.length == 0) {
    nameError.classList.add('error')
    nameError.innerHTML = 'This field is required.'
    commonError.innerHTML = 'Please fill in all required fields'
  }
})

emailInput.addEventListener('blur', (e) => {
  if(!e.target.checkValidity()) {
    emailError.classList.add('error')
    emailError.innerHTML = 'Invalid email'
    commonError.innerHTML = 'Please fill in all required fields'
  }
})

phoneInput.addEventListener('blur', (e) => {
  if (e.target.value.length < 17) {
    phoneInput.classList.add('error')
    phoneError.innerHTML = 'Invalid phone number.'
    commonError.innerHTML = 'Please fill in all required fields'
  }
})

phoneInput.addEventListener('input', (e) => {
  let pattern = "+7(___) ___-__-__"
  let i = 0 
  let val = e.target.value.replace(/\D/g, "") 
  if (val.length < 2) val = "7" 
  e.target.value = pattern.replace(/./g, (a) => /[_\d]/.test(a) && val.length > 0 ? val.charAt(i++) : i >= val.length ? "" : a)
})

window__button.addEventListener('click', (e) => {
  e.preventDefault()
  nameInput.value = ''
  emailInput.value = ''
  phoneInput.value = '+7'
  companyInput.value = ''
  websiteInput.value = ''
  window__form.classList.remove('active')
  window__positive.classList.add('active')
  window__button.disabled = true
})

document.addEventListener('scroll', () => {
  if (
    (window.innerWidth > 768 && window.scrollY > 40) ||
    (window.innerWidth > 375 && window.scrollY > 30) ||
    (window.innerWidth > 320 && window.scrollY > 26)
  ) {
    header__bottom.classList.add('fixed')
    start.style.marginTop = window.innerWidth > 375 ? '3.8rem' : '5rem'
  }
  else {
    header__bottom.classList.remove('fixed')
    start.style.marginTop = '0'
  }
})

buttons__close.forEach(element => {
  element.addEventListener('click', (e) => {
    e.preventDefault()
    form.classList.remove('active')
    document.body.classList.remove('inactive')
  })
})

cookie__buttons.forEach(element => {
  element.addEventListener('click', (e) => {
    e.preventDefault()
    cookie.classList.add('hide')
    setTimeout(() => { cookie.classList.remove('show') }, 1000)
  })
})