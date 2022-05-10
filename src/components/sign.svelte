<script context="module">
	export const ssr = false;
</script>

<script lang="ts">
	import { fade, fly } from 'svelte/transition';
</script>

<center out:fade>
	<section out:fly={{ y: 200, duration: 700 }}>
		<svg viewBox="0 0 105 74" version="1.1" id="svg5">
			<defs id="defs2" />
			<g id="layer1">
				<path
					style="stroke-width:0.79375;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1"
					d="M 22.201533,11.769382 21.846028,69.27898"
					id="path980"
					class="signature_underline"
				/>
				<path
					class="signature_underline2"
					style="stroke-width:0.79375;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1"
					d="M 27.337801,15.426931 25.82075,67.090224"
					id="path982"
				/>
				<path
					class="signature_base"
					style="fill:none;stroke-width:0.79375;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1"
					d="m 15.212458,16.831143 c 0,0 14.645965,-9.2128418 21.187548,-7.6545928 6.541579,1.5582488 7.153449,6.4988768 7.153449,6.4988768 0,0 -2.525525,12.329081 -9.99287,18.986111 -7.467346,6.65703 -12.800325,10.571959 -12.800325,10.571959 0,0 12.159054,-13.142492 23.212139,-11.291951 11.053088,1.850541 -7.404236,29.435606 -10.879194,30.977055 -3.474961,1.541449 -17.024111,2.026331 -17.024111,2.026331 l 41.332698,-21.659701 -2.625276,14.927082 8.240012,-11.224154 -0.3051,7.621289 5.84765,-10.458561 -1.48963,10.977541 c 0,0 13.96663,-11.199175 16.97058,-15.668995 3.00394,-4.469821 -18.87463,-9.381305 -18.87463,-9.381305 0,0 19.40257,-3.802417 24.65678,-11.775023 5.25422,-7.972606 -1.50098,-13.5051302 -1.50098,-13.5051302 l -3.06665,4.5557732 -8.18339,50.656689"
					id="path1498"
				/>
			</g>
		</svg>
		<div class="inline-block">
			<div class="typewriter"><p>Binsar Dwi Jasuma</p></div>
		</div>
	</section>
</center>

<style lang="scss">
	@import '../styles/colors.scss';
	.signature_base {
		stroke: $primary;
		stroke-dasharray: 900;
		animation: writebase 5s forwards linear;
	}
	@keyframes writebase {
		0%,
		30% {
			stroke-dashoffset: 900;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}
	.signature_underline {
		fill: $primary;
		stroke: $primary;
		stroke-dasharray: 700;
		animation: writeunderline 5s forwards linear;
	}
	@keyframes writeunderline {
		0%,
		20% {
			stroke-dashoffset: 700;
		}
		25% {
			stroke-dashoffset: 0;
		}
	}
	.signature_underline2 {
		fill: $primary;
		stroke: $primary;
		stroke-dasharray: 700;
		animation: writeunderline2 5s forwards linear;
	}
	@keyframes writeunderline2 {
		0%,
		25% {
			stroke-dashoffset: 700;
		}
		50% {
			stroke-dashoffset: 0;
		}
	}
	center {
		background-color: $background;
		color: $primary;
		display: flex;
		flex-direction: column;
		justify-content: center;

		position: fixed;
		z-index: 999;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100%;
		border: 1px solid;
		section {
			div {
				width: auto;
			}
		}
		svg {
			width: calc(105mm / 2);
			height: calc(74mm / 2);
			color: $secondary;
		}
	}
	.typewriter {
		color: $secondary;
		overflow: hidden;
		border-right: 0 solid $secondary;
		white-space: nowrap;
		animation: typing 1s forwards;
		animation-delay: 3s;
		font-size: 1.6rem;
		width: 0;
	}
	@keyframes typing {
		from {
			border-right-width: 2em;
			width: 0;
		}
		to {
			width: 100%;
		}
	}
</style>
