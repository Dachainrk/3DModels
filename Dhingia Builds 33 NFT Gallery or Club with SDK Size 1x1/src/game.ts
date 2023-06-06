import { movePlayerTo } from '@decentraland/RestrictedActions'
import { createdancearea,createscreen} from "modules3"
import resources from './resources'
import { NPC, NPCDelay, Dialog } from '@dcl/npc-scene-utils'
import { setTimeout } from '@dcl/ecs-scene-utils'


const scene = new Entity('scene')
engine.addEntity(scene)
const transform = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: Quaternion.Euler(0, 0, 0),
  scale: new Vector3(1, 1, 1)
})
scene.addComponentOrReplace(transform)

let screen1 = createscreen(new Vector3(1,14.7,6),"",90,16/9,5.5,1.0)
engine.addEntity(screen1)

let dancearea = [[3.69,12,3.64],[8.52,20,8.26]]
createdancearea(dancearea)

//Alice
export const AliceDialog: Dialog[] = [
  {
    text: "First Line here",
  },
  {
    text: "Second Line Here",
  },
  {
    text: "Third Line Here",
  },
  {
    text: "Fourth Line Here",
    isEndOfDialog: true,
    triggeredByNext: () => {
      Alice.playAnimation('Goodbye', true, 2)
    },
  },
]

export const Alice = new NPC(
  {
    position: new Vector3(14.03,1.25,9.46),
    rotation: Quaternion.Euler(0, 0, 0),
  },
  resources.models.robots.alice,
  () => {
    // animations
    Alice.playAnimation('Hello', true, 2)

    let dummyent = new Entity()
    dummyent.addComponent(
      new NPCDelay(2, () => {
        Alice.playAnimation('Talk')
      })
    )
    engine.addEntity(dummyent)

    // sound
    Alice.addComponentOrReplace(new AudioSource(resources.sounds.alice))
    Alice.getComponent(AudioSource).playOnce()

    // dialog UI
    Alice.talk(AliceDialog)
  },
  {
    faceUser: true,
    reactDistance: 3,
    coolDownDuration: 3,
    portrait: {
      path: 'images/portraits/alice.png',
      height: 256,
      width: 256,
      section: {
        sourceHeight: 512,
        sourceWidth: 512,
      },
    },
    onWalkAway: () => {
      Alice.playAnimation('Goodbye', true, 2)

      setTimeout(2000, ()=> {
        npcdefault()
      });
    },
  }
)


const ringShape = resources.models.robots.rings



const Alicerings = new Entity()
Alicerings.addComponent(ringShape)
Alicerings.addComponent(
  new Transform({
    position: new Vector3(0, -0.65, 0),
  })
)
Alicerings.setParent(Alice)


function npcdefault() {
}

setTimeout(1000,()=>{

  npcdefault()
});

//Copy Sounds, Images, Robot Folder




//3D Models
const Building = new Entity('Building')
Building.setParent(scene)
Building.addComponent(new GLTFShape('Models/BN51 Final.glb'))
Building.addComponent(new Transform({
  position: new Vector3(0,0,0),
  rotation: Quaternion.Euler (0, 0, 0),
  scale: new Vector3(1, 1, 1)
}))
engine.addEntity(Building)

const Stage = new Entity('Stage')
Stage.addComponent(new GLTFShape('Models/Stage.glb'))
Stage.addComponent(new Transform({
  position: new Vector3(6,11.82,6),
  rotation: Quaternion.Euler (0, 0, 0),
  scale: new Vector3(.5,.5,.5)
}))
engine.addEntity(Stage)

//Ground Floor
let Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(4,2,.5), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0,0,0)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 3, y: 6.2, z: 4 }, { x: 3, y: 6.5, z: 0 })
    },
    { hoverText: "UP" }
  )
)
engine.addEntity(Button)

//First Floor
Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(4,7,.5), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0,0,0)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 3, y: 13, z: 4 }, { x: 3, y: 13.5, z: 0 })
    },
    { hoverText: "UP" }
  )
)
engine.addEntity(Button)

Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(2.5,7,.5), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0,0,180)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 3, y: 1, z: 4 }, { x: 3, y: 1.3, z: 0 })
    },
    { hoverText: "Down" }
  )
)
engine.addEntity(Button)

//Second Floor
Button = new Entity()
Button.addComponent(new GLTFShape('models/Button.glb'))
Button.addComponent(new Transform({position: new Vector3(2.5,13.5,.5), scale: new Vector3(1, 1, 1), rotation: Quaternion.Euler(0,0,180)}))
Button.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 3, y: 6.2, z: 4 }, { x: 3, y: 6.5, z: 0 })
    },
    { hoverText: "Down" }
  )
)
engine.addEntity(Button)