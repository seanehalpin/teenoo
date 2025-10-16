<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';

  let {
    children,
    zIndex = 1000,
    top = '',
    left = '',
    right = '',
    bottom = '',
    position = 'absolute',
    width = 'auto',
    height = 'auto',
    background = 'var(--ds-popoverPrimary)',
    border = false,
    borderWeight = 1,
    borderColor = 'primary',
    borderRadius = 'var(--12px)',
    padding = 'var(--12px)',
    boxShadow = '0 0 0 1px var(--ds-borderSecondary), 0 154px 43px 0 rgba(0, 0, 0, 0.00), 0 98px 39px 0 rgba(0, 0, 0, 0.01), 0 55px 33px 0 rgba(0, 0, 0, 0.03), 0 25px 25px 0 rgba(0, 0, 0, 0.05), 0 6px 14px 0 rgba(0, 0, 0, 0.06)',
    class: customClass = '',
  } = $props();

  // Map border color names to CSS variables
  let borderColorVar = $derived(() => {
    const colorMap = {
      'primary': 'var(--ds-borderPrimary)',
      'secondary': 'var(--ds-borderSecondary)',
      'strong': 'var(--ds-borderStrong)'
    };
    return colorMap[borderColor] || colorMap.primary;
  });

  // Create border style based on weight and color
  let borderStyle = $derived(() => {
    return `${borderWeight}px solid ${borderColorVar()}`;
  });
</script>

<StyleProvider>
  <div
    class="popover {customClass}"
    style:position={position}
    style:z-index={zIndex}
    style:top={top || undefined}
    style:left={left || undefined}
    style:right={right || undefined}
    style:bottom={bottom || undefined}
    style:width={width}
    style:height={height}
    style:background={background}
    style:border={border ? borderStyle() : undefined}
    style:border-radius={borderRadius}
    style:padding={padding || undefined}
    style:box-shadow={boxShadow || undefined}
  >
    {@render children?.()}
  </div>
</StyleProvider>

<style lang="scss">
  .popover {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
</style>
