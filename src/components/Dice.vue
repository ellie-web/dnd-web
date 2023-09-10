<template>
  <div class="stage">
    <div class="dice">
      <div class="dice__side dice__side--1">
        <span></span>
      </div>
      <div class="dice__side dice__side--2">
        <span></span>
        <span></span>
      </div>
      <div class="dice__side dice__side--3">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="dice__side dice__side--4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="dice__side dice__side--5">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="dice__side dice__side--6">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
  

</template>
<script setup>

</script>
<style lang="sass">

.stage
  width: 500px
  height: 500px
  display: flex
  justify-content: center
  align-items: center
  background: #000

$d6size: 100px

@keyframes roll
  0%
    transform: rotate3d(1, 1, 1, 0deg)
  100%
    transform: rotate3d(1, 1, 1, 9999deg)

.dice
  position: relative
  transform-origin: center center
  transform-style: preserve-3d
  height: $d6size
  width: $d6size
  line-height: 2em
  transition: .1s linear
  animation: 100s infinite roll
  
  &__side
    width: $d6size
    height: $d6size
    line-height: 2em
    background: #fff
    opacity: 1
    border-radius: 2px
    border: 1px solid #e1e1e1
    position: absolute
    box-shadow: 0 0 14px 0.25em #e1e1e1 inset

    &>span
      background: #000
      border-radius: 10px
      width: 10px
      height: 10px
      display: block
      position: absolute

    &--1
      transform: translateZ(-$d6size/2)

      span:nth-child(1)
        left: 45%
        top: 45%

    &--2
      transform: rotateY(90deg) translateZ(-$d6size/2)

      span:nth-child(1)
        left: 30%
        top: 45%

      span:nth-child(2)
        right: 30%
        top: 45%

    &--3
      transform: rotateY(180deg) translateZ(-$d6size/2)

      span:nth-child(1)
        left: 45%
        top: 45%

      span:nth-child(2)
        left: 20%
        top: 20%
      
      span:nth-child(3)
        right: 20%
        bottom: 20%

    &--4
      transform: rotateY(270deg) translateZ(-$d6size/2)

      span:nth-child(1)
        left: 30%
        top: 30%

      span:nth-child(2)
        right: 30%
        top: 30%
      
      span:nth-child(3)
        left: 30%
        bottom: 30%

      span:nth-child(4)
        right: 30%
        bottom: 30%

    &--5
      transform: translateY(-$d6size/2) rotateX(90deg)

      span:nth-child(1)
        left: 30%
        top: 30%

      span:nth-child(2)
        right: 30%
        top: 30%
      
      span:nth-child(3)
        left: 30%
        bottom: 30%

      span:nth-child(4)
        right: 30%
        bottom: 30%

      span:nth-child(5)
        left: 45%
        top: 45%

    &--6
      transform: translateY($d6size/2) rotateX(90deg)

      span:nth-child(1)
        left: 30%
        top: 20%

      span:nth-child(2)
        right: 30%
        top: 20%
      
      span:nth-child(3)
        left: 30%
        top: 45%

      span:nth-child(4)
        right: 30%
        top: 45%

      span:nth-child(5)
        left: 30%
        top: 70%

      span:nth-child(6)
        right: 30%
        top: 70%

</style>