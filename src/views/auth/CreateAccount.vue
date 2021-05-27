<template>
  <div class="p-6 h-screen font-Fira ">
      <!-- fic the out of space issue and cut the text if itss too long-->
      <div class="h-full flex justify-center items-center w-full">
          <div class="relative bottom-9 md:w-6/12">
              <transition
              appear
              @before-enter="questionBeforeEnter"
              @enter="questionEnter"
              @leave="questionLeave"
              >
                  <h1 class="text-6xl text-gray-700 mb-12 font-thin">{{ userAccountDetails[index]['inputField'] }}</h1>
              </transition>
              <transition
              appear
              @before-enter="formBeforeEnter"
              @enter="formEnter"
              >
                <form action="" @submit.prevent class="mb-5 text-gray-500">
                    <input :type="inputType" v-model="formInput" :placeholder="inputPlaceholder" id="usersInput" class="underlineInput">
                    <span v-show="index === 1 && passwordReveal === false" @click="showPassword">See password</span>
                    <span v-show="index === 1 && passwordReveal === true" @click="hidePassword">Hide password</span>
                </form>
              </transition>

             <transition-group 
             tag="ul"
             appear
             @before-enter="detailsBeforeEnter"
             @enter="detailsEnter"
             v-if="index < 4"
             >
                 <li v-for="(details, index) in userDetailsInput" :key="details" class="inline-flex mt-1" >
                    <span @click="navigateForm(index)" class=" bg-gray-100 text-gray-400 mr-2 mb-2 sm:mt-5 rounded-full px-3 py-2 text-base cursor-pointer max-w-4xl">{{ details }}</span>
                 </li>

             </transition-group>
             <transition
             appear
             @before-enter="btnBeforeEnter"
             @enter="btnEnter"
             >
                <button class="bg-primary text-white w-24 block rounded-full px-3 py-2 absolute right-0 mt-24" @click="nextQuestion()" :disabled='!formInput.length'>Next</button>
             </transition>

            </div>
      </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import gsap from 'gsap';

export default {
   setup() {
       // form data
       const userAccountDetails = ref([
           {inputField: 'What\'s your name?', fieldType: 'name', formInput: ''},
           {inputField: 'Create a Password', fieldType: 'password', formInput: ''},
           {inputField: 'What\'s your location', fieldType: 'location', formInput: ''},
           {inputField: 'Your phone number', fieldType: 'phoneNumber', formInput: ''},
           {inputField: 'Enter the 4 digit code', fieldType: 'phoneNumber', formInput: ''},
           {inputField: 'Thank you for registering', fieldType: 'Thank', formInput: ''},
       ])

       let index = ref(0)
       let formInput = ref('')
       let userDetailsInput = ref([])
       let sameInput = ref(false)
       let changeInput = ref(false)
       let userInput = ref('')
       let inputType = ref('text')
       let inputPlaceholder = ref('e.g Precious Josiah')
       let passwordReveal = ref(false)
       
       

       // changing the next question for the form
       const nextQuestion = () => {
           if (index.value <= 4){
               userAccountDetails.value[index.value]['formInput'] = formInput.value
               userInput.value = userAccountDetails.value[index.value]['formInput']
        
               // adding the user input to an array for easy navigation and changing of forms data
               if (!sameInput.value && changeInput.value) {
                   userDetailsInput.value.push(formInput.value)
                   formInput.value = userAccountDetails.value[formIndex]['formInput']
                   index.value++
               } else {
                   userDetailsInput.value[index.value] = formInput.value
                   if (userInput.value === formInput.value && !userAccountDetails.value[index.value + 1]['formInput']) {
                       formInput.value = ''
                   } else {
                       formInput.value = userAccountDetails.value[index.value + 1]['formInput']
                   }
                   index.value++
               }
           }
       }
       
       const editUserInput = () => {
            let activeUserInput = formInput.value
            let selectedUserInputIndex = userDetailsInput.value.indexOf(formInput.value)
            let selectedUserInput = userDetailsInput.value[selectedUserInputIndex]
            
            if (activeUserInput !== selectedUserInput && userDetailsInput.value.length > index.value) {
                sameInput.value = true
                changeInput.value = true
            }
        }
        
        const changeInputToPassword = () => {
               if (index.value === 1) {
                   inputType.value = 'password'
               } else {
                   inputType.value = 'text'
               }
        }

        const changeInputPlaceholder = () => {
            if (index.value === 1) {
                inputPlaceholder.value = 'e.g ks78@..2'
            } else if (index.value === 2) {
                inputPlaceholder.value = 'e.g Portharcourt'
            } else if (index.value === 3) {
                inputPlaceholder.value = 'e.g +234 090843403'
            } else if (index.value === 4) {
                inputPlaceholder.value = 'e.g 4675'
            } else if (index.value === 5){
                inputPlaceholder.value = ''
            }
        }

        const showPassword = () => {
            const userInputField = document.getElementById('usersInput')
            if (userInputField.type === 'password') {
                passwordReveal.value = true
                userInputField.setAttribute('type', 'text')
            }
        }

        const hidePassword = () => {
            const userInputField = document.getElementById('usersInput')
            if (userInputField.type === 'text') {
                passwordReveal.value = false
                userInputField.setAttribute('type', 'password')
            }
        }

       const navigateForm = (formIndex) => {
           index.value = formIndex
           formInput.value = userAccountDetails.value[formIndex]['formInput']
       }


       watchEffect(() => {
           editUserInput()
           
           // modifying the input type
           changeInputToPassword()
           
           // modifying the input placeholder
           changeInputPlaceholder()
           
       })
       
       // Animations

       const hello = () => {
           console.log('hello')
       }
       
       const questionBeforeEnter = (el) => {
           el.style.opacity = 0
           el.style.transform = 'translateX(100px)'
           console.log(el)
       }

       const questionEnter = (el) => {
           gsap.to(el, {
               opacity: 1,
                x: 0,
                duration: 0.1,
                delay: 0.3,

            })
            console.log(el)
        }

        const questionLeave = (el) => {
            console.log('am leaving')
            el.style.opacity = 1
            el.style.transform = 'translateX(-100px)'
        }

       const formBeforeEnter = (el) => {
           el.style.opacity = 0
           el.style.transform = 'translateX(50px)'
       }

       const formEnter = (el) => {
            gsap.to(el, {
                opacity: 1,
                x: 0,
                duration: 0.2,
                delay: 0.4,

            })
            console.log('enter')
        }

       const detailsBeforeEnter = (el) => {
           el.style.opacity = 0
           el.style.transform = 'translateY(20px)'
       }

       const detailsEnter = (el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.2,
                delay: 0.2,

            })
        }

       const btnBeforeEnter = (el) => {
           el.style.opacity = 0
           el.style.transform = 'translateX(50px)'
       }

       const btnEnter = (el) => {
            gsap.to(el, {
                opacity: 1,
                x: 0,
                duration: 0.2,
                delay: 0.4,

            })
            console.log('enter')
        }








       return { 
           userAccountDetails, 
           index, 
           nextQuestion,
           formInput,
           userDetailsInput,
           navigateForm,
           inputType,
           inputPlaceholder,
           showPassword,
           hidePassword,
           passwordReveal,
           questionBeforeEnter,
           questionEnter,
           formBeforeEnter,
           formEnter,
           btnBeforeEnter,
           btnEnter,
           detailsBeforeEnter,
           detailsEnter,
           questionLeave
           }
   }
}
</script>

<style>

</style>