import gsap from 'gsap'

export default class Mouse {
	constructor(inputs) {
		this.body = document.body

		this.pos = this.mouse = {
			x: window.innerWidth/2,
			y: window.innerHeight/2
		}

		this.ease = .5
		this.posRange = { x: 0, y: 0 }
		this.inputs = inputs

		window.addEventListener('mousemove', (e) => {
			this.move(e)
		})

		// document.addEventListener('mouseleave', (e) => {
		// 	this.customCursor.style.visibility = 'hidden'
		// 	setTimeout(() => {
		// 		gsap.to([this.pos, this.mouse], {
		// 			x: window.innerWidth/2,
		// 			y: window.innerHeight/2
		// 		})
		// 	}, 5000)
		// })

		this.update()
	}

	move(e) {
		this.mouse = {
			x: e.clientX,
			y: e.clientY
		}
	}

	update(e) {
		const progressX = gsap.utils.mapRange(0, window.innerWidth, 0, 50)
		const progressY = gsap.utils.mapRange(0, window.innerHeight, 50, 0)

		this.pos.x += (this.mouse.x - this.pos.x) * this.ease
		this.pos.y += (this.mouse.y - this.pos.y) * this.ease

		this.posRange = {
			x: progressX(this.pos.x),
			y: progressY(this.pos.y)
		}

		// console.log(this.posRange.x)
		if(this.posRange.x > 30) {
			this.inputs.isMouthUwuFlipped.value = true
		} else {
			this.inputs.isMouthUwuFlipped.value = false
		}

		// set cursor position to character's inputs
		if(this.inputs.isMoving.value) {
			this.inputs.translateX.value = this.posRange.x
			this.inputs.translateY.value = this.posRange.y
		}

		requestAnimationFrame(this.update.bind(this))
	}

}
