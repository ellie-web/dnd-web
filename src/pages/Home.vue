<template>
  <div>
    <TresCanvas shadows
    alpha
    window-size
    power-preference="high-performance"
    preserve-drawing-buffer
    physically-correct-lights
    >
      <OrbitControls/>
      <TresPerspectiveCamera :position="[0, 0, 1]" :look-at="[0, 0, 0]" />
      <!-- <TresMesh ref="boxRef" :scale="1" cast-shadow>
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
      </TresMesh> -->
      <Suspense>
        <d20/>
      </Suspense>
      <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow />
      <TresDirectionalLight :position="[0, -2, -4]" :intensity="2" cast-shadow />
      <TresDirectionalLight :position="[0, -2, 4]" :intensity="2" cast-shadow />
      <TresDirectionalLight :position="[0, 2, -4]" :intensity="2" cast-shadow />
    </TresCanvas>
    
  </div>
</template>
<script setup>
import { shallowRef } from 'vue'

import { useRenderLoop, TresCanvas  } from '@tresjs/core'
import { useGLTF, OrbitControls } from '@tresjs/cientos'
import d20 from '../components/Dice/d20/d20.vue'

const boxRef = shallowRef(null)

const { onLoop } = useRenderLoop()
const coeff = 4

onLoop(({ delta, elapsed }) => {
  // console.log(delta)s
  if (boxRef.value) {
    // console.log(boxRef.value.rotation)
    boxRef.value.rotation.y += .03
    boxRef.value.rotation.x += .01
    boxRef.value.rotation.z += .025
  }
});
</script>