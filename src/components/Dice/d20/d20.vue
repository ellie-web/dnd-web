<template>
  <!-- <GLTFModel path="/dice_models/D20_19mm.gltf"/> -->

      <TresMesh :geometry="nodes.D6_16mm.geometry"  :scale="0.02">
        <TresMeshStandardMaterial :map="texture" />
      </TresMesh>

</template>
<script setup>
import { useRenderLoop, useLoader  } from '@tresjs/core'
import { GLTFModel, useGLTF  } from '@tresjs/cientos'
import { ShaderMaterial } from 'three'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import { onMounted, nextTick } from 'vue'
import { TextureLoader } from 'three'
const { onLoop } = useRenderLoop()
const { scene, nodes, animations, materials } = await useGLTF('/dice_models/D6_16mm.glb')
const texture = await useLoader(TextureLoader, '/texture.jpg')
console.log(texture)
console.log(nodes)
// const model = nodes['"D4_16mm"']
// nodes.D4_16mm.material.dispose()
// const material = new ShaderMaterial({
//   vertexShader,
//   fragmentShader,
//   uniforms: {
//     u_Time: { value: 0 }
//   }
// })
// onMounted(async () => {
//   await nextTick()

//   onLoop(({ elapsed }) => {
//     material.uniforms.u_Time.value = elapsed
//   })
// })
</script>