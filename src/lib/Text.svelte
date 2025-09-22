<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';

  let {
    children,
    // Size variants
    tiny = false,
    small = false,
    regular = false,
    large = false,
    
    // Style variants
    strong = false,
    code = false,
    
    // Heading styles
    heading = false,
    title = false,
    
    // Additional styles
    color = "",
    className = "",
    pretty = false,

    // Optional HTML element to render
    as = "span",
  } = $props();
  
  // Determine which text style to apply based on props
  let sizeClass = $derived(() => {
    if (tiny) return "tiny";
    if (small) return "small";
    if (large) return "large";
    return "regular"; // Default size
  });
  
  let typeClass = $derived(() => {
    if (code) return "code";
    if (strong) return "strong";
    return "default"; // Default type
  });
  
  let headingClass = $derived(() => {
    if (title) return "title";
    if (heading) return "heading";
    return ""; // Not a heading
  });
  
  // Combine all classes
  let textClass = $derived(() => {
    let baseClass = "";
    if (headingClass()) {
      baseClass = `text-${headingClass()}`;
    } else {
      baseClass = `text-${sizeClass()}-${typeClass()}`;
    }
    return pretty ? `${baseClass} pretty` : baseClass;
  });
  
  // Custom text color if provided
  let customStyle = $derived(() => {
    if (color) {
      return `color: ${color};`;
    }
    return "";
  });
</script>

<StyleProvider>
  {#if as === "p"}
    <p class={`tino-text ${textClass()} ${className}`} style={customStyle()}>
      {@render children?.()}
    </p>
  {:else if as === "h1"}
    <h1 class={`tino-text ${textClass()} ${className}`} style={customStyle()}>
      {@render children?.()}
    </h1>
  {:else if as === "h2"}
    <h2 class={`tino-text ${textClass()} ${className}`} style={customStyle()}>
      {@render children?.()}
    </h2>
  {:else if as === "h3"}
    <h3 class={`tino-text ${textClass()} ${className}`} style={customStyle()}>
      {@render children?.()}
    </h3>
  {:else if as === "div"}
    <div class={`tino-text ${textClass()} ${className}`} style={customStyle()}>
      {@render children?.()}
    </div>
  {:else if as === "label"}
    <label class={`tino-text ${textClass()} ${className}`} style={customStyle()}>
      {@render children?.()}
    </label>
  {:else}
    <span class={`tino-text ${textClass()} ${className}`} style={customStyle()}>
      {@render children?.()}
    </span>
  {/if}
</StyleProvider>

<style lang="scss">
  .tino-text {
    margin: 0;
    padding: 0;
  }
  
  /* Base font family */
  .tino-text {
    font-family: var(--font-base);
  }
  
  /* Size Variants - Regular */
  .text-regular-default {
    font-size: var(--12px);
    font-weight: 400;
    letter-spacing: 0;
  }
  
  .text-regular-strong {
    font-size: var(--12px);
    font-weight: 500;
    letter-spacing: 0;
  }
  
  .text-regular-code {
    font-family: var(--font-mono);
    font-size: var(--12px);
    font-weight: 400;
    letter-spacing: 0;
  }
  
  /* Size Variants - Small */
  .text-small-default {
    font-size: var(--11px);
    font-weight: 400;
    letter-spacing: 0;
  }
  
  .text-small-strong {
    font-size: var(--11px);
    font-weight: 500;
    letter-spacing: 0;
  }
  
  /* Size Variants - Large */
  .text-large-default {
    font-size: var(--13px);
    font-weight: 500;
    letter-spacing: 0;
  }
  
  .text-large-strong {
    font-size: var(--13px);
    font-weight: 600;
    letter-spacing: 0;
  }
  
  /* Size Variants - Tiny */
  .text-tiny-default {
    font-size: var(--10px);
    font-weight: 400;
    letter-spacing: 0;
  }
  
  .text-tiny-strong {
    font-size: var(--10px);
    font-weight: 500;
    letter-spacing: 0;
  }
  
  .text-tiny-code {
    font-family: var(--font-mono);
    font-size: var(--10px);
    font-weight: 400;
    letter-spacing: 0;
  }
  
  /* Heading Styles */
  .text-heading {
    font-size: var(--16px);
    font-weight: 700;
    letter-spacing: -0.4px;
  }
  
  .text-title {
    font-size: var(--18px);
    font-weight: 700;
    letter-spacing: -0.4px;
  }
  
  /* Pretty text wrapping */
  .pretty {
    text-wrap: pretty;
  }
</style>