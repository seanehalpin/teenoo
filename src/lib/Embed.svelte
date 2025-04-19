<script lang="ts">
  
  import StyleProvider from './StyleProvider.svelte';
  // import { Toaster, toast } from 'svelte-sonner'
  import Autolayout from "./Autolayout.svelte"
  import { fade, fly, scale, blur } from 'svelte/transition'
  import { backOut, quartOut, quintIn } from "svelte/easing"

  // let showAutolayout = $state(false)

  // Initialize border state for the dropdown
let initBorderValue = $state(() => {
  if (borderAll) return 'all';
  if (borderLeft) return 'left';
  if (borderRight) return 'right';
  if (borderTop) return 'top';
  if (borderBottom) return 'bottom';
  return 'all'; // Default to 'all' if no border is specified
});

  let { 
    showAutolayout = $bindable(false),
    currentAlignment = 'center', 
    currentDirection = 'horizontal', 
    gap = null,
    paddingHorizontal = 16,
    paddingVertical = 16,
    borderAll = false,
    borderLeft = false,
    borderRight = false,
    borderTop = false,
    borderBottom = false,
    borderWeight = null,
    borderColor = 'primary', // primary, secondary, strong
    buttonLeft = 'auto',
    buttonTop = '16px',
    buttonRight = '16px',
    butttonBottom = 'auto',
    position = 'fixed',
  } = $props();

  let left = $derived(currentAlignment === 'left');
  let center = $derived(currentAlignment === 'center');
  let right = $derived(currentAlignment === 'right');
  let topleft = $derived(currentAlignment === 'top-left');
  let topcenter = $derived(currentAlignment === 'top');
  let topright = $derived(currentAlignment === 'top-right');
  let bottomleft = $derived(currentAlignment === 'bottom-left');
  let bottomcenter = $derived(currentAlignment === 'bottom');
  let bottomright = $derived(currentAlignment === 'bottom-right');

  let gapAuto = $state(false);

  let outputDirection = $derived(currentDirection === 'vertical' ? ' vertical' : '');
  let outputGap = $derived(gap >= 1 ? ` gap="${gap}px"` : '');
  let outputPaddingH = $derived(paddingHorizontal >= 1 ? ` paddingLeft="${paddingHorizontal}px" paddingRight="${paddingHorizontal}px"` : '');
  let outputPaddingV = $derived(paddingVertical >= 1 ? ` paddingTop="${paddingVertical}px" paddingBottom="${paddingVertical}px"` : '');
  let outputGapAuto = $derived(gapAuto ? ' gapAuto' : '');
  
  // Border output preparation
  let outputBorderAll = $derived(borderWeight > 0 && borderAll ? ' border' : '');
  let outputBorderLeft = $derived(borderWeight > 0 && borderLeft ? ' borderLeft' : '');
  let outputBorderRight = $derived(borderWeight > 0 && borderRight ? ' borderRight' : '');
  let outputBorderTop = $derived(borderWeight > 0 && borderTop ? ' borderTop' : '');
  let outputBorderBottom = $derived(borderWeight > 0 && borderBottom ? ' borderBottom' : '');
  let outputBorderWeight = $derived(borderWeight > 0 && borderWeight !== 1 ? ` borderWeight={${borderWeight}}` : '');
  let outputBorderColor = $derived(borderWeight > 0 && borderColor && borderColor !== 'primary' ? ` borderColor="${borderColor}"` : '');

  let outputAlignment = $derived(
    currentAlignment === 'left' ? ' left' :
    currentAlignment === 'center' ? ' center' :
    currentAlignment === 'right' ? ' right' :
    currentAlignment === 'top-left' ? ' topLeft' :
    currentAlignment === 'top' ? ' topCenter' :
    currentAlignment === 'top-right' ? ' topRight' :
    currentAlignment === 'bottom-left' ? ' bottomLeft' :
    currentAlignment === 'bottom' ? ' bottomCenter' :
    currentAlignment === 'bottom-right' ? ' bottomRight' :
    ' center' // Default alignment
  );

  let output = $derived(`<T.Autolayout${outputGap}${outputPaddingH}${outputPaddingV}${outputDirection}${outputAlignment}${outputGapAuto}${outputBorderAll}${outputBorderLeft}${outputBorderRight}${outputBorderTop}${outputBorderBottom}${outputBorderWeight}${outputBorderColor}> </T.Autolayout>`);

  let buttons = $state([
    {button: 'top-left', active: false},
    {button: 'top', active: false},
    {button: 'top-right', active: false},
    {button: 'left', active: false},
    {button: 'center', active: true},
    {button: 'right', active: false},
    {button: 'bottom-left', active: false},
    {button: 'bottom', active: false},
    {button: 'bottom-right', active: false},
  ])

  let directions = $state([
    {button: 'vertical', active: false, path: "M19.2806 14.0306L12.5306 20.7806C12.4609 20.8504 12.3782 20.9057 12.2871 20.9434C12.1961 20.9812 12.0985 21.0006 11.9999 21.0006C11.9014 21.0006 11.8038 20.9812 11.7127 20.9434C11.6217 20.9057 11.539 20.8504 11.4693 20.7806L4.7193 14.0306C4.57857 13.8899 4.49951 13.699 4.49951 13.5C4.49951 13.301 4.57857 13.1101 4.7193 12.9694C4.86003 12.8286 5.05091 12.7496 5.24993 12.7496C5.44895 12.7496 5.63982 12.8286 5.78055 12.9694L11.2499 18.4397V3.75C11.2499 3.55109 11.3289 3.36032 11.4696 3.21967C11.6103 3.07902 11.801 3 11.9999 3C12.1988 3 12.3896 3.07902 12.5303 3.21967C12.6709 3.36032 12.7499 3.55109 12.7499 3.75V18.4397L18.2193 12.9694C18.36 12.8286 18.5509 12.7496 18.7499 12.7496C18.949 12.7496 19.1398 12.8286 19.2806 12.9694C19.4213 13.1101 19.5003 13.301 19.5003 13.5C19.5003 13.699 19.4213 13.8899 19.2806 14.0306Z"},
    {button: 'horizontal', active: true, path: "M20.7806 12.5306L14.0306 19.2806C13.8899 19.4213 13.699 19.5003 13.5 19.5003C13.301 19.5003 13.1101 19.4213 12.9694 19.2806C12.8286 19.1398 12.7496 18.949 12.7496 18.7499C12.7496 18.5509 12.8286 18.36 12.9694 18.2193L18.4397 12.7499H3.75C3.55109 12.7499 3.36032 12.6709 3.21967 12.5303C3.07902 12.3896 3 12.1988 3 11.9999C3 11.801 3.07902 11.6103 3.21967 11.4696C3.36032 11.3289 3.55109 11.2499 3.75 11.2499H18.4397L12.9694 5.78055C12.8286 5.63982 12.7496 5.44895 12.7496 5.24993C12.7496 5.05091 12.8286 4.86003 12.9694 4.7193C13.1101 4.57857 13.301 4.49951 13.5 4.49951C13.699 4.49951 13.8899 4.57857 14.0306 4.7193L20.7806 11.4693C20.8504 11.539 20.9057 11.6217 20.9434 11.7127C20.9812 11.8038 21.0006 11.9014 21.0006 11.9999C21.0006 12.0985 20.9812 12.1961 20.9434 12.2871C20.9057 12.3782 20.8504 12.4609 20.7806 12.5306Z"
    },
  ])

  const copyToClipboard = (element:any) => {
    const text = element.textContent;
    navigator.clipboard.writeText(text)
      .then(() => {
        // console.log('Text copied to clipboard');
        // toast.success('Copied to clipboard')
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }

  const setActiveAlignment = (button:any) => {
    buttons.forEach((btn) => {
      if (btn.button === button) {
        btn.active = true
      } else {
        btn.active = false
      }
    })
    currentAlignment = button
  }

  const setActiveDirection = (button:any) => {
    directions.forEach((btn) => {
      if (btn.button === button) {
        btn.active = true
      } else {
        btn.active = false
      }
    })
    currentDirection = button
  }


  let selectValue = $state([
  // {value: 'switch', label: 'Switch', active: true},
    {value: 'px', label: 'px', active: true},
    {value: 'auto', label: 'Auto', active: false},
  ])

  // Ensure at least one option is active - default to 'all' if none is active
  let activeOption = ['all', 'left', 'right', 'top', 'bottom'].includes(initBorderValue) ? initBorderValue : 'all';
  
  let borderSelectValue = $state([
    {value: 'all', label: 'All', active: activeOption === 'all'},
    {value: 'left', label: 'Left', active: activeOption === 'left'},
    {value: 'right', label: 'Right', active: activeOption === 'right'},
    {value: 'top', label: 'Top', active: activeOption === 'top'},
    {value: 'bottom', label: 'Bottom', active: activeOption === 'bottom'},
  ])

  let currentSelectedValue = $state(selectValue.find(item => item.active)?.label)
  // Initialize currentBorderValue explicitly to "All" to avoid undefined issues
  let currentBorderValue = $state("All")

  const handleSelect = (e) => {
    selectValue = selectValue.map(item => ({
      ...item,
      active: item.value === e.target.value
    }));

    currentSelectedValue = selectValue.find(item => item.active)?.label
    console.log(currentSelectedValue)
    if (currentSelectedValue == 'Auto') {
      gapAuto = true
    }  else {
      gapAuto = false
    }
  }

  const handleBorderSelect = (e) => {
    // Check if the event is a real event or a synthetic one
    const selectedValue = e.target?.value || e;
    
    // Update border select values without triggering reactivity cascades
    borderSelectValue = borderSelectValue.map(item => ({
      ...item,
      active: item.value === selectedValue
    }));

    // Set the current border value label directly from the option's label
    const activeOption = borderSelectValue.find(item => item.value === selectedValue);
    if (activeOption) {
      currentBorderValue = activeOption.label;
    }
    
    // Reset all border values
    borderAll = false;
    borderLeft = false;
    borderRight = false;
    borderTop = false;
    borderBottom = false;
    
    // Only apply borders if borderWeight is > 0
    if (borderWeight > 0) {
      // Set the selected border
      if (selectedValue === 'all') {
        borderAll = true;
      } else if (selectedValue === 'left') {
        borderLeft = true;
      } else if (selectedValue === 'right') {
        borderRight = true;
      } else if (selectedValue === 'top') {
        borderTop = true;
      } else if (selectedValue === 'bottom') {
        borderBottom = true;
      }
    }
  }

  let composeHolder: any

  // Watch borderWeight changes to update border flags accordingly
  function handleBorderWeightChange() {
    const activeBorder = borderSelectValue.find(item => item.active)?.value || 'all';
    
    // If borderWeight is set to 0, remove all borders
    if (borderWeight <= 0) {
      borderAll = false;
      borderLeft = false;
      borderRight = false;
      borderTop = false;
      borderBottom = false;
    } else {
      // Re-apply the current border selection
      handleBorderSelect(activeBorder);
    }
  }

  // Use a simple state variable to track initialization
  let initialized = $state(false);
  
  // Initialize the border selection only once
  if (!initialized) {
    // Set initial border selection based on the active value
    const initialBorderValue = borderSelectValue.find(item => item.active)?.value || 'all';
    // Call once to initialize
    handleBorderSelect(initialBorderValue);
    initialized = true;
  }

  const handleLocationForComposeHolder = () => {
    showAutolayout = !showAutolayout

    setTimeout(() => {
      if (showAutolayout) {
      if (composeHolder) {
        document.body.appendChild(composeHolder);
      }
    }
    }, 10)
    
  }

</script>

<!-- <Toaster position="bottom-left" theme="dark" /> -->
<StyleProvider>
<button 
aria-label="button" 
class="composer-holder-button fixed" 
onclick={() => handleLocationForComposeHolder()}
style="left:{buttonLeft}; top:{buttonTop};right:{buttonRight}; bottom:{butttonBottom}; position:{position};" 
disabled={showAutolayout}
>
<span>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M224,120H208V72a16,16,0,0,0-16-16H152a16,16,0,0,0-16,16v48H120V48a16,16,0,0,0-16-16H64A16,16,0,0,0,48,48v72H32a8,8,0,0,0,0,16H48v72a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V136h16v48a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V136h16a8,8,0,0,0,0-16ZM104,208H64V48h40Zm88-24H152V72h40Z"></path></svg>
</span>
</button>
{#if showAutolayout}
<div bind:this={composeHolder} class="composer-holder" in:fly={{x: 20, duration: 400, easing: backOut}} out:fly={{ x: 20, duration: 200, easing: backOut }}>
  <div class="compose-header">
    <span>Autolayout</span>
    <button aria-label="button" class="composer-holder-button" onclick={() => showAutolayout = !showAutolayout}>
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
      </span>
    </button>
  </div>
  <div class="composer">
    <div class="layout-holder">
      <Autolayout 
        width="100%"
        height="100%"
        gap="{gap}px"
        paddingTop="{paddingVertical}px"
        paddingBottom="{paddingVertical}px"
        paddingLeft="{paddingHorizontal}px"
        paddingRight="{paddingHorizontal}px"
        border={borderAll}
        borderLeft={borderLeft}
        borderRight={borderRight}
        borderTop={borderTop}
        borderBottom={borderBottom}
        borderWeight={borderWeight}
        borderColor={borderColor}
        vertical={currentDirection === 'vertical'}
        left={left}
        center={center}
        right={right}
        topLeft={topleft}
        topCenter={topcenter}
        topRight={topright}
        bottomLeft={bottomleft}
        bottomCenter={bottomcenter}
        bottomRight={bottomright}
        gapAuto={gapAuto}
        >
        <span class="foo"></span>
        <span class="foo"></span>
        <span class="foo"></span>

        <div class="pad pad-l" style:--pad-h="{paddingHorizontal}px"></div>
        <div class="pad pad-r" style:--pad-h="{paddingHorizontal}px"></div>
        <div class="pad pad-t" style:--pad-v="{paddingVertical}px"></div>
        <div class="pad pad-b" style:--pad-v="{paddingVertical}px"></div>
      </Autolayout>
    </div>
    
    <div class="composer-content">
      <div class="composer-content-col">
        <div class="composer-block">
          <div class="composer-block-label">
            Direction + Gap
          </div>
          <div class="composer-direction">
            {#each directions as button}
            <button 
            class="composer-direction-button" 
            class:active={button.active}
            aria-label={button.button} 
            title="{button.button}" 
            onclick={() => setActiveDirection(button.button)}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d={button.path} fill="currentColor"/>
            </svg>
            </button>
            {/each}
          </div>
          <div class="composer-gap has-dropdown">
            <input type="number" disabled={gapAuto} placeholder="Gap" min="0" max="1000" step="1" bind:value={gap} class="composer-gap-input" />
            <!-- <span class="composer-gap-label">px</span> -->
            <div class="dropdown">
              <span class="selected-value">
                {currentSelectedValue}
              </span>
              <select class="custom-select"  onchange={handleSelect}>
                {#each selectValue as item}
                <option value={item.value}>{item.label}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="composer-block-label extra">
            Padding
          </div>
          <div class="composer-gap">
            <input type="number" placeholder="0" min="0" max="1000" step="1" bind:value={paddingHorizontal} class="composer-gap-input" />
            <span class="composer-gap-label">H</span>
          </div>
          
          <div class="composer-block-label extra">
            Border
          </div>
          
          <div class="border-options">
            <div class="composer-gap has-dropdown" style="flex: 1;">
              <input type="number" placeholder="0" min="0" max="10" step="1" bind:value={borderWeight} oninput={handleBorderWeightChange} class="composer-gap-input" />
              <div class="dropdown">
                <span class="selected-value">
                  <!-- {currentBorderValue} -->
                  {#if currentBorderValue == 'All'}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 7.5C8.17157 7.5 7.5 8.17157 7.5 9V15C7.5 15.8284 8.17157 16.5 9 16.5H15C15.8284 16.5 16.5 15.8284 16.5 15V9C16.5 8.17157 15.8284 7.5 15 7.5H9ZM8.5 9C8.5 8.72386 8.72386 8.5 9 8.5H15C15.2761 8.5 15.5 8.72386 15.5 9V15C15.5 15.2761 15.2761 15.5 15 15.5H9C8.72386 15.5 8.5 15.2761 8.5 15V9Z" fill="currentColor"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 5.5C6.61929 5.5 5.5 6.61929 5.5 8V16C5.5 17.3807 6.61929 18.5 8 18.5H16C17.3807 18.5 18.5 17.3807 18.5 16V8C18.5 6.61929 17.3807 5.5 16 5.5H8ZM6.5 8C6.5 7.17157 7.17157 6.5 8 6.5H16C16.8284 6.5 17.5 7.17157 17.5 8V16C17.5 16.8284 16.8284 17.5 16 17.5H8C7.17157 17.5 6.5 16.8284 6.5 16V8Z" fill="currentColor"/>
                    </svg>                    
                  {:else if currentBorderValue == 'Right'}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 6.5C7.79569 6.5 7.60212 6.54057 7.42595 6.61362C7.17087 6.7194 6.87834 6.59837 6.77256 6.34329C6.66678 6.08821 6.78782 5.79568 7.0429 5.6899C7.33836 5.56737 7.66194 5.5 8 5.5H9.375C9.65114 5.5 9.875 5.72386 9.875 6C9.875 6.27614 9.65114 6.5 9.375 6.5H8ZM11.625 6C11.625 5.72386 11.8489 5.5 12.125 5.5H13.5C13.7761 5.5 14 5.72386 14 6C14 6.27614 13.7761 6.5 13.5 6.5H12.125C11.8489 6.5 11.625 6.27614 11.625 6ZM6.34329 6.77256C6.59837 6.87834 6.7194 7.17087 6.61362 7.42595C6.54057 7.60212 6.5 7.79569 6.5 8V9C6.5 9.27614 6.27614 9.5 6 9.5C5.72386 9.5 5.5 9.27614 5.5 9V8C5.5 7.66194 5.56737 7.33836 5.6899 7.0429C5.79568 6.78782 6.08821 6.66678 6.34329 6.77256ZM6 10.5C6.27614 10.5 6.5 10.7239 6.5 11V13C6.5 13.2761 6.27614 13.5 6 13.5C5.72386 13.5 5.5 13.2761 5.5 13V11C5.5 10.7239 5.72386 10.5 6 10.5ZM6 14.5C6.27614 14.5 6.5 14.7239 6.5 15V16C6.5 16.2043 6.54057 16.3979 6.61362 16.574C6.7194 16.8291 6.59837 17.1217 6.34329 17.2274C6.08821 17.3332 5.79568 17.2122 5.6899 16.9571C5.56737 16.6616 5.5 16.3381 5.5 16V15C5.5 14.7239 5.72386 14.5 6 14.5ZM6.77256 17.6567C6.87834 17.4016 7.17087 17.2806 7.42595 17.3864C7.60212 17.4594 7.79569 17.5 8 17.5H9.25C9.52614 17.5 9.75 17.7239 9.75 18C9.75 18.2761 9.52614 18.5 9.25 18.5H8C7.66194 18.5 7.33836 18.4326 7.0429 18.3101C6.78782 18.2043 6.66678 17.9118 6.77256 17.6567ZM11.25 18C11.25 17.7239 11.4739 17.5 11.75 17.5H13C13.2761 17.5 13.5 17.7239 13.5 18C13.5 18.2761 13.2761 18.5 13 18.5H11.75C11.4739 18.5 11.25 18.2761 11.25 18Z" fill="currentColor"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 7C14.5 6.17157 15.1716 5.5 16 5.5H17C17.8284 5.5 18.5 6.17157 18.5 7V17C18.5 17.8284 17.8284 18.5 17 18.5H16C15.1716 18.5 14.5 17.8284 14.5 17V7ZM16 6.5C15.7239 6.5 15.5 6.72386 15.5 7V17C15.5 17.2761 15.7239 17.5 16 17.5H17C17.2761 17.5 17.5 17.2761 17.5 17V7C17.5 6.72386 17.2761 6.5 17 6.5H16Z" fill="currentColor"/>
                    </svg>
                  {:else if currentBorderValue == 'Left'}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 17.5C16.2043 17.5 16.3979 17.4594 16.574 17.3864C16.8291 17.2806 17.1217 17.4016 17.2274 17.6567C17.3332 17.9118 17.2122 18.2043 16.9571 18.3101C16.6616 18.4326 16.3381 18.5 16 18.5H14.625C14.3489 18.5 14.125 18.2761 14.125 18C14.125 17.7239 14.3489 17.5 14.625 17.5H16ZM12.375 18C12.375 18.2761 12.1511 18.5 11.875 18.5H10.5C10.2239 18.5 10 18.2761 10 18C10 17.7239 10.2239 17.5 10.5 17.5H11.875C12.1511 17.5 12.375 17.7239 12.375 18ZM17.6567 17.2274C17.4016 17.1217 17.2806 16.8291 17.3864 16.574C17.4594 16.3979 17.5 16.2043 17.5 16V15C17.5 14.7239 17.7239 14.5 18 14.5C18.2761 14.5 18.5 14.7239 18.5 15V16C18.5 16.3381 18.4326 16.6616 18.3101 16.9571C18.2043 17.2122 17.9118 17.3332 17.6567 17.2274ZM18 13.5C17.7239 13.5 17.5 13.2761 17.5 13L17.5 11C17.5 10.7239 17.7239 10.5 18 10.5C18.2761 10.5 18.5 10.7239 18.5 11L18.5 13C18.5 13.2761 18.2761 13.5 18 13.5ZM18 9.5C17.7239 9.5 17.5 9.27614 17.5 9V8C17.5 7.79569 17.4594 7.60212 17.3864 7.42595C17.2806 7.17087 17.4016 6.87834 17.6567 6.77256C17.9118 6.66678 18.2043 6.78782 18.3101 7.0429C18.4326 7.33836 18.5 7.66194 18.5 8V9C18.5 9.27614 18.2761 9.5 18 9.5ZM17.2274 6.34329C17.1217 6.59837 16.8291 6.7194 16.5741 6.61362C16.3979 6.54057 16.2043 6.5 16 6.5L14.75 6.5C14.4739 6.5 14.25 6.27614 14.25 6C14.25 5.72386 14.4739 5.5 14.75 5.5L16 5.5C16.3381 5.5 16.6616 5.56737 16.9571 5.6899C17.2122 5.79568 17.3332 6.08821 17.2274 6.34329ZM12.75 6C12.75 6.27614 12.5261 6.5 12.25 6.5L11 6.5C10.7239 6.5 10.5 6.27614 10.5 6C10.5 5.72386 10.7239 5.5 11 5.5L12.25 5.5C12.5261 5.5 12.75 5.72386 12.75 6Z" fill="currentColor"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 17C9.5 17.8284 8.82843 18.5 8 18.5L7 18.5C6.17157 18.5 5.5 17.8284 5.5 17L5.5 7C5.5 6.17157 6.17157 5.5 7 5.5L8 5.5C8.82843 5.5 9.5 6.17157 9.5 7L9.5 17ZM8 17.5C8.27614 17.5 8.5 17.2761 8.5 17L8.5 7C8.5 6.72386 8.27614 6.5 8 6.5H7C6.72386 6.5 6.5 6.72386 6.5 7L6.5 17C6.5 17.2761 6.72386 17.5 7 17.5L8 17.5Z" fill="currentColor"/>
                    </svg>
                  {:else if currentBorderValue == 'Top'}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 16C6.5 16.2043 6.54057 16.3979 6.61362 16.574C6.7194 16.8291 6.59837 17.1217 6.34329 17.2274C6.08821 17.3332 5.79568 17.2122 5.6899 16.9571C5.56737 16.6616 5.5 16.3381 5.5 16L5.5 14.625C5.5 14.3489 5.72386 14.125 6 14.125C6.27614 14.125 6.5 14.3489 6.5 14.625L6.5 16ZM6 12.375C5.72386 12.375 5.5 12.1511 5.5 11.875L5.5 10.5C5.5 10.2239 5.72386 10 6 10C6.27614 10 6.5 10.2239 6.5 10.5L6.5 11.875C6.5 12.1511 6.27614 12.375 6 12.375ZM6.77256 17.6567C6.87834 17.4016 7.17087 17.2806 7.42595 17.3864C7.60212 17.4594 7.79569 17.5 8 17.5H9C9.27614 17.5 9.5 17.7239 9.5 18C9.5 18.2761 9.27614 18.5 9 18.5H8C7.66194 18.5 7.33836 18.4326 7.0429 18.3101C6.78782 18.2043 6.66678 17.9118 6.77256 17.6567ZM10.5 18C10.5 17.7239 10.7239 17.5 11 17.5H13C13.2761 17.5 13.5 17.7239 13.5 18C13.5 18.2761 13.2761 18.5 13 18.5H11C10.7239 18.5 10.5 18.2761 10.5 18ZM14.5 18C14.5 17.7239 14.7239 17.5 15 17.5H16C16.2043 17.5 16.3979 17.4594 16.574 17.3864C16.8291 17.2806 17.1217 17.4016 17.2274 17.6567C17.3332 17.9118 17.2122 18.2043 16.9571 18.3101C16.6616 18.4326 16.3381 18.5 16 18.5H15C14.7239 18.5 14.5 18.2761 14.5 18ZM17.6567 17.2274C17.4016 17.1217 17.2806 16.8291 17.3864 16.574C17.4594 16.3979 17.5 16.2043 17.5 16V14.75C17.5 14.4739 17.7239 14.25 18 14.25C18.2761 14.25 18.5 14.4739 18.5 14.75V16C18.5 16.3381 18.4326 16.6616 18.3101 16.9571C18.2043 17.2122 17.9118 17.3332 17.6567 17.2274ZM18 12.75C17.7239 12.75 17.5 12.5261 17.5 12.25V11C17.5 10.7239 17.7239 10.5 18 10.5C18.2761 10.5 18.5 10.7239 18.5 11V12.25C18.5 12.5261 18.2761 12.75 18 12.75Z" fill="currentColor"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 9.5C6.17157 9.5 5.5 8.82843 5.5 8L5.5 7C5.5 6.17157 6.17157 5.5 7 5.5L17 5.5C17.8284 5.5 18.5 6.17157 18.5 7V8C18.5 8.82843 17.8284 9.5 17 9.5L7 9.5ZM6.5 8C6.5 8.27614 6.72386 8.5 7 8.5L17 8.5C17.2761 8.5 17.5 8.27614 17.5 8V7C17.5 6.72386 17.2761 6.5 17 6.5L7 6.5C6.72386 6.5 6.5 6.72386 6.5 7L6.5 8Z" fill="currentColor"/>
                    </svg>
                  {:else if currentBorderValue == 'Bottom'}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 8C17.5 7.79569 17.4594 7.60212 17.3864 7.42595C17.2806 7.17087 17.4016 6.87834 17.6567 6.77256C17.9118 6.66679 18.2043 6.78782 18.3101 7.0429C18.4326 7.33836 18.5 7.66195 18.5 8V9.375C18.5 9.65114 18.2761 9.875 18 9.875C17.7239 9.875 17.5 9.65114 17.5 9.375V8ZM18 11.625C18.2761 11.625 18.5 11.8489 18.5 12.125V13.5C18.5 13.7761 18.2761 14 18 14C17.7239 14 17.5 13.7761 17.5 13.5V12.125C17.5 11.8489 17.7239 11.625 18 11.625ZM17.2274 6.34329C17.1217 6.59837 16.8291 6.7194 16.5741 6.61363C16.3979 6.54057 16.2043 6.5 16 6.5L15 6.5C14.7239 6.5 14.5 6.27614 14.5 6C14.5 5.72386 14.7239 5.5 15 5.5L16 5.5C16.3381 5.5 16.6616 5.56738 16.9571 5.6899C17.2122 5.79568 17.3332 6.08821 17.2274 6.34329ZM13.5 6C13.5 6.27614 13.2761 6.5 13 6.5L11 6.5C10.7239 6.5 10.5 6.27614 10.5 6C10.5 5.72386 10.7239 5.5 11 5.5L13 5.5C13.2761 5.5 13.5 5.72386 13.5 6ZM9.5 6C9.5 6.27614 9.27614 6.5 9 6.5L8 6.5C7.79569 6.5 7.60212 6.54057 7.42595 6.61362C7.17087 6.7194 6.87834 6.59837 6.77256 6.34329C6.66679 6.08821 6.78782 5.79568 7.0429 5.6899C7.33836 5.56737 7.66194 5.5 8 5.5L9 5.5C9.27614 5.5 9.5 5.72386 9.5 6ZM6.34329 6.77256C6.59837 6.87834 6.7194 7.17087 6.61363 7.42595C6.54057 7.60212 6.5 7.79569 6.5 8L6.5 9.25C6.5 9.52614 6.27614 9.75 6 9.75C5.72386 9.75 5.5 9.52614 5.5 9.25L5.5 8C5.5 7.66194 5.56738 7.33836 5.6899 7.0429C5.79568 6.78782 6.08821 6.66678 6.34329 6.77256ZM6 11.25C6.27614 11.25 6.5 11.4739 6.5 11.75L6.5 13C6.5 13.2761 6.27614 13.5 6 13.5C5.72386 13.5 5.5 13.2761 5.5 13L5.5 11.75C5.5 11.4739 5.72386 11.25 6 11.25Z" fill="currentColor"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 14.5C17.8284 14.5 18.5 15.1716 18.5 16V17C18.5 17.8284 17.8284 18.5 17 18.5L7 18.5C6.17157 18.5 5.5 17.8284 5.5 17L5.5 16C5.5 15.1716 6.17157 14.5 7 14.5L17 14.5ZM17.5 16C17.5 15.7239 17.2761 15.5 17 15.5L7 15.5C6.72386 15.5 6.5 15.7239 6.5 16L6.5 17C6.5 17.2761 6.72386 17.5 7 17.5L17 17.5C17.2761 17.5 17.5 17.2761 17.5 17V16Z" fill="currentColor"/>
                    </svg>
                  {/if}
                </span>
                <select class="custom-select" onchange={handleBorderSelect}>
                  {#each borderSelectValue as item}
                  <option value={item.value}>{item.label}</option>
                  {/each}
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="composer-content-col">
        <div class="composer-block">
          <div class="composer-block-label">
            Alignment
          </div>
          <div class="composer-alignment">
            
            {#each buttons as button}
            <button 
              class="composer-alignment-button" 
              class:active={button.active}
              onclick={() => setActiveAlignment(button.button)} 
              title={button.button} 
              aria-label={button.button}
            >
            </button>
            {/each}
          </div>

          <div class="composer-block-label extra"></div>
          <div class="composer-gap">
            <input type="number" placeholder="0" min="0" max="1000" step="1" bind:value={paddingVertical} class="composer-gap-input" />
            <span class="composer-gap-label">V</span>
          </div>

          <div class="composer-block-label extra"></div>
          <div class="border-color-select border-color-{borderColor.toLowerCase()}">
            <select bind:value={borderColor} class="color-select custom-select">
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="strong">Strong</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
  </div>

  <div class="output-holder">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
    <textarea class="output" spellcheck="false" >{output}</textarea>
  </div>
</div>
{/if}
</StyleProvider>

<style lang="scss">

  .layout-holder {
    max-width: 380px;
    width: 100%;
    display: flex;
    box-shadow: 0 0 0 1px var(--ds-blue);
    margin: 0 auto;
    height: 150px;
    border-radius: 0;
    overflow: hidden;
  }
  
  .border-controls {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--4px);
    align-items: center;
  }
  
  .border-button {
    width: 100%;
    height: var(--32px);
    background: var(--ds-surfaceSecondary);
    border: 1px solid var(--ds-borderPrimary);
    border-radius: var(--4px);
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    &:hover {
      background: var(--ds-slate04);
    }
    
    &.active {
      background: var(--ds-primary16);
      border-color: var(--ds-primary);
      
      .border-icon {
        border-color: var(--ds-primary);
      }
    }
  }
  
  .border-icon {
    width: 8px;
    height: 8px;
    position: relative;
    
    &.all-borders {
      border: 1px solid var(--ds-textTertiary);
      border-radius: 2px;
    }
    
    &.top-border {
      border-top: 1px solid var(--ds-textTertiary);
      border-radius: 2px;
    }
    
    &.right-border {
      border-right: 1px solid var(--ds-textTertiary);
      border-radius: 2px;
    }
    
    &.bottom-border {
      border-bottom: 1px solid var(--ds-textTertiary);
      border-radius: 2px;
    }
    
    &.left-border {
      border-left: 1px solid var(--ds-textTertiary);
      border-radius: 2px;
    }
  }
  
  .border-options {
    display: flex;
    gap: var(--8px);
    margin-bottom: var(--8px);
  }
  
  .border-color-select {
    --color-select-bg: var(--ds-borderPrimary);
    flex: 1;
    position: relative;

    &:before {
      background: var(--color-select-bg);
      border: 1px solid var(--ds-slate04);
      content: "";
      position: absolute;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      right: var(--8px);
      width: var(--12px);
      height: var(--12px);
      z-index: 100;
      pointer-events: none;
      border-radius: 4px;
    }

    &.border-color-primary {
      --color-select-bg: var(--ds-borderPrimary);
    }
    &.border-color-secondary {
      --color-select-bg: var(--ds-borderSecondary);
    }
    &.border-color-strong {
      --color-select-bg: var(--ds-borderStrong);
    }

    .color-select {
      box-shadow: 0 0 0 1px var(--ds-borderPrimary);
      width: 100%;
      height: 34px;
      position: relative;
      padding: 6px 6px 6px 16px;

      &:focus {
        outline: 0;
      }
      
      &:hover {
        background: var(--ds-slate04);
      }
    }
  }

  .foo {
    position: relative;
    z-index: 100;
    font-size: var(--10px);
    font-family: var(--font-mono);
    padding: var(--8px);
    border: 1px solid var(--ds-magenta);
    border-radius: 0;
    background: var(--ds-magenta16);
    width: var(--24px);
    height: var(--24px);
  }

  .pad {
    z-index: 200;
    --pad-h: 0;
    --pad-v: 0;
    position: absolute;
    // background: var(--ds-primary);
    background-image: repeating-linear-gradient(315deg, var(--ds-blue56) 0 1px, var(--ds-blue16) 0 50%);
    background-size: 8px 8px;
    // opacity: 0.2;

    &.pad-l {
      left: 0;
      top: 0;
      bottom: 0;
      width: var(--pad-h);
    }
    &.pad-r {
      right: 0;
      top: 0;
      bottom: 0;
      width: var(--pad-h);
    }
    &.pad-t {
      top: 0;
      left: 0;
      right: 0;
      height: var(--pad-v);
    }
    &.pad-b {
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--pad-v);
    }
  }

  .composer-holder {
    font-family: var(--font-base);
    box-sizing: border-box;
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: fixed;
    align-items: flex-end;
    right: 0;
    top: 0;
    z-index: 999999999;
    background: var(--ds-surfacePrimary);
    border-left: 1px solid var(--ds-borderStrong);
    box-shadow: -5px 0 0 0 rgba(0,0,0,0.08);
  }

  .output-holder {
    width: 100%;
    padding: var(--16px);
    // background: var(--ds-surfacePrimary);
    // border: 1px solid var(--ds-borderStrong);
    border-radius: 0 0 var(--8px) var(--8px);
    border-top: 1px solid var(--ds-borderStrong);
  }

  .output {
    box-sizing: border-box;
    display: flex;
    background: var(--ds-surfaceSecondary);
    border: 1px solid var(--ds-borderStrong);
    // border-top: 0;
    border-radius: var(--8px);
    padding: var(--16px);
    font-family: var(--font-mono);
    font-size: var(--12px);
    color: var(--ds-primaryDark);
    // cursor: copy;
    width: 100%;
    min-height: 150px;
    resize: none;
    margin: 0;

    &:focus-within {
      outline: 1px solid var(--ds-primary);
    }
  }

  .composer {
    box-sizing: border-box;
    width: 100%;
    background: var(--ds-diagramBackground);
    padding: var(--16px);
    // border: 1px solid var(--ds-borderStrong);
    border-bottom: 0;
    // border-radius: var(--8px) var(--8px) 0 0;
    position: relative;
    overflow: hidden;
    display: grid;
    align-items: center;
    justify-content: center;
    font-size: var(--12px);
    grid-template-columns: 1fr;
    gap: var(--16px);

    &:before {
      pointer-events: none;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: 12px 12px;
      background-image: radial-gradient(var(--ds-textTertiary) 1px, transparent 1px);
      opacity: 0.3;
      z-index: 1;
    }

    .composer-content {
      margin: 0 auto;
      position: relative;
      z-index: 100;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--20px);
      width: 100%;
      max-width: 380px;
      border-radius: var(--8px);
      padding: var(--16px);
      background: var(--ds-surfacePrimary);
      box-shadow: 0 0 0 1px var(--ds-borderStrong), rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    }
  }

  .composer-direction {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--ds-surfaceSecondary);
    border-radius: var(--8px);
    margin-bottom: var(--12px);
  }

  .composer-direction-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--8px);
    height: 34px;
    color: var(--ds-textTertiary);
    border: 0;
    background: transparent;
    cursor: pointer;

    &.active {
      color: var(--ds-primary);
      box-shadow: 0 0 0 1px var(--ds-borderStrong);
      background: var(--ds-surfacePrimary);
    }
  }

  .composer-block {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--8px);
  }

  .composer-block-label {
    font-weight: 500;
    font-size: var(--11px);
    color: var(--ds-textSecondary);

    &.extra {
      height: calc(var(--24px) + var(--4px));
      display: flex;
      width: 100%;
      align-items: flex-end;
    }
  }

  .composer-alignment {
    background: var(--ds-surfaceSecondary);
    border-radius: var(--12px);
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: var(--4px);
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 0 0 1px var(--ds-borderPrimary);
    padding: var(--4px);
  }
  

  .composer-alignment-button {
    box-sizing: border-box;
    height: 24px;
    position: relative;
    border: 0;
    background: transparent;
    cursor: pointer;

    &:before {
      z-index: 1;
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 2px;
      background: var(--ds-textTertiary);
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover {
      background: var(--ds-slate04);
      border-radius: var(--8px);
      // box-shadow: 0 0 0 1px var(--ds-borderPrimary);
    }

    &.active {
      background: var(--ds-primary16);
      border-radius: var(--8px);
      // box-shadow: 0 0 0 1px var(--ds-borderPrimary);

      &:hover {
        box-shadow: none;
      }

      &:before {
        width: var(--8px);
        height: var(--8px);
        background: var(--ds-primary);
      }
    }

  }

  .composer-gap {
    display: flex;
    background: var(--ds-surfaceSecondary);
    border-radius: var(--8px);
    height: 34px;
    align-items: center;
    justify-content: space-between;
    gap: var(--8px);
    box-shadow: 0 0 0 1px var(--ds-borderPrimary);
    padding: var(--4px) var(--12px) var(--4px) var(--4px);


    &.has-dropdown {
      gap: var(--4px);
      padding: var(--4px);
    }

    .composer-gap-input {
      width: 100%;
      background: transparent;
      border-radius: var(--4px);
      padding: 0 0 0 var(--12px);
      height: 100%;
      border: 0;
      color: var(--ds-textPrimary);
      font-size: var(--12px);

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      &:hover {
        background: var(--ds-slate04);
      }

      &:focus-within {
        outline: 1px solid var(--ds-primary);
        background: var(--ds-slate04);
      }
    }

    .composer-gap-label {
      font-size: var(--11px);
      color: var(--ds-textTertiary);
    }
  }


  .dropdown {
    cursor: pointer;
    background-color: transparent;
    padding: 2px var(--4px);
    position: relative;
    height: 100%;
    min-width: 32px;
    border-radius: var(--4px);

    &:hover {
      background: var(--ds-slate04);
    }

      select {
      outline: 0;
      border: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      padding: 0;
      cursor: pointer;
      font-size: var(--12px);
    }

    .selected-value {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--ds-textTertiary);
      font-size: var(--11px);
    }
  }

  @supports (appearance: base-select) {

    .custom-select {
      position: relative;
      height: inherit;
      opacity: 1;
      left: auto;
      top: auto;
      font-size: var(--12px);
      color: var(--ds-textPrimary);
      padding: 6px 12px;
      width: 100%;
      // height: var(--28px);
      display: flex;
      align-items: center;
      background: var(--ds-surfaceSecondary);
      cursor: pointer;

      &::picker-icon {
        display: none;
      }
      
      &, &::picker(select) {
        appearance: base-select;
        border: transparent;
        box-shadow: none;
        border-radius: var(--8px);
      }

      &:active, &:focus {
        outline: none;
        border-color: var(--ds-primary);
      }

      &:hover {
        background: var(--ds-InputBackground);
      }

      &:focus-visible {
        outline: 2px solid var(--ds-primary);
        outline-offset: 0;
      }

      &::picker(select) {
        background: var(--ds-surfacePrimary);
        margin: 8px 0;
        padding: 2px 4px;
        width: 100%;
        max-width: 140px;
        box-shadow: 0 0 0 1px var(--ds-borderPrimary), 0px 154px 43px 0px rgba(0, 0, 0, 0), 0px 98px 39px 0px rgba(0, 0, 0, 0.01), 0px 55px 33px 0px rgba(0, 0, 0, 0.03), 0px 25px 25px 0px rgba(0, 0, 0, 0.05), 0px 6px 14px 0px rgba(0, 0, 0, 0.06);
        transition: 
          opacity .2s ease,
          transform .2s var(--ease-out-3), 
          display .2s allow-discrete, 
          overlay .2s allow-discrete
        ;
      }

      &:not(:open)::picker(select) {
        // opacity: 0;
        // transform: scale(.96) translateY(0);
      }
      
      /* set the on stage styles */
      &:open::picker(select) {
        // opacity: 1;
        // transform: scale(1) translateY(0);
      }
      
      option {
        margin: 2px 0;
        color: var(--ds-textPrimary);
        display: grid;
        grid-template-columns: [icon] auto [content] 1fr [mark] auto;
        padding: 6px 12px 6px 8px;
        border-radius: 6px;
        
        &::checkmark {
          // content: "⦿";
          content: "✔";
          grid-area: 1 / mark;
          color: var(--ds-primaryDark);
        }

        &:hover {
          outline: none;
          background: var(--ds-InputBackground);
        }

        &:checked {
          background: var(--ds-primary08);
          color: var(--ds-primaryDark);
        }

        &:focus-visible {
          outline: 2px solid var(--ds-primary);
          outline-offset: 0;
        }

        
      }
    }
  }

  .compose-header {
    display: flex;
    width: 100%;
    padding: 0 var(--16px);
    height: var(--64px);
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--ds-borderStrong);

    span {
      font-size: var(--12px);
      font-weight: 600;
    }
  }

  .composer-holder-button {
    width: var(--32px);
    height: var(--32px);
    background: var(--ds-surfacePrimary);
    border: 1px solid var(--ds-borderPrimary);
    color: var(--ds-textPrimary);
    border-radius: var(--8px);
    display: flex;
    align-items: center;
    justify-content: center;
    

    &.fixed {
      // position: fixed;
      // right: var(--16px);
      // top: var(--16px);
      z-index: 9999999;
      // background: var(--ds-surfaceInvert);
      // border: 1px solid var(--ds-surfaceInvert);
      // color: var(--ds-textInvert);
      background: transparent;
      border: 1px dashed var(--ds-slate);
      color: var(--ds-textPrimary);
      backdrop-filter: blur(12px);
    }

    span {
      display: flex;
    }
  }

</style>