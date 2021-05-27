<template>
  <div class="bg-red-300 min-h-screen">
      <!-- logo -->
      <transition
      appear
      @before-enter='logoBeforeEnter'
      @enter='logoEnter'>
          <h3 class="absolute top-8 sm:left-20 left-6 z-30 font-Fira text-xl text-primary">Chelpi</h3>
      </transition>
      <!-- end logo -->

      <!-- video -->
      <video :src="require('@/assets/video/food.mp4')" class="absolute w-full h-full object-cover" muted loop autoplay></video>
      <!-- end video -->

      <!-- overlay -->
      <!-- add a gradient/animation to this -->
      <div class="bg-white absolute w-full h-screen bg-opacity-90"></div>
      <!-- end overlay -->


      <!-- Text on the background -->
      <div class="relative z-30 text-center flex flex-col items-center place-content-center w-full h-screen">
        <transition
        appear
        @before-enter='hungryBeforeEnter'
        @enter='hungryEnter'>
            <h1 class="font-Fira text-7xl text-secondary sm:text-8xl font-thin">
                You Hungry?
            </h1>
        </transition>
        
        <!-- call to actions Sign up and Login button -->
        <div class="mt-7 sm:mt-12 flex flex-col sm:inline-block text-sm sm:text-xs tracking-widest font-light text-white">
            <transition
            appear
            @before-enter='signupBeforeEnter'
            @enter='signupEnter'>
                <router-link :to="{name: 'CreateAccount'}">
                    <h1 class="authBtn bg-primary">CREATE AN ACCOUNT</h1>
                </router-link>
            </transition>
            <transition
            appear
            @before-enter='loginBeforeEnter'
            @enter='loginEnter'>
            <button class="mt-4 sm:mt-0 sm:ml-3 authBtn text-primary border border-primary ">LOG INTO YOUR ACCOUNT</button>
            </transition>
        </div>
        </div>
      <!-- end of call to actions Sign up and Login button -->
      <!-- end of text on the background -->
  </div>
</template>

<script>
import gsap from 'gsap'; 

export default {
    setup() {

        // Logo animation
        const logoBeforeEnter = (el) => {
            el.style.opacity = 0;
        }

        const logoEnter = (el) => {
            gsap.to(el, {
                opacity: 1,
                duration: 0.9,
                delay: 1
            })
        }
        
        // hungry text animation
        const hungryBeforeEnter = (el) => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(100px)'
            console.log('before enter', el)
        }

        const hungryEnter = (el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,

            })
            console.log('enter')
        }

        // Sign up button animation
        const signupBeforeEnter = (el) => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(150px)'
        }

        const signupEnter = (el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                delay: 0.7,

            })
        }
        
        // Login button animation
        const loginBeforeEnter = (el) => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(100px)'
        }

        const loginEnter = (el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 1,

            })
        }


        return { 
            hungryBeforeEnter, 
            hungryEnter, 
            signupBeforeEnter, 
            signupEnter, 
            loginBeforeEnter, 
            loginEnter, 
            logoBeforeEnter, 
            logoEnter }
    },
}
</script>

<style scoped>

</style>