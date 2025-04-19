<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';

  let { 
    children, 
    vertical = false, 
    wrap = false, 
    onclick, 
    inspect = false, 
    auto = false, 
    fillWidth = false,
    topLeft = false,
    topCenter = false,
    topRight = false,
    left = false,
    center = false,
    right = false,
    bottomLeft = false,
    bottomCenter = false,
    bottomRight = false,
    gapAuto = false,
    padding = '',
    paddingLeft = '',
    paddingRight = '',
    paddingTop = '',
    paddingBottom = '',
    border = false,
    borderLeft = false,
    borderRight = false,
    borderTop = false,
    borderBottom = false,
    borderWeight = 1,
    borderColor = 'primary', // primary, secondary, strong
    gap = '',
    background = "transparent",
    width = "auto",
    height = "auto",
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
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    {onclick} 
    class="autolayout {customClass}" 
    style:padding-left={paddingLeft || undefined}
    style:padding-right={paddingRight || undefined}
    style:padding-top={paddingTop || undefined}
    style:padding-bottom={paddingBottom || undefined}
    style:padding={padding || undefined}
    style:border-left={borderLeft ? borderStyle() : undefined}
    style:border-right={borderRight ? borderStyle() : undefined}
    style:border-top={borderTop ? borderStyle() : undefined}
    style:border-bottom={borderBottom ? borderStyle() : undefined}
    style:border={border ? borderStyle() : undefined}
    style:gap={gap || undefined}
    style:width={width || undefined}
    style:height={height || undefined}
    style:background={background || undefined}
    class:fill-width={fillWidth} 
    class:auto={auto} 
    class:vertical={vertical} 
    class:inspect={inspect} 
    class:wrap={wrap} 
    class:top-left={topLeft}
    class:top-center={topCenter}
    class:top-right={topRight}
    class:left={left}
    class:center={center}
    class:right={right}
    class:bottom-left={bottomLeft}
    class:bottom-center={bottomCenter} 
    class:bottom-right={bottomRight} 
    class:gap-auto={gapAuto}
  >
  {@render children?.()}
</div>
</StyleProvider>

<style lang="scss">
  
  .autolayout {
    display: flex;
    position: relative;
    box-sizing: border-box;

    &.vertical {
      flex-direction: column;
    }

    &.inspect {
      outline: 1px solid #F500CC;
    }

    &.auto {
      justify-content: space-between;
    }

    &.fill-width {
      width: 100%;
    }

    &.wrap {
      flex-wrap: wrap;
    }

    &.center {
      justify-content: center;
      align-items: center;
    }
    &.left {
      justify-content: flex-start;
      align-items: center;
    }
    &.right {
      justify-content: flex-end;
      align-items: center;
    }

    &.bottom-left {
      justify-content: flex-start;
      align-items: flex-end;
    }
    &.bottom-center {
      justify-content: center;
      align-items: flex-end;
    }
    &.bottom-right {
      justify-content: flex-end;
      align-items: flex-end;
    }

    &.top-left {
      justify-content: flex-start;
      align-items: flex-start;
    }
    &.top-center {
      justify-content: center;
      align-items: flex-start;
    }
    &.top-right {
      justify-content: flex-end;
      align-items: flex-start;
    }

    &.gap-auto {
      justify-content: space-between;
    }
  }
</style>