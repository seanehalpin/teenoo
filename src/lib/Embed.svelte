<script lang="ts">
  
  import StyleProvider from './StyleProvider.svelte';
  // import { Toaster, toast } from 'svelte-sonner'
  import Autolayout from "./Autolayout.svelte"
  import { fade, fly, scale, blur } from 'svelte/transition'
  import { backOut, quartOut, quintIn } from "svelte/easing"

  // let showAutolayout = $state(false)

  let { 
    showAutolayout = $bindable(false),
    currentAlignment = 'center', 
    currentDirection = 'horizontal', 
    gap = null,
    paddingHorizontal = 16,
    paddingVertical = 16,
    buttonLeft = 'auto',
    buttonTop = '16px',
    buttonRight = '16px',
    butttonBottom = 'auto',
    position = 'fixed',
  } = $props()

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

  let output = $derived(`<T.Autolayout${outputGap}${outputPaddingH}${outputPaddingV}${outputDirection}${outputAlignment}${outputGapAuto}> </T.Autolayout>`);

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

  let currentSelectedValue = $state(selectValue.find(item => item.active)?.label)

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

  let composeHolder: any

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

    // transform: matrix3d(0.707107, -0.40558, -0.579228, 0, 0.707107, 0.40558, 0.579228, 0, 0, -0.819152, 0.573576, 0, 0, 0, 0, 1);
    // transform-style: preserve-3d;
    // transform-origin: center;
    // scale: 0.75;
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
    box-shadow: -8px 0 0 0 rgba(0,0,0,0.08);
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
      background: var(--ds-InputBackground);
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
    padding: var(--16px);
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
    backdrop-filter: blur(4px);
    

    &.fixed {
      // position: fixed;
      // right: var(--16px);
      // top: var(--16px);
      z-index: 9999999;
      // background: var(--ds-surfaceInvert);
      // border: 1px solid var(--ds-surfaceInvert);
      // color: var(--ds-textInvert);
      background: var(--ds-magenta56);
    border: 1px solid var(--ds-magenta75);
    color: var(--ds-textPrimary);
    }

    span {
      display: flex;
    }
  }

</style>