<script>
  const DROPLET_COUNT = 250;
  const BASE_SPEED = 1;
  const BASE_COLOR_VALUE = 190; // min value for RGB to ensure lightness
  const COLOR_RANGE = 255 - BASE_COLOR_VALUE; // range for random addition to base value
  const REDNESS_MULTIPLIER = 0.6;
  const GREENNESS_MULTIPLIER = 0.9;
  const BLUENESS_MULTIPLIER = 1;

  const randomRGBValue = () => Math.floor(Math.random() * COLOR_RANGE + BASE_COLOR_VALUE);
  const randomColor = () =>
    `rgb(${randomRGBValue() * REDNESS_MULTIPLIER}, ${randomRGBValue() * GREENNESS_MULTIPLIER}, ${
      randomRGBValue() * BLUENESS_MULTIPLIER
    })`;

  function generateDropletStyles() {
    const styles = {
      horizontalPosition: Math.floor(Math.random() * 100),
      verticalStart: Math.floor(Math.random() * 100),
      opacity: Math.random(),
      animationDuration: Math.random() + BASE_SPEED,
      animationDelay: Math.random() * 2 - 1,
      scale: Math.random(),
      color: randomColor(),
    };
    return styles;
  }
</script>

<div class="rain pointer-events-none h-full w-full fixed top-0 left-0 z-10 overflow-clip">
  {#each Array(DROPLET_COUNT)
    .fill(0)
    .map((_) => generateDropletStyles()) as dropletStyles}
    <svg
      class="rain_drop h-8 w-8 absolute"
      preserveAspectRatio="xMinYMin"
      fill="none"
      viewBox="0 0 50 50"
      style="left: {dropletStyles.horizontalPosition}%; top: calc((dropletStyles.verticalStart + 50) * -1px); opacity: {dropletStyles.opacity}; animation-duration: {dropletStyles.animationDuration}s; animation-delay: {dropletStyles.animationDelay}s; transform: scaleY({dropletStyles.scale} * 1.5);"
    >
      <path
        d="M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"
        fill={dropletStyles.color}
      />
    </svg>
  {/each}
</div>

<div
  class="relative z-20 bg-slate-900 pr-4 py-4 shadow-[0_0_3rem_2rem_rgba(15,23,42,1)] bg-opacity-95"
>
  <slot />
</div>

<style>
  .rain_drop {
    animation-delay: calc(var(--animationDelay) * 1s);
    animation-duration: calc(var(--animationDuration) * 1s);
    animation-iteration-count: infinite;
    animation-name: drop;
    animation-timing-function: linear;
    left: calc(var(--horizontalPosition) * 1%);
    top: calc((var(--verticalStart) + 50) * -1px);
  }

  path {
    opacity: var(--opacity);
    transform: scaleY(calc(var(--scale) * 1.5));
  }

  @keyframes drop {
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(100vh);
    }
  }
</style>
