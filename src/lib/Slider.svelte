<script lang="ts">
  import StyleProvider from './StyleProvider.svelte';
  
  let { 
    min = 0,
    max = 100,
    step = 1,
    value = $bindable(min), // For single handle mode
    startValue = min, // For dual handle mode
    endValue = max, // For dual handle mode
    dual = false, // Whether to use dual handles
    label = "",
    valueLabel = "", // Custom label for the displayed value
    disabled = false,
    stretch = true,
    showOutput = true,
    formatFn = (val: number) => val.toString(), // Function to format the displayed value
    onchange = undefined,
    oninput = undefined,
    transition = null
  } = $props();

  

  let trackRef: HTMLDivElement;
  let isDragging = false;
  let activeHandle: 'start' | 'end' | 'single' = 'single';
  let randomId = Math.random().toString(36).substring(2, 15);
  let id = `range-${randomId}`;

  // Compute the position percentage for each handle
  function getHandlePosition(val: number): number {
    return ((val - min) / (max - min)) * 100;
  }

  // Format display value
  function getDisplayValue(): string {
    if (dual) {
      return `${formatFn(startValue)} <span class="range-value-label">/</span> ${formatFn(endValue)}`;
    } else {
      return formatFn(value);
    }
  }

  // Handle track click to update value
  function handleTrackClick(event: MouseEvent) {
    if (disabled) return;
    
    const rect = trackRef.getBoundingClientRect();
    const clickPosition = (event.clientX - rect.left) / rect.width;
    const newValue = min + clickPosition * (max - min);
    const roundedValue = Math.round(newValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, roundedValue));
    
    if (dual) {
      // Find nearest handle to the click position
      const startDiff = Math.abs(getHandlePosition(startValue) - clickPosition * 100);
      const endDiff = Math.abs(getHandlePosition(endValue) - clickPosition * 100);
      
      if (startDiff <= endDiff) {
        startValue = clampedValue;
        if (startValue > endValue) {
          startValue = endValue;
        }
        activeHandle = 'start';
      } else {
        endValue = clampedValue;
        if (endValue < startValue) {
          endValue = startValue;
        }
        activeHandle = 'end';
      }
    } else {
      value = clampedValue;
      activeHandle = 'single';
    }
    
    triggerChange();
  }

  // Handle start dragging
  function handleDragStart(handle: 'start' | 'end' | 'single') {
    return (event: MouseEvent) => {
      if (disabled) return;
      
      event.preventDefault();
      isDragging = true;
      activeHandle = handle;
      
      // Add event listeners for drag and release
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
    };
  }

  // Handle drag movement
  function handleDragMove(event: MouseEvent) {
    if (!isDragging || !trackRef) return;
    
    const rect = trackRef.getBoundingClientRect();
    const movePosition = (event.clientX - rect.left) / rect.width;
    const newValue = min + movePosition * (max - min);
    const roundedValue = Math.round(newValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, roundedValue));
    
    if (dual) {
      if (activeHandle === 'start') {
        startValue = Math.min(clampedValue, endValue);
      } else if (activeHandle === 'end') {
        endValue = Math.max(clampedValue, startValue);
      }
    } else {
      value = clampedValue;
    }
    
    if (oninput) {
      if (dual) {
        oninput({ start: startValue, end: endValue });
      } else {
        oninput(value);
      }
    }
  }

  // Handle drag end
  function handleDragEnd() {
    isDragging = false;
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    
    triggerChange();
  }

  // Trigger change event
  function triggerChange() {
    if (onchange) {
      if (dual) {
        onchange({ start: startValue, end: endValue });
      } else {
        onchange(value);
      }
    }
  }

  // Handle key navigation
  function handleKeyDown(handle: 'start' | 'end' | 'single') {
    return (event: KeyboardEvent) => {
      if (disabled) return;
      
      let newValue: number;
      
      if (handle === 'single') {
        newValue = value;
      } else if (handle === 'start') {
        newValue = startValue;
      } else {
        newValue = endValue;
      }
      
      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        newValue = Math.max(min, newValue - step);
        event.preventDefault();
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        newValue = Math.min(max, newValue + step);
        event.preventDefault();
      } else if (event.key === 'Home') {
        newValue = min;
        event.preventDefault();
      } else if (event.key === 'End') {
        newValue = max;
        event.preventDefault();
      } else {
        return;
      }
      
      if (handle === 'single') {
        value = newValue;
      } else if (handle === 'start') {
        startValue = Math.min(newValue, endValue);
      } else {
        endValue = Math.max(newValue, startValue);
      }
      
      triggerChange();
    };
  }
</script>

