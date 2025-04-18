<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
    
  let { 
    size = 'medium', // small: 24px, medium: 32px, large: 48px
    team = false, // When true, avatar has 12px radius, otherwise it's round
    initial = "", // Single letter or two initials to display
    image = "", // URL to the image
    name = "", // Full name for accessibility
    color = "", // Color name: primary, red, blue, magenta, green, orange, gold
    bgcolor = "", // Optional custom background color (overrides color)
    textcolor = "", // Optional custom text color
    avatarNum = 0, // Number between 1-20 for pravatar.cc avatar (0 means disabled),
    onclick,
  } = $props();

  // Size in pixels based on the size prop
  function getSize(): number {
    switch (size) {
      case 'small': return 24;
      case 'large': return 48;
      case 'medium':
      default: return 32;
    }
  }
  
  // Border radius based on team prop and size
  function getBorderRadius(): string {
    if (team) {
      switch (size) {
        case 'small': return '4px';
        case 'medium': return '8px';
        case 'large':
        default: return '12px';
      }
    } else {
      // For user avatar, always make it round
      return '50%';
    }
  }
  
  // Font size based on avatar size
  function getFontSize(): string {
    switch (size) {
      case 'small': return 'var(--10px)';
      case 'large': return 'var(--16px)';
      case 'medium':
      default: return 'var(--12px)';
    }
  }
  
  // Generate initials from name if not provided
  function getInitials(): string {
    if (initial) {
      // If initials are provided, take the first 2 characters
      return initial.substring(0, 2).toUpperCase();
    } else if (name) {
      // Generate initials from name
      const nameParts = name.trim().split(/\s+/);
      if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase();
      } else {
        return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
      }
    }
    // Fallback
    return "";
  }
  
  // Determine background color if not provided
  function getBackgroundColor(): string {
    // Explicit bgcolor has highest priority
    if (bgcolor) return bgcolor;
    
    // Color name mapping
    if (color) {
      switch (color.toLowerCase()) {
        case 'primary': return 'var(--ds-primary)';
        case 'red': return 'var(--ds-red)';
        case 'blue': return 'var(--ds-blue)';
        case 'magenta': return 'var(--ds-magenta)';
        case 'green': return 'var(--ds-green)';
        case 'orange': return 'var(--ds-orange)';
        case 'gold': return 'var(--ds-gold)';
        default:
          // If color is a custom value like '#ff0000' or any other color, use it directly
          if (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('hsl') || color.startsWith('var(')) {
            return color;
          }
      }
    }
    
    // Colors from design system for random selection
    const colors = [
      'var(--ds-primary)', 
      'var(--ds-blue)', 
      'var(--ds-magenta)',
      'var(--ds-green)',
      'var(--ds-orange)',
      'var(--ds-red)',
      'var(--ds-gold)'
    ];
    
    // Hash the name or initials to get a consistent color
    let hash = 0;
    const str = getInitials() || name || 'avatar';
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  }
  
  // Get the avatar image source
  function getAvatarImageSrc(): string {
    // If a custom image URL is provided, use that first
    if (image) return image;
    
    // If an avatar number is provided, use pravatar.cc
    if (avatarNum >= 1 && avatarNum <= 20) {
      const pixelSize = getSize() * 2; // Get double the size for higher resolution
      return `https://i.pravatar.cc/${pixelSize}?img=${avatarNum}`;
    }
    
    // No image to display
    return "";
  }
  
  // Image error handling
  function handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.style.display = 'none';
  }
</script>

<StyleProvider>
  <div
    class="avatar"
    class:avatar-small={size === 'small'}
    class:avatar-medium={size === 'medium'}
    class:avatar-large={size === 'large'}
    class:avatar-user={!team}
    class:avatar-team={team}
    style:--avatar-size="{getSize()}px"
    style:--avatar-border-radius={getBorderRadius()}
    style:--avatar-font-size={getFontSize()}
    style:--avatar-bg-color={getBackgroundColor()}
    style:--avatar-text-color={textcolor || 'white'}
    role="img" 
    
    {onclick}
  >
    {#if getAvatarImageSrc()}
      <img 
        src={getAvatarImageSrc()} 
        alt={name || "Avatar"} 
        class="avatar-image"
        onerror={handleImageError}
      />
    {/if}
    <span class="avatar-initials" class:hidden={getAvatarImageSrc() && !getInitials()}>
      {getInitials()}
    </span>
  </div>
</StyleProvider>

<style lang="scss">
  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--avatar-size);
    height: var(--avatar-size);
    border-radius: var(--avatar-border-radius);
    background-color: var(--avatar-bg-color);
    color: var(--avatar-text-color);
    position: relative;
    overflow: hidden;
    font-family: var(--font-base);
    line-height: 1;
    font-weight: 600;
    user-select: none;
    flex-shrink: 0;
  }
  
  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .avatar-initials {
    font-size: var(--avatar-font-size);
    letter-spacing: -0.01em;
    z-index: 1;
    
    &.hidden {
      opacity: 0;
    }
  }
  
  /* Size variations */
  .avatar-small {
    font-size: 10px;
  }
  
  .avatar-medium {
    font-size: 12px;
  }
  
  .avatar-large {
    font-size: 16px;
  }
</style>
