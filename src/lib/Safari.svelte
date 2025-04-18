<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';


  let { 
    children, 
    link = "tinotypes.tines.io", 
    realHoldHeight = 700, 
    holderHeight = "100vh",
    width = "100%",
    height = "800px",
    overflow = "scroll",
    background = "", // Background color name or custom value
    color = "primary", // Named color (primary, red, blue, etc.)
    onclick 
  } = $props()
  
  // Determine the background color based on color name or custom background
  function getBackgroundColor(): string {
    // If explicit background is provided, use it
    if (background) {
      // Check if it's already a valid CSS value
      if (background.startsWith('#') || 
          background.startsWith('rgb') || 
          background.startsWith('hsl') || 
          background.startsWith('var(')) {
        return background;
      }
      
      // Otherwise, check if it's a named color
      switch (background.toLowerCase()) {
        case 'primary': return 'var(--ds-primary)';
        case 'red': return 'var(--ds-red)';
        case 'blue': return 'var(--ds-blue)';
        case 'magenta': return 'var(--ds-magenta)';
        case 'green': return 'var(--ds-green)';
        case 'orange': return 'var(--ds-orange)';
        case 'gold': return 'var(--ds-gold)';
        case 'transparent': return 'transparent';
        default: return background; // Try to use as-is if not recognized
      }
    }
    
    // If no background but color is provided, use the color
    if (color) {
      switch (color.toLowerCase()) {
        case 'primary': return 'var(--ds-primary)';
        case 'red': return 'var(--ds-red)';
        case 'blue': return 'var(--ds-blue)';
        case 'magenta': return 'var(--ds-magenta)';
        case 'green': return 'var(--ds-green)';
        case 'orange': return 'var(--ds-orange)';
        case 'gold': return 'var(--ds-gold)';
        case 'transparent': return 'transparent';
        default: return 'var(--ds-primary)'; // Default to primary if not recognized
      }
    }
    
    // Default color if nothing is specified
    return 'var(--ds-primary)';
  }


</script>


<StyleProvider>

<div class="wrap"
  style:height={holderHeight || "100vh"}
  style:background={getBackgroundColor()}
  >
  <div class="holder" 
  bind:clientHeight={realHoldHeight}
  style:width={width || "100%"} 
  style:height={height || "800px"}
  style:overflow={overflow || "scroll"}
  >
    <div class="safari" {onclick}>
      <div class="safari-link">{link}</div>
    </div>
    {@render children?.()}
  </div>
</div>

</StyleProvider>


<style lang="scss">

  .wrap {
    position: relative;
    padding: 0 40px;
    // height: var(--safari-holder-height, 100vh);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    // background: var(--safari-bg, var(--ds-primary));
    background-size: cover;

  }

  .holder {
    background: var(--ds-surfacePrimary);
    box-shadow: 0 40px 40px 0 rgba(0,0,0,0.5);
    // width: var(--safari-width, 1400px);
    // height: var(--safari-height, 800px);
    max-height: 900px;
    // --_overflow: var(--overflow, scroll);
    // overflow: var(--_overflow);
    border-radius: 12px;
    position: relative;
  }

  .safari {
    background: var(--ds-surfaceTertiary);
    height: 40px;
    box-shadow: 0 1px 0 0 var(--ds-borderPrimary);
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1000;
    user-select: none;

    &:before {
      width: calc(100% - 400px);
      height: 25px;
      border-radius: 5px;
      position: absolute;
      left: 200px;
      top: 7px;
      background: var(--ds-surfaceTertiary);
      border: 1px solid var(--ds-borderPrimary);
      content: "";
    }

    .safari-link {
      text-align: center;
      font-size: var(--12px);
      color: var(--ds-textTertiary);
      position: relative;
      z-index: 1000;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
</style>
