<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';

  let {
    children,
    vertical = $bindable(false),
    wrap = $bindable(false),
    onclick = undefined,
    inspect = $bindable(false),
    auto = $bindable(false),
    fillWidth = $bindable(false),
    topLeft = $bindable(false),
    topCenter = $bindable(false),
    topRight = $bindable(false),
    left = $bindable(false),
    center = $bindable(false),
    right = $bindable(false),
    bottomLeft = $bindable(false),
    bottomCenter = $bindable(false),
    bottomRight = $bindable(false),
    gapAuto = $bindable(false),
    padding = $bindable(''),
    paddingLeft = $bindable(''),
    paddingRight = $bindable(''),
    paddingTop = $bindable(''),
    paddingBottom = $bindable(''),
    border = $bindable(false),
    borderLeft = $bindable(false),
    borderRight = $bindable(false),
    borderTop = $bindable(false),
    borderBottom = $bindable(false),
    borderWeight = $bindable(1),
    borderColor = $bindable('primary'), // primary, secondary, strong
    borderRadius = $bindable(''),
    borderRadiusTopLeft = $bindable(''),
    borderRadiusTopRight = $bindable(''),
    borderRadiusBottomLeft = $bindable(''),
    borderRadiusBottomRight = $bindable(''),
    gap = $bindable(''),
    background = $bindable("transparent"),
    width = $bindable("auto"),
    height = $bindable("auto"),
    flex = $bindable(false),
    class: customClass = $bindable(''),
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
    style:border-radius={borderRadius || undefined}
    style:border-top-left-radius={borderRadiusTopLeft || undefined}
    style:border-top-right-radius={borderRadiusTopRight || undefined}
    style:border-bottom-left-radius={borderRadiusBottomLeft || undefined}
    style:border-bottom-right-radius={borderRadiusBottomRight || undefined}
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
    class:flex={flex}
  >
  {@render children?.()}
</div>
</StyleProvider>

<style lang="scss">
  
  .autolayout {
    display: flex;
    position: relative;
    box-sizing: border-box;

    &.flex {
      flex: 1;
    }

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