<StyleProvider>
  <div class="range-container" class:fullWidth={stretch} use:transition>
    {#if label}
      <label class="range-label" for={id}>{label}</label>
    {/if}
    <div class="range-wrapper">
      <div 
        class="range-track" 
        class:disabled={disabled} 
        bind:this={trackRef}
        onclick={handleTrackClick}
      >
        <div 
          class="range-fill" 
          style={dual 
            ? `left: ${getHandlePosition(startValue)}%; right: ${100 - getHandlePosition(endValue)}%` 
            : `width: ${getHandlePosition(value)}%`
          }
        ></div>
        
        {#if dual}
          <!-- Start handle -->
          <button
            type="button"
            id={`${id}-start`}
            class="range-handle start-handle"
            class:active={activeHandle === 'start'}
            style={`left: ${getHandlePosition(startValue)}%`}
            aria-label="Lower bound"
            aria-valuemin={min}
            aria-valuemax={endValue}
            aria-valuenow={startValue}
            {disabled}
            onmousedown={handleDragStart('start')}
            onkeydown={handleKeyDown('start')}
            tabindex={disabled ? -1 : 0}
          ></button>
          
          <!-- End handle -->
          <button
            type="button"
            id={`${id}-end`}
            class="range-handle end-handle"
            class:active={activeHandle === 'end'}
            style={`left: ${getHandlePosition(endValue)}%`}
            aria-label="Upper bound"
            aria-valuemin={startValue}
            aria-valuemax={max}
            aria-valuenow={endValue}
            {disabled}
            onmousedown={handleDragStart('end')}
            onkeydown={handleKeyDown('end')}
            tabindex={disabled ? -1 : 0}
          ></button>
        {:else}
          <!-- Single handle -->
          <button
            type="button"
            id={id}
            class="range-handle"
            class:active={activeHandle === 'single'}
            style={`left: ${getHandlePosition(value)}%`}
            aria-label="Slider value"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            {disabled}
            onmousedown={handleDragStart('single')}
            onkeydown={handleKeyDown('single')}
            tabindex={disabled ? -1 : 0}
          ></button>
        {/if}
      </div>
      
      {#if showOutput}
        <div class="range-output" class:dual={dual}>
          {#if valueLabel}
            <span class="range-value-label">{valueLabel}/</span>
          {/if}
          <span class="range-value">{@html getDisplayValue()}</span>
        </div>
      {/if}
    </div>
  </div>
</StyleProvider>

<style lang="scss">
  .range-container {
    display: flex;
    flex-direction: column;
    gap: var(--8px);
    
    &.fullWidth {
      width: 100%;
    }
  }

  .range-label {
    font-family: var(--font-base);
    font-size: var(--12px);
    color: var(--ds-textSecondary);
    font-weight: 500;
  }
  
  .range-wrapper {
    display: flex;
    align-items: center;
    gap: var(--12px);
  }

  .range-track {
    position: relative;
    height: var(--8px);
    background-color: var(--ds-slate04);
    border-radius: calc(infinity * 1px);
    flex-grow: 1;
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      top: -16px;
      left: 0;
      right: 0;
      height: var(--32px);
      z-index: 1;
    }
    
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .range-fill {
    position: absolute;
    height: 100%;
    background-color: var(--ds-primary);
    border-radius: calc(infinity * 1px) 0 0 calc(infinity * 1px);
    top: 0;
    left: 0;
    z-index: 10;
  }

  .range-handle {
    position: absolute;
    width: var(--18px);
    height: var(--18px);
    border-radius: 50%;
    background-color: var(--ds-textWhite);
    border: 3px solid var(--ds-primary);
    transform: translate(-50%, -50%);
    top: 50%;
    cursor: grab;
    outline: none;
    transition: box-shadow 0.2s ease, transform 0.1s ease;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    z-index: 100;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: var(--32px);
      height: var(--32px);
      border-radius: 50%;
      background-color: transparent;
      transform: translate(-50%, -50%);
    }
    
    
    &:active, &.active {
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1);
    }
    
    &:focus {
      box-shadow: 0 0 0 3px var(--ds-inputActiveOutline);
    }
    
    &:disabled {
      cursor: not-allowed;
    }
  }
  
  .range-output {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--4px);
    min-width: 60px;
    font-family: var(--font-base);
    font-size: var(--12px);
    color: var(--ds-textPrimary);
    background: var(--ds-inputPrimary);
    box-shadow: 0 0 0 1px var(--ds-borderPrimary);
    min-width: var(--48px);
    border-radius: var(--8px);
    height: var(--32px);
    padding: 0 var(--12px);

    &.dual {
      min-width: 80px;
    }
  }
  
  
  
  .range-value {
    font-weight: 500;

    span {
      color: var(--ds-textTertiary);
    }
  }
</style>